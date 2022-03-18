const express = require('express');
const router = express.Router();
const {createActivityItem, getActivityItem, getMonthBalance, deleteActivity } = require("../controller/activity")

/* GET home page. */
router.post('/', createActivityItem);

router.get('/', getActivityItem);

router.post('/balance', getMonthBalance)

router.delete('/:id/:name/:date/:isExpense', deleteActivity)


module.exports = router;