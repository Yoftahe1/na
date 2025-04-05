import { LooseObject } from '@/types';

const env = import.meta.env.MODE;

const config: LooseObject = {
  development: {
    API_URL: 'http://localhost:8000/api',
    API_VERSION: '',
  },
  production: {
    API_URL: '',
    API_VERSION: 'v1',
  },
};

export default env === 'production' ? config.production : config.development;
