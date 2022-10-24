import { Injectable, UnauthorizedException } from '@nestjs/common';
import { EntityManager, EntityNotFoundError, getConnection } from 'typeorm';
import * as bcrypt from 'bcryptjs';
import { LoginDto } from './dto/user.login.dto';
import { User } from './entities/user.entity';
import { ExceptionMessage } from 'src/exceptions/message.exception';

@Injectable()
export class UserService {
  login(loginDto: LoginDto): Promise<User> {
    return this.validateUser(loginDto);
  }

  async validateUser(loginDto: LoginDto): Promise<User> {
    const { username, password } = loginDto;
    let foundUser = null;
    try {
      foundUser = await this.findByUsername(username);
    } catch (error) {
      if (error instanceof EntityNotFoundError) {
        throw new UnauthorizedException(ExceptionMessage.INVALID_USERNAME);
      }
      throw new error();
    }
    const verifiedPassword = await bcrypt.compare(password, foundUser.password);
    if (!verifiedPassword) {
      throw new UnauthorizedException(ExceptionMessage.INVALID_PASSWORD);
    }
    return foundUser;
  }

  findById(id: number): Promise<User> {
    return getConnection().transaction((entityManager: EntityManager) => {
      return entityManager.findOneOrFail(User, id);
    });
  }

  findByUsername(username: string): Promise<User> {
    return getConnection().transaction((entityManager: EntityManager) => {
      return entityManager.findOneOrFail(User, {
        username,
      });
    });
  }
}
