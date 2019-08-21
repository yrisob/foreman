import { VersionBase } from './versionbase.entity';
import { Column, Entity, OneToOne, JoinColumn } from 'typeorm';
import { ProductType } from './productType.entity';

@Entity()
export class Product extends VersionBase {
  @Column({ type: 'varchar', length: 50, nullable: false })
  name: string;

  @Column({ type: 'text', nullable: true })
  description: string;

  @OneToOne(type => ProductType)
  @JoinColumn()
  type: ProductType;

  constructor() {
    super();
    this.name = '';
    this.description = null;
    this.type = new ProductType();
  }
}
