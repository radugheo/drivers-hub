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
  validFrom: Date;

  @Column()
  validUntil: Date;

  @Column({ nullable: true })
  price: number;

  @Column({ nullable: true })
  policyNumber: string;

  @Column({ nullable: true })
  company: string;

  @Column({ nullable: true })
  picture: string;
}
