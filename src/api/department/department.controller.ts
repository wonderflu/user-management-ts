import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiCreatedResponse,
  ApiForbiddenResponse,
  ApiNoContentResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { ApiPaginatedResponse } from 'src/pagination/decorators/swagger.decorator';
import { PageDto } from 'src/pagination/dto/page.dto';
import { PageOptionsDto } from 'src/pagination/dto/page.options.dto';
import { Roles } from '../user/decorators/roles.decorator';
import { AuthGuard } from '../user/guards/auth.guard';
import { RolesGuard } from '../user/guards/roles.guard';
import { Role } from '../user/role.enum';
import { DepartmentService } from './department.service';
import { CreateDepartmentDto, UpdateDepartmentDto } from './dto';
import { Department } from './entities/department.entity';

@ApiTags('Departments')
@Controller('api/v2/departments')
@UseGuards(AuthGuard)
export class DepartmentController {
  constructor(private readonly departmentService: DepartmentService) {}

  @ApiOperation({ summary: 'Creating New Department' })
  @Post()
  @ApiCreatedResponse({
    description: 'The Department has been successfully created',
    type: Department,
  })
  @ApiForbiddenResponse({
    description: 'You do not have permission to access this resource',
  })
  @ApiBadRequestResponse({
    description: 'The Department with the specified name already exists',
  })
  @ApiUnauthorizedResponse({
    description: 'User is not authorized',
  })
  @UseGuards(RolesGuard)
  @Roles(Role.ADMIN) // basically it does nothing itself, to make it work we should use RolesGuard as well
  createNewDepartment(
    @Body() createDepartmentDto: CreateDepartmentDto,
  ): Promise<Department> {
    return this.departmentService.createNewDepartment(createDepartmentDto);
  }

  @ApiOperation({ summary: 'Getting All Departments' })
  @Get()
  @ApiPaginatedResponse(Department)
  @ApiUnauthorizedResponse({
    description: 'User is not authorized',
  })
  getDepartments(
    @Query() pageOptionsDto: PageOptionsDto,
  ): Promise<PageDto<Department>> {
    return this.departmentService.getDepartments(pageOptionsDto);
  }

  @ApiOperation({ summary: 'Getting One Department By ID' })
  @Get(':id')
  @ApiOkResponse({ type: Department })
  @ApiUnauthorizedResponse({
    description: 'User is not authorized',
  })
  getDepartmentByID(@Param('id') id: number): Promise<Department> {
    return this.departmentService.getDepartmentByID(id);
  }

  @ApiOperation({ summary: 'Getting Employee List By Department ID' })
  @Get(':id/employees')
  @ApiOkResponse({ type: Department })
  @ApiUnauthorizedResponse({
    description: 'User is not authorized',
  })
  getEmployeesByDepartmentID(@Param('id') id: number): Promise<Department> {
    return this.departmentService.getEmployeesByDepartmentID(id);
  }

  @ApiOperation({ summary: 'Updating Department Description By Department ID' })
  @Patch(':id')
  @ApiOkResponse({ type: Department })
  @ApiForbiddenResponse({
    description: 'You do not have permission to access this resource',
  })
  @ApiUnauthorizedResponse({
    description: 'User is not authorized',
  })
  @Roles(Role.ADMIN)
  @UseGuards(RolesGuard)
  updateDepartmentByID(
    @Param('id') id: number,
    @Body() updateDepartmentDto: UpdateDepartmentDto,
  ): Promise<Department> {
    return this.departmentService.updateDepartmentByID(id, updateDepartmentDto);
  }

  @ApiOperation({ summary: 'Deleting One Department By Department ID' })
  @Delete(':id')
  @ApiNoContentResponse({
    description: 'The Department has been successfully removed',
  })
  @ApiForbiddenResponse({
    description: 'You do not have permission to access this resource',
  })
  @ApiUnauthorizedResponse({
    description: 'User is not authorized',
  })
  @Roles(Role.ADMIN)
  @UseGuards(RolesGuard)
  deleteDepartmentByID(@Param('id') id: number): Promise<void> {
    return this.departmentService.deleteDepartmentByID(id);
  }
}
