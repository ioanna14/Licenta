import {
  Column,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { EmergencyContact } from '../emergencyContact/emergencyContact.entity';
import { License } from '../license/license.entity';
import { Parachute } from '../parachute/parachute.entity';
import { Jump } from '../jump/jump.entity';
import { Event } from '../event/event.entity';
import { Incident } from '../incident/incident.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ default: null })
  name: string;

  @Column({ default: null })
  phone: string;

  @Column({ default: null })
  email: string;

  @Column({ default: null })
  password: string;

  @Column({ default: null })
  address: string;

  @Column({ default: null })
  birthDate: Date;

  @Column({ default: null })
  userType: string;

  @OneToOne(() => License)
  @JoinColumn()
  license: License;

  @OneToOne(() => EmergencyContact)
  @JoinColumn()
  emergencyContact: EmergencyContact;

  @ManyToMany(
    () => Parachute,
    (parachute) => parachute.users, //optional
    { onDelete: 'NO ACTION', onUpdate: 'NO ACTION' },
  )
  @JoinTable({
    name: 'parachute_user',
    joinColumn: {
      name: 'userId',
      referencedColumnName: 'id',
    },
    inverseJoinColumn: {
      name: 'parachuteId',
      referencedColumnName: 'id',
    },
  })
  parachutes?: Parachute[];

  @ManyToMany(
    () => Event,
    (event) => event.users, //optional
    { onDelete: 'NO ACTION', onUpdate: 'NO ACTION' },
  )
  @JoinTable({
    name: 'event_user',
    joinColumn: {
      name: 'userId',
      referencedColumnName: 'id',
    },
    inverseJoinColumn: {
      name: 'eventId',
      referencedColumnName: 'id',
    },
  })
  events: Event[];

  @Column({ default: true })
  isActive: boolean;
}
