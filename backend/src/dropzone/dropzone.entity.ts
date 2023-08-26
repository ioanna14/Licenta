import {Column, Entity, JoinColumn, ManyToMany, OneToMany, PrimaryGeneratedColumn} from 'typeorm';
import {User} from "../user/user.entity";
import {Folding} from "../folding/folding.entity";
import {Parachute} from "../parachute/parachute.entity";

@Entity()
export class Dropzone {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    address: string;

    @Column()
    description: string;

    @ManyToMany(() => User, (instructor) => instructor.dropzones)
    instructors: User[];

    @ManyToMany(() => User, (pilot) => pilot.dropzones)
    pilots: User[];

    @OneToMany(() => Parachute, (parachute) => parachute.dropzone)
    @JoinColumn()
    parachutes: Parachute[];
}