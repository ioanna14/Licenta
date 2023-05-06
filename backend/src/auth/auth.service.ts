import { Injectable } from '@nestjs/common';
import { UsersService } from '../user/users.service';
import {JwtService} from "@nestjs/jwt";
import {CreateUserDto} from "../user/dto/create-user.dto";

@Injectable()
export class AuthService {
    constructor(
        private usersService: UsersService,
        private jwtService: JwtService
    ) {}

    async validateUser(username: string, pass: string): Promise<any> {
        const user = await this.usersService.findOneByEmail(username);
        if (user && user.password === pass) {
            const { password, ...result } = user;
            return result;
        }
        return null;
    }

    async login(user: any) {
        const validation = await this.validateUser(user.email, user.password);
        if (validation) {
            const payload = { email: user.email, sub: user.userId };
            return {
                success: true,
                access_token: this.jwtService.sign(payload),
            };
        } else  {
            return {
                success: false,
                error: "Wrong email or password!"
            }
        }
    }

    async register(payload: any) {
        const user = { email: payload.body.email, password: payload.body.password};
        return {
            success: true,
            access_token: this.usersService.create(new CreateUserDto(user.email, user.password)),
        };
    }
}