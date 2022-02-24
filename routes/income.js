const express = require('express');
const router = express.Router();
const { createIncome, getAllIncome, getTotalIncomePerMonth } = require("../controller/income")

/* GET home page. */
router.post('/', createIncome);

router.get('/', getAllIncome);

router.post('/incomepermonth', getTotalIncomePerMonth)

module.exports = router;
