import handleErrorMiddleware from '../../middleware/handle-error-middleware';
import request from 'request-promise';
import { makeXmlQuery } from '../../utils/makeXmlQuery';
import { RequestHandler } from 'express';
import getToken from './getToken';

require('dotenv').config();

const getUserByEmail: RequestHandler = async (req, res) => {
	let token = await getToken();
	let myHeaders = { Authorization: `Bearer ${token}` };

	const { email } = req.params;
	if (!email) return res.status(400).send('Error missing params: email');

	try {
		const { users } = JSON.parse(
			await request(
				makeXmlQuery(
					'GET',
					myHeaders,
					`https://us-south.appid.cloud.ibm.com/management/v4/${process.env.TENANT_ID}/users/?email=${email}`,
					null
				)
			)
		);

		res.status(200).send(users);
	} catch (err) {
		res.status(400).send(err);
	}
};

export default handleErrorMiddleware(getUserByEmail);
