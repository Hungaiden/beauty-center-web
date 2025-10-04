import { IsNotEmpty, IsString } from "class-validator";

export class CreateBlogDto {
    @IsString()
    @IsNotEmpty()
    categoryName: string; 

    @IsString()
    @IsNotEmpty()
    title: string;

    @IsString()
    @IsNotEmpty()
    content: string;

    @IsString()
    image?: string;
}