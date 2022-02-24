const activityModel = require("../schemas/activity")

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

module.exports = { createActivityItem, getActivityItem, getMonthBalance }