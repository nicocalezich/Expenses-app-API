const express = require('express');
const router = express.Router();
const { createExpense, getExpenses, getExpensesPerMonth, getTotalAmountPerMonth } = require("../controller/expenses")

router.post('/', createExpense);

router.get('/', getExpenses);

router.post('/permonth', getExpensesPerMonth); 

router.post('/amountpermonth', getTotalAmountPerMonth);

module.exports = router;
