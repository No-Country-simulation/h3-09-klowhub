import {
  Body,
  Controller,
  Delete,
  Get,
  Inject,
  Param,
  ParseUUIDPipe,
  Patch,
  Post,
  Query,
  Res,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { ClientProxy, RpcException } from '@nestjs/microservices';
import { catchError, firstValueFrom } from 'rxjs';
import { PaginationDto } from 'src/common';
import { CreateAppDto, UpdateAppDto } from './dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { Response } from 'express';
import { FiltersDto } from 'src/common/dto';

@Controller('apps')
export class AppsController {
  constructor(@Inject('APP_SERVICE') private readonly appClient: ClientProxy) {}

  @Post()
  createProduct(@Body() createAppDto: CreateAppDto) {
    return this.appClient.send('createApp', createAppDto);
  }
  @Get()
  findAllProducts(@Query() paginationDto: PaginationDto,@Body() filtersDto: FiltersDto) {
    const payload = { pagination: paginationDto, filters: filtersDto };
    return this.appClient.send('findAllApps', payload);
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

  @Post('upload')
  @UseInterceptors(FileInterceptor('file'))
  async uploadFile(
    @UploadedFile() file: Express.Multer.File,
    @Body('appId', ParseUUIDPipe) appId: string,
  ): Promise<{ url: string }> {
    try {
      // Obtener la extensión original del archivo
      const extension = file.originalname.split('.').pop() || 'rar';
      // Generar un nombre único con UUID
      const newFileName = `${appId}.${extension}`;

      const fileData = {
        buffer: file.buffer,
        originalname: newFileName,
        mimetype: file.mimetype,
      };
      //console.log('Sending file data to microservice:', fileData);

      const url = await firstValueFrom(
        this.appClient.send('uploadFile', fileData),
      );

      return url;
    } catch (error) {
      console.log(error);
      throw new RpcException(error);
    }
  }

  @Get('download/:appId')
  async downloadFile(
    @Param('appId', ParseUUIDPipe) appId: string,
    @Res() res: Response,
  ): Promise<void> {
    try {
      const result = await firstValueFrom(
        this.appClient.send('downloadFile', { appId }),
      );

      // Le asigna una extencion si no tiene
      const extension = result.extension || 'rar'; // Asume 'rar' si no hay extensión
      const fileName = `${appId}.${extension}`;

      // Configura los encabezados para una descarga de archivo
      res.set({
        'Content-Type': 'application/octet-stream',
        'Content-Disposition': `attachment; filename="${fileName}"`,
      });

      // Envia los datos binarios al cliente
      res.send(Buffer.from(result.fileBuffer.data));
    } catch (error) {
      console.error('Error al descargar el archivo:', error.message);
      throw new RpcException(error);
    }
  }
}
