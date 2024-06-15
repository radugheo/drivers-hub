import { AppDataSource } from '../data-source';
import { ActiveService } from '../entities/ActiveService';
import { ServiceHistory } from '../entities/ServiceHistory';
import { CustomError } from '../models/custom-error';

export class ServiceController {
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
}
