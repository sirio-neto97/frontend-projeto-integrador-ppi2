import api, { handleError } from './api';

const route = '/authenticate';

export const authenticate = async function(data) {
	return await api.post(route, data)
	.then(function(response) {
		return response.data;
	})
	.catch(function(error) {
		handleError(error);
	});
}