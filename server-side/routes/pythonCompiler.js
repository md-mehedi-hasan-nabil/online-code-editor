const express = require("express");
const router = express.Router();

const pythonController = require("../controller/pythonController");

router.post("/", pythonController);

module.exports = router;
