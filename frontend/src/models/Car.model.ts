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
  vin: string;
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
    this.vin = vin;
    this.ownerId = ownerId;
  }
}
