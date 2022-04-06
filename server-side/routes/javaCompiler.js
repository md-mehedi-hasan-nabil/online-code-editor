const express = require("express");
const router = express.Router();

const javaController = require("../controllers/javaController");

router.post("/", javaController);

module.exports = router;
