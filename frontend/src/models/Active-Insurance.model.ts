export class ActiveInsurance {
  id?: number;
  carId?: number;
  startDate?: Date;
  expiryDate?: Date;
  policyNumber?: string;
  company?: string;
  picture?: string;
  constructor(
    carId?: number,
    startDate?: Date,
    expiryDate?: Date,
    policyNumber?: string,
    company?: string,
    picture?: string,
  ) {
    this.carId = carId;
    this.startDate = startDate;
    this.expiryDate = expiryDate;
    this.policyNumber = policyNumber;
    this.company = company;
    this.picture = picture;
  }
}
