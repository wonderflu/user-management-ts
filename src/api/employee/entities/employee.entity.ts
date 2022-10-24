import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { Department } from 'src/api/department/entities/department.entity';

@Entity({ name: 'employee' })
export class Employee {
  @ApiProperty({ example: '1', description: 'Primary Key' })
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({ example: 'EmployeeOne', description: 'Employee username' })
  @Column({
    name: 'username',
    type: 'varchar',
    length: 15,
    unique: true,
    update: false,
    nullable: false,
  })
  username: string;

  @ApiProperty({
    example: 'employee@mail.com',
    description: 'Employee email',
  })
  @Column({
    name: 'email',
    type: 'varchar',
    length: 30,
    unique: true,
    nullable: false,
  })
  email: string;

  @ApiProperty({
    example: 'John',
    description: 'Employee First Name',
  })
  @Column({
    name: 'firstName',
    type: 'varchar',
    length: 20,
    nullable: false,
  })
  firstName: string;

  @ApiProperty({
    example: 'Doe',
    description: 'Employee Last Name',
  })
  @Column({
    name: 'lastName',
    type: 'varchar',
    length: 20,
    nullable: false,
  })
  lastName: string;

  @CreateDateColumn({
    name: 'createdAt',
    type: 'timestamp',
  })
  createdAt: Date;

  @UpdateDateColumn({
    name: 'updatedAt',
    type: 'timestamp',
  })
  updatedAt: Date;

  @ManyToOne(() => Department, (department) => department.id, {
    nullable: false,
    onDelete: 'RESTRICT',
  })
  @JoinColumn({ name: 'departmentID' })
  department: Department;
}
