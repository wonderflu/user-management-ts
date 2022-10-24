import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, Length } from 'class-validator';

export class CreateDepartmentDto {
  @ApiProperty({ example: 'SoftServe', description: 'Department name' })
  @IsString()
  @IsNotEmpty({ message: 'This field cannot be empty' })
  @Length(2, 50, {
    message: 'The name must be at least 2 but not longer than 50 characters',
  })
  readonly name: string;

  @ApiProperty({
    example:
      'SoftServe, Inc., founded in 1993 in Lviv, Ukraine, is a technology company specializing in consultancy services and software development. SoftServe provides services in the fields of big data, Internet of things, cloud computing, DevOps, e-commerce, computer security, experience design, and health care',
    description: 'Department description',
  })
  @IsString()
  @IsNotEmpty({ message: 'This field cannot be empty' })
  @Length(5, 250, {
    message:
      'The description must be at least 5 but not longer than 250 characters',
  })
  description: string;
}
