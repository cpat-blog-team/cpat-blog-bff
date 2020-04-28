import handleErrorMiddleware from '../../middleware/handle-error-middleware';
import request from 'request-promise';
import { makeJsonQuery } from '../../utils/makeJsonQuery';
import { RequestHandler } from 'express';
import getToken from './getToken';

require('dotenv').config();

const updateUserRoles: RequestHandler = async (req, res) => {
  const token = await getToken();
  const myHeaders = { Authorization: `Bearer ${token}` };

  const { id } = req.params;
  if (!id) return res.status(400).send('Error missing params: id');

  const { roles } = req.body;
  if (!roles) return res.status(400).send('Error missing property in body: roles');

  try {
    // put user's roles by id
    const response = JSON.parse(
      await request(
        makeJsonQuery(
          'PUT',
          myHeaders,
          `https://us-south.appid.cloud.ibm.com/management/v4/${process.env.TENNANT_ID}/users/${id}/roles`,
          { roles }
        )
      )
    );

    res.status(200).send(response);
  } catch (err) {
    res.status(400).send(err);
  }
};

export default handleErrorMiddleware(updateUserRoles);
