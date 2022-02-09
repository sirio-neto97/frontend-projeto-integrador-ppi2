import api, { handleError, handleSuccess } from './api';

const route = '/authenticate';

export const authenticate = async function(data) {
	return await api.post(route, data)
	.then(function(response) {
		handleSuccess();
		return response.data;
	})
	.catch(function(error) {
		handleError(error);
	});
}