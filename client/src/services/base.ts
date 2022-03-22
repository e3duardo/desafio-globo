import axios from 'axios';

const apiUrl = 'http://localhost:3000';

axios.defaults.baseURL = apiUrl;

export { axios };