import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { User } from '../entity/user.entity';
import { UserModule } from '../user/user.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthController } from './auth.controller';
import * as jwt from 'jsonwebtoken';
import { UserAuthenticationService } from '../user-authentication/user-authentication.service';
import { Config } from '../config/config';

describe('AuthService', () => {
  let service: AuthService;
  const user: User = {
    name: 'yrisob',
    email: 'yrisob@ya.ru',
    phone: '79216570158',
    password: undefined,
  };
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [UserModule, TypeOrmModule.forRoot()],
      controllers: [AuthController],
      components: [AuthService],
    }).compile();

    service = module.get<AuthService>(AuthService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('create token', async () => {
    const tokens = await service.createToken(user);
    console.log(tokens);
    console.log(
      jwt.verify(tokens.refreshToken, Config.jwtRefreshTokenSecretKey),
    );
    expect(tokens).toBeDefined();
  });
});
