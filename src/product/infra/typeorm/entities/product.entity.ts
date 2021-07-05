import { Category } from '../../../../category/infra/typeorm/entities/category.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { v4 as uuidV4 } from 'uuid';

@Entity()
export class Product {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ length: 250, nullable: false })
  name: string;

  @Column({ length: 900, nullable: false })
  description: string;

  @Column({ length: 250, nullable: false })
  slug: string;

  @ManyToOne((type) => Category, (category) => category.id)
  @JoinColumn({ name: 'category_id', referencedColumnName: 'id' })
  category?: Category;

  @Column({ nullable: true })
  category_id?: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  constructor() {
    if (!this.id) this.id = uuidV4();
  }
}
