export class Car {
  id?: number;
  make: string;
  model: string;
  year: number;
  picture?: string;
  licensePlate: string;
  ownerId: string;
  constructor(
    make: string,
    model: string,
    year: number,
    licensePlate: string,
    ownerId: string,
  ) {
    this.make = make;
    this.model = model;
    this.year = year;
    this.licensePlate = licensePlate;
    this.ownerId = ownerId;
  }
}
