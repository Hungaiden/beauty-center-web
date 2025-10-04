// src/module/categoryproduct/__tests__/CategoryProduct.controller.spec.ts
import { Test, TestingModule } from '@nestjs/testing';
import { CategoryProductController } from '../CategoryProduct.controller';
import { CategoryProductService } from '../CategoryProduct.service';
import { CategoryProductRequestDto } from '../dto/CategoryProduct.dto';
import { HttpStatus } from '@nestjs/common';
import * as request from 'supertest';
import { INestApplication } from '@nestjs/common';
import { AuthGuard } from '../../../common/guards/auth.guards';
import { RolesGuard } from '../../../common/guards/roles.guards';
import { PrismaService } from '../../../prisma/prisma.service';

describe('CategoryProductController', () => {
  let app: INestApplication;
  let categoryProductService: CategoryProductService;

  // Mock PrismaService
  const mockPrismaService = {
    categoryProduct: {
      create: jest.fn(),
    },
  };

  // Mock CategoryProductService
  const mockCategoryProductService = {
    createCategoryProduct: jest.fn(),
  };

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      controllers: [CategoryProductController],
      providers: [
        {
          provide: CategoryProductService,
          useValue: mockCategoryProductService,
        },
        {
          provide: PrismaService,
          useValue: mockPrismaService,
        },
      ],
    })
      .overrideGuard(AuthGuard)
      .useValue({ canActivate: () => true }) // Bỏ qua AuthGuard
      .overrideGuard(RolesGuard)
      .useValue({ canActivate: () => true }) // Bỏ qua RolesGuard
      .compile();

    app = moduleFixture.createNestApplication();
    await app.init();
    categoryProductService = moduleFixture.get<CategoryProductService>(CategoryProductService);
  });

  afterAll(async () => {
    await app.close();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('POST /CategoryProducts/createCategoryBlog', () => {
    it('should create a category and return 201 status', async () => {
      const mockDto: CategoryProductRequestDto = {
        name: 'Test Category',
        description: 'Test Description',
      };
      const mockResponse = {
        id: 1,
        name: 'Test Category',
        description: 'Test Description',
      };

      mockCategoryProductService.createCategoryProduct.mockResolvedValue(mockResponse);

      const response = await request(app.getHttpServer())
        .post('/CategoryProducts/createCategoryBlog')
        .send(mockDto)
        .expect(HttpStatus.CREATED);

      expect(response.body).toEqual(mockResponse);
      expect(mockCategoryProductService.createCategoryProduct).toHaveBeenCalledWith(mockDto);
    });

    it('should return 400 if DTO is invalid (missing name)', async () => {
      const invalidDto = {
        description: 'Test Description',
      };

      await request(app.getHttpServer())
        .post('/CategoryProducts/createCategoryBlog')
        .send(invalidDto)
        .expect(HttpStatus.BAD_REQUEST);
    });

    it('should return 400 if DTO has empty name', async () => {
      const invalidDto = {
        name: '',
        description: 'Test Description',
      };

      await request(app.getHttpServer())
        .post('/CategoryProducts/createCategoryBlog')
        .send(invalidDto)
        .expect(HttpStatus.BAD_REQUEST);
    });

    it('should handle service errors and return 500', async () => {
      const mockDto: CategoryProductRequestDto = {
        name: 'Test Category',
        description: 'Test Description',
      };
      mockCategoryProductService.createCategoryProduct.mockRejectedValue(new Error('Prisma error'));

      await request(app.getHttpServer())
        .post('/CategoryProducts/createCategoryBlog')
        .send(mockDto)
        .expect(HttpStatus.INTERNAL_SERVER_ERROR);
    });
  });
});