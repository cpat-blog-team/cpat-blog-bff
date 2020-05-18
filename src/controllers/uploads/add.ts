import { RequestHandler } from 'express';
import handleErrorMiddleware from '../../middleware/handle-error-middleware';

const add: RequestHandler = async (req, res) => {
	const { filename } = req.file;
	if (!filename) res.status(500).send('Error uploading Image');
	else res.status(200).send({ url: `/images/${req.file.filename}` });
};

export default handleErrorMiddleware(add);
