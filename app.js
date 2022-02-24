const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();
const port = 8080;

app.use(cors({
    origin: '*'
}));

const expensesRouter = require('./routes/expenses')
const incomeRouter = require('./routes/income')
const activityRouter = require('./routes/activity')
const settingsRouter = require('./routes/settings')

app.use(express.json());
app.use('/expenses', expensesRouter);
app.use('/income', incomeRouter);
app.use('/activity', activityRouter);
app.use('/settings', settingsRouter);

// start the Express server
app.listen(port, async () => {
    try {
        await mongoose.connect('mongodb://localhost:27017/expenses-app');
        console.log(`server started at http://localhost:${port}`);
    } catch (error) {
        console.log(error)
    }

});