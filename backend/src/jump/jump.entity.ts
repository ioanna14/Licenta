import {Column, Entity, JoinColumn, ManyToOne, OneToOne, PrimaryGeneratedColumn} from 'typeorm';
import {User} from "../user/user.entity";
import {Parachute} from "../parachute/parachute.entity";

@Entity()
export class Jump {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    altitude: number;

    @Column()
    exercise: string;

    @Column()
    date: Date;

    @Column()
    // @JoinColumn()
    incidentId: number;

    @ManyToOne(() => User, user => user.jumps)
    user: User;

    @ManyToOne(() => Parachute)
    parachute: Parachute;
}