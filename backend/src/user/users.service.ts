import {Injectable} from '@nestjs/common';
import {InjectRepository} from '@nestjs/typeorm';
import {Repository} from 'typeorm';
import {CreateUserDto} from './dto/create-user.dto';
import {User} from './user.entity';

@Injectable()
export class UsersService {
    private readonly users = [
        {
            userId: 1,
            email: 'john',
            password: 'changeme',
        },
        {
            userId: 2,
            email: 'maria',
            password: 'guess',
        },
    ];

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
        user.isActive = createUserDto.isActive;

        return this.usersRepository.save(user);
    }

    async findAll(): Promise<User[]> {
        return this.usersRepository.find();
    }

    findOne(id: number): Promise<User> {
        return this.usersRepository.findOneBy({id: id});
    }

    async findOneByEmail(email: string): Promise<{ password: string; userId: number; email: string }> {
        return this.users.find(user => user.email === email);
    }

    async remove(id: string): Promise<void> {
        await this.usersRepository.delete(id);
    }
}