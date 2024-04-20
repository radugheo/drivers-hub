import { Request, Response } from 'express';
import { CustomError } from '../models/custom-error';
import { InspectionHistory } from '../entities/InspectionHistory';
import { AppDataSource } from '../data-source';
import { Car } from '../entities/Car';
import { ActiveInspection } from '../entities/ActiveInspection';

const updateInspectionFields = async (inspection, data, carRepository) => {
  const fields = ['validFrom', 'validUntil'];

  fields.forEach(async (field) => {
    if (data[field] !== undefined) {
      inspection[field] = data[field];
    }
  });
  if (data.carId) {
    const car = await carRepository.findOne(data.carId);
    if (!car) {
      throw new CustomError(404, 'Car not found');
    }
    inspection.car = car;
  }
};

export class InspectionController {
  private carRepository = AppDataSource.getRepository(Car);
  private activeInspectionRepository = AppDataSource.getRepository(ActiveInspection);
  private inspectionHistoryRepository = AppDataSource.getRepository(InspectionHistory);

  activeByCar = async (req: Request, res: Response) => {
    const carId = parseInt(req.params.id);
    const car = await this.carRepository.findOneBy({ id: carId });
    if (!car) {
      throw new CustomError(404, 'Car not found');
    }
    const inspections = await this.activeInspectionRepository.find({
      where: { car: { id: carId } },
      relations: ['car'],
    });
    return inspections;
  };

  saveActive = async (req: Request, res: Response) => {
    const { carId, validFrom, validUntil } = req.body;
    console.log(req.body);
    if (!carId || !validFrom || !validUntil) {
      throw new CustomError(400, 'Car id, start date and expiry date are required');
    }
    const car = await this.carRepository.findOneBy({ id: carId });
    if (!car) {
      throw new CustomError(404, 'Car not found');
    }
    const inspection = this.activeInspectionRepository.create({
      car,
      validFrom,
      validUntil,
    });
    await this.activeInspectionRepository.save(inspection);
    return 'Active inspection inserted';
  };

  updateActive = async (req: Request, res: Response) => {
    const id = parseInt(req.params.id);
    const inspection = await this.activeInspectionRepository.findOneBy({ id });
    if (!inspection) {
      throw new CustomError(404, 'Inspection not found');
    }
    await updateInspectionFields(inspection, req.body, this.carRepository);
    await this.activeInspectionRepository.save(inspection);
    return 'Active inspection updated';
  };

  removeActive = async (req: Request, res: Response) => {
    const id = parseInt(req.params.id);
    const inspectionToRemove = await this.activeInspectionRepository.findOneBy({ id });
    if (!inspectionToRemove) {
      throw new CustomError(404, 'Inspection not found');
    }
    await this.activeInspectionRepository.remove(inspectionToRemove);
    return 'Active inspection removed';
  };

  // Inspection history

  historyByCar = async (req: Request, res: Response) => {
    const carId = parseInt(req.params.id);
    const car = await this.carRepository.findOneBy({ id: carId });
    if (!car) {
      throw new CustomError(404, 'Car not found');
    }
    const inspections = await this.inspectionHistoryRepository.find({
      where: { car: { id: carId } },
      relations: ['car'],
    });
    return inspections;
  };

  expire = async (req: Request, res: Response) => {
    const id = parseInt(req.params.id);
    const inspection = await this.inspectionHistoryRepository.findOneBy({ id });
    if (!inspection) {
      throw new CustomError(404, 'Inspection not found');
    }
    const history = this.inspectionHistoryRepository.create(inspection);
    await this.inspectionHistoryRepository.save(history);
    await this.activeInspectionRepository.remove(inspection);
    return 'Inspection expired';
  };

  removeExpired = async (req: Request, res: Response) => {
    const id = parseInt(req.params.id);
    const inspectionToRemove = await this.inspectionHistoryRepository.findOneBy({ id });
    if (!inspectionToRemove) {
      throw new CustomError(404, 'Inspection not found');
    }
    await this.inspectionHistoryRepository.remove(inspectionToRemove);
    return 'Inspection removed';
  };
}
