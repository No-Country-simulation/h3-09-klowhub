import { HttpStatus, Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { CreateAppDto } from './dto/create-app.dto';
import { UpdateAppDto } from './dto/update-app.dto';
import { PrismaClient } from '@prisma/client';
import { RpcException } from '@nestjs/microservices';
import { PaginationDto } from 'src/common';

@Injectable()
export class AppsService extends PrismaClient implements OnModuleInit {
  private readonly logger = new Logger('AppsService');

  async onModuleInit() {
    await this.$connect();
    this.logger.log('Connected to database');
  }
  create(createAppDto: CreateAppDto) {
    return this.app.create({ data: createAppDto });
  }

  async findAll(paginationDto: PaginationDto) {
    const { page, limit } = paginationDto;
    const totalPages = await this.app.count({ where: { available: true } });
    const lastPage = Math.ceil(totalPages / limit);
    if (page > lastPage) {
      throw new RpcException(
        `Page ${page} exceeds the last page number (${lastPage}).`,
      );
    }
    return {
      data: await this.app.findMany({
        skip: (page - 1) * limit,
        take: limit,
        where: { available: true },
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
}
