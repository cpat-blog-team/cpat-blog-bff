export const makeJsonQuery = (method: string, headers: object, route: string, body: object) => {
  if (!headers) headers = {};

  const default_headers = {
    'Content-Type': 'application/json; charset=utf-8',
    'Accept': 'application/json'
  };

  const query: any = {
    method,
    url: route,
    headers: { ...default_headers, ...headers }
  };
  if (body) query.body = JSON.stringify(body);
  return query;
};
