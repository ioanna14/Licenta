import {Column, Entity, JoinColumn, ManyToOne, OneToOne, PrimaryGeneratedColumn} from 'typeorm';
import {User} from "../user/user.entity";
import {Parachute} from "../parachute/parachute.entity";

@Entity()
export class Folding {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    date: Date;

    @Column()
    expirationDate: Date;

    @ManyToOne(() => Parachute, (parachute) => parachute.foldings)
    parachute: Parachute

    // @OneToOne(() => User, (user) => user.userType)
    // folder: User
    //
    // @OneToOne(() => User, (user) => user.userType)
    // instructor: User
}