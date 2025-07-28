const express = require("express");
const router = express.Router();
const { RegisterUser, LoginUser } = require("../Controllers/RegisterUser");
const { varifyToken } = require("../Middleware/Authentication");

router.post("/register", RegisterUser);
router.post("/login", LoginUser);
module.exports = router;