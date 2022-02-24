const expenseModel = require("../schemas/expense")
let selectedYear = new Date().getFullYear()

const createExpense = (body) => {
    return expenseModel.create(body)
}

const getExpenses = () => {
    return expenseModel.find({}).lean()
}

const getExpensesPerYear = async (year) => {
    selectedYear = year
    return await expenseModel.find(
        {
            "date": {
                $gte: new Date(selectedYear, 0, 1),
                $lt: new Date(selectedYear + 1, 0, 1)
            }
        }
    ).lean()
}

/*returns an array of n elements (n = days in required month. example: january -> 31).
 each element represent a day in that month, and contians another array with expenses per day. */
const getExpensesPerMonth = async (month) => {
    if (selectedYear === undefined) {
        throw new Error("Year is not define")
    }
    const monthInfo = getMonthInfo(month)
    const selectedMonth = parseInt(month) - 1
    const monthExpenses = await expenseModel.find(
        {
            "date": {
                $gte: new Date(selectedYear, selectedMonth, 1),
                $lt: new Date(selectedYear, selectedMonth, 32)
            }
        }
    ).lean()
    return { month: monthInfo.month, expenses: getExpensesPerDayInMonth(monthExpenses, monthInfo.days) }
}

const getExpensesPerDayInMonth = (expenses, daysInMonth) => {
    const expensesPerDay = []
    for (let i = 0; i < daysInMonth; i++) {
        expensesPerDay[i] = { expenses: expenses.filter((expense) => expense.date.getDate() === i + 1), dayNumber: i + 1 }
    }
    return expensesPerDay
}

/* Returns an array of 12 elements, every element contains the total amount per month (jan - dec) and the month name in the selected year. */
const getTotalAmountPerMonth = async (year) => {
    const amountPerMonth = []
    for (let i = 0; i < 12; i++) {
        let expensesPerMonth = (await getExpensesPerYear(parseInt(year))).filter((expense) => expense.date.getMonth() === i)
        amountPerMonth[i] = { monthNum: (i + 1), month: getMonthInfo(i + 1).month, amount: await sumTotalAmount(expensesPerMonth) }
    }
    return amountPerMonth

}

const sumTotalAmount = async (expenses) => {
    let total = 0
    await expenses.forEach((expense) => total += expense.amount)
    return total
}

const getMonthInfo = (month) => {
    switch (month) {
        case 1: return { days: 31, month: "Enero" }
        case 2: return { days: 28, month: "Febrero" }
        case 3: return { days: 31, month: "Marzo" }
        case 4: return { days: 30, month: "Abril" }
        case 5: return { days: 31, month: "Mayo" }
        case 6: return { days: 30, month: "Junio" }
        case 7: return { days: 31, month: "Julio" }
        case 8: return { days: 31, month: "Agosto" }
        case 9: return { days: 30, month: "Septiembre" }
        case 10: return { days: 31, month: "Octubre" }
        case 11: return { days: 30, month: "Noviembre" }
        case 12: return { days: 31, month: "Diciembre" }
    }
}

module.exports = { createExpense, getExpenses, getExpensesPerYear, getExpensesPerMonth, getTotalAmountPerMonth }