import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { User } from './User';

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
  insuranceStartDate: Date;

  @Column({ nullable: true })
  insuranceExpiryDate: Date;

  @Column({ nullable: true })
  insurancePolicyNumber: string;

  @Column({ nullable: true })
  insuranceCompany: string;

  @Column({ nullable: true })
  insurancePicture: string;

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
  lastService: Date;

  @Column({ nullable: true })
  nextService: Date;

  @Column({ nullable: true })
  nextServiceMileage: number;

  @Column({ nullable: true })
  vin: string;

  @ManyToOne(() => User, (owner) => owner.cars)
  owner: User;
}
