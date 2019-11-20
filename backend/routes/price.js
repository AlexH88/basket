import express from 'express';

import * as PriceController from '../controllers/price';

const router = express.Router();

router.post('/price', PriceController.getPrice);

export default router;