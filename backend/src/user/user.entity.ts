import {Column, Entity, JoinColumn, OneToMany, OneToOne, PrimaryGeneratedColumn} from 'typeorm';
import {EmergencyContact} from "../emergencyContact/emergencyContact.entity";
import {License} from "../license/license.entity";
import {Incident} from "../incident/incident.entity";
import {Parachute} from "../parachute/parachute.entity";

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

    @OneToOne(() => License, license => license.user)
    @JoinColumn()
    license: License;

    @OneToOne(() => EmergencyContact, emergencyContact => emergencyContact.user)
    @JoinColumn()
    emergencyContact: EmergencyContact;

    @OneToOne(() => Parachute, parachute => parachute.user)
    @JoinColumn()
    parachute: Parachute;

    @OneToMany(() => Incident, (incident) => incident.user)
    incidents: Incident[]

    @Column({default: true})
    isActive: boolean;
}