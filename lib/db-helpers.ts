import { query, getClient } from './db';

/**
 * Example database helper functions
 * These demonstrate common database operations using the PostgreSQL connection
 */

// Example: User type definition
export interface User {
  id: number;
  email: string;
  name: string;
  created_at: Date;
  [key: string]: unknown;
}

/**
 * Example: Get all users from the database
 */
export async function getAllUsers(): Promise<User[]> {
  const result = await query<User>('SELECT * FROM users ORDER BY created_at DESC');
  return result.rows;
}

/**
 * Example: Get a user by ID
 */
export async function getUserById(id: number): Promise<User | null> {
  const result = await query<User>('SELECT * FROM users WHERE id = $1', [id]);
  return result.rows[0] || null;
}

/**
 * Example: Get a user by email
 */
export async function getUserByEmail(email: string): Promise<User | null> {
  const result = await query<User>('SELECT * FROM users WHERE email = $1', [email]);
  return result.rows[0] || null;
}

/**
 * Example: Create a new user
 */
export async function createUser(email: string, name: string): Promise<User> {
  const result = await query<User>(
    'INSERT INTO users (email, name, created_at) VALUES ($1, $2, NOW()) RETURNING *',
    [email, name]
  );
  return result.rows[0];
}

/**
 * Example: Update a user
 */
export async function updateUser(id: number, name: string): Promise<User | null> {
  const result = await query<User>(
    'UPDATE users SET name = $1 WHERE id = $2 RETURNING *',
    [name, id]
  );
  return result.rows[0] || null;
}

/**
 * Example: Delete a user
 */
export async function deleteUser(id: number): Promise<boolean> {
  const result = await query('DELETE FROM users WHERE id = $1', [id]);
  return (result.rowCount ?? 0) > 0;
}

/**
 * Example: Transaction - Transfer funds between users
 * Demonstrates how to use transactions for atomic operations
 */
export async function transferFunds(fromUserId: number, toUserId: number, amount: number): Promise<void> {
  const client = await getClient();

  try {
    // Start transaction
    await client.query('BEGIN');

    // Deduct from sender
    await client.query('UPDATE user_accounts SET balance = balance - $1 WHERE user_id = $2', [amount, fromUserId]);

    // Add to receiver
    await client.query('UPDATE user_accounts SET balance = balance + $1 WHERE user_id = $2', [amount, toUserId]);

    // Commit transaction
    await client.query('COMMIT');
  } catch (error) {
    // Rollback on error
    await client.query('ROLLBACK');
    throw error;
  } finally {
    // Always release the client back to the pool
    client.release();
  }
}

/**
 * Example: Batch insert with parameterized queries
 */
export async function batchInsertUsers(users: Array<{ email: string; name: string }>): Promise<User[]> {
  const client = await getClient();

  try {
    await client.query('BEGIN');

    const insertedUsers: User[] = [];
    for (const user of users) {
      const result = await client.query<User>(
        'INSERT INTO users (email, name, created_at) VALUES ($1, $2, NOW()) RETURNING *',
        [user.email, user.name]
      );
      insertedUsers.push(result.rows[0]);
    }

    await client.query('COMMIT');
    return insertedUsers;
  } catch (error) {
    await client.query('ROLLBACK');
    throw error;
  } finally {
    client.release();
  }
}

/**
 * Example: Search users with pagination
 */
export async function searchUsers(searchTerm: string, page: number = 1, pageSize: number = 10): Promise<{
  users: User[];
  total: number;
  page: number;
  pageSize: number;
  totalPages: number;
}> {
  const offset = (page - 1) * pageSize;

  // Get total count
  const countResult = await query<{ count: string }>(
    'SELECT COUNT(*) as count FROM users WHERE name ILIKE $1 OR email ILIKE $1',
    [`%${searchTerm}%`]
  );
  const total = parseInt(countResult.rows[0].count);

  // Get paginated results
  const result = await query<User>(
    'SELECT * FROM users WHERE name ILIKE $1 OR email ILIKE $1 ORDER BY created_at DESC LIMIT $2 OFFSET $3',
    [`%${searchTerm}%`, pageSize, offset]
  );

  return {
    users: result.rows,
    total,
    page,
    pageSize,
    totalPages: Math.ceil(total / pageSize),
  };
}
