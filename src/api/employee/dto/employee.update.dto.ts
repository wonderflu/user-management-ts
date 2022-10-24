import { OmitType, PartialType } from '@nestjs/swagger';
import { CreateEmployeeDto } from './employee.create.dto';

export class UpdateEmployeeDto extends PartialType(
  OmitType(CreateEmployeeDto, ['username'] as const),
) {}
