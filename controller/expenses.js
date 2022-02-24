const service = require('../services/expenses')

const createExpense = async (req, res) => {
    try {
        const result = await service.createExpense(req.body)
        res.send(result).status(201)
    }
    catch (error) {
        res.send(error)
    }
}

const getExpenses = async (_req, res) => {
    try {
        const result = await service.getExpenses()
        res.send(result).status(200)
    }
    catch (error) {
        res.send(error)
    }
}

const getExpensesPerYear = async (req, res) => {
    try {
        const year = req.body.year
        const result = await service.getPerYear(year)
        res.send(result).status(200)
    }
    catch (error) {
        res.send(error)
    }
}

const getExpensesPerMonth = async (req, res) => {
    try {
        const month = req.body.month
        const result = await service.getExpensesPerMonth(month)
        res.send(result).status(200)
    }
    catch (error) {
        res.send(error.message)
    }
}

const getTotalAmountPerMonth = async (req, res) => {
    try {
        const year = req.body.year
        const result = await service.getTotalAmountPerMonth(year)
        res.send(result).status(200)
    }
    catch (error) {
        res.send(error.message)
    }
}

module.exports = { createExpense, getExpenses, getExpensesPerYear, getExpensesPerMonth, getTotalAmountPerMonth }