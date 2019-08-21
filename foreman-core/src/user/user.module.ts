import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../entity/user.entity';
import { UserAuthenticationService } from '../user-authentication/user-authentication.service';

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  controllers: [UserController],
  providers: [UserService, UserAuthenticationService],
  exports: [UserService, UserAuthenticationService],
})
export class UserModule {}
