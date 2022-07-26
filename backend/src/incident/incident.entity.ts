import {Column, Entity, ManyToOne, PrimaryGeneratedColumn} from 'typeorm';
import {User} from "../user/user.entity";

@Entity()
export class Incident {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    type: string;

    @Column()
    description: string;

    // @ManyToOne(() => Jump, (jump) => jump.incidents)
    // jump: Jump

    @ManyToOne(() => User, (user) => user.incidents)
    user: User
}