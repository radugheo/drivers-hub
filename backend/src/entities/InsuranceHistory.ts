import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Car } from './Car';

@Entity()
export class InsuranceHistory {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Car, (car) => car.insuranceHistory, { onDelete: 'CASCADE' })
  @JoinColumn()
  car: Car;

  @Column({ nullable: true })
  validFrom: Date;

  @Column({ nullable: true })
  validUntil: Date;

  @Column({ nullable: true })
  price: number;

  @Column({ nullable: true })
  policyNumber: string;

  @Column({ nullable: true })
  company: string;

  @Column({ nullable: true })
  picture: string;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;
}
