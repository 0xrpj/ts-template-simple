import App from './app';
import validateEnv from '@utils/validateEnv';
import HomeRoute from './routes/home.route';
import { dm } from '@utils/webhook';

validateEnv();

const app = new App([new HomeRoute()]);

dm('INFO', 'Main Scheduler started! ' + new Date().toString());
app.listen();
