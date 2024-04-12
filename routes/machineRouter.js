const machineController = require('../controllers/machineController.js');
const fetchCompany = require('../middleWare/fetchCompany.js');

const router = require('express').Router();

router.post('/addMachine', fetchCompany, machineController.addMachine);
router.post('/getMachineDetails',machineController.getMachineDetails);
router.post('/getWorkLogs',machineController.getWorkLogs);
router.post('/updateMachine',machineController.updateMachine);
router.post('/deleteMachine',machineController.deleteMachine);

module.exports = router;