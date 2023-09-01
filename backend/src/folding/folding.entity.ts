import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Parachute } from '../parachute/parachute.entity';

@Entity()
export class Folding {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  date: Date;

  @Column()
  folderName: string;

  @ManyToOne(() => Parachute)
  @JoinColumn({ name: 'parachuteId' })
  parachute: Parachute;
}
