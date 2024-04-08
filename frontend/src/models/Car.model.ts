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
  insuranceStartDate?: Date;
  insuranceExpiryDate?: Date;
  insurancePolicyNumber?: string;
  insuranceCompany?: string;
  insurancePicture?: string;
  lastService?: Date;
  nextService?: Date;
  vin?: string;
  ownerId: string;
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
    insuranceStartDate: Date,
    insuranceExpiryDate: Date,
    insurancePolicyNumber: string,
    insuranceCompany: string,
    insurancePicture: string,
    lastService: Date,
    nextService: Date,
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
    this.insuranceStartDate = insuranceStartDate;
    this.insuranceExpiryDate = insuranceExpiryDate;
    this.insurancePolicyNumber = insurancePolicyNumber;
    this.insuranceCompany = insuranceCompany;
    this.insurancePicture = insurancePicture;
    this.lastService = lastService;
    this.nextService = nextService;
    this.vin = vin;
    this.ownerId = ownerId;
  }
}
