import { ActiveInsurance } from "./Active-Insurance.model";
import { ActiveInspection } from "./Active-Inspection.model";

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
    lastInspection: Date,
    nextInspection: Date,
    lastService: Date,
    nextService: Date,
    lastServiceMileage: number,
    nextServiceMileageInterval: number,
    serviceCompany: string,
    serviceDetails: string,
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
    this.lastService = lastService;
    this.nextService = nextService;
    this.lastServiceMileage = lastServiceMileage;
    this.nextServiceMileageInterval = nextServiceMileageInterval;
    this.serviceCompany = serviceCompany;
    this.serviceDetails = serviceDetails;
    this.vin = vin;
    this.ownerId = ownerId;
  }
}
