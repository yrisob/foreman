import { VersionBase } from './versionbase.entity';
import { Column, Entity, OneToOne, JoinColumn, ManyToOne } from 'typeorm';
import { CommodityCategory } from './commodity_category.entity';

@Entity()
export class Commodity extends VersionBase {
  @Column({ type: 'varchar', length: 50, nullable: false })
  name: string;

  @Column({ type: 'text', nullable: true })
  description: string;

  @ManyToOne(type => CommodityCategory)
  category: CommodityCategory;

  constructor() {
    super();
    this.name = '';
    this.description = null;
    this.category = new CommodityCategory();
  }
}
