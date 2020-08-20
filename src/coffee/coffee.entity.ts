import { Entity, Column, ManyToOne, OneToMany } from 'typeorm'
import { Shop } from '../shop/shop.entity'
import { Rating } from '../rating/rating.entity'
import { SharedEntity } from '../base.entity'

@Entity()
export class Coffee extends SharedEntity {
  @Column()
  name: string

  @Column()
  description: string

  @Column()
  origin: string

  @Column()
  type: string

  @ManyToOne(
    type => Shop,
    shop => shop.coffee
  )
  shop: Shop

  @Column()
  shopId: string

  @OneToMany(
    type => Rating,
    rating => rating.coffee
  )
  rating: Rating[]
}