const express = require('express');
const router = express.Router();
const {createActivityItem, getActivityItem, getMonthBalance } = require("../controller/activity")

/* GET home page. */
router.post('/', createActivityItem);

router.get('/', getActivityItem);

router.post('/balance', getMonthBalance)


module.exports = router;