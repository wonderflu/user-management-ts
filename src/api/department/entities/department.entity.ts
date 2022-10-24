import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { Employee } from 'src/api/employee/entities/employee.entity';

@Entity({ name: 'department' })
export class Department {
  @ApiProperty({ example: '1', description: 'Primary Key' })
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({ example: 'SoftServe', description: 'Department name' })
  @Column({
    name: 'name',
    type: 'varchar',
    length: 50,
    unique: true,
    update: false,
    nullable: false,
  })
  name: string;

  @ApiProperty({
    example:
      'SoftServe, Inc., founded in 1993 in Lviv, Ukraine, is a technology company specializing in consultancy services and software development. SoftServe provides services in the fields of big data, Internet of things, cloud computing, DevOps, e-commerce, computer security, experience design, and health care',
    description: 'Department description',
  })
  @Column({
    name: 'description',
    type: 'varchar',
    length: 250,
    nullable: false,
  })
  description: string;

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

  @OneToMany(() => Employee, (employee) => employee.department)
  employees: Employee[];
}
