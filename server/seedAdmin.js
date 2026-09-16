require('dotenv').config()
const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')
const connectDB = require('./config/db')
const Admin = require('./models/Admin')

async function seed() {
  await connectDB()
  const passwordHash = await bcrypt.hash('ICT_staff', 10)
  await Admin.create({ username: 'admin', passwordHash })
  console.log('Admin account created')
  await mongoose.connection.close()
}

seed()