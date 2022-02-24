const { Schema } = require("mongoose") 
const mongoose =  require("mongoose") 

const settingsModel = mongoose.model('Settings', new Schema(
    { name: String, value: Number }
));

module.exports = settingsModel