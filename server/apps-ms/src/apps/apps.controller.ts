import { Controller } from '@nestjs/common';
import { MessagePattern, Payload, RpcException } from '@nestjs/microservices';
import { AppsService } from './apps.service';
import { CreateAppDto } from './dto/create-app.dto';
import { UpdateAppDto } from './dto/update-app.dto';
import { PaginationDto } from 'src/common';
import { FiltersDto } from './dto/filters.dto';

@Controller()
export class AppsController {
  constructor(private readonly appsService: AppsService) {}

  @MessagePattern('createApp')
  create(@Payload() createAppDto: CreateAppDto) {
    return this.appsService.create(createAppDto);
  }

  @MessagePattern('findAllApps')
  findAll(@Payload() data: { pagination: PaginationDto; filters: FiltersDto }) {
    const { pagination, filters } = data; // Extraer los DTOs del objeto recibido
    return this.appsService.findAll(pagination, filters);
  }

  @MessagePattern('findOneApp')
  findOne(@Payload('id') id: string) {
    return this.appsService.findOne(id);
  }

  @MessagePattern('updateApp')
  update(@Payload() updateAppDto: UpdateAppDto) {
    return this.appsService.update(updateAppDto.id, updateAppDto);
  }

  @MessagePattern('removeApp')
  remove(@Payload('id') id: string) {
    return this.appsService.remove(id);
  }
  @MessagePattern('uploadFile')
  async uploadFile(
    @Payload()
    file: {
      buffer: { type: string; data: number[] };
      originalname: string;
      mimetype: string;
    },
  ): Promise<{ url: string }> {
    //console.log(' microservice:', file);
    const fileBuffer: Buffer = Buffer.from(file.buffer.data);

    if (!Buffer.isBuffer(fileBuffer)) {
      throw new RpcException({
        status: 400,
        message: `${fileBuffer} is not a valid Buffer`,
      });
    }
    const url = await this.appsService.uploadFile({
      buffer: fileBuffer,
      originalname: file.originalname,
      mimetype: file.mimetype,
    });
    return { url };
  }

  @MessagePattern('downloadFile')
  async downloadFile(
    @Payload('fileName') fileName: string,
  ): Promise<{ fileBuffer: Buffer; fileName: string }> {
    //console.log('downloadFile',appId);
    const fileBuffer = await this.appsService.downloadFile(fileName);
    return {
      fileBuffer,
      fileName,
    };
  }

  @MessagePattern('deleteFile')
  async deleteFile(@Payload('fileName') fileName: string): Promise<string> {
    return this.appsService.deleteFile(fileName);
  }

  @MessagePattern('validateProducts')
  async validateProducts(@Payload() ids: string[]) {
    return this.appsService.validateProducts(ids)
  }
}
