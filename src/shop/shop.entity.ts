import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, Unique } from "typeorm";

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

  @CreateDateColumn()
  createdDate: Date;

  @UpdateDateColumn()
  updatedDate: Date;
}