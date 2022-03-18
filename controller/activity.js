const service = require('../services/activity')
const expenseService = require('../services/expenses')
const incomeService = require('../services/income')

const createActivityItem = async (req, res) => {
    try{
        const item = {name: req.body.name, amount: req.body.amount, date: req.body.date, isExpense: req.body.isExpense}
        const result = await service.createActivityItem(item)
        res.send(result).status(201)
    }
    catch (error){
        res.send(error)
    }
}

const getActivityItem = async (req, res) => {
    try{
        const result = await service.getActivityItem(req.body)
        res.send(result).status(201)
    }
    catch (error){
        res.send(error)
    }
}

const getMonthBalance = async (req, res) => {
    try{
        const month = req.body.month
        const year = req.body.year
        const result = await service.getMonthBalance(month, year)
        res.send(result).status(200)
    }
    catch (error){
        res.send(error)
    }
}

const deleteActivity = async (req, res) => {
    try {   
        const result = await service.deleteById(req.params.id)
        if (req.params.isExpense){
            await expenseService.deleteExpense(req.params.name, req.params.date) 
        }
        else{
            await incomeService.deleteIncome(req.params.name, req.params.date)
        }
        res.send(result).status(200)
    } catch (error) {
        console.log(error)
        res.send(error).status(500)
    }
}

module.exports = { createActivityItem, getActivityItem, getMonthBalance, deleteActivity }

