import { EntityManager, getConnection } from 'typeorm';
import * as bcrypt from 'bcryptjs';
import { User } from 'src/api/user/entities/user.entity';
import { Role } from 'src/api/user/role.enum';
import { Logger } from '@nestjs/common';
import { IApplicationInitializer } from './application.initializer';

export class DatabaseInitializer implements IApplicationInitializer {
  private logger = new Logger(DatabaseInitializer.name);

  initialize(): Promise<void> {
    return getConnection().transaction(async (entityManager: EntityManager) => {
      const userCount = await entityManager.count(User);
      if (!userCount) {
        const user = new User();
        user.role = Role.USER;
        user.username = 'User';
        user.password = await bcrypt.hash('danger', process.env.SALT);
        this.logger.log(
          `role: ${user.role} username: ${user.username} password: ${user.password}`,
        );
        await entityManager.save(user);

        const admin = new User();
        admin.role = Role.ADMIN;
        admin.username = 'Admin';
        admin.password = await bcrypt.hash('danger', process.env.SALT);
        this.logger.log(
          `role: ${admin.role} username: ${admin.username} password: ${admin.password}`,
        );
        await entityManager.save(admin);
      }
    });
  }
}
