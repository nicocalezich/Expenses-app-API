const incomeModel = require("../schemas/income")
let selectedYear = new Date().getFullYear()

const createIncome = (income) => {
    return incomeModel.create(income)
}

const getAllIncome = () => {
    return incomeModel.find({}).lean()
}

const getIncomePerYear = async (year) => {
    selectedYear = year
    return await incomeModel.find(
        {
            "date": {
                $gte: new Date(selectedYear, 0, 1),
                $lt: new Date(selectedYear + 1, 0, 1)
            }
        }
    ).lean()
}

/* Returns an array of 12 elements, every element contains the total amount per month (jan - dec) and the month name in the selected year. */
const getTotalIncomePerMonth = async (year) => {
    const amountPerMonth = []
    for (let i = 0; i < 12; i++) {
        let incomePerMonth = (await getIncomePerYear(parseInt(year))).filter((income) => income.date.getMonth() === i)
        amountPerMonth[i] = {monthNum: (i + 1), amount: await sumTotalAmount(incomePerMonth) }
    }
    return amountPerMonth

}

const sumTotalAmount = async (income) => {
    let total = 0
    await income.forEach((income) => total += income.amount)
    return total
}

const deleteIncome = async (name, date) => {
    const result = await incomeModel.deleteOne({ "name" : name, "date": date})
    return result
}

module.exports = { createIncome, getAllIncome, getTotalIncomePerMonth, deleteIncome }