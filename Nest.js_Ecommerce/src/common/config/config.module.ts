import { Config } from '../interfaces/config.interfaces';

export default (): Config => ({
  port: parseInt(process.env.PORT || '3000'),
  database: {
    host: process.env.DATABASE_HOST,
    port: parseInt(process.env.DATABASE_PORT || '3306'),
    user: process.env.DATABASE_USER || 'root',
    password: process.env.DATABASE_PASSWORD || '',
    name: process.env.DATABASE_NAME || 'nestjsProduct',
  },
  JWT_SECRET: process.env.JWT_SECRET || 'thisissecretkey',
});
