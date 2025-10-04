import { Injectable } from "@nestjs/common";
import { PrismaService } from "../../prisma/prisma.service";
import { CreateBlogDto } from "./dto/create-blog.dto";

@Injectable()
export class BlogService {
    constructor(private readonly prisma: PrismaService) {}

    // Tạo bài viết mới
    async create(dto: CreateBlogDto) {
        const category = await this.prisma.categoryBlog.findFirst({
            where: { name: dto.categoryName },
        });
        return this.prisma.blog.create({
            data: {
                title: dto.title,
                content: dto.content,
                image: dto.image || null, 
                categoryBlogId: category.id 
            },
            select: {
                id: true,
                title: true,
                content: true,
                image: true,
                categoryBlogId: true,
            },
        });
    }

    // Lấy danh sách bài viết
    findAll() {
        return this.prisma.blog.findMany();
    }

    // Lấy bài viết theo ID
    findOne(id: string) {
        return this.prisma.blog.findUnique({ where: { id } });
    }

    // Cập nhật bài viết
    async update(id: string, dto: CreateBlogDto) {
        let categoryId: string | null = null;

        if (dto.categoryName) {
            const category = await this.prisma.categoryBlog.findFirst({
                where: { name: dto.categoryName },
            });

            if (!category) {
                throw new Error('Category not found');
            }

            categoryId = category.id;
        }

        return this.prisma.blog.update({
            where: { id },
            data: {
                title: dto.title ?? undefined, // nếu không truyền thì không cập nhật field này
                content: dto.content ?? undefined, // nếu không truyền thì không cập nhật field này
                image: dto.image ?? undefined, // nếu không truyền thì không cập nhật field này
                categoryBlogId: categoryId ?? undefined, // nếu không truyền categoryName thì không update
            },
            select: {
                id: true,
                title: true,
                content: true,
                image: true,
                categoryBlogId: true,
            },
        });
    }

    // Xóa bài viết theo ID
    remove(id: string) {
        return this.prisma.blog.delete({ where: { id } });
    }

}