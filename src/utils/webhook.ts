const { Webhook, MessageBuilder } = require('discord-webhook-node');
import { DISCORD_WEBHOOK, DISCORD_ALERT } from '@config';
import { logger } from './logger';

export const dm = (type: 'INFO' | 'ERROR', message: string) => {
  try {
    if (!DISCORD_ALERT || !message) {
      return;
    }

    const color = type == 'INFO' ? '#00b0f4' : '#ff0000';

    const embed = new MessageBuilder().setAuthor(type).setColor(color).setDescription(JSON.stringify(message)).setFooter('prosh.tez').setTimestamp();

    const hook = new Webhook(DISCORD_WEBHOOK);
    hook.send(embed).catch(e => {
      logger.error('Error while sending message to webhook: ' + e);
    });
  } catch (e) {
    logger.error('Error while sending message to webhook: ' + e);
  }
};
