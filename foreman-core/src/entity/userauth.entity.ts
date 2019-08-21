import { Entity, Column, OneToOne, JoinColumn } from 'typeorm';
import { VersionBase } from './versionbase.entity';
import { User } from './user.entity';

@Entity()
export class UserAuthentication extends VersionBase {
  @Column({ type: 'varchar', length: '250', unique: true })
  refreshToken: string;

  @Column({ type: 'integer' })
  expiresIn: number;

  @OneToOne(type => User)
  @JoinColumn()
  user: User;

  constructor() {
    super();
    this.refreshToken = '';
    this.expiresIn = 0;
    this.user = new User();
  }
}
