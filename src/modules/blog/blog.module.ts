import { Module } from "@nestjs/common";
import { Prisma } from "@prisma/client";
import { PrismaModule } from "../../prisma/prisma.module";
import { BlogService } from "./blog.service";
import { BlogController } from "./blog.controller";

@Module({
    imports: [PrismaModule],
    controllers: [BlogController],
    providers: [BlogService],
    exports: [BlogService],
})
export class BlogModule {}