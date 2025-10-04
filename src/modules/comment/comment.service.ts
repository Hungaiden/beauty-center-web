import { Injectable } from "@nestjs/common";
import { PrismaService } from "../../prisma/prisma.service";
import { CreateCommentDto } from "./dto/create-comment.dto";


@Injectable()
export class CommentService {
    constructor(private prisma: PrismaService) {}

    async createComment(dto: CreateCommentDto) {
        return this.prisma.comment.create({
            data: {
                content: dto.content,
                blogId: dto.blogId,
                userId: dto.userId,
            },
            select: {
                id: true,
                content: true,
                blogId: true,
                userId: true,
            },
        });
    }

    async findAllComments(blogId: string) {
        return this.prisma.comment.findMany({
            where: { blogId },
            select: {
            id: true,
            content: true,
            createdAt: true,
            user: {
                select: {
                    id: true,
                    fullName: true,  
                },
            },
            },
        });
    }

    async deleteComment(id: string) {
        return this.prisma.comment.delete({
            where: { id },
        });
    }

    async updateComment(id: string, dto: CreateCommentDto) {
        return this.prisma.comment.update({
            where: { id },
            data: {
                content: dto.content,
            },
            select: {
                id: true,
                content: true,
                blogId: true,
                userId: true,
            },
        });
    }

    
}