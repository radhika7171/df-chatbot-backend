const express = require("express");
const webhookControlller = require("../Controller/post");

const router = express.Router();
router.post("/webhook", webhookControlller);
module.exports = router;
