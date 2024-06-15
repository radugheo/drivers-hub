export class ActiveService {
  id?: number;
  carId?: number;
  price?: number;
  validFrom?: Date;
  validUntil?: Date;
  serviceMileage?: number;
  mileageInterval?: number;
  companyName?: string;
  description?: string;
  constructor(
    carId?: number,
    price?: number,
    validFrom?: Date,
    validUntil?: Date,
    serviceMileage?: number,
    mileageInterval?: number,
    companyName?: string,
    description?: string,
  ) {
    this.carId = carId;
    this.price = price;
    this.validFrom = validFrom;
    this.validUntil = validUntil;
    this.serviceMileage = serviceMileage;
    this.mileageInterval = mileageInterval;
    this.companyName = companyName;
    this.description = description;
  }
}
