import { PartialType } from '@nestjs/mapped-types';
import { CreateAppDto } from './create-app.dto';
import { IsEnum, IsNotEmpty, IsUUID } from 'class-validator';
import { AppType, AppTypeEnum } from 'src/common/Enum';

export class UploadFileDto extends PartialType(CreateAppDto) {

  @IsUUID()
  @IsNotEmpty()
  public app_id: string;
  
  @IsNotEmpty()
  @IsEnum(AppTypeEnum, {
    message: `Possible values are ${AppTypeEnum}`,
  })
  public  type_app: AppType;
}
