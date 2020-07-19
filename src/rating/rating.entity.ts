import { Entity, Column, ManyToOne } from 'typeorm';
import { Coffee } from '../coffee/coffee.entity';
import { SharedEntity } from '../base.entity';

@Entity()
export class Rating extends SharedEntity {
  @Column()
  rating: number;

  @Column()
  review: string;

  @ManyToOne(
    type => Coffee,
    coffee => coffee.rating
  )
  coffee: Coffee;
}