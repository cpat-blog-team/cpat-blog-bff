import fs from 'fs';

export const makeQuery = (method: string, route: string, body: string) => {
  const query: any = {
    method,
    url: `http://localhost:3000${route}`,
    headers: {
      'Content-Type': 'application/json; charset=utf-8',
      Accept: 'application/json'
    }
  };
  if (body) query.body = body;
  return query;
};

export const makeQueryWithFile = (method: string, route: string, data: Object) => {
  const query: any = {
    method,
    url: `http://localhost:3000${route}`,
    headers: {
      'Content-Type': 'application/json; charset=utf-8',
      Accept: 'application/json'
    },
    formData: {
      file: { 
        'value': fs.createReadStream('tests/images/potato.gif'),
        'options': {
          'filename': 'filename',
          'contentType': null
        }
      },
      ...data
    }
  };
  
  return query;
};