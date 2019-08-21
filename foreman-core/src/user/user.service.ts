import { Injectable } from '@nestjs/common';
import { User } from '../entity/user.entity';
import { LoginRequest } from '../models/login-request';
import { CrudService, ICrudService } from '../crud/crud.service';

@Injectable()
export class UserService extends CrudService(User) implements ICrudService {
  async findOneByEmail(insertEmail: string): Promise<User | undefined> {
    return this.getRepository().findOne({ where: { email: insertEmail } });
  }

  async getUserByLoginData(login: LoginRequest): Promise<User | undefined> {
    return this.getRepository().findOne({
      where: {
        email: login.email,
        password: login.password,
      },
    });
  }
}
