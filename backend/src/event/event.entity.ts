import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { User } from '../user/user.entity';

@Entity()
export class Event {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  location: string;

  @Column()
  date: Date;

  @Column()
  price: number;

  @Column()
  description: string;

  @Column()
  image: string;

  @ManyToMany(() => User, (user) => user.events)
  @JoinTable()
  participants: User[];
}
