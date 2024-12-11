import { Module } from '@nestjs/common';
import { CoursesModule } from './courses/courses.module';
import { MulterModule } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';
@Module({
  imports: [
    CoursesModule,
    MulterModule.register({
      storage: diskStorage({
        destination: './uploads', // Directorio donde se guardarán temporalmente los archivos
        filename: (req, file, callback) => {
          const uniqueSuffix =
            Date.now() + '-' + Math.round(Math.random() * 1e9);
          callback(
            null,
            `${file.fieldname}-${uniqueSuffix}${extname(file.originalname)}`,
          );
        },
      }),
    }),
  ],

})
export class AppModule {}
