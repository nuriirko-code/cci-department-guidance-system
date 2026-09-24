require('dotenv').config()
const express = require('express')
const cors = require('cors')
const connectDB = require('./config/db')


const app = express()
app.use(cors())
app.use(express.json())

connectDB()

const departmentRoutes = require('./routes/departmentRoutes')
app.use('/api/departments', departmentRoutes)

app.get('/', (req, res) => {
  res.send('CCI Department Guidance API is running')
})




const questionRoutes = require('./routes/questionRoutes')
app.use('/api/questions', questionRoutes)

const quizRoutes = require('./routes/quizRoutes')
app.use('/api/quiz', quizRoutes)

const feedbackRoutes = require('./routes/feedbackRoutes')
app.use('/api/feedback', feedbackRoutes)

const authRoutes = require('./routes/authRoutes')
app.use('/api/auth', authRoutes)

const PORT = process.env.PORT || 5000
app.listen(PORT, () => console.log(`Server running on port ${PORT}`))