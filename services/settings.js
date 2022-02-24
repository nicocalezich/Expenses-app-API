const settingsModel = require("../schemas/settings")


const setTopCharts = async (top) => {
    const found = await getTopCharts()
    if (!found.length){
        return settingsModel.create(top)
    }
    return settingsModel.updateOne({"name": "top_charts"}, {$set:{"value": top.value}})
}

const getTopCharts = async () => {
    return settingsModel.find({"name": "top_charts"}).lean()
}

module.exports = { setTopCharts, getTopCharts }