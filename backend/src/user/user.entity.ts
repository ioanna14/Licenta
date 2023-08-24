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
import { Incident } from '../incident/incident.entity';
import { Parachute } from '../parachute/parachute.entity';
import { Jump } from '../jump/jump.entity';
import { Dropzone } from '../dropzone/dropzone.entity';

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

  @OneToMany(() => Jump, (jump) => jump.user)
  jumps: Jump[];

  @ManyToMany(() => Dropzone, (dropzone) => dropzone.instructors)
  @JoinTable()
  dropzones: Dropzone[];

  @Column({ default: true })
  isActive: boolean;
}
