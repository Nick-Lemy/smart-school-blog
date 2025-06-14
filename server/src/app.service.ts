import { Injectable } from '@nestjs/common';
import { CreateUserDTO } from './dtos/create-user.dto';

@Injectable()
export class AppService {
  public users = [
    { name: 'Nick', age: 19 },
    { name: 'Christ', age: 17 },
  ];
  getUsers() {
    return this.users;
  }

  addUser(newUser: CreateUserDTO) {
    this.users.push(newUser);
    return newUser;
  }

  // updateUser(user: C)
}
