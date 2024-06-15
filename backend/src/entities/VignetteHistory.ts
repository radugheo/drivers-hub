import { Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Car } from './Car';

@Entity()
export class VignetteHistory {
  @PrimaryGeneratedColumn()
  id: number;

  @OneToOne(() => Car, (car) => car.vignetteHistory, { onDelete: 'CASCADE' })
  @JoinColumn()
  car: Car;

  @Column()
  validFrom: Date;

  @Column()
  validUntil: Date;

  @Column({ nullable: true })
  price: number;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;
}
