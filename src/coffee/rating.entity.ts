import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, ManyToOne } from "typeorm";
import { Coffee } from "./coffee.entity";

@Entity()
export class Rating {
  @PrimaryGeneratedColumn()
  id: string;

  @Column()
  rating: number;

  @ManyToOne(
    type => Coffee,
    coffee => coffee.rating
  )
  coffee: Coffee;

  @CreateDateColumn()
  createdDate: Date;

  @UpdateDateColumn()
  updatedDate: Date;
}