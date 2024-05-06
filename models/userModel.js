const pool = require("../database");

const getUserByCredentials = async (username, password) => {
  try {
    const query = "SELECT * FROM users WHERE username = ? AND password = ?";
    const [rows] = await pool.query(query, [username, password]);
    return rows[0];
  } catch (error) {
    throw new Error(error);
  }
};

const getUserById = async (userId) => {
  try {
    const query = "SELECT * FROM users WHERE id=?";
    const [rows] = await pool.query(query, [userId]);
    return rows[0];
  } catch (error) {
    throw new Error(error);
  }
}

module.exports = {
  getUserByCredentials,
  getUserById,
}