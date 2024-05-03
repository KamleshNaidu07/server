const pool = require("../database");

const getUserByID = async (username, password) => {
  try {
    const query = "SELECT * FROM users WHERE username = ? AND password = ?";
    const [rows] = await pool.query(query, [username, password]);
    return rows[0];
  } catch (error) {
    throw new Error(error);
  }
};

module.exports = {
    getUserByID,
}