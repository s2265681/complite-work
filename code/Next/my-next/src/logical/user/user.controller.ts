// import { Controller } from '@nestjs/common';
import { Controller, Post, Body,Get } from '@nestjs/common';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
    constructor(private readonly usersService: UserService) {}
    @Post('getUser')
    findOne(@Body() body: any) {
      return this.usersService.getUser(body.username)
    }
}
