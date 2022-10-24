import { SetMetadata } from '@nestjs/common';
import { Role } from '../role.enum';

export const ROLES_KEY = 'roles'; // по этому ключу мы сможем получать метаданные внутри гарда

export const Roles = (...roles: Role[]) => SetMetadata(ROLES_KEY, roles); // параметром принимает массив ролей, в сетмэтадэйта передаем ключ и массив ролей
