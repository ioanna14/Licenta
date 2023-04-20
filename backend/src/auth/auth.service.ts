import { Injectable } from '@nestjs/common';
import { UsersService } from '../user/users.service';
import {JwtService} from "@nestjs/jwt";

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
}