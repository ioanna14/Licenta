import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class EmergencyContact {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  phone: string;

  @Column()
  email: string;

  @Column()
  address: string;
}
