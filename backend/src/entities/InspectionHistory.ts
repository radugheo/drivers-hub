import { Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Car } from './Car';

@Entity()
export class InspectionHistory {
  @PrimaryGeneratedColumn()
  id: number;

  @OneToOne(() => Car, (car) => car.inspectionHistory, { onDelete: 'CASCADE' })
  @JoinColumn()
  car: Car;

  @Column()
  validFrom: Date;

  @Column()
  validUntil: Date;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;
}