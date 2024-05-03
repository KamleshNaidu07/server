const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");

router.post("/login", userController.getUserByID);

module.exports = router;
