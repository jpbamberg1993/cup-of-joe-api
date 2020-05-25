import { Entity, Column, ManyToOne, OneToMany } from "typeorm";
import { Shop } from '../shop/shop.entity';
import { Rating } from "./rating.entity";
import { BaseEntity } from '../base.entity';

@Entity()
export class Coffee extends BaseEntity {
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
}