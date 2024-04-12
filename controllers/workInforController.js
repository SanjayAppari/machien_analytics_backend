const db = require('../models');

const WorkInfo = db.workInfo;
const uuid = require('uuid');


const addWork = async(req,res)=>{

    const ans = await WorkInfo.findAll({ where:{ "machine_id": req.body.machine_id , "date": new Date().toJSON().slice(0, 10) } });
    if(ans.length > 0){
        res.json({success: false});
        return;
    }

    const work = {
        id: uuid.v4(),
        machine_id:req.body.machine_id,
        date:new Date().toJSON().slice(0, 10),
        start_time:req.body.start_time,
        end_time:req.body.end_time,
        operating_time:req.body.operating_time,
        break_down_time:req.body.break_down_time,
        shut_down_time:req.body.shut_down_time,
        products_count:req.body.products_count,
        scrap_count:req.body.scrap_count,
        down_time_reasons:req.body.down_time_reasons,
    }

    const result = await WorkInfo.create(work);
    res.json({result, "success": true});
}

const updateWork = async (req, res) => {
    const id = req.body.id;
    const work = await WorkInfo.update(req.body,{where: {id:id}});
    res.json(work);
}

const deleteWork = async (req, res) => {
    const id = req.body.id;
    await WorkInfo.destroy({where: {id:id}});
    res.json({"Work_id":id});
}

const getAllWorkLogs = async (req, res) => {
    const data = await WorkInfo.findAll({where: { "machine_id": req.body.machine_id }});
    res.json(data);
}


function calculateAverageStartTime(startTimeArray) {
    // Convert start times to minutes
    const minutesArray = startTimeArray.map(time => {
        const [hours, minutes] = time.start_time.split(":").map(Number);
        return hours * 60 + minutes;
    });

    // Calculate average of minutes
    const totalMinutes = minutesArray.reduce((acc, curr) => acc + curr, 0);
    const averageMinutes = totalMinutes / startTimeArray.length;

    // Convert average back to hours and minutes
    const averageHours = Math.floor(averageMinutes / 60);
    const averageMinutesRemainder = Math.round(averageMinutes % 60);

    // Format average time
    const averageStartTime = `${averageHours.toString().padStart(2, '0')}:${averageMinutesRemainder.toString().padStart(2, '0')}`;

    return averageStartTime;
}


function calculateAverageEndTime(startTimeArray) {
    // Convert start times to minutes
    const minutesArray = startTimeArray.map(time => {
        const [hours, minutes] = time.end_time.split(":").map(Number);
        return hours * 60 + minutes;
    });

    // Calculate average of minutes
    const totalMinutes = minutesArray.reduce((acc, curr) => acc + curr, 0);
    const averageMinutes = totalMinutes / startTimeArray.length;

    // Convert average back to hours and minutes
    const averageHours = Math.floor(averageMinutes / 60);
    const averageMinutesRemainder = Math.round(averageMinutes % 60);

    // Format average time
    const averageStartTime = `${averageHours.toString().padStart(2, '0')}:${averageMinutesRemainder.toString().padStart(2, '0')}`;

    return averageStartTime;
}

const getWorkLogsByMonth = async (req, res) => {
    const data = await WorkInfo.findAll({where: { "machine_id": req.body.machine_id }});
    const [selectedYear, selectedMonth] = req.body.month.split("-").map(Number);
    const result = data.filter( item => {
        const [itemYear, itemMonth] = item.date.split("-").map(Number);
        console.log(itemYear, itemMonth);
        return itemYear === selectedYear && itemMonth === selectedMonth
    })

    let ans = {
        "down_time_reasons":[]
    }
    ans['start_time']=calculateAverageStartTime(result);
    ans['end_time']=calculateAverageEndTime(result);
    let operating_time = 0;
    let break_down_time = 0;
    let totalProducts = 0;
    let scrapProdcuts = 0;
    let shutDownTime  = 0;
    for(let item of result) {
        operating_time += item.operating_time;
        break_down_time += item.break_down_time;
        totalProducts += item.products_count;
        scrapProdcuts += item.scrap_count;
        shutDownTime += item.shut_down_time;
        ans['down_time_reasons'].push(item.down_time_reasons);
    }

    ans['operating_time'] = (operating_time/(result.length));
    ans['break_down_time'] = (break_down_time/(result.length));
    ans['products_count'] = (totalProducts/(result.length));
    ans['scrap_count'] = (scrapProdcuts/(result.length));
    ans['shut_down_time'] = (shutDownTime/(result.length));

    if(req.body.month==="") {
        ans.start_time = "0:00";
        ans.end_time = "0:00";
    }
    res.json(ans);
}


const getWorkLogByDate = async (req,res) =>{
    try {
        const worklog = await WorkInfo.findOne({where: { "date": req.body.date , "machine_id": req.body.machine_id}});
        res.json(worklog);
    } catch (error) {
        res.json(error);
    }
}

module.exports = {
    addWork,
    updateWork,
    deleteWork,
    getAllWorkLogs,
    getWorkLogByDate,
    getWorkLogsByMonth
}     