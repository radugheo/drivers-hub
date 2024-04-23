import { Column, Entity, JoinColumn, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import { User } from './User';
import { InsuranceHistory } from './InsuranceHistory';
import { ActiveInsurance } from './ActiveInsurance';
import { ActiveInspection } from './ActiveInspection';
import { InspectionHistory } from './InspectionHistory';
import { ActiveService } from './ActiveService';
import { ServiceHistory } from './ServiceHistory';

@Entity()
export class Car {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: true })
  picture: string;

  @Column()
  make: string;

  @Column()
  model: string;

  @Column()
  year: number;

  @Column({ nullable: true })
  color: string;

  @Column({ nullable: true })
  licensePlate: string;

  @Column({ nullable: true })
  mileage: number;

  @Column({ nullable: true })
  horsepower: number;

  @Column({ nullable: true })
  displacement: number;

  @Column({ nullable: true })
  transmission: string;

  @Column({ nullable: true })
  fuel: string;

  @Column({ nullable: true })
  vin: string;

  @ManyToOne(() => User, (owner) => owner.cars)
  owner: User;

  @OneToOne(() => ActiveInsurance, (insurance) => insurance.car, {
    cascade: true,
    onDelete: 'CASCADE',
  })
  activeInsurance: ActiveInsurance;

  @OneToMany(() => InsuranceHistory, (insurance) => insurance.car, {
    cascade: true,
    onDelete: 'CASCADE',
  })
  insuranceHistory: InsuranceHistory[];

  @OneToOne(() => ActiveInspection, (inspection) => inspection.car, {
    cascade: true,
    onDelete: 'CASCADE',
  })
  activeInspection: ActiveInspection;

  @OneToMany(() => InspectionHistory, (inspection) => inspection.car, {
    cascade: true,
    onDelete: 'CASCADE',
  })
  inspectionHistory: InspectionHistory[];

  @OneToOne(() => ActiveService, (service) => service.car, {
    cascade: true,
    onDelete: 'CASCADE',
  })
  activeService: ActiveService;

  @OneToMany(() => ServiceHistory, (service) => service.car, {
    cascade: true,
    onDelete: 'CASCADE',
  })
  serviceHistory: ServiceHistory[];
}
