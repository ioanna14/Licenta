import { Entity, JoinColumn, ManyToOne, PrimaryColumn } from 'typeorm';
import { User } from '../user/user.entity';
import { Event } from './event.entity';

@Entity()
export class EventUser {
  @PrimaryColumn({ name: 'eventId' })
  eventId: number;

  @PrimaryColumn({ name: 'userId' })
  userId: number;

  @ManyToOne(() => Event, {
    onDelete: 'NO ACTION',
    onUpdate: 'NO ACTION',
  })
  @JoinColumn([{ name: 'eventId', referencedColumnName: 'id' }])
  events: Event[];

  @ManyToOne(() => User, { onDelete: 'NO ACTION', onUpdate: 'NO ACTION' })
  @JoinColumn([{ name: 'userId', referencedColumnName: 'id' }])
  users?: User[];
}
