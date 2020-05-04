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

export const makeQueryWithFile = (method: string, route: string, body: string, filename: string = '') => {
  const query: any = {
    method,
    url: `http://localhost:3000${route}`,
    headers: {
      'Content-Type': 'application/json; charset=utf-8',
      Accept: 'application/json'
    },
    file: { filename }
  };
  if (body) query.body = body;

  return query;
};