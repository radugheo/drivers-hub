import { AppDataSource } from '../data-source';
import { ActiveInsurance } from '../entities/ActiveInsurance';
import { InsuranceHistory } from '../entities/InsuranceHistory';
import { CustomError } from '../models/custom-error';

export class InsuranceController {
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
}
