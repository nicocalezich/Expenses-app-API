const { Schema } = require("mongoose") 
const mongoose =  require("mongoose") 

const activityModel = mongoose.model('Activity', new Schema(
    { name: String, amount: Number, date: Date, isExpense: Boolean }
));

module.exports = activityModel