import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaService } from './prisma/prisma.service';
import { UsersModule } from './modules/users/users.module';
import { AuthModule } from './modules/auth/auth.module';
import { BlogModule } from './modules/blog/blog.module';
import { CommentModule } from './modules/comment/comment.module';
import { OrderModule } from './modules/Order/Order.module';
import { CategoryProductModule } from './modules/CategoryProduct/CategoryProduct.module';
import { ProductModule } from './modules/products/product.module';
import { PaymentMethodModule } from './modules/paymentMethod/paymentMethod.module';
import { CategoryBlogModule } from './modules/CategoryBlog/categoryBlog.module';
import { CartModule } from './modules/carts/cart.module';
import { ExpertModule } from './modules/expert/expert.module';
import { AppointmentModule } from './modules/AppointmentSchedule/appointment.module'
import { ServiceRelaxModule } from './modules/ServiceRelax/service-relax.module';
@Module({
  imports: [ UsersModule, AuthModule, BlogModule, CommentModule, ProductModule, PaymentMethodModule, CategoryBlogModule, OrderModule, CategoryProductModule, CartModule, ExpertModule, AppointmentModule,ServiceRelaxModule],

  controllers: [AppController],
  providers: [AppService, PrismaService],
})
export class AppModule {}
