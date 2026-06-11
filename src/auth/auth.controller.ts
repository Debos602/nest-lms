import { Controller, Post, Body, UseGuards, Get, Request } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterDto } from './dto/registerUser.dto';
import { AuthGuard } from './auth.guard';
import { UserService } from '../user/user.service';


@Controller('auth')
export class AuthController {

    constructor(
        private readonly authService: AuthService, 
        private readonly userService: UserService
    ){}
    @Post('register')
    async register(@Body() registerDto: RegisterDto) {
        const token  = await this.authService.registerUser(registerDto);
        return token;
    }
    @Post('login')
    async login() {
        return "login route";
    }

    @UseGuards(AuthGuard)
    @Get('profile')
    async getProfile(@Request() req) {
       const userId = req.user.sub; // Access the user ID from the JWT payload
       const user = await this.userService.getUserById(userId);
       console.log("profile-controller", user);
       return {id:user?._id, fname: user?.fname, lname: user?.lname, email:user?.email}; // Exclude the password from the response
    }
}
