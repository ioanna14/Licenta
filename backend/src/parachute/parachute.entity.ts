import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { User } from '../user/user.entity';

@Entity()
export class Parachute {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  series: string;

  @Column()
  type: string;

  @Column()
  isReserve: boolean;

  @ManyToMany(
    () => User,
    (user) => user.parachutes, //optional
    { onDelete: 'NO ACTION', onUpdate: 'NO ACTION' },
  )
  @JoinTable({
    name: 'parachute_user',
    joinColumn: {
      name: 'parachuteId',
      referencedColumnName: 'id',
    },
    inverseJoinColumn: {
      name: 'userId',
      referencedColumnName: 'id',
    },
  })
  users?: User[];
}
