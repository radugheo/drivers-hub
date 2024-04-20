export class ActiveInsurance {
  id?: number;
  carId?: number;
  validFrom?: Date;
  validUntil?: Date;
  policyNumber?: string;
  company?: string;
  picture?: string;
  constructor(
    carId?: number,
    validFrom?: Date,
    validUntil?: Date,
    policyNumber?: string,
    company?: string,
    picture?: string,
  ) {
    this.carId = carId;
    this.validFrom = validFrom;
    this.validUntil = validUntil;
    this.policyNumber = policyNumber;
    this.company = company;
    this.picture = picture;
  }
}
