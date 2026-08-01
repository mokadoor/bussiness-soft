import sql from 'mssql';

const connectionString = process.env.SQLSERVER_CONNECTION?.trim() ?? '';

declare global {
  var sqlServerPool: Promise<sql.ConnectionPool> | undefined;
}

const poolPromise = connectionString
  ? globalThis.sqlServerPool ?? (globalThis.sqlServerPool = sql.connect(connectionString))
  : null;

export default poolPromise;
