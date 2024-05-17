import { AppDataSource } from '../data-source';
import { Request, Response } from 'express';
import { Car } from '../entities/Car';
import { User } from '../entities/User';
import { CustomError } from '../models/custom-error';
import { predictPrice } from '../utils/preprocess-model-input';

const updateCarFields = async (car, data, userRepository) => {
  const fields = [
    'make',
    'model',
    'year',
    'color',
    'licensePlate',
    'mileage',
    'horsepower',
    'displacement',
    'transmission',
    'fuel',
    'vin',
    'activeInsurance',
    'activeInspection',
    'activeService',
  ];

  fields.forEach(async (field) => {
    if (data[field] !== undefined) {
      car[field] = data[field];
    }
  });

  if (data.ownerId) {
    const owner = await userRepository.findOne(data.ownerId);
    if (!owner) {
      throw new CustomError(404, 'Owner not found');
    }
    car.owner = owner;
  }
};

export class CarController {
  private carRepository = AppDataSource.getRepository(Car);
  private userRepository = AppDataSource.getRepository(User);

  all = async (req: Request, res: Response) => {
    return await this.carRepository.find();
  };

  allByOwner = async (req: Request, res: Response) => {
    const ownerId = parseInt(req.params.id);
    const owner = await this.userRepository.findOneBy({ id: ownerId });
    if (!owner) {
      throw new CustomError(404, 'Owner not found');
    }
    const cars = await this.carRepository.find({
      where: { owner: { id: ownerId } },
      relations: [
        'owner',
        'activeInsurance',
        'insuranceHistory',
        'activeInspection',
        'inspectionHistory',
        'activeService',
        'serviceHistory',
      ],
    });
    return cars;
  };

  one = async (req: Request, res: Response) => {
    const id = parseInt(req.params.id);
    const car = await this.carRepository.findOneBy({ id });
    if (!car) {
      throw new CustomError(404, 'Car not found');
    }
    return car;
  };

  save = async (req: Request, res: Response) => {
    const {
      make,
      model,
      year,
      ownerId,
      color,
      licensePlate,
      mileage,
      horsepower,
      displacement,
      transmission,
      fuel,
      vin,
    } = req.body;
    console.log(JSON.stringify(req.body));
    if (!make || !model || !year || !ownerId) {
      throw new CustomError(400, 'Mandatory fields are required');
    }
    const owner = await this.userRepository.findOneBy({ id: ownerId });
    if (!owner) {
      throw new CustomError(404, 'Owner not found');
    }
    const car = this.carRepository.create({
      make,
      model,
      year,
      owner,
      color,
      licensePlate,
      mileage,
      horsepower,
      displacement,
      transmission,
      fuel,
      vin,
    });
    await this.carRepository.save(car);
    return 'Car inserted';
  };
  remove = async (req: Request, res: Response) => {
    const id = parseInt(req.params.id);
    const carToRemove = await this.carRepository.findOneBy({ id });
    if (!carToRemove) {
      throw new CustomError(404, 'Car not found');
    }
    await this.carRepository.remove(carToRemove);
    return 'Car removed';
  };
  update = async (req: Request, res: Response) => {
    const id = parseInt(req.params.id);
    const car = await this.carRepository.findOneBy({ id });
    if (!car) {
      throw new CustomError(404, 'Car not found');
    }
    await updateCarFields(car, req.body, this.userRepository);
    await this.carRepository.save(car);
    return 'Car updated';
  };
  predictPrice = async (req: Request, res: Response) => {
    const id = parseInt(req.params.id);
    const car = await this.carRepository.findOneBy({ id });
    if (!car) {
      throw new CustomError(404, 'Car not found');
    }
    let { make, model, year, mileage, displacement, transmission, fuel } = car;
    let brand = make.toLowerCase();
    model = model.toLowerCase();
    let fuel_type = fuel.toLowerCase();
    let automatic_transmission = 0;
    transmission === 'Automatic' ? (automatic_transmission = 1) : (automatic_transmission = 0);
    let engine_size = displacement / 1000;
    if (brand === 'mercedes') {
      brand = 'mercedes-benz';
    }
    const features = {
      brand: 'volkswagen',
      model: 'tiguan',
      year: 2012,
      mileage: 200000,
      engine_size: 2.0,
      automatic_transmission: 0,
      fuel_type: 'diesel',
    };
    try {
      console.log(`Features: ${JSON.stringify(features)}`);
      let predictedPrice: number = await predictPrice(features);
      predictedPrice = Math.round(predictedPrice);
      // predictedPrice = predictedPrice - 0.2 * predictedPrice;
      console.log(`Predicted price: ${predictedPrice}`);

      return { price: predictedPrice };
    } catch (error) {
      console.error(`Error in predicting price: ${error}`);
      throw new CustomError(500, 'Error in predicting price');
    }
  };
}
