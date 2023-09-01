import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './user.entity';
import { ParachuteUser } from '../parachute/parachute.user.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>,

    @InjectRepository(ParachuteUser)
    private readonly parachuteUserRepository: Repository<ParachuteUser>,
  ) {}

  create(createUserDto: CreateUserDto): Promise<User> {
    const user = new User();
    user.email = createUserDto.email;
    user.password = createUserDto.password;
    user.isActive = true;
    return this.usersRepository.save(user);
  }

  async findAll(): Promise<User[]> {
    return this.usersRepository.find();
  }

  findOne(id: number): Promise<User> {
    return this.usersRepository.findOneBy({ id: id });
  }

  async findOneByEmail(email: string): Promise<User | null> {
    return this.usersRepository.findOneBy({ email: email });
  }

  async remove(id: string) {
    await this.usersRepository.delete(id);
  }

  async addUserGeneralData(
    id: number,
    name: string,
    address: string,
    phone: string,
    birthDate: Date,
  ): Promise<any> {
    const user = new User();
    user.name = name;
    user.address = address;
    user.phone = phone;
    user.birthDate = birthDate;
    try {
      await this.usersRepository.update(id, user);
      return {
        success: true,
        message: 'General data added!',
      };
    } catch (err) {
      return {
        success: false,
        message: err,
      };
    }
  }

  async addUserType(id: number, userType: string): Promise<any> {
    const user = new User();
    user.userType = userType;
    try {
      await this.usersRepository.update(id, user);
      return {
        success: true,
        message: 'General data added!',
      };
    } catch (err) {
      return {
        success: false,
        message: err,
      };
    }
  }
}
