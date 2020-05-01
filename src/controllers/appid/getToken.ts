import handleErrorMiddleware from '../../middleware/handle-error-middleware';
import request from 'request-promise';
import { makeXmlQuery } from '../../utils/makeXmlQuery';

require('dotenv').config();

const getToken = async () => {
	try {
		const { access_token } = JSON.parse(
			await request(
				makeXmlQuery('POST', null, 'https://iam.cloud.ibm.com//oidc/token', {
					grant_type: 'urn:ibm:params:oauth:grant-type:apikey',
					apikey: process.env.APP_ID_SECRET
				})
			)
		);
		return access_token;
	} catch (err) {
		return err;
	}
};

export default getToken;
