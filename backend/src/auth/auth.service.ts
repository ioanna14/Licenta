import { Injectable } from '@nestjs/common';
import { UsersService } from '../user/users.service';
import { JwtService } from '@nestjs/jwt';
import { CreateUserDto } from '../user/dto/create-user.dto';
import * as bcrypt from 'bcrypt';
import { User } from '../user/user.entity';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async validateUser(username: string, pass: string): Promise<User | null> {
    const user = await this.usersService.findOneByEmail(username);

    const isMatch = await bcrypt.compare(pass, user.password);
    if (user && isMatch) {
      const { ...result } = user;
      return result;
    }
    return null;
  }

  async login(user: any) {
    const validation = await this.validateUser(user.email, user.password);
    if (validation) {
      const payload = { email: user.email, password: user.password };
      return {
        success: true,
        access_token: this.jwtService.sign(payload),
        user_id: validation.id,
      };
    } else {
      return {
        success: false,
        error: 'Wrong email or password!',
      };
    }
  }

  async register(payload: any) {
    const salt = await bcrypt.genSalt();
    const password = payload.password;
    const hashPassword = await bcrypt.hash(password, salt);

    const user = { email: payload.email, password: hashPassword };

    const createdUser = await this.usersService.create(
      new CreateUserDto(user.email, user.password),
    );

    return {
      success: true,
      access_token: this.jwtService.sign({
        email: createdUser.email,
        password: createdUser.password,
      }),
      user_id: createdUser.id,
    };
  }
}
