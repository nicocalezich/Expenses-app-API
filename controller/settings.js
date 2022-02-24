const service = require('../services/settings')

const setTopCharts = async (req, res) => {
    try{
        const top = {name: "top_charts", value: req.body.top}
        const result = await service.setTopCharts(top)
        res.send(result).status(201)
    }
    catch (error){
        res.send(error)
    }
}

const getTopCharts = async (_req, res) => {
    try{
        const result = await service.getTopCharts()
        res.send(result).status(201)
    }
    catch (error){
        res.send(error)
    }
}

module.exports = { setTopCharts, getTopCharts }