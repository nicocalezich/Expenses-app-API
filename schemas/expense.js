const { Schema } = require("mongoose") 
const mongoose =  require("mongoose") 

const expenseModel = mongoose.model('Expenses', new Schema(
    { name: String, amount: Number, date: Date }
));

module.exports = expenseModel