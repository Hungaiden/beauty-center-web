import { Inject, Injectable } from "@nestjs/common";
import { CreateUserDto } from "./dto/create-users.dto";
import { PrismaService } from "../../prisma/prisma.service";
import * as bcrypt from 'bcrypt';
import { PaginationDto } from "../../common/dtos/pagination.dto";
import { PaginationResult } from "../../common/interfaces/pagination-result.interface";
import { User } from "@prisma/client";
import { CreateUserGoogleDto } from "./dto/create-users.dto";
@Injectable()
export class UsersService {
    constructor(private readonly prisma: PrismaService) {}

    // Tạo người dùng mới
    // Mã hóa mật khẩu trước khi lưu vào cơ sở dữ liệu
    async create(dto: CreateUserDto) {
        const hashedPassword = await bcrypt.hash(dto.password, 10); 
        const data = {
            ...dto,
            password: hashedPassword,
        };
        return this.prisma.user.create({
            data,
            select: {
                id: true,
                username: true,
                fullName: true,
                role: true,
            },
        });
    }
    
    async createUserFromGoogle(dto: CreateUserGoogleDto) {
        const { email, username, fullName, provider, providerId } = dto;
        const user = await this.prisma.user.create({
            data: {
                email,
                username,
                fullName,
                provider,
                providerId
            },
            select: {
                id: true,
                username: true,
                fullName: true,
                role: true,
                email: true,
            },
        });
        return user;
    }

    // Lấy list người dùng
    findAll() {
        return this.prisma.user.findMany();
    }
    // async getUsers(paginationDto: PaginationDto): Promise<PaginationResult<User>> {
    //     const page = Number(paginationDto.page) || 1;
    //     const limit = Number(paginationDto.limit) || 10;
    //     const skip = (page - 1) * limit;

    //     const [data, total] = await Promise.all([
    //         this.prisma.user.findMany({
    //         skip,
    //         take: limit,
    //         }),
    //         this.prisma.user.count(),
    //     ]);

    //     return {
    //         data,
    //         total,
    //         page,
    //         lastPage: Math.ceil(total / limit),
    //     };
    // }

    // Lấy người dùng theo ID
    // Chuyển đổi ID sang chuỗi vì Prisma yêu cầu ID là chuỗi
    findOne(id: string) {
        return this.prisma.user.findUnique({ where: { id: id.toString() } });
    }

    // Tìm người dùng theo email
    // Dùng để xác thực người dùng khi đăng nhập
    async findByEmail(email: string) {
        if (!email) {
            throw new Error('Email is required');
        }
        const user = await this.prisma.user.findUnique({
            where: { email },
        });
        return user;
    }
    
    // Xóa người dùng theo ID
    remove(id: string) {
        return this.prisma.user.delete({ where: { id: id.toString() } });
    }

    // Lấy thông tin người dùng hiện tại
    getCurrentUser(userId: string) {
        return this.prisma.user.findUnique({
            where: { id: userId.toString() },
            select: {
                id: true,
                username: true,
                fullName: true,
                email: true,
                address: true,
                phone: true,
                country: true,
                companyName: true,
                role: true,
            },
        });
    }

}