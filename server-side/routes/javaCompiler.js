const express = require("express");
const router = express.Router();

const javaController = require("../controller/javaController");

router.post("/", javaController);

module.exports = router;
