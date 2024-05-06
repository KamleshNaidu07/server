const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");
const passport = require("passport");

router.post("/login", userController.getUserByCredentials);
router.get('/profile', passport.authenticate('jwt', {session: false}), (req, res)=>{
    res.status(200).send({
        success: true,
        user: req.user
    });
});

module.exports = router;
