const express = require('express')
const router = express.Router()
const {
	getAllDepartments,
	getDepartmentByCode,
	createDepartment,
	updateDepartment,
	deleteDepartment,
} = require('../controllers/departmentController')
const { authenticateToken, requireAdmin } = require('../middleware/auth')

router.get('/', getAllDepartments)
router.post('/', authenticateToken, requireAdmin, createDepartment)
router.put('/:id', authenticateToken, requireAdmin, updateDepartment)
router.delete('/:id', authenticateToken, requireAdmin, deleteDepartment)

router.get('/:code', getDepartmentByCode)

module.exports = router