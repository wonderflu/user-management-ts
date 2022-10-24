import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, Length } from 'class-validator';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { Role } from '../role.enum';

@Entity({ name: 'user' })
export class User {
  @ApiProperty({ example: '1', description: 'Primary Key' })
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({ description: 'Role', enum: Role })
  @Column({
    name: 'role',
    type: 'enum',
    enum: Role,
    default: Role.USER,
  })
  role: Role;

  @ApiProperty({ description: 'Username' })
  @Column({
    name: 'username',
    type: 'varchar',
    length: 15,
    unique: true,
    update: false,
    nullable: false,
  })
  @IsNotEmpty({ message: 'The username is required' })
  @Length(3, 15, {
    message:
      'The username must be at least 3 but not longer than 15 characters',
  })
  username: string;

  @ApiProperty({ description: 'Password' })
  @Column({
    name: 'password',
    type: 'varchar',
    length: 200,
    nullable: false,
  })
  @IsNotEmpty({ message: 'The password is required' })
  @Length(5, 10, {
    message:
      'The password must be at least 5 but not longer than 10 characters',
  })
  password: string;
}
