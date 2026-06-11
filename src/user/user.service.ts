import { ConflictException, Injectable } from '@nestjs/common';
import { RegisterDto } from '../auth/dto/registerUser.dto';
import { User } from './schemas/user.schama';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';


@Injectable()
export class UserService {
    
    constructor(@InjectModel(User.name) private readonly userModel: Model<User>) {}

    async createUser(registerUserDto: RegisterDto) {

     try{
        return  await this.userModel.create({
            fname: registerUserDto.fname,
            lname: registerUserDto.lname,
            email: registerUserDto.email,
            password: registerUserDto.password,
            role: registerUserDto.role 
        });
     }catch(error: unknown) {
        console.error('Error creating user:', error);
        const err = error as { code?: number };
        const DUPLICATE_KEY_ERROR_CODE = 11000;
        if (err.code === DUPLICATE_KEY_ERROR_CODE) {
            throw new ConflictException('Email already exists');
        }
        throw new Error('Error creating user');
    }
    }
    async getUserById(id: string) {
        return await this.userModel.findOne({ _id: id }).exec();
    }   
}
