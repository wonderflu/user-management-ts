import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
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
import { Roles } from '../user/decorators/roles.decorator';
import { AuthGuard } from '../user/guards/auth.guard';
import { RolesGuard } from '../user/guards/roles.guard';
import { Role } from '../user/role.enum';
import { CreateEmployeeDto, UpdateEmployeeDto } from './dto';
import { EmployeeService } from './employee.service';
import { Employee } from './entities/employee.entity';

@ApiTags('Employees')
@Controller('api/v2/employees')
@UseGuards(AuthGuard)
export class EmployeeController {
  constructor(private readonly employeeService: EmployeeService) {}

  @ApiOperation({ summary: 'Creating New Employee' })
  @Post()
  @ApiCreatedResponse({
    description: 'The Employee has been successfully created',
    type: Employee,
  })
  @ApiForbiddenResponse({
    description: 'You do not have permission to access this resource',
  })
  @ApiBadRequestResponse({
    description: 'The Employee with the specified username already exists',
  })
  @ApiUnauthorizedResponse({
    description: 'User is not authorized',
  })
  @Roles(Role.ADMIN)
  @UseGuards(RolesGuard)
  createNewEmployee(
    @Body() createEmployeeDto: CreateEmployeeDto,
  ): Promise<Employee> {
    return this.employeeService.createNewEmployee(createEmployeeDto);
  }

  @ApiOperation({ summary: 'Getting One Employee By ID' })
  @Get(':id')
  @ApiOkResponse({ type: Employee })
  @ApiUnauthorizedResponse({
    description: 'User is not authorized',
  })
  getEmployeeByID(@Param('id') id: number): Promise<Employee> {
    return this.employeeService.getEmployeeByID(id);
  }

  @ApiOperation({ summary: 'Updating Employee By Employee ID' })
  @Patch(':id')
  @ApiOkResponse({ type: Employee })
  @ApiForbiddenResponse({
    description: 'You do not have permission to access this resource',
  })
  @ApiUnauthorizedResponse({
    description: 'User is not authorized',
  })
  @Roles(Role.ADMIN)
  @UseGuards(RolesGuard)
  updateEmployeeByID(
    @Param('id') id: number,
    @Body() updateEmployeeDto: UpdateEmployeeDto,
  ): Promise<Employee> {
    return this.employeeService.updateEmployeeByID(id, updateEmployeeDto);
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
  deleteEmployeeByID(@Param('id') id: number): Promise<void> {
    return this.employeeService.deleteEmployeeByID(id);
  }
}
