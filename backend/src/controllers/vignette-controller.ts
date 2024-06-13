import { Request, Response } from 'express';
import { CustomError } from '../models/custom-error';
import { VignetteHistory } from '../entities/VignetteHistory';
import { AppDataSource } from '../data-source';
import { Car } from '../entities/Car';
import { ActiveVignette } from '../entities/ActiveVignette';

const updateVignetteFields = async (vignette, data, carRepository) => {
  const fields = ['validFrom', 'validUntil'];

  fields.forEach(async (field) => {
    if (data[field] !== undefined) {
      vignette[field] = data[field];
    }
  });
  if (data.carId) {
    const car = await carRepository.findOne(data.carId);
    if (!car) {
      throw new CustomError(404, 'Car not found');
    }
    vignette.car = car;
  }
};

export class VignetteController {
  private carRepository = AppDataSource.getRepository(Car);
  private activeVignetteRepository = AppDataSource.getRepository(ActiveVignette);
  private vignetteHistoryRepository = AppDataSource.getRepository(VignetteHistory);

  activeByCar = async (req: Request, res: Response) => {
    const carId = parseInt(req.params.id);
    const car = await this.carRepository.findOneBy({ id: carId });
    if (!car) {
      throw new CustomError(404, 'Car not found');
    }
    const vignettes = await this.activeVignetteRepository.find({
      where: { car: { id: carId } },
      relations: ['car'],
    });
    return vignettes;
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
    const vignette = this.activeVignetteRepository.create({
      car,
      validFrom,
      validUntil,
    });
    await this.activeVignetteRepository.save(vignette);
    return 'Active vignette inserted';
  };

  updateActive = async (req: Request, res: Response) => {
    const id = parseInt(req.params.id);
    const vignette = await this.activeVignetteRepository.findOneBy({ id });
    if (!vignette) {
      throw new CustomError(404, 'Vignette not found');
    }
    await updateVignetteFields(vignette, req.body, this.carRepository);
    await this.activeVignetteRepository.save(vignette);
    return 'Active vignette updated';
  };

  removeActive = async (req: Request, res: Response) => {
    const id = parseInt(req.params.id);
    const vignetteToRemove = await this.activeVignetteRepository.findOneBy({ id });
    if (!vignetteToRemove) {
      throw new CustomError(404, 'Vignette not found');
    }
    await this.activeVignetteRepository.remove(vignetteToRemove);
    return 'Active vignette removed';
  };

  // Vignette history

  historyByCar = async (req: Request, res: Response) => {
    const carId = parseInt(req.params.id);
    const car = await this.carRepository.findOneBy({ id: carId });
    if (!car) {
      throw new CustomError(404, 'Car not found');
    }
    const vignettes = await this.vignetteHistoryRepository.find({
      where: { car: { id: carId } },
      relations: ['car'],
    });
    return vignettes;
  };

  expireById = async (vignetteId: number) => {
    await AppDataSource.transaction(async (transactionalEntityManager) => {
      const vignette = await transactionalEntityManager.findOne(ActiveVignette, {
        where: { id: vignetteId },
        relations: ['car'],
      });

      if (!vignette) {
        throw new CustomError(404, 'Vignette not found');
      }

      const history = transactionalEntityManager.create(VignetteHistory, {
        ...vignette,
        car: vignette.car,
      });

      await transactionalEntityManager.save(VignetteHistory, history);

      await transactionalEntityManager.remove(ActiveVignette, vignette);
    });
    return 'Vignette expired';
  };

  removeExpired = async (req: Request, res: Response) => {
    const id = parseInt(req.params.id);
    const vignetteToRemove = await this.vignetteHistoryRepository.findOneBy({ id });
    if (!vignetteToRemove) {
      throw new CustomError(404, 'Vignette not found');
    }
    await this.vignetteHistoryRepository.remove(vignetteToRemove);
    return 'Vignette removed';
  };
}
