const express = require('express')
const router = express.Router()
const { getAllDepartments, getDepartmentByCode } = require('../controllers/departmentController')

router.get('/', getAllDepartments)

router.get('/:code', getDepartmentByCode)

module.exports = router