import {Column, Entity, OneToOne, PrimaryGeneratedColumn} from 'typeorm';
import {User} from "../user/user.entity";

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

    @OneToOne(() => User, user => user.emergencyContact)
    user: User;
}