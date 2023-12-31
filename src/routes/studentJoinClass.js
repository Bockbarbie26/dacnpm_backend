const express = require('express')
const router = express.Router()

const StudentJoinClassController = require('../app/controllers/StudentJoinClassController')

router.get('/', StudentJoinClassController.getStudentJoinClass)
router.get('/date', StudentJoinClassController.getNullClass)
router.get('/prize', StudentJoinClassController.getNullPrize)
router.post('/class', StudentJoinClassController.addStudentJoinClass)
router.patch('/prize', StudentJoinClassController.updatePrize)
router.patch('/date', StudentJoinClassController.updateDate)
router.patch('/points', StudentJoinClassController.updateStudentPoint)
router.delete('/prize', StudentJoinClassController.deletePrize)
router.delete('/class', StudentJoinClassController.deleteStudentJoinClass)

module.exports = router;