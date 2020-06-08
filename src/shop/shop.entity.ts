import { Entity, Column, Unique, OneToMany } from "typeorm";
import { SharedEntity } from "../base.entity";
import { Coffee } from "../coffee/coffee.entity";

@Entity()
@Unique(['name'])
export class Shop extends SharedEntity {
  @Column()
  name: string;

  @Column()
  streetOne: string;

  @Column()
  streetTwo: string;

  @Column()
  city: string;

  @Column()
  state: string;

  @Column()
  zip: string;

  @Column("timestamp with time zone")
  dateVisited: Date;

  @Column()
  description: string;

  @OneToMany(
    type => Coffee,
    coffee => coffee.shop,
  )
  coffee: Coffee[];
}