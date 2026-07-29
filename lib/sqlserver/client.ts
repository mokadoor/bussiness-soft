import sql from 'mssql';

const connectionString = process.env.SQLSERVER_CONNECTION?.trim() ?? '';

if (!connectionString) {
  throw new Error('Missing SQLSERVER_CONNECTION environment variable for SQL Server.');
}

declare global {
  var sqlServerPool: Promise<sql.ConnectionPool> | undefined;
}

const poolPromise = globalThis.sqlServerPool ?? (globalThis.sqlServerPool = sql.connect(connectionString));

export default poolPromise;
