import { Pool, PoolConfig } from 'pg';

// PostgreSQL connection pool configuration
const poolConfig: PoolConfig = {
  connectionString: process.env.DATABASE_URL,
  // Alternative: individual connection parameters
  // host: process.env.POSTGRES_HOST,
  // port: parseInt(process.env.POSTGRES_PORT || '5432'),
  // database: process.env.POSTGRES_DB,
  // user: process.env.POSTGRES_USER,
  // password: process.env.POSTGRES_PASSWORD,

  // Connection pool settings
  max: 20, // Maximum number of clients in the pool
  idleTimeoutMillis: 30000, // Close idle clients after 30 seconds
  connectionTimeoutMillis: 2000, // Return an error after 2 seconds if connection could not be established
};

// Create a singleton PostgreSQL connection pool
let pool: Pool | null = null;

/**
 * Get or create a PostgreSQL connection pool
 * Uses singleton pattern to ensure only one pool exists
 */
export function getPool(): Pool {
  if (!pool) {
    pool = new Pool(poolConfig);

    // Handle pool errors
    pool.on('error', (err) => {
      console.error('Unexpected error on idle PostgreSQL client', err);
      process.exit(-1);
    });
  }

  return pool;
}

/**
 * Execute a query with automatic connection management
 * @param text - SQL query string
 * @param params - Query parameters (optional)
 * @returns Query result
 */
export async function query<T extends Record<string, unknown> = Record<string, unknown>>(text: string, params?: unknown[]) {
  const pool = getPool();
  const start = Date.now();

  try {
    const res = await pool.query<T>(text, params);
    const duration = Date.now() - start;

    if (process.env.NODE_ENV === 'development') {
      console.log('Executed query', { text, duration, rows: res.rowCount });
    }

    return res;
  } catch (error) {
    console.error('Database query error:', error);
    throw error;
  }
}

/**
 * Get a client from the pool for transactions
 * Remember to release the client when done!
 */
export async function getClient() {
  const pool = getPool();
  return await pool.connect();
}

/**
 * Close the database pool
 * Call this when shutting down the application
 */
export async function closePool() {
  if (pool) {
    await pool.end();
    pool = null;
  }
}

// Export the pool instance for advanced usage
export { pool };
