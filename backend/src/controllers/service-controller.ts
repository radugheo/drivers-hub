import { Request, Response } from 'express';
import { AppDataSource } from '../data-source';
import { ActiveService } from '../entities/ActiveService';
import { Car } from '../entities/Car';
import { ServiceHistory } from '../entities/ServiceHistory';
import { CustomError } from '../models/custom-error';

const updateServiceFields = async (service, data, carRepository) => {
  const fields = ['validFrom', 'validUntil', 'serviceMileage', 'mileageInterval', 'companyName', 'description'];

  fields.forEach(async (field) => {
    if (data[field] !== undefined) {
      service[field] = data[field];
    }
  });
  if (data.carId) {
    const car = await carRepository.findOne(data.carId);
    if (!car) {
      throw new CustomError(404, 'Car not found');
    }
    service.car = car;
  }
};

export class ServiceController {
  private carRepository = AppDataSource.getRepository(Car);
  private activeServiceRepository = AppDataSource.getRepository(ActiveService);
  private serviceHistoryRepository = AppDataSource.getRepository(ServiceHistory);

  activeByCar = async (req: Request, res: Response) => {
    const carId = parseInt(req.params.id);
    const car = await this.carRepository.findOneBy({ id: carId });
    if (!car) {
      throw new CustomError(404, 'Car not found');
    }
    const services = await this.activeServiceRepository.find({
      where: { car: { id: carId } },
      relations: ['car'],
    });
    return services;
  };

  saveActive = async (req: Request, res: Response) => {
    const { carId, validFrom, validUntil, serviceMileage, mileageInterval, companyName, description } = req.body;
    console.log(req.body);
    if (!carId || !validFrom || !validUntil) {
      throw new CustomError(400, 'Car id, valid from and valid until are required');
    }
    const car = await this.carRepository.findOneBy({ id: carId });
    if (!car) {
      throw new CustomError(404, 'Car not found');
    }
    const service = this.activeServiceRepository.create({
      car,
      validFrom,
      validUntil,
      serviceMileage,
      mileageInterval,
      companyName,
      description,
    });
    await this.activeServiceRepository.save(service);
    return 'Active service inserted';
  };

  updateActive = async (req: Request, res: Response) => {
    const id = parseInt(req.params.id);
    const service = await this.activeServiceRepository.findOneBy({ id });
    if (!service) {
      throw new CustomError(404, 'Service not found');
    }
    await updateServiceFields(service, req.body, this.carRepository);
    await this.activeServiceRepository.save(service);
    return 'Active service updated';
  };

  removeActive = async (req: Request, res: Response) => {
    const id = parseInt(req.params.id);
    const serviceToRemove = await this.activeServiceRepository.findOneBy({ id });
    if (!serviceToRemove) {
      throw new CustomError(404, 'Service not found');
    }
    await this.activeServiceRepository.remove(serviceToRemove);
    return 'Active service removed';
  };

  // Service history

  historyByCar = async (req: Request, res: Response) => {
    const carId = parseInt(req.params.id);
    const car = await this.carRepository.findOneBy({ id: carId });
    if (!car) {
      throw new CustomError(404, 'Car not found');
    }
    const services = await this.serviceHistoryRepository.find({
      where: { car: { id: carId } },
      relations: ['car'],
    });
    return services;
  };

  expireById = async (serviceId: number) => {
    await AppDataSource.transaction(async (transactionalEntityManager) => {
      const service = await transactionalEntityManager.findOne(ActiveService, {
        where: { id: serviceId },
        relations: ['car'],
      });

      if (!service) {
        throw new CustomError(404, 'Service not found');
      }

      const history = transactionalEntityManager.create(ServiceHistory, {
        ...service,
        car: service.car,
      });

      await transactionalEntityManager.save(ServiceHistory, history);

      await transactionalEntityManager.remove(ActiveService, service);
    });
  };

  removeExpired = async (req: Request, res: Response) => {
    const id = parseInt(req.params.id);
    const serviceToRemove = await this.serviceHistoryRepository.findOneBy({ id });
    if (!serviceToRemove) {
      throw new CustomError(404, 'Service not found');
    }
    await this.serviceHistoryRepository.remove(serviceToRemove);
    return 'Service removed';
  };
}
