import {
  Controller,
  Post,
  UsePipes,
  Body,
  ValidationPipe,
  BadRequestException,
} from '@nestjs/common';
import { UserService } from '../user/user.service';
import { AuthService } from './auth.service';
import * as jwt from 'jsonwebtoken';
import { LoginRequest } from '../models/login-request';
import { IUser } from '../models/interfaces/iuser.interface';
import { Config } from '../config/config';
import { UserAuthenticationService } from '../user-authentication/user-authentication.service';
import { UserAuthentication } from '../entity/userauth.entity';

@Controller('api/auth')
export class AuthController {
  constructor(
    private readonly usersService: UserService,
    private readonly authService: AuthService,
    private readonly userAuthentication: UserAuthenticationService,
  ) {}

  @Post('register')
  // @UsePipes(new ValidationPipe({ transform: true }))
  public async register(@Body() createUserDto: IUser) {
    const result = await this.authService.registrate(createUserDto);
    if (!result.success) {
      throw new BadRequestException(result.message);
    }
    return result;
  }
  // TODO:  Change this code for saving user authentication (maybe should insert into user data without another table)
  @Post('login')
  public async login(@Body() login: LoginRequest) {
    const user = await this.usersService.getUserByLoginData(login);
    if (!user) {
      throw new BadRequestException(
        'user with same login or password not found',
      );
    } else {
      const token = await this.authService.createToken(user);
      const userFromRefreshToken = jwt.verify(
        token.refreshToken,
        Config.jwtRefreshTokenSecretKey,
      );
      let userAuth = await this.userAuthentication.findByUserId(user.id);
      if (!userAuth) {
        userAuth = new UserAuthentication();
        userAuth.refreshToken = token.refreshToken;
        userAuth.expiresIn = userFromRefreshToken.exp;
        userAuth.user = user;
        await this.userAuthentication.create(userAuth);
      } else {
        userAuth.refreshToken = token.refreshToken;
        userAuth.expiresIn = userFromRefreshToken.exp;
        await this.userAuthentication.update(userAuth.id, userAuth);
      }

      return {
        success: true,
        token,
      };
    }
  }

  // TODO:  Change this code for saving user authentication (maybe should insert into user data without another table)
  @Post('refreshtoken')
  public async refreshToken(@Body() refreshToken: string) {
    const user = jwt.verify(refreshToken, Config.jwtRefreshTokenSecretKey);
    if (user && user.email) {
      const userAuth = await this.userAuthentication.findByToken(refreshToken);
      if (
        userAuth &&
        userAuth.user &&
        user.id === userAuth.user.id &&
        userAuth.expiresIn > Math.floor(new Date().getTime() / 1000)
      ) {
        const token = await this.authService.createToken(userAuth.user);
        const userFromRefreshToken = jwt.verify(
          token.refreshToken,
          Config.jwtRefreshTokenSecretKey,
        );
        userAuth.refreshToken = token.refreshToken;
        userAuth.expiresIn = userFromRefreshToken.exp;
        this.userAuthentication.update(userAuth.id, userAuth);

        return {
          success: true,
          token,
        };
      } else {
        throw new BadRequestException('can not find refresh token');
      }
    } else {
      throw new BadRequestException('refreshToken does not exist');
    }
  }

  @Post('logout')
  public async logout(@Body() refreshToken: string) {
    const user = jwt.verify(refreshToken, Config.jwtRefreshTokenSecretKey);
    if (user && user.email) {
      const userAuth = await this.userAuthentication.findByToken(refreshToken);
      if (userAuth.id) {
        return this.userAuthentication.delete(userAuth.id);
      } else {
        throw new BadRequestException('can not find refresh token');
      }
    }
    throw new BadRequestException('refreshToken does not exist');
  }
}
