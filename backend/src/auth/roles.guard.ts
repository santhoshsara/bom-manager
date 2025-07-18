import {
  Injectable,
  CanActivate,
  ExecutionContext,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const requiredRoles = this.reflector.get<string[]>(
      'roles',
      context.getHandler()
    ) || this.reflector.get<string[]>(
      'roles',
      context.getClass()
    );
    const { user } = context.switchToHttp().getRequest();
    if (!requiredRoles) return true;
    return requiredRoles.includes(user.role);
  }
}
