import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { AppsService } from './apps.service';
import { CreateAppDto } from './dto/create-app.dto';
import { UpdateAppDto } from './dto/update-app.dto';
import { PaginationDto } from 'src/common';

@Controller()
export class AppsController {
  constructor(private readonly appsService: AppsService) {}

  @MessagePattern('createApp')
  create(@Payload() createAppDto: CreateAppDto) {
    return this.appsService.create(createAppDto);
  }

  @MessagePattern('findAllApps')
  findAll(@Payload() paginationDto: PaginationDto) {
    return this.appsService.findAll(paginationDto);
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
}
