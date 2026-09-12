const Department = require('../models/Department')

async function getAllDepartments(req, res) {
  try {
    const departments = await Department.find()
    res.status(200).json(departments)
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch departments', error: error.message })
  }
}

async function getDepartmentByCode(req, res) {
  try {
    const department = await Department.findOne({ code: req.params.code.toUpperCase() })
    if (!department) {
      return res.status(404).json({ message: 'Department not found' })
    }
    res.status(200).json(department)
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch department', error: error.message })
  }
}

module.exports = { getAllDepartments, getDepartmentByCode }