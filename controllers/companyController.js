const db = require('../models');
const uuid = require('uuid');
const bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');
const { Sequelize } = require('sequelize');
const JWT_SECRET = "ShhhhSecret";

const Company = db.company;
const Machine = db.machine;

const addCompany = async (req, res) => {
    try {
        let success = false;
        const email = req.body.email;
        const result = await Company.findAll({ where: { "email": email } });
        if (result.length) {
            res.json({ success, "Email": email + " Already Exists" });
        }
        else {
            const salt = await bcrypt.genSalt(10);
            const securedPassword = await bcrypt.hash(req.body.password, salt);
            let company = {
                id: uuid.v4(),
                name: req.body.name,
                email: req.body.email,
                description: req.body.description ? req.body.description : "",
                password: securedPassword,
                address: req.body.address ? req.body.address : "",
            }
            const result = await Company.create(company);
            const data = {
                company: {
                    id: result.id
                }
            }
            console.log(data);
            var authToken = jwt.sign(data, JWT_SECRET);
            success = true;
            res.json({ success, authToken, 'companyName': result.name, "company": result });
        }
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Error Occured");
    }
}

const loginCompany = async (req, res) => {
    try {
        let success = false;
        const { email, password } = req.body;
        let company = await Company.findOne({ where: { [Sequelize.Op.or]: [{ email: email }, { name: email }] } });
        if (!company) {
            return res.status(400).json({ success: success, error: "Enter Correct Credentials" });
        }
        const passwordCompare = await bcrypt.compare(password, company.password);
        if (!passwordCompare) {
            return res.status(400).json({ success: success, error: "Enter Correct Credentials" });
        }
        const data = {
            company: {
                id: company.id
            }
        }
        var authToken = jwt.sign(data, JWT_SECRET);
        success = true;
        res.json({ success: success, authToken, 'Company Name ': company.name, "company": company });
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Error Occured");
    }
}


const getCompanyDetails = async (req, res) => {
    const id = req.body.id;
    const company = await Company.findOne({ where: { id: id } });
    res.json(company);
}

const getMachines = async (req, res) => {
    try {
        const companyId = req.company.id;
        let machines = await Machine.findAll({ where: { company_id: companyId }, order: [['logid', 'ASC']] });
        res.json(machines);
    } catch (error) {

    }
}

const updateCompany = async (req, res) => {
    const id = req.body.id;  
    const company = await Company.update(req.body, { where: { id: id } });
    res.json(company);
}

const deleteCompany = async (req, res) => {
    const id = req.params.id;
    await Company.destroy({ where: { id: id } });
    res.json({ "Company_id": id });
}


module.exports = {
    addCompany,
    loginCompany,
    getMachines,
    updateCompany,
    deleteCompany,
    getCompanyDetails
}