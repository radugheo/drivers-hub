import { endOfDay, subDays } from 'date-fns';
import { InsuranceController } from '../controllers/insurance-controller';
import { AppDataSource } from '../data-source';
import { ActiveInsurance } from '../entities/ActiveInsurance';
import { LessThanOrEqual } from 'typeorm';
import { InspectionController } from '../controllers/inspection-controller';
import { ServiceController } from '../controllers/service-controller';
import { ActiveInspection } from '../entities/ActiveInspection';
import { ActiveService } from '../entities/ActiveService';
import { VignetteController } from '../controllers/vignette-controller';
import { ActiveVignette } from '../entities/ActiveVignette';

export const checkAndExpireInsurances = async () => {
  const yesterday = endOfDay(subDays(new Date(), 1));

  const insuranceController = new InsuranceController();
  const activeInsurances = await AppDataSource.getRepository(ActiveInsurance).find({
    where: {
      validUntil: LessThanOrEqual(yesterday),
    },
  });

  console.log('Found insurances to expire:', activeInsurances);

  for (const insurance of activeInsurances) {
    try {
      const result = await insuranceController.expireById(insurance.id);
      console.log(`Expired insurance with id ${insurance.id}: ${result}`);
    } catch (error) {
      console.error('Error expiring insurance:', error);
    }
  }
};

export const checkAndExpireInspections = async () => {
  const yesterday = endOfDay(subDays(new Date(), 1));

  const inspectionController = new InspectionController();
  const activeInspections = await AppDataSource.getRepository(ActiveInspection).find({
    where: {
      validUntil: LessThanOrEqual(yesterday),
    },
  });

  console.log('Found inspections to expire:', activeInspections);

  for (const inspection of activeInspections) {
    try {
      const result = await inspectionController.expireById(inspection.id);
      console.log(`Expired inspection with id ${inspection.id}: ${result}`);
    } catch (error) {
      console.error('Error expiring inspection:', error);
    }
  }
};

export const checkAndExpireVignettes = async () => {
  const yesterday = endOfDay(subDays(new Date(), 1));

  const vignetteController = new VignetteController();
  const activeVignettes = await AppDataSource.getRepository(ActiveVignette).find({
    where: {
      validUntil: LessThanOrEqual(yesterday),
    },
  });

  console.log('Found vignettes to expire:', activeVignettes);

  for (const vignette of activeVignettes) {
    try {
      const result = await vignetteController.expireById(vignette.id);
      console.log(`Expired vignette with id ${vignette.id}: ${result}`);
    } catch (error) {
      console.error('Error expiring vignette:', error);
    }
  }
};

export const checkAndExpireServices = async () => {
  const yesterday = endOfDay(subDays(new Date(), 1));

  const serviceController = new ServiceController();
  const activeServices = await AppDataSource.getRepository(ActiveService).find({
    where: {
      validUntil: LessThanOrEqual(yesterday),
    },
  });

  console.log('Found services to expire:', activeServices);

  for (const service of activeServices) {
    try {
      const result = await serviceController.expireById(service.id);
      console.log(`Expired service with id ${service.id}: ${result}`);
    } catch (error) {
      console.error('Error expiring service:', error);
    }
  }
};
