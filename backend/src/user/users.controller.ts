import { Body, Controller, Get, Post } from '@nestjs/common';
import { User } from './user.entity';
import { UsersService } from './users.service';

@Controller()
export class UsersController {
  constructor(private readonly usersService: UsersService) {}
  @Get('/get-users')
  findAll(): Promise<User[]> {
    return this.usersService.findAll();
  }

  @Post('/add-user-data')
  async addUserData(@Body() data): Promise<any> {
    return this.usersService.addUserGeneralData(
      data.userId,
      data.name,
      data.address,
      data.phone,
      data.birthDate,
    );
  }

  @Post('/add-user-type')
  async addUserType(@Body() data): Promise<any> {
    return this.usersService.addUserType(data.userId, data.userType);
  }
}
