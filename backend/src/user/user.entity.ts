import {Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn} from 'typeorm';
import {EmergencyContact} from "../emergencyContact/emergencyContact.entity";

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    phone: string;

    @Column()
    email: string;

    @Column()
    password: string;

    @Column()
    address: string;

    @Column()
    birthDate: Date;

    @Column()
    userType: string;

    @Column()
    licenseId: number;

    @OneToOne(() => EmergencyContact, emergencyContact => emergencyContact.user)
    @JoinColumn()
    emergencyContact: EmergencyContact;

    @Column({default: true})
    isActive: boolean;
}