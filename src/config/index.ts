import { LooseObject } from '@/types';

const env = import.meta.env.MODE;

const config: LooseObject = {
  development: {
    API_URL: 'http://localhost:8000/api',
    API_VERSION: '',
  },
  production: {
    API_URL: 'https://nb-c842.onrender.com/api',
    API_VERSION: '',
  },
};

export default env === 'production' ? config.production : config.development;