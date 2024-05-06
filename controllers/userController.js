const dotenv = require("dotenv");
dotenv.config({ path: "./.env" });
const jwt = require("jsonwebtoken");

const User = require("../models/userModel");

//to get single user
const getUserByCredentials = async (req, res) => {
  try {
    const username = req.body.username;
    const password = req.body.password;

    const user = await User.getUserByCredentials(username, password);
    if (user) {
      const payload = {
        id: user.id,
        username: user.username,
        email: user.email,
      };
      user.token =
        "Bearer " +
        jwt.sign(payload, process.env.SECRET_KEY, { expiresIn: "3600s" });
      res.json(user);
    } else {
      res.json({ error: "User not found" });
    }
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch user" });
  }
};


// Export the User controller functions
module.exports = {
  getUserByCredentials,
};
