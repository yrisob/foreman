import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Connection } from 'typeorm';
import { AuthModule } from './auth/auth.module';
import { UserAuthenticationService } from './user-authentication/user-authentication.service';
import { CommodityController } from './commodity/commodity.controller';
import { CommodityService } from './commodity/commodity.service';
import { CommodityCategoryController } from './commodity-category/commodity-category.controller';
import { CommodityCategoryService } from './commodity-category/commodity-category.service';

@Module({
  imports: [TypeOrmModule.forRoot({ keepConnectionAlive: true }), AuthModule],
  controllers: [
    AppController,
    CommodityController,
    CommodityCategoryController,
  ],
  providers: [
    AppService,
    UserAuthenticationService,
    CommodityService,
    CommodityCategoryService,
  ],
})
export class AppModule {
  constructor(private readonly connection: Connection) {}
}
