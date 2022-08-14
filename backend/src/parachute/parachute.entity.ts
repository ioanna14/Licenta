import {Column, Entity, JoinColumn, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn} from 'typeorm';
import {User} from "../user/user.entity";
import {Folding} from "../folding/folding.entity";
import {Jump} from "../jump/jump.entity";
import {Dropzone} from "../dropzone/dropzone.entity";

@Entity()
export class Parachute {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    type: string;

    @Column()
    reserveParachuteId: string;

    @OneToMany(() => Folding, (folding) => folding.parachute)
    @JoinColumn()
    foldings: Folding[];

    @OneToOne(() => User)
    user: User;

    @OneToMany(() => Jump, (jump) => jump.parachute)
    @JoinColumn()
    jumps: Jump[];

    @ManyToOne(() => Dropzone, (dropzone) => dropzone.parachutes)
    dropzone: Dropzone;
}