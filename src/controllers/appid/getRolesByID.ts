import handleErrorMiddleware from '../../middleware/handle-error-middleware';
import request from 'request-promise';
import { makeXmlQuery } from '../../utils/makeXmlQuery';
import { RequestHandler } from 'express';
import getToken from './getToken';

require('dotenv').config();

const getAllUsers: RequestHandler = async (req, res) => {
	const token = await getToken();
	const myHeaders = { Authorization: `Bearer ${token}` };

	const { id } = req.params;
	if (!id) return res.status(400).send('Error missing params: id');

	try {
		// get all roles from appid
		const { roles } = JSON.parse(
			await request(
				makeXmlQuery(
					'GET',
					myHeaders,
					`https://us-south.appid.cloud.ibm.com/management/v4/${process.env.TENANT_ID}/roles`,
					null
				)
			)
		);

		// get user's roles by id
		const response = JSON.parse(
			await request(
				makeXmlQuery(
					'GET',
					myHeaders,
					`https://us-south.appid.cloud.ibm.com/management/v4/${process.env.TENANT_ID}/users/${id}/roles`,
					null
				)
			)
		);

		const activeRole = response.roles.pop() || { name: '' };

		const payload = {
			activeRole: activeRole.name,
			roles: [...roles.map(({ name }: any) => name), 'none'],
		};

		res.status(200).send(payload);
	} catch (err) {
		res.status(400).send(err);
	}
};

export default handleErrorMiddleware(getAllUsers);
