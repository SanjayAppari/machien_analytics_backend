const companyController = require('../controllers/companyController.js');
const fetchCompany = require('../middleWare/fetchCompany.js');

const router = require('express').Router();

router.post('/addCompany',companyController.addCompany);
router.post('/loginCompany', companyController.loginCompany);
router.get('/getMachines', fetchCompany ,companyController.getMachines);
router.post('/updateCompany',companyController.updateCompany);
router.post('/deleteCompany',companyController.deleteCompany);
router.post('/getCompanyDetails',companyController.getCompanyDetails);

module.exports = router;