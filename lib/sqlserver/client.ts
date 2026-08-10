import sql from 'mssql';

const connectionString = process.env.SQLSERVER_CONNECTION?.trim() ?? '';

declare global {
  var sqlServerPool: Promise<sql.ConnectionPool> | undefined;
}

/**
 * Returns a connected SQL pool. Throws when `SQLSERVER_CONNECTION` is not set.
 */
export async function getSqlPool(): Promise<sql.ConnectionPool> {
  if (!connectionString) {
    throw new Error('Missing SQLSERVER_CONNECTION environment variable for SQL Server.');
  }

  if (!globalThis.sqlServerPool) {
    globalThis.sqlServerPool = sql.connect(connectionString);
  }

  return globalThis.sqlServerPool!;
}

// Keep the legacy default export for backwards compatibility (may be null).
const poolPromise = connectionString
  ? (globalThis.sqlServerPool ?? (globalThis.sqlServerPool = sql.connect(connectionString)))
  : null;

export default poolPromise;
