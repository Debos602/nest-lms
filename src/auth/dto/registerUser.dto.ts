import {IsEmail, IsString, IsNotEmpty} from 'class-validator';

export class RegisterDto {
    @IsString()
    fname: string;

    @IsString()
    @IsNotEmpty()
    lname: string;

    @IsEmail()
    @IsNotEmpty()
    email: string;

    @IsString()
    password: string;
}    