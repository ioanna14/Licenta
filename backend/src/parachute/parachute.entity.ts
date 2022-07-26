import {Column, Entity, JoinColumn, OneToMany, OneToOne, PrimaryGeneratedColumn} from 'typeorm';
import {User} from "../user/user.entity";
import {Folding} from "../folding/folding.entity";

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
    foldings: Folding[]

    @OneToOne(() => User, (user) => user.parachute)
    user: User

    // @ManyToOne(() => Dropzone, (dropzone) => dropzone.parachutes)
    // dropzone: Dropzone
}