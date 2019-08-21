import { VersionBase } from './versionbase.entity';
import { Entity, Column } from 'typeorm';

@Entity()
export class CommodityCategory extends VersionBase {
  @Column({ type: 'varchar', length: 50, nullable: false, unique: true })
  name: string;

  constructor() {
    super();
    this.name = '';
  }
}
