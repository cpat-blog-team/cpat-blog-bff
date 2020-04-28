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
					`https://us-south.appid.cloud.ibm.com/management/v4/${process.env.TENNANT_ID}/roles`,
					null
				)
			)
		);

		const allRoles = roles.map(({ name }: any) => name);

		// get user's roles by id
		const response = JSON.parse(
			await request(
				makeXmlQuery(
					'GET',
					myHeaders,
					`https://us-south.appid.cloud.ibm.com/management/v4/${process.env.TENNANT_ID}/users/${id}/roles`,
					null
				)
			)
		);

		let userRoles = new Set(
			response.roles.map((role: any) => {
				return role.name;
			})
		);

		const activeRoles = allRoles.map((role: string) => ({ name: role, status: userRoles.has(role) }));

		res.status(200).send(activeRoles);
	} catch (err) {
		res.status(400).send(err);
	}
};

export default handleErrorMiddleware(getAllUsers);
