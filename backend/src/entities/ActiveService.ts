import { Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Car } from './Car';

@Entity()
export class ActiveService {
  @PrimaryGeneratedColumn()
  id: number;

  @OneToOne(() => Car, (car) => car.activeService, { onDelete: 'CASCADE' })
  @JoinColumn()
  car: Car;

  @Column()
  validFrom: Date;

  @Column()
  validUntil: Date;

  @Column({ nullable: true })
  serviceMileage: number;

  @Column({ nullable: true })
  mileageInterval: number;

  @Column({ nullable: true })
  companyName: string;

  @Column({ nullable: true })
  description: string;
}
