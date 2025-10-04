// src/prisma/prisma.module.ts

import { Global, Module } from '@nestjs/common';
import { PrismaService } from './prisma.service';

@Global() // Giúp tự động dùng được ở toàn bộ app, không cần import từng module
@Module({
  providers: [PrismaService],
  exports: [PrismaService],
})
export class PrismaModule {}
