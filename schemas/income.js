const { Schema } = require("mongoose") 
const mongoose =  require("mongoose") 

const incomeModel = mongoose.model('Income', new Schema(
    { name: String, amount: Number, date: Date }
));

module.exports = incomeModel