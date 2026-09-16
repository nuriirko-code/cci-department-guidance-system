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

async function createDepartment(req, res) {
  try {
    const department = await Department.create(req.body)
    res.status(201).json(department)
  } catch (error) {
    const status = error.code === 11000 || error.name === 'ValidationError' ? 400 : 500
    res.status(status).json({ message: 'Failed to create department', error: error.message })
  }
}

async function updateDepartment(req, res) {
  try {
    const department = await Department.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    })
    if (!department) return res.status(404).json({ message: 'Department not found' })
    res.status(200).json(department)
  } catch (error) {
    const status = error.name === 'ValidationError' || error.name === 'CastError' ? 400 : 500
    res.status(status).json({ message: 'Failed to update department', error: error.message })
  }
}

async function deleteDepartment(req, res) {
  try {
    const department = await Department.findByIdAndDelete(req.params.id)
    if (!department) return res.status(404).json({ message: 'Department not found' })
    res.status(200).json({ message: 'Department deleted successfully' })
  } catch (error) {
    const status = error.name === 'CastError' ? 400 : 500
    res.status(status).json({ message: 'Failed to delete department', error: error.message })
  }
}

module.exports = {
  getAllDepartments,
  getDepartmentByCode,
  createDepartment,
  updateDepartment,
  deleteDepartment,
}