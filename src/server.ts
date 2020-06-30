import mongoose from 'mongoose';
import path from 'path';
import dotenv from 'dotenv';
import bodyParser from 'body-parser';
import compression from 'compression';
import express, { Request, Response, NextFunction } from 'express';
import { ApplicationError } from './errors';
import Multer from 'multer';
import GridFsStorage from 'multer-gridfs-storage';
import Grid from 'gridfs-stream';
import crypto from 'crypto';
import { Router } from 'express';
import swaggerUi from 'swagger-ui-express';
import apiSpec from '../openapi.json';
import * as BlogController from './controllers/blogs';
import * as CommunityGuidelinesController from './controllers/communityGuidelines';
import * as SeedController from './controllers/seed';
import * as AppIdController from './controllers/appid';
import * as UploadController from './controllers/uploads';
import * as ImageController from './controllers/images';

const swaggerUiOptions = { customCss: '.swagger-ui .topbar { display: none }' };

const result = dotenv.config();

if (result.error) {
	dotenv.config({ path: '.env.default' });
}

const app: any = express();
export let gfs: any;

// MIDDLEWARE
app.use(compression());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.set('port', process.env.PORT || 3000);

app.use(express.static(path.join(__dirname, 'public'), { maxAge: 31557600000 }));

app.use((err: ApplicationError, req: Request, res: Response, next: NextFunction) => {
	if (res.headersSent) {
		return next(err);
	}

	return res.status(err.status || 500).json({
		error: process.env.NODE_ENV === 'development' ? err : undefined,
		message: err.message
	});
});

if (process.env.MONGO_URL == null) {
	console.log({
		level: 'error',
		message: 'MONGO_URL not specified in environment'
	});
	process.exit(1);
} else {
	const conn = mongoose
		.connect(process.env.MONGO_URL, {
			useNewUrlParser: true,
			useCreateIndex: true,
			useUnifiedTopology: true
		})
		.then(({ connection }) => {
			app.listen(process.env.PORT, (): void => {
				console.log(
					'\x1b[36m%s\x1b[0m', // eslint-disable-line
					`🌏 Express server started at http://localhost:${app.get('port')}`
				);
				if (process.env.NODE_ENV === 'development') {
					console.log(
						'\x1b[36m%s\x1b[0m', // eslint-disable-line
						`⚙️  Swagger UI hosted at http://localhost:${app.get('port')}/dev/api-docs`
					);
				}
			});

			// Initailize GFS Stream
			gfs = Grid(connection.db, mongoose.mongo);
			gfs.collection('uploads');
		});
}

// CREATE STORAGE ENGINE
const storage = new GridFsStorage({
	url: process.env.MONGO_URL,
	file: (req, file) => {
		return new Promise((resolve, reject) => {
			crypto.randomBytes(16, (err, buf) => {
				if (err) {
					return reject(err);
				}
				const filename = buf.toString('hex') + path.extname(file.originalname);
				const fileInfo = {
					filename: filename,
					bucketName: 'uploads'
				};
				resolve(fileInfo);
			});
		});
	}
});

const upload = Multer({ storage });

const router = Router();

// APPid routes
router.get('/appid/user/:email', AppIdController.getUserByEmail);
router.get('/appid/users', AppIdController.getAllUsers);
router.put('/appid/roles/:id', AppIdController.updateUserRoles);
router.get('/appid/roles/:id', AppIdController.getRolesByID);

// Blog routes
router.patch('/blogs/:id', upload.none(), BlogController.update);
router.delete('/blogs/:id', BlogController.deleteById);
router.post('/blogs/add', upload.single('file'), BlogController.add);
router.get('/blogs/search', BlogController.search);
router.get('/blogs/:id', BlogController.getById);
router.get('/blogs', BlogController.all);

// Upload routes
router.post('/uploads', upload.single('file'), UploadController.add);
router.get('/uploads', UploadController.all);
router.get('/uploads/:filename', UploadController.search);

// Image routes
router.get('/images/:filename', ImageController.search);

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

// ROUTES
app.use(router);
