const express = require("express");
const router = express.Router();
const controllerMethods = require("../Controller/get");

// const detectIntentTextController = controllerMethods.detectIntentText;
const checkPortController = controllerMethods.checkPort;
const intelAPIdata = controllerMethods.intelAPIdata;

// router.get("/detect_intent", detectIntentTextController);
router.get("/check_port", checkPortController);
router.get("/intelApi", intelAPIdata);

module.exports = router;
