import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, ManyToOne, OneToMany } from "typeorm";
import { Shop } from '../shop/shop.entity';
import { Rating } from "./rating.entity";

@Entity()
export class Coffee {
  @PrimaryGeneratedColumn()
  id: string;

  @Column()
  name: string;

  @ManyToOne(
    type => Shop,
    shop => shop.coffee
  )
  shop: Shop;

  @OneToMany(
    type => Rating,
    rating => rating.coffee
  )
  rating: Rating[];

  @CreateDateColumn()
  createdDate: Date;

  @UpdateDateColumn()
  updatedDate: Date;
}