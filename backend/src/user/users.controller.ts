import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  ParseIntPipe,
  Request,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './user.entity';
import { UsersService } from './users.service';

@Controller('')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  create(@Body() createUserDto: CreateUserDto): Promise<User> {
    return this.usersService.create(createUserDto);
  }

  @Get()
  findAll(): Promise<User[]> {
    return this.usersService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number): Promise<User> {
    return this.usersService.findOne(id);
  }

  @Delete(':id')
  remove(@Param('id') id: string): Promise<void> {
    return this.usersService.remove(id);
  }

  @Post('/add-user-data')
  async addUserData(@Request() req): Promise<any> {
    return this.usersService.addUserGeneralData(
      1,
      req.body.name,
      req.body.address,
      req.body.phone,
      req.body.birthDate,
    );
  }

  @Post('/add-user-type')
  async addUserType(@Request() req): Promise<any> {
    return this.usersService.addUserType(1, req.body.userType);
  }
}
