const express = require("express");
const router = express.Router();

const cplusplusController = require("../controllers/cplusplusController");

router.post("/", cplusplusController);

module.exports = router;
