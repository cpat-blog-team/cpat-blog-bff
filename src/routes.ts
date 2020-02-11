import { Router } from 'express';
import swaggerUi from 'swagger-ui-express';
import apiSpec from '../openapi.json';

import * as UserController from './controllers/user';
import * as BlogController from './controllers/blog';

const swaggerUiOptions = {
	customCss: '.swagger-ui .topbar { display: none }'
};

const router = Router();

// User routes
router.post('/user/add', UserController.add);
router.get('/user/search', UserController.search);
router.get('/user/all', UserController.all);

// Blog routes 
router.post('/blog/add', BlogController.add);
router.get('/blog/search', BlogController.search);
router.get('/blog/all', BlogController.all);

// Dev routes
if (process.env.NODE_ENV === 'development') {
	router.use('/dev/api-docs', swaggerUi.serve);
	router.get('/dev/api-docs', swaggerUi.setup(apiSpec, swaggerUiOptions));
}

export default router;
