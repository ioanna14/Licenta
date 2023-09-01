import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { User } from '../user/user.entity';

@Entity()
export class Jump {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  altitude: number;

  @Column()
  exercise: string;

  @Column()
  date: Date;

  @Column()
  plane: string;

  @Column()
  dropzone: string;

  @ManyToOne(() => User)
  @JoinColumn({ name: 'userId' })
  user: User;
}
