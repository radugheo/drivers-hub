import { CustomError } from '../models/custom-error';
import { VignetteHistory } from '../entities/VignetteHistory';
import { AppDataSource } from '../data-source';
import { ActiveVignette } from '../entities/ActiveVignette';

export class VignetteController {
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
}
