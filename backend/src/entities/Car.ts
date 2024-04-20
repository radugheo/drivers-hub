import { Column, Entity, JoinColumn, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import { User } from './User';
import { InsuranceHistory } from './InsuranceHistory';
import { ActiveInsurance } from './ActiveInsurance';
import { ActiveInspection } from './ActiveInspection';
import { InspectionHistory } from './InspectionHistory';

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
  cascoStartDate: Date;

  @Column({ nullable: true })
  cascoExpiryDate: Date;

  @Column({ nullable: true })
  cascoPolicyNumber: string;

  @Column({ nullable: true })
  cascoCompany: string;

  @Column({ nullable: true })
  cascoPicture: string;

  @Column({ nullable: true })
  vignetteStartDate: Date;

  @Column({ nullable: true })
  vignetteExpiryDate: Date;

  @Column({ nullable: true })
  lastService: Date;

  @Column({ nullable: true })
  nextService: Date;

  @Column({ nullable: true })
  lastServiceMileage: number;

  @Column({ nullable: true })
  nextServiceMileageInterval: number;

  @Column({ nullable: true })
  serviceCompany: string;

  @Column({ nullable: true })
  serviceDetails: string;

  @Column({ nullable: true })
  vin: string;

  @ManyToOne(() => User, (owner) => owner.cars)
  owner: User;

  @OneToOne(() => ActiveInsurance, (insurance) => insurance.car, {
    cascade: true,
    onDelete: 'CASCADE',
  })
  activeInsurance: ActiveInsurance;

  @OneToMany(() => InsuranceHistory, (insurance) => insurance.car)
  insuranceHistory: InsuranceHistory[];

  @OneToOne(() => ActiveInspection, (inspection) => inspection.car, {
    cascade: true,
    onDelete: 'CASCADE',
  })
  activeInspection: ActiveInspection;

  @OneToMany(() => InspectionHistory, (inspection) => inspection.car)
  inspectionHistory: InspectionHistory[];
}
