export class ActiveVignette {
  id?: number;
  carId?: number;
  validFrom?: Date;
  validUntil?: Date;
  constructor(carId?: number, validFrom?: Date, validUntil?: Date) {
    this.carId = carId;
    this.validFrom = validFrom;
    this.validUntil = validUntil;
  }
}
