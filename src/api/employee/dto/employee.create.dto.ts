import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsEmail, IsInt, IsNotEmpty, IsString, Length } from 'class-validator';

export class CreateEmployeeDto {
  @ApiProperty({ example: 'EmployeeOne', description: 'Employee username' })
  @IsString()
  @IsNotEmpty({ message: 'This field cannot be empty' })
  @Length(3, 15, {
    message:
      'The username must be at least 3 but not longer than 15 characters',
  })
  readonly username: string;

  @ApiProperty({
    example: 'employee@mail.com',
    description: 'Employee email',
  })
  @IsString()
  @IsNotEmpty({ message: 'This field cannot be empty' })
  @IsEmail({}, { message: 'Incorrect email' })
  email: string;

  @ApiProperty({
    example: 'John',
    description: 'Employee First Name',
  })
  @IsString()
  @IsNotEmpty({ message: 'This field cannot be empty' })
  @Length(1, 20, {
    message:
      'The First Name must be at least 1 but not longer than 20 characters',
  })
  firstName: string;

  @ApiProperty({
    example: 'Doe',
    description: 'Employee Last Name',
  })
  @IsString()
  @IsNotEmpty({ message: 'This field cannot be empty' })
  @Length(1, 20, {
    message:
      'The Last Name must be at least 1 but not longer than 20 characters',
  })
  lastName: string;

  @ApiProperty({
    example: '1',
    description: 'Department ID',
  })
  @Type(() => Number)
  @IsNotEmpty({ message: 'This field cannot be empty' })
  @IsInt()
  readonly department: number;
}
