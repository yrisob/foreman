import { Test, TestingModule } from '@nestjs/testing';
import { AuthController } from './auth.controller';
import { UserService } from '../user/user.service';
import { UserModule } from '../user/user.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthService } from './auth.service';
import { IUser } from '../models/interfaces/iuser.interface';
import { LoginRequest } from '../models/login-request';

describe('Auth Controller', () => {
  let controller: AuthController;
  const userLogin: LoginRequest = {
    email: 'test@test.ru',
    password: 'Qwerty123',
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [UserModule, TypeOrmModule.forRoot()],
      controllers: [AuthController],
      components: [AuthService],
    }).compile();

    controller = module.get<AuthController>(AuthController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  // it('should be registrate', async () => {
  //   const user: IUser = {
  //     name: 'Test test',
  //     email: 'test@test.ru',
  //     phone: '79216570101',
  //     password: 'Qwerty123',
  //   };
  //   try {
  //     const resultUser = await controller.register(user);
  //     expect(resultUser).not.toBeUndefined();
  //     expect(resultUser.success).toEqual(true);
  //   } catch (ex) {
  //     console.log(ex);
  //   }
  // });

  it('should be login in', async () => {
    try {
      const loginResult = await controller.login(userLogin);
      console.log(`login result is: \n ${JSON.stringify(loginResult)}`);
      expect(loginResult.success).toEqual(true);
    } catch (ex) {
      console.log(ex);
      expect(ex).toBeUndefined();
    }
    return;
  });

  function timeout(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  it('should be refresh token', async () => {
    try {
      const loginResult = await controller.login(userLogin);
      expect(loginResult.success).toEqual(true);
      expect(loginResult.token).not.toBeUndefined();

      const loginAccessToken = loginResult.token.accessToken;
      const loginRefreshToken = loginResult.token.refreshToken;

      await timeout(1100);
      const refreshResult = await controller.refreshToken(loginRefreshToken);

      expect(refreshResult.token).not.toBeUndefined();
      expect(refreshResult.token.accessToken).not.toEqual(loginAccessToken);
      expect(refreshResult.token.refreshToken).not.toEqual(loginRefreshToken);
    } catch (ex) {
      error = ex;
      expect(ex).toBeUndefined();
    }
  });
});
