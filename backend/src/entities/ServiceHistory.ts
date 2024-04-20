import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Car } from './Car';

@Entity()
export class ServiceHistory {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Car, (car) => car.serviceHistory)
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

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;
}
