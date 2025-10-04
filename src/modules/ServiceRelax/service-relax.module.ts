import { Module } from '@nestjs/common';
import { ServiceRelaxService } from './service-relax.service';
import { ServiceRelaxController } from './service-relax.controller';
import { PrismaModule } from '../../prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [ServiceRelaxController],
  providers: [ServiceRelaxService],
})
export class ServiceRelaxModule {}
