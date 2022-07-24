import {Column, Entity, OneToOne, PrimaryGeneratedColumn} from 'typeorm';
import {User} from "../user/user.entity";

@Entity()
export class License {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    category: string;

    @Column()
    releaseDate: Date;

    @Column()
    expirationDate: Date;

    @OneToOne(() => User, user => user.emergencyContact)
    user: User;
}