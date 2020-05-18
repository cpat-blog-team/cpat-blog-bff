import { RequestHandler } from 'express';
import handleErrorMiddleware from '../../middleware/handle-error-middleware';
import { gfs } from '../../server';

const search: RequestHandler = async (req, res) => {
    gfs.files.findOne({filename: req.params.filename}, (_err:any, file:any) => {
		// Check if file exists
		if(!file || file.length === 0) {
			return res.status(404).json({
				err: 'No file exists'
			});
		}

		// Files exist
		res.send(file);
	});
};

export default handleErrorMiddleware(search);
