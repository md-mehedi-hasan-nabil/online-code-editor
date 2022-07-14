const express = require("express");
const router = express.Router();

const goController = require("../controllers/goController");

router.post("/", goController);

module.exports = router;
