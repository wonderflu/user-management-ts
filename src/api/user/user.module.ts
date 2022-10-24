import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { RolesGuard } from 'src/api/user/guards/roles.guard';

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  providers: [UserService, RolesGuard],
  controllers: [UserController],
  exports: [UserService],
})
export class UserModule {}
