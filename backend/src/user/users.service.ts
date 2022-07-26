import {Injectable} from '@nestjs/common';
import {InjectRepository} from '@nestjs/typeorm';
import {Repository} from 'typeorm';
import {CreateUserDto} from './dto/create-user.dto';
import {User} from './user.entity';

@Injectable()
export class UsersService {
    constructor(
        @InjectRepository(User)
        private readonly usersRepository: Repository<User>,
    ) {
    }

    create(createUserDto: CreateUserDto): Promise<User> {
        const user = new User();
        user.name = createUserDto.name;
        user.phone = createUserDto.phone;
        user.email = createUserDto.email;
        user.password = createUserDto.password;
        user.address = createUserDto.address;
        user.birthDate = createUserDto.birthDate;
        user.userType = createUserDto.userType;
        user.license = createUserDto.license;
        user.emergencyContact = createUserDto.emergencyContact;
        user.parachute = createUserDto.parachute;
        user.isActive = createUserDto.isActive;

        return this.usersRepository.save(user);
    }

    async findAll(): Promise<User[]> {
        return this.usersRepository.find();
    }

    findOne(id: number): Promise<User> {
        return this.usersRepository.findOneBy({id: id});
    }

    async remove(id: string): Promise<void> {
        await this.usersRepository.delete(id);
    }
}