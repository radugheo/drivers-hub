import { Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Car } from './Car';

@Entity()
export class ActiveVignette {
  @PrimaryGeneratedColumn()
  id: number;

  @OneToOne(() => Car, (car) => car.activeVignette, { onDelete: 'CASCADE' })
  @JoinColumn()
  car: Car;

  @Column({ nullable: true })
  price: number;

  @Column()
  validFrom: Date;

  @Column()
  validUntil: Date;
}
