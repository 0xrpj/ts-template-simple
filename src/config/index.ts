import { config } from 'dotenv';

config();

export const CREDENTIALS = process.env.CREDENTIALS === 'true';

export const { ENVIRONMENT, MONGO_URI, JWT_SECRET, DISCORD_WEBHOOK, DISCORD_ALERT, PORT, LOG_FORMAT } = process.env;
