import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { Prisma } from '@prisma/client';
import { CreateExpertDto } from './dto/create-expert.dto';
import { UpdateExpertDto } from './dto/update-expert.dto';

@Injectable()
export class ExpertService {
  constructor(private readonly prisma: PrismaService) {}

  async create(dto: CreateExpertDto) {
    return this.prisma.expert.create({
      data: {
        name: dto.name,
        description: dto.description,
        exp: dto.exp,
        rank: dto.rank,
        phoneNumber: dto.phoneNumber,
        email: dto.email,
        image: dto.image,
        skills: dto.skills as unknown as Prisma.InputJsonValue, // ✅ ép kiểu an toàn
      },
    });
  }

  async findAll() {
    return this.prisma.expert.findMany();
  }

  async findOne(id: string) {
    const expert = await this.prisma.expert.findUnique({
      where: { id },
    });

    if (!expert) {
      throw new NotFoundException('Expert not found');
    }

    return expert;
  }

  async update(id: string, dto: UpdateExpertDto) {
    await this.findOne(id); // kiểm tra tồn tại

    return this.prisma.expert.update({
      where: { id },
      data: {
        name: dto.name,
        description: dto.description,
        exp: dto.exp,
        rank: dto.rank,
        phoneNumber: dto.phoneNumber,
        email: dto.email,
        image: dto.image,
        skills: dto.skills as unknown as Prisma.InputJsonValue, // ✅ ép kiểu an toàn
      },
    });
  }

  async remove(id: string) {
    await this.findOne(id);
    return this.prisma.expert.delete({ where: { id } });
  }
}
