import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsNotEmpty, IsString, Length } from 'class-validator';
import { Role } from '../role.enum';

export class CreateUserDto {
  @ApiProperty({
    description: 'User Roles',
    enum: Role,
  })
  @IsEnum(Role)
  readonly role: Role;

  @ApiProperty({ description: 'Username' })
  @IsString()
  @IsNotEmpty({ message: 'This field cannot be empty' })
  @Length(3, 15, {
    message:
      'The username must be at least 3 but not longer than 15 characters',
  })
  readonly username: string;

  @ApiProperty({ description: 'Password' })
  @IsString()
  @IsNotEmpty({ message: 'This field cannot be empty' })
  @Length(5, 10, {
    message:
      'The password must be at least 5 but not longer than 10 characters',
  })
  readonly password: string;
}
