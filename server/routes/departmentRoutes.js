const express = require('express')
const router = express.Router()
const {
	getAllDepartments,
	getDepartmentByCode,
	createDepartment,
	updateDepartmentById,
	deleteDepartmentById,
} = require('../controllers/departmentController')
const { authenticateToken, requireAdmin } = require('../middleware/auth')

router.get('/', getAllDepartments)
router.post('/', authenticateToken, requireAdmin, createDepartment)
router.put('/:id', authenticateToken, requireAdmin, updateDepartmentById)
router.delete('/:id', authenticateToken, requireAdmin, deleteDepartmentById)

router.get('/:code', getDepartmentByCode)

module.exports = router