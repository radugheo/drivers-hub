import { Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Car } from './Car';

@Entity()
export class ActiveInsurance {
  @PrimaryGeneratedColumn()
  id: number;

  @OneToOne(() => Car, (car) => car.activeInsurance, { onDelete: 'CASCADE' })
  @JoinColumn()
  car: Car;

  @Column()
  startDate: Date;

  @Column()
  expiryDate: Date;

  @Column({ nullable: true })
  policyNumber: string;

  @Column({ nullable: true })
  company: string;

  @Column({ nullable: true })
  picture: string;
}
