import api, { handleError } from './api';

const route = {
	'announcements': '/announcements',
	'files': '/files'
}

export const getById = async function(announcementId) {
	return await api.get(`${route.announcements}/${announcementId}`)
	.then(function(response) {
		return response.data;
	})
	.catch(function(error) {
		handleError(error);
	});
}

export const getAllForListing = async () => {
	console.log(api.defaults);
	return await api.get(route.announcements)
	.then(function(response) {
		return response.data;
	})
	.catch(function(error) {
		handleError(error);
	});
}

export const save = async (data) => {
	const hasId = typeof data.id !== 'undefined';
	const method = hasId ? 'PUT' : 'POST';
	const url = hasId ? `/${data.id}` : '';

	return await api({
		method: method,
		url: route.announcements + url,
		data: data
	})
	.then(function(response) {
		debugger;
		return response.data;
	})
	.catch(function(error) {
		handleError(error);
	});
}

export const saveFiles = async (formData, announcementId) => {
	debugger;
	return await api({
		method: 'POST',
		url: `${route.files}/${announcementId}`,
		data: formData,
		headers: {
			'content-type': 'multipart/form-data'
		}
	})
	.then(function(response) {
		return response.data;
	})
	.catch(function(error) {
		handleError(error);
	});
}

export const remove = async (announcementId) => {
	return await api.delete(`${route.announcements}/${announcementId}`)
	.then(function(response) {
		return response.data;
	})
	.catch(function(error) {
		handleError(error);
	});
}

export const removeMass = async (aIds) => {
	return await api.delete(route.announcements, {
		data: {'ids': aIds}
	})
	.then(function(response) {
		return response.data;
	})
	.catch(function(error) {
		handleError(error);
	});
}

export const deleteFiles = async (ids) => {
	return await api({
		url: route.files,
		method: 'DELETE',
		data: {
			'ids': ids
		}
	})
	.then(function(response) {
		return response.data;
	})
	.catch(function(error) {
		handleError(error);
	});
}