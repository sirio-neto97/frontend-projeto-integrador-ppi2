import api, { handleError } from './api';

const route = '/company';

export const getContactData = async function(announcementId) {
	return await api.get(`${route}/contact`)
	.then(function(response) {
		return response.data;
	})
	.catch(function(error) {
		handleError(error);
	});
}