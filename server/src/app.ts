import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import cookieParser from 'cookie-parser';
import helmet from 'helmet';
import device from 'express-device';
import { config } from 'dotenv';

import router from './routes';
import { connectDB } from './utils/db';

const PORT = 8080;

config();
connectDB();
const app = express();

app.use(cors({ origin: '*' }));
app.use(helmet());
app.use(morgan('dev'));
app.use(device.capture());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use(router);

app.listen(PORT, () => {
	console.log('Server is up');
});
