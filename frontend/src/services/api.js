import axios from 'axios';

const baseAPI = baseURL => axios.create({ baseURL });

export default baseAPI;
