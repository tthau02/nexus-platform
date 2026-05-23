import { registerAs } from '@nestjs/config';

export default registerAs('database', () => {
  // Tách host và instanceName (ví dụ: DESKTOP-SPK5079\SQLEXPRESS)
  const dbHost = process.env.DB_HOST || 'DESKTOP-SPK5079\\SQLEXPRESS';
  const parts = dbHost.split('\\');
  const host = parts[0];
  const instanceName = parts[1];

  return {
    type: 'mssql',
    host: host,
    // Nếu dùng tedious thì cần khai báo username/password (SQL Server Authentication)
    username: process.env.DB_USERNAME || 'sa',
    password: process.env.DB_PASSWORD || '123456', 
    database: process.env.DB_NAME || 'SIMPLE',
    options: {
      encrypt: false,
      trustServerCertificate: true,
    },
    extra: {
      trustServerCertificate: true,
      options: {
        encrypt: false,
        trustServerCertificate: true,
        // tedious nhận instanceName ở đây
        instanceName: instanceName || undefined,
      },
    },
  };
});
