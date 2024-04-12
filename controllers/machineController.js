const uuid = require('uuid');
const db = require('../models');


const Machine = db.machine;
const WorkInfo = db.workInfo;

const addMachine = async(req,res)=>{
    try {
        let success = false;
        const ans = await Machine.findAll({ where: { "logid": req.body.logid , "company_id":  req.company.id}});
        console.log(ans);
        if(ans.length){ 
            res.json({ success, "Logid": req.body.logid + " Already Exists" });
        } 
        else{
            const machine = {
                id:uuid.v4(),
                name:req.body.name,
                type:req.body.type,
                image: req.body.image,
                logid: req.body.logid,
                company_id:req.company.id,
            }
            console.log(machine);
            const result = await Machine.create(machine);
            success=true;
            res.json({success, result});
        }
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Error Occured");
    }
    
}

const getMachineDetails = async(req, res)=>{
    try {
        const id = req.body.id;
        const machine = await Machine.findOne({where: {id:id}});
        res.json(machine);
    } catch (error) {
        console.log(error);
    }
}

const getWorkLogs = async(req, res)=>{
    const id = req.body.id;
    const result = await WorkInfo.findAll({where: {machine_id:id}});  
    res.json(result);
}

const updateMachine = async (req,res)=>{ 
    const id = req.body.id;
    const machine = await Machine.update(req.body,{ where: {id:id} });
    res.json(machine);
}

const deleteMachine = async (req,res)=>{
    const id=req.params.id;
    await Machine.destroy({where: {id:id}});
    res.json({"Machine_id":id});
}

module.exports = {
    addMachine,
    updateMachine,
    deleteMachine,
    getMachineDetails,
    getWorkLogs,

}