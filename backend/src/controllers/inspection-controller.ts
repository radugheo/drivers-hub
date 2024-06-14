import { CustomError } from '../models/custom-error';
import { InspectionHistory } from '../entities/InspectionHistory';
import { AppDataSource } from '../data-source';
import { ActiveInspection } from '../entities/ActiveInspection';

export class InspectionController {
  expireById = async (inspectionId: number) => {
    await AppDataSource.transaction(async (transactionalEntityManager) => {
      const inspection = await transactionalEntityManager.findOne(ActiveInspection, {
        where: { id: inspectionId },
        relations: ['car'],
      });

      if (!inspection) {
        throw new CustomError(404, 'Inspection not found');
      }

      const history = transactionalEntityManager.create(InspectionHistory, {
        ...inspection,
        car: inspection.car,
      });

      await transactionalEntityManager.save(InspectionHistory, history);

      await transactionalEntityManager.remove(ActiveInspection, inspection);
    });
    return 'Inspection expired';
  };
}
