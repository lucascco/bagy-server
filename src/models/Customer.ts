import { Field, ID, ObjectType } from 'type-graphql';
import {
  BaseEntity,
  Column,
  Entity,
  PrimaryGeneratedColumn,
  OneToOne,
  JoinColumn,
} from 'typeorm';
import { Address } from './Address';

@Entity()
@ObjectType()
export class Costumer extends BaseEntity {
  @Field(() => ID)
  @PrimaryGeneratedColumn()
  id: number | null = null;

  @Field(() => String)
  @Column()
  name: string;

  @Field(() => String)
  @Column()
  email: string;

  @Field(() => String)
  @Column()
  cpf: string;

  @Field(() => String)
  @Column('text')
  dtBirth: string;

  @Field(() => Address)
  @OneToOne(() => Address)
  @JoinColumn()
  address: Address;
}
