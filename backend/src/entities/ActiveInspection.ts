import { Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Car } from './Car';

@Entity()
export class ActiveInspection {
  @PrimaryGeneratedColumn()
  id: number;

  @OneToOne(() => Car, (car) => car.activeInspection, { onDelete: 'CASCADE' })
  @JoinColumn()
  car: Car;

  @Column()
  validFrom: Date;

  @Column()
  validUntil: Date;
}
