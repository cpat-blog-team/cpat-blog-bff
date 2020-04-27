export const makeXmlQuery = (method: string, headers: object, route: string, form: object) => {
	if (!headers) headers = {};

	const default_headers = {
		'Content-Type': [ 'application/x-www-form-urlencoded', 'application/x-www-form-urlencoded' ]
	};

	console.log({ ...default_headers, ...headers });

	const query: any = {
		method,
		url: route,
		headers: { ...default_headers, ...headers }
	};

	if (form) query.form = form;

	return query;
};
