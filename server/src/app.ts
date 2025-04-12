import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import cookieParser from 'cookie-parser';
import helmet from 'helmet';
import device from 'express-device';

import router from './routes';

const PORT = 8080;

// import routes from './routes';
// import { errorHandler, notFound } from './middlewares/error.middleware';

const app = express();

app.use(cors({ origin: true, credentials: true }));
app.use(helmet());
app.use(morgan('dev'));
app.use(device.capture());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use(router);

// app.use(notFound);
// app.use(errorHandler);

app.listen(PORT, () => {
	console.log('Server is up: http://localhost:' + PORT);
});
