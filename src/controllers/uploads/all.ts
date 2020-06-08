import { RequestHandler } from 'express';
import handleErrorMiddleware from '../../middleware/handle-error-middleware';
import { gfs } from '../../server';

const all: RequestHandler = async (req, res) => {
    gfs.files.find().toArray((_err:any, files:any) => {
		// Check if files exist
		if(!files || files.length === 0) {
			return res.status(404).json({
				err: 'No files exist'
			});
		}

		// Files exist
		res.send(files);
	});
};

export default handleErrorMiddleware(all);
