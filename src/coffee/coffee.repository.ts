import { EntityRepository, Repository } from "typeorm";
import { Coffee } from './coffee.entity'

@EntityRepository(Coffee)
export class CoffeeRepository extends Repository<Coffee> {}