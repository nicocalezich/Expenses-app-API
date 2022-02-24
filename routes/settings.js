const express = require('express');
const router = express.Router();
const { setTopCharts, getTopCharts } = require("../controller/settings")

router.post('/topcharts', setTopCharts);

router.get('/topcharts', getTopCharts);


module.exports = router;