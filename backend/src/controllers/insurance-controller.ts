import { Request, Response } from 'express';
import { AppDataSource } from '../data-source';
import { Car } from '../entities/Car';
import { ActiveInsurance } from '../entities/ActiveInsurance';
import { InsuranceHistory } from '../entities/InsuranceHistory';
import { CustomError } from '../models/custom-error';

const updateInsuranceFields = async (insurance, data, carRepository) => {
  const fields = ['policyNumber', 'company', 'picture', 'validFrom', 'validUntil'];

  fields.forEach(async (field) => {
    if (data[field] !== undefined) {
      insurance[field] = data[field];
    }
  });
  if (data.carId) {
    const car = await carRepository.findOne(data.carId);
    if (!car) {
      throw new CustomError(404, 'Car not found');
    }
    insurance.car = car;
  }
};

export class InsuranceController {
  private carRepository = AppDataSource.getRepository(Car);
  private activeInsuranceRepository = AppDataSource.getRepository(ActiveInsurance);
  private insuranceHistoryRepository = AppDataSource.getRepository(InsuranceHistory);

  activeByCar = async (req: Request, res: Response) => {
    const carId = parseInt(req.params.id);
    const car = await this.carRepository.findOneBy({ id: carId });
    if (!car) {
      throw new CustomError(404, 'Car not found');
    }
    const insurances = await this.activeInsuranceRepository.find({
      where: { car: { id: carId } },
      relations: ['car'],
    });
    return insurances;
  };

  saveActive = async (req: Request, res: Response) => {
    const { carId, policyNumber, company, picture, validFrom, validUntil } = req.body;
    console.log(req.body);
    if (!carId || !validFrom || !validUntil) {
      throw new CustomError(400, 'Car id, start date and expiry date are required');
    }
    const car = await this.carRepository.findOneBy({ id: carId });
    if (!car) {
      throw new CustomError(404, 'Car not found');
    }
    const insurance = this.activeInsuranceRepository.create({
      car,
      policyNumber,
      company,
      picture,
      validFrom,
      validUntil,
    });
    await this.activeInsuranceRepository.save(insurance);
    return 'Active insurance inserted';
  };

  updateActive = async (req: Request, res: Response) => {
    const id = parseInt(req.params.id);
    const insurance = await this.activeInsuranceRepository.findOneBy({ id });
    if (!insurance) {
      throw new CustomError(404, 'Insurance not found');
    }
    await updateInsuranceFields(insurance, req.body, this.carRepository);
    await this.activeInsuranceRepository.save(insurance);
    return 'Active insurance updated';
  };

  removeActive = async (req: Request, res: Response) => {
    const id = parseInt(req.params.id);
    const insuranceToRemove = await this.activeInsuranceRepository.findOneBy({ id });
    if (!insuranceToRemove) {
      throw new CustomError(404, 'Insurance not found');
    }
    await this.activeInsuranceRepository.remove(insuranceToRemove);
    return 'Active insurance removed';
  };

  // Insurance history

  historyByCar = async (req: Request, res: Response) => {
    const carId = parseInt(req.params.id);
    const car = await this.carRepository.findOneBy({ id: carId });
    if (!car) {
      throw new CustomError(404, 'Car not found');
    }
    const insurances = await this.insuranceHistoryRepository.find({
      where: { car: { id: carId } },
      relations: ['car'],
    });
    return insurances;
  };

  expireById = async (insuranceId: number) => {
    await AppDataSource.transaction(async (transactionalEntityManager) => {
      const insurance = await transactionalEntityManager.findOne(ActiveInsurance, {
        where: { id: insuranceId },
        relations: ['car'],
      });

      if (!insurance) {
        throw new CustomError(404, 'Insurance not found');
      }

      const history = transactionalEntityManager.create(InsuranceHistory, {
        ...insurance,
        car: insurance.car,
      });

      await transactionalEntityManager.save(InsuranceHistory, history);

      await transactionalEntityManager.remove(ActiveInsurance, insurance);
    });
    return 'Insurance expired';
  };

  removeExpired = async (req: Request, res: Response) => {
    const id = parseInt(req.params.id);
    const insuranceToRemove = await this.insuranceHistoryRepository.findOneBy({ id });
    if (!insuranceToRemove) {
      throw new CustomError(404, 'Insurance not found');
    }
    await this.insuranceHistoryRepository.remove(insuranceToRemove);
    return 'Insurance removed';
  };
}
