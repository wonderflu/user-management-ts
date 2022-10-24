import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Employee } from './entities/employee.entity';
import { EmployeeController } from './employee.controller';
import { EmployeeService } from './employee.service';
import { UserService } from '../user/user.service';

@Module({
  imports: [TypeOrmModule.forFeature([Employee])],
  controllers: [EmployeeController],
  providers: [EmployeeService, UserService],
})
export class EmployeeModule {}
