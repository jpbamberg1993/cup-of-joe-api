import { Entity, Column, ManyToOne } from "typeorm";
import { Coffee } from "./coffee.entity";
import { BaseEntity } from '../base.entity';

@Entity()
export class Rating extends BaseEntity {
  @Column()
  rating: number;

  @ManyToOne(
    type => Coffee,
    coffee => coffee.rating
  )
  coffee: Coffee;
}