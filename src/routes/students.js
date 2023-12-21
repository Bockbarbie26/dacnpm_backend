const express = require('express')
const router = express.Router()

const studentsController = require('../app/controllers/StudentsController')

router.get('/students/search' , studentsController.getStudents )
router.get('/student/:name' , studentsController.getStudent)
router.post('student/create' , studentsController.addStudent)
router.put('student/:id' , studentsController.updateStudent)
router.delete('student/delete' , studentsController.removeStudent)

module.exports = router