import { Module } from '@nestjs/common';
import { ExpertService } from './expert.service';
import { ExpertController } from './expert.controller';
import { PrismaModule } from '../../prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [ExpertController],
  providers: [ExpertService],
})
export class ExpertModule {}
