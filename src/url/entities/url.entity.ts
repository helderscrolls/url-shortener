import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Url {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  epj: number;

  @Column({ default: 0 })
  numberOfRedirects: number;

  @Column()
  urlCode: string;

  @Column()
  longUrl: string;

  @Column()
  shortUrl: string;

  @Column()
  publisher: string;
}
