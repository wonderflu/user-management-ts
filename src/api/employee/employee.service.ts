import { BadRequestException, Injectable } from '@nestjs/common';
import { ExceptionMessage } from 'src/exceptions/message.exception';
import { EntityManager, Not, getConnection } from 'typeorm';
import { Department } from '../department/entities/department.entity';
import { CreateEmployeeDto, UpdateEmployeeDto } from './dto';
import { Employee } from './entities/employee.entity';

@Injectable()
export class EmployeeService {
  createNewEmployee(createEmployeeDto: CreateEmployeeDto): Promise<Employee> {
    const { username, email, department } = createEmployeeDto;

    return getConnection().transaction(async (entityManager: EntityManager) => {
      const duplicateUsername = await entityManager.count(Employee, {
        where: [{ username }],
      });
      if (duplicateUsername) {
        throw new BadRequestException(
          ExceptionMessage.DUPLICATE_EMPLOYEE_USERNAME,
        );
      }
      const duplicateEmail = await entityManager.count(Employee, {
        where: [{ email }],
      });
      if (duplicateEmail) {
        throw new BadRequestException(ExceptionMessage.DUPLICATE_EMAIL);
      }
      const departmentCount = await entityManager.count(Employee, {
        where: { id: department },
      });
      if (!departmentCount) {
        throw new BadRequestException(ExceptionMessage.INVALID_DEPARTMENT_ID);
      }
      const employee = Object.assign(new Employee(), createEmployeeDto);
      return entityManager.save(employee);
    });
  }

  getEmployeeByID(id: number): Promise<Employee> {
    return getConnection().transaction((entityManager: EntityManager) => {
      return entityManager.findOneOrFail(Employee, id);
    });
  }
  updateEmployeeByID(
    id: number,
    updateEmployeeDto: UpdateEmployeeDto,
  ): Promise<Employee> {
    const { email, department } = updateEmployeeDto;
    return getConnection().transaction(async (entityManager: EntityManager) => {
      const employee = await this.getEmployeeByID(id);
      const duplicateEmail = await entityManager.count(Employee, {
        where: { id: Not(id), email },
      });
      if (duplicateEmail) {
        throw new BadRequestException(ExceptionMessage.DUPLICATE_EMAIL);
      }
      if (department) {
        const departmentCount = await entityManager.count(Department, {
          where: { id: department },
        });
        if (!departmentCount) {
          throw new BadRequestException(ExceptionMessage.INVALID_DEPARTMENT_ID);
        }
      }
      Object.assign(employee, updateEmployeeDto);
      return entityManager.save(employee);
    });
  }
  deleteEmployeeByID(id: number): Promise<void> {
    return getConnection().transaction(async (entityManager: EntityManager) => {
      await entityManager.delete(Employee, id);
    });
  }
}
