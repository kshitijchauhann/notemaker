import pool from "./pool.js";

export const addUser = async(name: string, email: string, password: string) => {
  await pool.query("INSERT INTO users (name, email, password) VALUES ($1, $2, $3)", [
    name, email, password
  ]);
}

export const findUser = async(email: string) => {
  const result = await pool.query("SELECT password from users WHERE email = $1", [
    email
  ]);

  if (result.rows.length === 0) {
    return null;
  }
  return result.rows[0].password;
}
