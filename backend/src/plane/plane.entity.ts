import {Column, Entity, JoinColumn, JoinTable, ManyToMany, OneToMany, OneToOne, PrimaryGeneratedColumn} from 'typeorm';
import {User} from "../user/user.entity";
import {Folding} from "../folding/folding.entity";
import {Jump} from "../jump/jump.entity";
import {Dropzone} from "../dropzone/dropzone.entity";

@Entity()
export class Plane {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    capacity: number;

    @Column()
    verificationDate: Date;

    @OneToMany(() => Jump, (jump) => jump.plane)
    @JoinColumn()
    jumps: Jump[];

    @ManyToMany(() => Dropzone, (dropzone) => dropzone.planes)
    @JoinTable()
    dropzones: Dropzone[];
}