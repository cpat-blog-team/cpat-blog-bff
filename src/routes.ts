import { Router } from 'express';
import swaggerUi from 'swagger-ui-express';
import apiSpec from '../openapi.json';

import * as BlogController from './controllers/blogs';
import * as CommunityGuidelinesController from './controllers/communityGuidelines';
import * as SeedController from './controllers/seed';
import * as AppIdController from './controllers/appid';

const swaggerUiOptions = { customCss: '.swagger-ui .topbar { display: none }' };

const router = Router();

// APPid routes
router.get('/appid/users', AppIdController.getAllUsers);

// Blog routes
router.patch('/blogs/:id', BlogController.update);
router.delete('/blogs/:id', BlogController.deleteById);
router.post('/blogs/add', BlogController.add);
router.get('/blogs/search', BlogController.search);
router.get('/blogs/:id', BlogController.getById);
router.get('/blogs', BlogController.all);

// Community Guidelines routes
router.post('/communityGuidelines', CommunityGuidelinesController.add);
router.get('/communityGuidelines', CommunityGuidelinesController.getLatest);

// Dev routes
console.log('ENVIRONMENT:', process.env.NODE_ENV);

if (process.env.NODE_ENV === 'development') {
	router.use('/dev/api-docs', swaggerUi.serve);
	router.get('/dev/api-docs', swaggerUi.setup(apiSpec, swaggerUiOptions));
	router.post('/dev/seedManyBlogs', SeedController.seedManyBlogs);
	router.delete('/dev/wipeDB', SeedController.wipeDB);
}

export default router;
