const workInforController = require('../controllers/workInforController.js');

const router = require('express').Router();

router.post('/addWork',workInforController.addWork);
router.post('/updateWork',workInforController.updateWork);
router.post('/deleteWork',workInforController.deleteWork);
router.post('/getWorkLogs', workInforController.getAllWorkLogs);
router.post('/getWorkLogByDate', workInforController.getWorkLogByDate);
router.post('/getWorkLogByMonth', workInforController.getWorkLogsByMonth);

module.exports = router;