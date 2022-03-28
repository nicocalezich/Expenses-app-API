const activityModel = require("../schemas/activity")
const ObjectId = require("mongoose").Types.ObjectId
const expenseModel = require('../schemas/expense')
const incomeModel = require("../schemas/income")

const createActivityItem = (item) => {
    return activityModel.create(item)
}

const getActivityItem = () => {
    return activityModel.find({}).lean()
}

const getMonthBalance = async (month, year) => {

    let balance = 0

    const activity = await activityModel.find(
        {
            "date": {
                $gte: new Date(year, month - 1, 1),
                $lt: new Date(year, month- 1, 32)
            }
        }
    ).lean()

    for (let i = 0; i < activity.length; i++){
        const amount = activity[i].amount
        activity[i].isExpense? balance -= amount : balance += amount
    }

    return {balance}
}

const deleteById = async (id) => {
    const result = await activityModel.deleteOne({ "_id" : ObjectId(id)})
    return result
}

const updateById = async (id, name, amount, date, isExpense) => {
    const previusActivity = await activityModel.findOne({ _id: id })
    const result = await activityModel.updateOne({ _id: id }, { $set: { name, amount, date, isExpense } })
    if (isExpense){
       await expenseModel.updateOne({ name: previusActivity.name, amount: previusActivity.amount }, { $set: { name, amount, date } })
    }
    else{
       await incomeModel.updateOne({ name: previusActivity.name, amount: previusActivity.amount }, { $set: { name, amount, date } })
    }
    return result
}

module.exports = { createActivityItem, getActivityItem, getMonthBalance, deleteById, updateById }