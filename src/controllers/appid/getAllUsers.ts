import handleErrorMiddleware from '../../middleware/handle-error-middleware';
import request from 'request-promise';
import { makeXmlQuery } from '../../utils/makeXmlQuery';
import { RequestHandler } from 'express';
import getToken from './getToken';

require('dotenv').config();

const getAllUsers: RequestHandler = async (req, res) => {
	let token = await getToken();
	let myHeaders = { Authorization: `Bearer ${token}` };

	try {
		const { users } = JSON.parse(
			await request(
				makeXmlQuery(
					'GET',
					myHeaders,
					`https://us-south.appid.cloud.ibm.com/management/v4/${process.env.TENANT_ID}/users`,
					null
				)
			)
		);

		res.status(200).send(users);
	} catch (err) {
		res.status(400).send(err);
	}
};

export default handleErrorMiddleware(getAllUsers);
