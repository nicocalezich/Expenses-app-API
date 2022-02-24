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

// const getMonthInfo = (month) => {
//     switch (month) {
//         case 1: return { days: 31, month: "Enero" }
//         case 2: return { days: 28, month: "Febrero" }
//         case 3: return { days: 31, month: "Marzo" }
//         case 4: return { days: 30, month: "Abril" }
//         case 5: return { days: 31, month: "Mayo" }
//         case 6: return { days: 30, month: "Junio" }
//         case 7: return { days: 31, month: "Julio" }
//         case 8: return { days: 31, month: "Agosto" }
//         case 9: return { days: 30, month: "Septiembre" }
//         case 10: return { days: 31, month: "Octubre" }
//         case 11: return { days: 30, month: "Noviembre" }
//         case 12: return { days: 31, month: "Diciembre" }
//     }
// }

module.exports = { createIncome, getAllIncome, getTotalIncomePerMonth }