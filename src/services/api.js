import axios from 'axios';
import toast from '../Components/Toast';

const api = axios.create({
	baseURL: 'http://localhost:3000'
});

export const handleError = function(error) {
	if (error.response) {
		toast.error(error.response.data);
	} else if (error.request) {
		toast.error(error.request);
	} else {
		toast.error(error.name, error.message);
	}
}

export const handleSuccess = function(message) {
	message = message ?? 'Operação realizada com sucesso!';
	return toast.success(message);
}

export default api;