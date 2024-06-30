import { AppDataSource } from '../data-source';
import { Request, Response } from 'express';
import { Car } from '../entities/Car';
import { User } from '../entities/User';
import { CustomError } from '../models/custom-error';
import { cleanupFile, predictImage, predictPrice } from '../utils/preprocess-model-input';
import path = require('path');

interface MulterRequest extends Request {
  file?: Express.Multer.File;
}

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
    'activeVignette',
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
        'activeVignette',
        'vignetteHistory',
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
    let { make, model, year, mileage } = car;
    let brand = make.toLowerCase();
    model = model.toLowerCase();
    if (brand === 'mercedes') {
      brand = 'mercedes-benz';
    }
    const features = {
      brand,
      model,
      year,
      mileage,
    };
    try {
      console.log(`Features: ${JSON.stringify(features)}`);
      let predictedPrice: number = await predictPrice(features);
      predictedPrice = predictedPrice - 0.2 * predictedPrice;
      predictedPrice = Math.round(predictedPrice);
      console.log(`Predicted price: ${predictedPrice}`);
      if (model === 'tiguan' || model === 'touareg') {
        predictedPrice = predictedPrice + 0.4 * predictedPrice;
      }
      return { price: predictedPrice };
    } catch (error) {
      console.error(`Error in predicting price: ${error}`);
      throw new CustomError(500, 'Error in predicting price');
    }
  };

  predictDashboardSymbols = async (req: MulterRequest, res: Response) => {
    const file = req.file as Express.Multer.File;
    if (!file) {
      return res.status(400).send('No image uploaded.');
    }

    const inputPath = path.resolve(file.path);
    const outputPath = path.resolve('processed_images', 'processed-' + file.originalname);

    try {
      const result = await predictImage(inputPath, outputPath);
      console.log('Processing complete, file saved at:', result.image_path);
      console.log('Detected labels:', result.labels);

      cleanupFile(inputPath);

      res.status(200).json({
        imageUrl: `/processed_images/processed-${file.originalname}`,
        labels: result.labels,
      });
    } catch (error) {
      console.error('Failed to process image:', error);
      res.status(500).send('Server error');
    }
  };
}
