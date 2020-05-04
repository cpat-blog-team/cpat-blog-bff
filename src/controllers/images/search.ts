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

		// Check content type is image
		if(file.contentType.includes('image') || file.contentType.includes('img')) {
			// Read output to browser
			const readstream = gfs.createReadStream(file.filename);
			readstream.pipe(res);
		} else {
			res.status(404).json({
				err: 'File is not an image'
			});
		}
	});
};

export default handleErrorMiddleware(search);
