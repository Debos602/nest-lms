import { Injectable } from '@nestjs/common';
import bcrypt from 'bcrypt';
import { UserService } from '../user/user.service';
import { RegisterDto } from './dto/registerUser.dto';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {

    constructor(
        private readonly userService: UserService,
        private jwtService: JwtService) {}

    async registerUser(registerDto:RegisterDto) {
        // console.log(registerDto) ;
        const saltRounds = 10;
        const hash = await bcrypt.hash(registerDto.password, saltRounds);
        const user = await this.userService.createUser({ ...registerDto, password: hash });

        // console.log("auth-service", user);
        const payload = { sub: user._id, email: user.email };
        const token = await this.jwtService.signAsync(payload);
        console.log("auth-service", token);
        return { access_token:token };
    }
}
