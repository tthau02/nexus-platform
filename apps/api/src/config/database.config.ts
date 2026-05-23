import { registerAs } from '@nestjs/config';

export default registerAs('database', () => ({
  type: 'mssql',

  host: 'localhost',
  port: 1433,

  username: 'sa',
  password: '123456Aa@',

  database: 'SIMPLE',

  options: {
    encrypt: false,
    trustServerCertificate: true,
  },
}));