import { Body, Controller, Get, Post } from '@nestjs/common';
import { AppService } from './app.service';
import { CreateUserDTO } from './dtos/create-user.dto';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello() {
    return this.appService.getUsers();
  }

  @Post()
  addUser(@Body() dto: CreateUserDTO) {
    return this.appService.addUser(dto);
  }
}
