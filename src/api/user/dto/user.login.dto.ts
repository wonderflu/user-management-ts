import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, Length } from 'class-validator';

export class LoginDto {
  @ApiProperty({ description: 'Username' })
  @IsString()
  @IsNotEmpty({ message: 'The username is required' })
  @Length(3, 15, {
    message:
      'The username must be at least 3 but not longer than 15 characters',
  })
  username: string;

  @ApiProperty({ description: 'Password' })
  @IsString()
  @IsNotEmpty({ message: 'The password is required' })
  @Length(5, 10, {
    message:
      'The password must be at least 5 but not longer than 10 characters',
  })
  password: string;
}
