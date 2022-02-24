const service = require('../services/income')

const createIncome = async (req, res) => {
    try{
        const income = {name: req.body.name, amount: req.body.amount, date: req.body.date}
        const result = await service.createIncome(income)
        res.send(result).status(201)
    }
    catch (error){
        res.send(error)
    }
}

const getAllIncome = async (_req, res) => {
    try{
        const result = await service.getAllIncome()
        res.send(result).status(200)
    }
    catch (error){
        res.send(error)
    }
}

const getTotalIncomePerMonth = async (req, res) => {
    try{
        const year = req.body.year
        const result = await service.getTotalIncomePerMonth(year)
        res.send(result).status(201)
    }
    catch (error){
        res.send(error.message)
    }
}

module.exports = { createIncome, getAllIncome, getTotalIncomePerMonth }