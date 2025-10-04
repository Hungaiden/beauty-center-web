import { PartialType } from '@nestjs/mapped-types';
import { CreateServiceRelaxDto } from './create-service-relax.dto';

export class UpdateServiceRelaxDto extends PartialType(CreateServiceRelaxDto) {}
