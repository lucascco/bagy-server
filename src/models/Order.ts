import { Field, ID, ObjectType } from 'type-graphql';
import {
  BaseEntity,
  Column,
  Entity,
  PrimaryGeneratedColumn,
  OneToOne,
  JoinColumn,
} from 'typeorm';
import { Customer } from './Customer';

@Entity()
@ObjectType()
export class Order extends BaseEntity {
  @Field(() => ID)
  @PrimaryGeneratedColumn()
  id: number | null = null;

  @Field(() => String)
  @Column()
  name: string;

  @Field(() => String)
  @Column('text')
  dtOrder: string;

  @Field(() => Number)
  @Column()
  installment: number;

  @Field(() => String)
  @Column()
  status: string;

  @Field(() => Customer)
  @OneToOne(() => Customer)
  @JoinColumn()
  customer: Customer;
}
