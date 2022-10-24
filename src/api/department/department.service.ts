import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ExceptionMessage } from 'src/exceptions/message.exception';
import { PageDto } from 'src/pagination/dto/page.dto';
import { PageMetaDto } from 'src/pagination/dto/page.meta';
import { PageOptionsDto } from 'src/pagination/dto/page.options.dto';
import { EntityManager, Repository, getConnection } from 'typeorm';
import { Employee } from '../employee/entities/employee.entity';
import { CreateDepartmentDto, UpdateDepartmentDto } from './dto';
import { Department } from './entities/department.entity';

@Injectable()
export class DepartmentService {
  constructor(
    @InjectRepository(Department)
    private readonly departmentRepository: Repository<Department>,
  ) {}

  createNewDepartment(
    createDepartmentDto: CreateDepartmentDto,
  ): Promise<Department> {
    const { name } = createDepartmentDto;
    return getConnection().transaction(async (entityManager: EntityManager) => {
      const duplicate = await entityManager.count(Department, {
        name,
      });
      if (duplicate) {
        throw new BadRequestException(
          ExceptionMessage.DUPLICATE_DEPARTMENT_NAME,
        );
      }
      const department = Object.assign(new Department(), createDepartmentDto); // copy the values of all of the enumerable own properties from one or more source objects to a target object. returns the target object
      return entityManager.save(department);
    });
  }

  async getDepartments(
    pageOptionsDto: PageOptionsDto,
  ): Promise<PageDto<Department>> {
    const queryBuilder =
      this.departmentRepository.createQueryBuilder('department');

    queryBuilder
      .orderBy('department.name', pageOptionsDto.sort)
      .skip(pageOptionsDto.skip)
      .limit(pageOptionsDto.limit);
    if (pageOptionsDto.search) {
      queryBuilder.where('department.name LIKE :name', {
        name: `%${pageOptionsDto.search}%`,
      });
    }

    const total = await queryBuilder.getCount();
    const { entities } = await queryBuilder.getRawAndEntities();

    const pageMetaDto = new PageMetaDto({ total, pageOptionsDto });

    return new PageDto(entities, pageMetaDto);
  }

  getDepartmentByID(id: number): Promise<Department> {
    return getConnection().transaction((entityManager: EntityManager) => {
      return entityManager.findOneOrFail(Department, id);
    });
  }

  getEmployeesByDepartmentID(id: number): Promise<Department> {
    return getConnection().transaction((entityManager: EntityManager) => {
      return entityManager.findOneOrFail(Department, id, {
        relations: ['employees'],
      });
    });
  }

  updateDepartmentByID(
    id: number,
    updateDepartmentDto: UpdateDepartmentDto,
  ): Promise<Department> {
    return getConnection().transaction(async (entityManager: EntityManager) => {
      const department = await this.getDepartmentByID(id);

      Object.assign(department, updateDepartmentDto);
      return entityManager.save(department);
    });
  }

  deleteDepartmentByID(id: number): Promise<void> {
    return getConnection().transaction(async (entityManager: EntityManager) => {
      const employeesInDepartment = await entityManager.count(Employee, {
        where: { department: id },
      });
      if (employeesInDepartment) {
        throw new BadRequestException(ExceptionMessage.NOT_EMPTY_DEPARTMENT);
      }

      await entityManager.delete(Department, id);
    });
  }
}
