import { IsString, IsNotEmpty } from 'class-validator';
export class CreateCommentDto {
    @IsString()
    @IsNotEmpty()
    content: string;

    @IsString()
    @IsNotEmpty()
    blogId: string; // ID của bài viết mà bình luận thuộc về

    @IsString()
    @IsNotEmpty()
    userId: string; // ID của người dùng đã bình luận
}