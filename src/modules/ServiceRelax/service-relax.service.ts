import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { CreateServiceRelaxDto } from './dto/create-service-relax.dto';
import { UpdateServiceRelaxDto } from './dto/update-service-relax.dto';

@Injectable()
export class ServiceRelaxService {
  constructor(private readonly prisma: PrismaService) {}

  create(dto: CreateServiceRelaxDto) {
    return this.prisma.serviceRelax.create({ data: dto });
  }

  findAll(keyword?: string, category?: string) {
    return this.prisma.serviceRelax.findMany({
      where: {
        AND: [
          keyword ? { title: { contains: keyword, mode: 'insensitive' } } : {},
          category ? { category: category } : {},
        ],
      },
    });
  }

  async findOne(id: string) {
    const service = await this.prisma.serviceRelax.findUnique({ where: { id } });
    if (!service) throw new NotFoundException('Service not found');
    return service;
  }

  update(id: string, dto: UpdateServiceRelaxDto) {
    return this.prisma.serviceRelax.update({ where: { id }, data: dto });
  }

  remove(id: string) {
    return this.prisma.serviceRelax.delete({ where: { id } });
  }
}
