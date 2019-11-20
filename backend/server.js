import express from 'express';
const cors = require('cors');

import bodyParser from 'body-parser';
import morgan from 'morgan';
import config from './config';

import priceRoute from './routes/price';

const app = express();

app.use(cors());
app.options('*', cors());

app.use(morgan('tiny'));
app.use(bodyParser.json());

app.listen(config.port, err => {
	if (err) throw err;

	console.log(`Server listening on port ${config.port}`);
})

app.use(morgan('tiny'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.use('/api', priceRoute);