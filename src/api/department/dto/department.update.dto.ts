import { OmitType, PartialType } from '@nestjs/swagger';
import { CreateDepartmentDto } from './department.create.dto';

export class UpdateDepartmentDto extends PartialType(
  // create a type with the same fields, but with each one optional
  OmitType(CreateDepartmentDto, ['name'] as const),
) {}

// We can generate a derived type that has every property exceptname as shown below. In this construct, the second argument to OmitType is an array of property names.
