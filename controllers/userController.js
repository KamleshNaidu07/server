const User = require("../models/userModel");

//to get single user
const getUserByID = async (req, res) => {
    try {
        const username = req.body.username;
        const password = req.body.password;
        
        const user = await User.getUserByID(username, password);
        if (user) {
            res.json(user);
        } else {
            res.json({error: "User not found"})
        }
    } catch (error) {
        res.status(500).json({error: "Failed to fetch user"});
    }
}

// Export the User controller functions
module.exports = {
    getUserByID,
};
