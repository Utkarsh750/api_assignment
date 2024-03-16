const express = require("express");
const router = express.Router();
const { authenticate } = require("../controllers/auth.controller");

//  Route to authenticate user credentials

router.post("/auth", authenticate);

module.exports = router;
