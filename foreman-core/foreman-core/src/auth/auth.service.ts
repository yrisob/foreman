import { Injectable } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { IUser } from '../models/interfaces/iuser.interface';
import { RegistrationStatus } from '../models/interfaces/registration-status.interface';
import * as jwt from 'jsonwebtoken';
import { User } from '../entity/user.entity';
import { JwtPayload } from './interfaces/jwt.interface';
import { Config } from '../config/config';

@Injectable()
export class AuthService {
  constructor(private readonly userService: UserService) {}

  async registrate(user: IUser) {
    let status: RegistrationStatus = {
      success: true,
      message: 'user registrated',
    };
    try {
      await this.userService.create(user);
    } catch (error) {
      status = { success: false, message: error };
    }
    return status;
  }

  async createToken(user: User) {
    const accessToken = jwt.sign(
      {
        id: user.id,
        email: user.email,
        phone: user.phone,
        name: user.name,
        exp: Math.floor(Date.now() / 1000) + 60 * Config.expiresIn,
      },
      Config.jwtSecretKey,
    );

    const refreshToken = jwt.sign(
      {
        id: user.id,
        email: user.email,
        phone: user.phone,
        name: user.name,
        exp: Math.floor(Date.now() / 1000) + 60 * Config.expiresRefreshToken,
      },
      Config.jwtRefreshTokenSecretKey,
    );

    return {
      accessToken,
      refreshToken,
    };
  }

  async validateUser(payload: JwtPayload): Promise<any> {
    return await this.userService.findById(payload.id);
  }
}
