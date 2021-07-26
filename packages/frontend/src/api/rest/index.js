import axios from 'axios';
import AuthApi from './AuthApi';
import { BASE_URL } from '../../app/config.json';

const client = axios.create({ BASE_URL });

export const auth = new AuthApi({ client });

export default client;
