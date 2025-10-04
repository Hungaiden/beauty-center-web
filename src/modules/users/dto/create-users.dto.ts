import { IsString, IsEmail, IsNotEmpty } from "class-validator";
export class CreateUserDto {
    @IsString()
    @IsNotEmpty()
    username: string;

    @IsString()
    @IsNotEmpty()
    password: string;

    @IsEmail()
    @IsNotEmpty()
    email: string;

    @IsString()
    @IsNotEmpty()
    fullName: string;
}

export class CreateUserGoogleDto {
    @IsEmail()
    @IsNotEmpty()
    email: string;

    @IsString()
    @IsNotEmpty()
    fullName: string;

    @IsString()
    avatar?: string;
    @IsString()
    username: string;

    provider?: string;
    providerId?: string;
}