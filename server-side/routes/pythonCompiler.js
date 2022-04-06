const express = require("express");
const router = express.Router();

const pythonController = require("../controllers/pythonController");

router.post("/", pythonController);

module.exports = router;
