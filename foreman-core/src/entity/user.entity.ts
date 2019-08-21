import { Entity, Column } from 'typeorm';
import { VersionBase } from './versionbase.entity';

export enum UserRole {
  'customer',
  'operator',
  'manager',
  'administrator',
}

@Entity()
export class User extends VersionBase {
  @Column({ type: 'varchar', length: 100, nullable: false })
  name: string;

  @Column({ type: 'varchar', length: 150, unique: true, nullable: false })
  email: string;

  @Column({ type: 'varchar', length: 12, unique: true, nullable: false })
  phone: string;

  @Column({ type: 'varchar', length: 50, nullable: false })
  password: string;

  @Column({ type: 'enum', enum: UserRole, default: UserRole.administrator })
  role?: UserRole;

  constructor() {
    super();
    this.name = '';
    this.email = '';
    this.phone = '';
    this.password = '';
    this.role = UserRole.administrator;
  }
}
