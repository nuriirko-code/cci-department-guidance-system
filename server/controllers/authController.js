const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const Admin = require('../models/Admin')

async function login(req, res) {
  try {
    const { username, password } = req.body
//Go to the Admin collection and find one administrator whose username matches this username."
    const admin = await Admin.findOne({ username })
    if (!admin) return res.status(401).json({ message: 'Invalid credentials' })

    const passwordMatches = await bcrypt.compare(password, admin.passwordHash)
    if (!passwordMatches) return res.status(401).json({ message: 'Invalid credentials' })

    const token = jwt.sign(
      { adminId: admin._id, username: admin.username, role: admin.role },
      process.env.JWT_SECRET,
      { expiresIn: '1d' },
    )
    res.status(200).json({ token })
  } catch (error) {
    res.status(500).json({ message: 'Login failed', error: error.message })
  }
}

module.exports = { login }