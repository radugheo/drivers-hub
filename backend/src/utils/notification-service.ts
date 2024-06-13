import { addDays } from 'date-fns';
import { Expo } from 'expo-server-sdk';
import { AppDataSource } from '../data-source';
import { ActiveInspection } from '../entities/ActiveInspection';
import { ActiveInsurance } from '../entities/ActiveInsurance';
import { ActiveService } from '../entities/ActiveService';
import { ActiveVignette } from '../entities/ActiveVignette';

const expo = new Expo();

const notificationIntervals = [7, 3, 1, 0];

export const scheduleNotificationsFor = async (entity, description) => {
  const today = new Date();
  for (const daysBefore of notificationIntervals) {
    const notificationDate = addDays(today, daysBefore);
    const startOfDay = new Date(notificationDate.setHours(0, 0, 0, 0));
    const endOfDay = new Date(notificationDate.setHours(23, 59, 59, 999));
    const itemsExpiringSoon = await AppDataSource.getRepository(entity)
      .createQueryBuilder('entity')
      .leftJoinAndSelect('entity.car', 'car')
      .leftJoinAndSelect('car.owner', 'owner')
      .where('entity.validUntil >= :startOfDay AND entity.validUntil <= :endOfDay', { startOfDay, endOfDay })
      .getMany();
    console.log(`${itemsExpiringSoon.length} items found expiring on ${notificationDate.toISOString().split('T')[0]}`);
    for (const item of itemsExpiringSoon) {
      if (!item.car || !item.car.owner || !item.car.owner.pushToken) {
        console.error(`Missing car, owner, or push token for item ID: ${item.id}`);
        continue;
      }
      if (!Expo.isExpoPushToken(item.car.owner.pushToken)) {
        console.error(`Invalid Expo push token for user ID: ${item.car.owner.id}`);
        continue;
      }
      await sendNotifications(
        [item.car.owner.pushToken],
        `${description} Expiration Reminder`,
        `Your ${description} for ${item.car.make} ${item.car.model} is expiring in ${daysBefore} day(s).`,
      );
    }
  }
};

export const sendNotifications = async (tokens: string[], title: string, body: string) => {
  let messages = [];
  console.log(`Processing ${tokens.length} tokens`);
  for (let pushToken of tokens) {
    if (!Expo.isExpoPushToken(pushToken)) {
      console.error(`Push token ${pushToken} is not a valid Expo push token`);
      continue;
    }

    messages.push({
      to: pushToken,
      sound: 'default',
      title: title,
      body: body,
      data: { withSome: 'data' },
    });
  }

  let chunks = expo.chunkPushNotifications(messages);
  let tickets = [];
  for (let chunk of chunks) {
    try {
      let ticketChunk = await expo.sendPushNotificationsAsync(chunk);
      console.log('Notification sent:', ticketChunk);
      tickets.push(...ticketChunk);
    } catch (error) {
      console.error('Error sending notification:', error);
    }
  }
};

export const scheduleExpiryNotifications = async () => {
  await scheduleNotificationsFor(ActiveService, 'Service');
  await scheduleNotificationsFor(ActiveInsurance, 'Insurance');
  await scheduleNotificationsFor(ActiveInspection, 'Inspection');
  await scheduleNotificationsFor(ActiveVignette, 'Vignette');
};
