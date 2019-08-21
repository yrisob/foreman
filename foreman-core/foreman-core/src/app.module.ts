import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Connection } from 'typeorm';
import { UserService } from './user/user.service';
import { UserController } from './user/user.controller';
import { AuthModule } from './auth/auth.module';
import { UserAuthenticationService } from './user-authentication/user-authentication.service';
import { ProductController } from './product/product.controller';
import { ProductService } from './product/product.service';

@Module({
  imports: [TypeOrmModule.forRoot(), AuthModule],
  controllers: [AppController, ProductController],
  providers: [AppService, UserAuthenticationService, ProductService],
})
export class AppModule {
  constructor(private readonly connection: Connection) {}
}
