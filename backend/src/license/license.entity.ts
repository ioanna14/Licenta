import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class License {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  identifier: string;

  @Column()
  category: string;

  @Column()
  releaseDate: Date;

  @Column()
  expirationDate: Date;
}
