require('dotenv').config()
const express = require('express')
const cors = require('cors')
const connectDB = require('./config/db')
const departmentRoutes = require('./routes/departmentRoutes')

const app = express()
app.use(cors())
app.use(express.json())

connectDB()

app.use('/api/departments', departmentRoutes)

app.get('/', (req, res) => {
  res.send('CCI Department Guidance API is running')
})




const questionRoutes = require('./routes/questionRoutes')
app.use('/api/questions', questionRoutes)


const PORT = process.env.PORT || 5000
app.listen(PORT, () => console.log(`Server running on port ${PORT}`))