import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, Unique, OneToMany } from "typeorm";
import { Coffee } from "src/coffee/coffee.entity";

@Entity()
@Unique(['name'])
export class Shop {
  @PrimaryGeneratedColumn()
  id: string;

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

  @CreateDateColumn()
  createdDate: Date;

  @UpdateDateColumn()
  updatedDate: Date;
}