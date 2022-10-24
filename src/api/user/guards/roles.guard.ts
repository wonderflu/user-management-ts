import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Inject,
  Injectable,
  forwardRef,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Observable } from 'rxjs';
import { UserService } from 'src/api/user/user.service';
import { ExceptionMessage } from 'src/exceptions/message.exception';
import { ROLES_KEY } from '../decorators/roles.decorator';
import { Role } from '../role.enum';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(
    private reflector: Reflector, // чтобы получить роли из декоратора нужно заинджекстить класс рефлектор
    @Inject(forwardRef(() => UserService))
    private userService: UserService,
  ) {}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const requiredRoles = this.reflector.getAllAndOverride<Role[]>(ROLES_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);
    if (!requiredRoles) {
      return false;
    }
    const request = context.switchToHttp().getRequest();
    if (!request.session?.isAdmin)
      throw new ForbiddenException(ExceptionMessage.FORBIDDEN);
    return true;
  }
}
