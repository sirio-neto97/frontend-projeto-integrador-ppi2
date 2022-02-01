import axios from 'axios';

const api = axios.create({
	baseURL: 'http://localhost:3000'
});

export const handleError = function(error) {
	if (error.response) {
		console.error(error.response.data);
	} else if (error.request) {
		console.error(error.request);
	} else {
		console.error(error.name, error.message);
	}
}

export default api;