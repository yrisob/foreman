import { Injectable } from '@nestjs/common';
import { CrudService, ICrudService } from '../crud/crud.service';
import { UserAuthentication } from '../entity/userauth.entity';

@Injectable()
export class UserAuthenticationService extends CrudService(UserAuthentication)
  implements ICrudService {
  async findByUserId(id: number): Promise<UserAuthentication | undefined> {
    if (id) {
      const userAuthentication: UserAuthentication = await this.getRepository()
        .createQueryBuilder('user_authentication')
        .where('user_authentication.userId = :id', { id })
        .leftJoinAndSelect('user_authentication.user', 'user')
        .getOne();
      return userAuthentication;
    }
    return undefined;
  }

  async findByToken(
    refreshToken: string,
  ): Promise<UserAuthentication | undefined> {
    if (refreshToken) {
      const userAuthentication: UserAuthentication = await this.getRepository()
        .createQueryBuilder('user_authentication')
        .where('user_authentication.refreshToken = :refreshToken', {
          refreshToken,
        })
        .leftJoinAndSelect('user_authentication.user', 'user')
        .getOne();
      return userAuthentication;
    }
    return undefined;
  }

  async updateByUserId(userId: number, refreshToken: string): Promise<any> {
    const userAuthentication = await this.findByUserId(userId);
    if (!userAuthentication) {
      return undefined;
    }
    userAuthentication.refreshToken = refreshToken;
    return this.update(userAuthentication.id, userAuthentication);
  }
}
