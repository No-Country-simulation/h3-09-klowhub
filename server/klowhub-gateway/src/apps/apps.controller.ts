import {
  Body,
  Controller,
  Delete,
  Get,
  Inject,
  Param,
  ParseIntPipe,
  ParseUUIDPipe,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { ClientProxy, RpcException } from '@nestjs/microservices';
import { catchError, firstValueFrom } from 'rxjs';
import { PaginationDto } from 'src/common';
import { CreateAppDto, UpdateAppDto } from './dto';

@Controller('apps')
export class AppsController {
  constructor(@Inject('APP_SERVICE') private readonly appClient: ClientProxy) {}

  @Post()
  createProduct(@Body() createAppDto: CreateAppDto) {
    return this.appClient.send('createApp', createAppDto);
  }
  @Get()
  findAllProducts(@Query() paginationDto: PaginationDto) {
    return this.appClient.send('findAllApps', paginationDto);
  }
  @Get(':id')
  async findOneProduct(@Param('id') id: string) {
    try {
      const product = await firstValueFrom(
        this.appClient.send('findOneApp', { id }),
      );
      return product;
    } catch (error) {
      throw new RpcException(error);
    }
  }

  @Patch(':id')
  async updateProduct(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updateAppDto: UpdateAppDto,
  ) {
    try {
      const product = await firstValueFrom(
        this.appClient.send('updateApp', { id, ...updateAppDto }),
      );
      return product;
    } catch (error) {
      console.log(error);
      throw new RpcException(error);
    }
  }
  @Delete(':id')
  removeProduct(@Param('id', ParseUUIDPipe) id: string) {
    return this.appClient.send('removeApp', { id }).pipe(
      catchError((err) => {
        throw new RpcException(err);
      }),
    );
  }
}
