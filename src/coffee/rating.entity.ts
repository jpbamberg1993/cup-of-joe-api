import { Entity, Column, ManyToOne } from "typeorm";
import { Coffee } from "./coffee.entity";
import { SharedEntity } from '../base.entity';

@Entity()
export class Rating extends SharedEntity {
  @Column()
  rating: number;

  @ManyToOne(
    type => Coffee,
    coffee => coffee.rating
  )
  coffee: Coffee;
}