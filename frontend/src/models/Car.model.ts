import { ActiveInsurance } from "./Active-Insurance.model";
import { ActiveInspection } from "./Active-Inspection.model";
import { ActiveService } from "./Active-Service.model";

export class Car {
  id?: number;
  make: string;
  model: string;
  year: number;
  picture?: string;
  licensePlate: string;
  mileage?: number;
  fuel?: string;
  transmission?: string;
  displacement?: number;
  horsepower?: number;
  vignetteStartDate?: Date;
  vignetteExpiryDate?: Date;
  lastService?: Date;
  nextService?: Date;
  lastServiceMileage?: number;
  nextServiceMileageInterval?: number;
  serviceCompany?: string;
  serviceDetails?: string;
  vin?: string;
  ownerId: string;
  activeInsurance?: ActiveInsurance;
  activeInspection?: ActiveInspection;
  activeService?: ActiveService;
  constructor(
    make: string,
    model: string,
    year: number,
    licensePlate: string,
    mileage: number,
    fuel: string,
    transmission: string,
    displacement: number,
    horsepower: number,
    vignetteStartDate: Date,
    vignetteExpiryDate: Date,
    vin: string,
    ownerId: string,
  ) {
    this.make = make;
    this.model = model;
    this.year = year;
    this.licensePlate = licensePlate;
    this.mileage = mileage;
    this.fuel = fuel;
    this.transmission = transmission;
    this.displacement = displacement;
    this.horsepower = horsepower;
    this.vignetteStartDate = vignetteStartDate;
    this.vignetteExpiryDate = vignetteExpiryDate;
    this.vin = vin;
    this.ownerId = ownerId;
  }
}
