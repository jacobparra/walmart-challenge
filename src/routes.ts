import { Router } from 'express';

import * as ProductController from './controllers/product';

const router = Router();

router.get('/', ProductController.search);

export default router;
