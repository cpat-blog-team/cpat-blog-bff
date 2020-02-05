import { Router } from 'express';
import swaggerUi from 'swagger-ui-express';
import apiSpec from '../openapi.json';

import * as BookController from './controllers/book';
import * as UserController from './controllers/user';

const swaggerUiOptions = {
	customCss: '.swagger-ui .topbar { display: none }'
};

const router = Router();

// Book routes
router.post('/book/add', BookController.add);
router.get('/book/all', BookController.all);
router.get('/book/search', BookController.search);

// User routes
router.post('/user/add', UserController.add);
router.get('/user/search', UserController.search);
router.get('/user/all', UserController.all);

// Dev routes
if (process.env.NODE_ENV === 'development') {
	router.use('/dev/api-docs', swaggerUi.serve);
	router.get('/dev/api-docs', swaggerUi.setup(apiSpec, swaggerUiOptions));
}

export default router;
