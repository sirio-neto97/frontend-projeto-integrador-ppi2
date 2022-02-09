import api, { handleError, handleSuccess } from './api';

const route = '/company';

export const getContactData = async function() {
	return await api.get(`${route}/contact`)
	.then(function(response) {
		return response.data;
	})
	.catch(function(error) {
		handleError(error);
	});
}

export const save = async function(data) {
	return await api.post(route, data)
	.then(function(response) {
		handleSuccess('Dados salvos com sucesso!');
		return response.data;
	})
	.catch(function(error) {
		handleError(error);
	});
}

export const getCompany = async function() {
	return await api.get(route)
	.then(function(response) {
		return response.data;
	})
	.catch(function(error) {
		handleError(error);
	});
}