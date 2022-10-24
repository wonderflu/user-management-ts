import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import config from 'src/resources/config';
import { DepartmentModule } from './api/department/department.module';
import { EmployeeModule } from './api/employee/employee.module';
import { UserModule } from './api/user/user.module';
import { APP_FILTER, APP_PIPE } from '@nestjs/core';
import { ValidationPipe } from './pipes/validation.pipe';
import { EntityNotFoundExceptionFilter } from './exceptions/filter.exception';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [config],
      isGlobal: true,
    }),
    TypeOrmModule.forRootAsync({
      useFactory: (configService: ConfigService) => ({
        type: 'mysql',
        host: configService.get<string>('db.host'),
        port: configService.get<number>('db.port'),
        username: configService.get<string>('db.username'),
        password: configService.get<string>('db.password'),
        database: configService.get<string>('db.name'),
        autoLoadEntities: true,
        synchronize: true, // false > migration if production
      }),
      inject: [ConfigService],
    }),
    DepartmentModule,
    EmployeeModule,
    UserModule,
  ],
  providers: [
    {
      provide: APP_FILTER, // app.useGlobalFilters(new HttpExceptionFilter()) in main.ts - Global-scoped filters are used across the whole application, for every controller and every route handler. In terms of dependency injection, global filters registered from outside of any module (with useGlobalFilters() as in the example above) cannot inject dependencies since this is done outside the context of any module. In order to solve this issue, you can register a global-scoped filter directly from any module using the following construction
      useClass: EntityNotFoundExceptionFilter,
    },
    {
      provide: APP_PIPE,
      useValue: new ValidationPipe(),
    },
  ],
})
export class AppModule {}
