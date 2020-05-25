import { Entity, Column, Unique, OneToMany } from "typeorm";
import { BaseEntity } from "../base.entity"
import { Coffee } from "src/coffee/coffee.entity";

@Entity()
@Unique(['name'])
export class Shop extends BaseEntity {
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