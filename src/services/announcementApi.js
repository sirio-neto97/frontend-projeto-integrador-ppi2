import axios from 'axios';

const announcementApi = axios.create({
	baseURL: 'http://localhost:3000/announcements',
});

const filesApi = axios.create({
	baseURL: 'http://localhost:3000/files',
});

export const getById = async function(announcementId) {
	return await announcementApi.get(`/${announcementId}`)
	.then(function(response) {
		return response.data;
	})
	.catch(function(error) {
		throw new Error(error);
	});
}

export const getAllForListing = async () => {
	return await announcementApi.get()
	.then(function(response) {
		return response.data;
	})
	.catch(function(error) {
		throw new Error(error);
	});
}

export const save = async (data) => {
	const hasId = typeof data.id !== 'undefined';
	const method = hasId ? 'PUT' : 'POST';
	const url = hasId ? `/${data.id}` : '';

	return await announcementApi({
		method: method,
		url: url,
		data: data
	})
	.then(function(response) {
		return response.data;
	})
	.catch(function(error) {
		throw new Error(error);
	});
}

export const saveFiles = async (formData, announcementId) => {
	return await announcementApi({
		method: 'POST',
		url: `/files/${announcementId}`,
		data: formData,
		headers: {
			'content-type': 'multipart/form-data'
		}
	})
	.then(function(response) {
		return response.data;
	})
	.catch(function(error) {
		throw new Error(error);
	});
}

export const remove = async (announcementId) => {
	return await announcementApi.delete(`/${announcementId}`)
	.then(function(response) {
		return response.data;
	})
	.catch(function(error) {
		throw new Error(error);
	});
}

export const removeMass = async (aIds) => {
	return await announcementApi.delete(``, {
		data: {'ids': aIds}
	})
	.then(function(response) {
		return response.data;
	})
	.catch(function(error) {
		throw new Error(error);
	});
}

export const deleteFiles = async (ids) => {
	return await filesApi({
		method: 'DELETE',
		data: {
			'ids': ids
		}
	})
	.then(function(response) {
		return response.data;
	})
	.catch(function(error) {
		throw new Error(error);
	});
}