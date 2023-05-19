import { applyDecorators, SetMetadata, UseGuards } from '@nestjs/common';
import { RolesGuard } from '../guards/roles.guard';
import { ROLE } from '../interfaces/roles.interfaces';
import { AuthGuard } from '../guards/auth.guard';

/**
 * Decorator to allow specifying what roles are required to access specific resources.
 */
export const ROLES_KEY = 'roles';
export const Roles = (...roles: ROLE[]) => SetMetadata(ROLES_KEY, roles);

/**
 * Universal decorator which combines roles decorator and auth guard decorator functionalities.
 * @param roles
 * @constructor
 */
export const AuthRoles = (...roles: ROLE[]) => {
  return applyDecorators(Roles(...roles), UseGuards(AuthGuard, RolesGuard));
};
