import { Body, Controller, Get, Post, Session } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { Session as SessionData } from 'express-session';
import { LoginDto } from './dto/user.login.dto';
import { User } from './entities/user.entity';
import { UserService } from './user.service';

@ApiTags('Authorization')
@Controller('api/v2/')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @ApiOperation({ summary: 'Log in' })
  @Post('login')
  async login(
    @Session() session: SessionData,
    @Body() loginDto: LoginDto,
  ): Promise<void | User> {
    const foundUser = await this.userService.login(loginDto);
    return this.updateSession(session, foundUser);
  }

  @ApiOperation({ summary: 'Log out' })
  @Get('logout')
  logout(@Session() session: SessionData): Promise<void> {
    return new Promise<void>((resolve, reject) => {
      session.destroy((error: Error) => {
        if (error) reject(error);
        resolve();
      });
    });
  }

  private updateSession(session: SessionData, foundUser: User): void {
    session.user = foundUser.username;
    session.isAuthenticated = true;
    session.isAdmin = foundUser.role === 'ADMIN';
  }
}
