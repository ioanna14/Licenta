import { Entity, JoinColumn, ManyToOne, PrimaryColumn } from 'typeorm';
import { User } from '../user/user.entity';
import { Parachute } from './parachute.entity';

@Entity()
export class ParachuteUser {
  @PrimaryColumn({ name: 'parachuteId' })
  parachuteId: number;

  @PrimaryColumn({ name: 'userId' })
  userId: number;

  @ManyToOne(() => Parachute, {
    onDelete: 'NO ACTION',
    onUpdate: 'NO ACTION',
  })
  @JoinColumn([{ name: 'parachuteId', referencedColumnName: 'id' }])
  parachutes: Parachute[];

  @ManyToOne(() => User, { onDelete: 'NO ACTION', onUpdate: 'NO ACTION' })
  @JoinColumn([{ name: 'userId', referencedColumnName: 'id' }])
  users?: User[];
}
