import axios from 'axios';

const apiUrl = 'http://localhost';

axios.defaults.baseURL = apiUrl;

export { axios, apiUrl };