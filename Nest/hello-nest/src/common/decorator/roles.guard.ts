import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const roles = this.reflector.get<string[]>('roles', context.getHandler());
    if (!roles) {
      return true;
    }
    const request = context.switchToHttp().getRequest();
    console.log(request.body, 'sss');
    const user = request.user; // 在 node.js 世界中，将授权用户附加到 request 对象是一种常见的做法,您可能会在自定义身份验证（或中间件）中建立该关联。
    // return matchRoles(roles, user.roles); // 该示例的重点是显示防护如何适应请求/响应周期。
    // console.log(user, 'user...');
    return true;
  }
}
