import axios from 'axios';

const announcementApi = axios.create({
	baseURL: 'http://localhost:3000/announcements',
});

export default announcementApi;