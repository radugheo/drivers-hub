export class ActiveInspection {
  id?: number;
  carId?: number;
  price?: number;
  validFrom?: Date;
  validUntil?: Date;
  constructor(
    carId?: number,
    price?: number,
    validFrom?: Date,
    validUntil?: Date,
  ) {
    this.carId = carId;
    this.price = price;
    this.validFrom = validFrom;
    this.validUntil = validUntil;
  }
}
