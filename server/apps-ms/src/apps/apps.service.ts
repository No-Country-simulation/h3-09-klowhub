import { HttpStatus, Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { CreateAppDto } from './dto/create-app.dto';
import { UpdateAppDto } from './dto/update-app.dto';
import { PrismaClient } from '@prisma/client';
import { RpcException } from '@nestjs/microservices';
import { PaginationDto } from 'src/common';
import { envs, storage } from 'src/config';
import { FiltersDto } from './dto/filters.dto';

@Injectable()
export class AppsService extends PrismaClient implements OnModuleInit {
  private readonly logger = new Logger('AppsService');
  private bucketName = envs.googleBucketName;

  async onModuleInit() {
    await this.$connect();
    this.logger.log('Connected to database');
  }
  create(createAppDto: CreateAppDto) {
    return this.app.create({ data: createAppDto });
  }
  async findAll(paginationDto: PaginationDto, filtersDto: FiltersDto) {
    const { page, limit } = paginationDto;
    const { orderPrice } = filtersDto;
  
    const where: any = { available: true };
  
    // Filtrar por funcionalidades
    if (filtersDto.functionalities && filtersDto.functionalities.length > 0) {
      where.functionalities = {
        hasEvery: filtersDto.functionalities,
      };
    }
  
    // Filtrar por idioma
    if (filtersDto.language) {
      where.language = filtersDto.language;
    }
  
    // Filtrar por sector
    if (filtersDto.sector && filtersDto.sector.length > 0) {
      where.sector = {
        hasEvery: filtersDto.sector,
      };
    }
  
    // Filtrar por herramientas y plataformas
    if (filtersDto.toolsAndPlatforms && filtersDto.toolsAndPlatforms.length > 0) {
      where.toolsAndPlatforms = {
        hasEvery: filtersDto.toolsAndPlatforms,
      };
    }
  
    // Filtrar por tipo de contenido
    if (filtersDto.contentType) {
      where.contentType = filtersDto.contentType;
    }
  
    // Filtrar por plataforma
    if (filtersDto.plataform) {
      where.plataform = filtersDto.plataform;
    }
  
    // Filtrar por nivel
    if (filtersDto.level) {
      where.level = filtersDto.level;
    }
  
    // Obtener el total de páginas con los filtros aplicados
    const totalPages = await this.app.count({ where });
    const lastPage = Math.ceil(totalPages / limit);
  
    // Validar si la página solicitada excede la última página
    if (page > lastPage) {
      throw new RpcException(
        `Page ${page} exceeds the last page number (${lastPage}).`,
      );
    }
  
    // Definir el orden del precio
    const orderBy = [];
    if (orderPrice) {
      orderBy.push({ price: orderPrice.toLowerCase() === 'asc' ? 'asc' : 'desc' });
    }
  
    // Retornar los datos paginados con los filtros y orden aplicados
    return {
      data: await this.app.findMany({
        skip: (page - 1) * limit,
        take: limit,
        where,
        orderBy,
      }),
      meta: {
        total: totalPages,
        page: page,
        lastPage: lastPage,
      },
    };
  }
  
  
  async findOne(id: string) {
    const app = await this.app.findFirst({
      where: { id: id, available: true },
    });
    if (!app) {
      throw new RpcException({
        status: HttpStatus.NOT_FOUND,
        message: `Aplication with id #${id} not found.`,
      });
    }
    return app;
  }

  async update(id: string, updateAppDto: UpdateAppDto) {
    await this.findOne(id);
    const { id: _, ...data } = updateAppDto;
    const app = await this.app.update({
      where: { id: id },
      data: data,
    });

    return app;
  }

  async remove(id: string) {
    await this.findOne(id);

    const app = await this.app.update({
      where: { id: id },
      data: { available: false },
    });

    return app;
  }

  async uploadFile(file: {
    buffer: Buffer;
    originalname: string;
    mimetype: string;
  }): Promise<string> {
    const bucket = storage.bucket(this.bucketName);
    const fileName = `${file.originalname}`;
    const blob = bucket.file(fileName);

    if (!Buffer.isBuffer(file.buffer)) {
      throw new RpcException({
        status: 400,
        message: 'The provided file buffer is not a valid Buffer',
      });
    }
    try {
      const [exists] = await bucket.file(fileName).exists();
      if (exists) {
        await blob.save(file.buffer, {
          metadata: { contentType: file.mimetype },
        });

        return `Archivo ${fileName} sobrescrito exitosamente.`;
      }

      await blob.save(file.buffer, {
        metadata: { contentType: file.mimetype },
      });

      return `Archivo ${fileName} subido exitosamente.`;
    } catch (error) {
      // Lanza una RpcException si algo sale mal
      throw new RpcException({
        status: 500,
        message: 'File upload failed: ' + error.message,
      });
    }
  }

  async downloadFile(fileName: string): Promise<Buffer> {
    const bucket = storage.bucket(this.bucketName);
    //Agregar la extensión de archivo
    const extension = 'rar'; // Suponer 'rar' por ahora
    const completeFileName = fileName.includes('.')
      ? fileName
      : `${fileName}.${extension}`;

    const file = bucket.file(completeFileName);
    //console.log(`Intentando descargar: ${completeFileName} del bucket ${this.bucketName}`,);
    try {
      const [exists] = await bucket.file(completeFileName).exists();
      if (!exists) {
        throw new RpcException({
          status: 404,
          message: `El archivo ${completeFileName} no existe en el bucket ${this.bucketName}.`,
        });
      }
      return new Promise((resolve, reject) => {
        const chunks: Buffer[] = [];
        file
          .createReadStream()
          .on('data', (chunk) => chunks.push(chunk))
          .on('end', () => resolve(Buffer.concat(chunks)))
          .on('error', (err) => {
            console.error(
              `Error al leer el archivo ${fileName} del bucket ${this.bucketName}: ${err.message}`,
            );
            reject(
              new RpcException({
                status: 500,
                message: `Error al leer el archivo ${fileName}: ${err.message}`,
              }),
            );
          });
      });
    } catch (error) {
      console.error(
        `Fallo en la descarga del archivo ${fileName} del bucket ${this.bucketName}: ${error.message}`,
      );
      throw new RpcException({
        status: error.code || 500,
        message: 'File download failed: ' + error.message,
      });
    }
  }
}
