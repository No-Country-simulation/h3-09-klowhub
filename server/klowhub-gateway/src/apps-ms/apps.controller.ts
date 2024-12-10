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
import { CreateAppDto, UpdateAppDto, UploadFileDto } from './dto';
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
  findAllProducts(
    @Query() paginationDto: PaginationDto,
    @Body() filtersDto: FiltersDto,
  ) {
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
  async updateApp(
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
  removeApp(@Param('id', ParseUUIDPipe) id: string) {
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
    @Body() UploadFileDto: UploadFileDto, // Enum recibido
  ): Promise<{ url: string }> {
    try {
      const extension = 'rar';
      const newFileName = `${UploadFileDto.type_app}_${UploadFileDto.app_id}.${extension}`; // Agregar tipo al nombre

      const fileData = {
        buffer: file.buffer,
        originalname: newFileName,
        mimetype: file.mimetype,
      };

      const url = await firstValueFrom(
        this.appClient.send('uploadFile', fileData),
      );

      return url;
    } catch (error) {
      console.error('Error al subir archivo:', error.message);
      throw new RpcException(error);
    }
  }

  @Delete('delete/:type/:appId')
  async deleteFile(
    @Param() UploadFileDto: UploadFileDto,
    @Param('appId', ParseUUIDPipe) appId: string,
  ): Promise<{ message: string }> {
    try {
     
      const fileName = `${UploadFileDto.type_app}_${appId}`;
      const result = await firstValueFrom(
        this.appClient.send('deleteFile', { fileName }),
      );

      return { message: result };
    } catch (error) {
      console.error('Error al eliminar archivo:', error.message);
      throw new RpcException(error);
    }
  }

  @Get('download/:name')
  async downloadFile(
    @Param('name') name: string,
    @Res() res: Response,
  ): Promise<void> {
    try {
      const result = await firstValueFrom(
        this.appClient.send('downloadFile', { name }),
      );

      // Le asigna una extencion si no tiene
      const extension = result.extension || 'rar'; // Asume 'rar' si no hay extensión
      const fileName = `${name}.${extension}`;

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
