import { Controller, Get } from '@nestjs/common';
// import { AppService } from './app.service';
import { PrismaService } from './prisma/prisma.service';

@Controller()
export class AppController {
  constructor(private readonly prisma: PrismaService) {}

  @Get()
  getUsers() {
    return this.prisma.user.findMany();
  }
}
