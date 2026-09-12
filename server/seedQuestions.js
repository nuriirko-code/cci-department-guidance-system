
require('dotenv').config()
const mongoose = require('mongoose')
const connectDB = require('./config/db')
const Question = require('./models/Question')

const questionsData = [
   { id: 1, category: 'Interest', text: 'Which activity interests you the most?', options: [
    { text: 'Building and managing technology systems', weights: { CS: 2, SWE: 1, IT: 5, IS: 3, ISC: 1, STAT: 0 } },
    { text: 'Designing and developing software', weights: { CS: 3, SWE: 5, IT: 2, IS: 2, ISC: 1, STAT: 0 } },
    { text: 'Solving computing and programming problems', weights: { CS: 5, SWE: 4, IT: 2, IS: 1, ISC: 2, STAT: 1 } },
    { text: 'Managing technology and organizational information', weights: { CS: 1, SWE: 1, IT: 3, IS: 5, ISC: 4, STAT: 1 } },
  ] },
  { id: 2, category: 'Interest', text: 'What captures your curiosity most?', options: [
    { text: 'How data can reveal patterns and trends', weights: { CS: 2, SWE: 0, IT: 0, IS: 1, ISC: 3, STAT: 5 } },
    { text: 'How networks and devices connect and communicate', weights: { CS: 1, SWE: 1, IT: 5, IS: 2, ISC: 0, STAT: 0 } },
    { text: 'How software transforms ideas into working products', weights: { CS: 2, SWE: 5, IT: 1, IS: 2, ISC: 0, STAT: 0 } },
    { text: 'How complex problems can be solved with elegant logic', weights: { CS: 5, SWE: 2, IT: 0, IS: 0, ISC: 1, STAT: 2 } },
  ] },
  { id: 3, category: 'Work Style', text: 'How do you prefer to work on a project?', options: [
    { text: 'Independently, deeply focused on one hard problem', weights: { CS: 5, SWE: 1, IT: 0, IS: 0, ISC: 1, STAT: 3 } },
    { text: 'In a team, iterating quickly on a working product', weights: { CS: 1, SWE: 5, IT: 1, IS: 2, ISC: 0, STAT: 0 } },
    { text: 'Hands-on, setting up and maintaining systems', weights: { CS: 0, SWE: 1, IT: 5, IS: 2, ISC: 0, STAT: 0 } },
    { text: 'Coordinating between technical and non-technical people', weights: { CS: 0, SWE: 1, IT: 2, IS: 5, ISC: 2, STAT: 0 } },
  ] },
  { id: 4, category: 'Work Style', text: 'When learning something new, you prefer to...', options: [
    { text: 'Understand the theory before touching anything', weights: { CS: 5, SWE: 1, IT: 0, IS: 0, ISC: 1, STAT: 4 } },
    { text: 'Build a small prototype and learn by doing', weights: { CS: 1, SWE: 5, IT: 4, IS: 1, ISC: 0, STAT: 0 } },
    { text: 'Study how existing systems or data are organized', weights: { CS: 1, SWE: 0, IT: 1, IS: 2, ISC: 5, STAT: 1 } },
    { text: 'See how it fits into a bigger organizational process', weights: { CS: 0, SWE: 0, IT: 1, IS: 5, ISC: 2, STAT: 0 } },
  ] },
  { id: 5, category: 'Skill', text: 'Which skill do you already feel strongest in?', options: [
    { text: 'Math and logical reasoning', weights: { CS: 5, SWE: 1, IT: 0, IS: 0, ISC: 1, STAT: 5 } },
    { text: 'Organizing and analyzing information', weights: { CS: 1, SWE: 0, IT: 1, IS: 3, ISC: 5, STAT: 2 } },
    { text: 'Troubleshooting hardware or network issues', weights: { CS: 0, SWE: 1, IT: 5, IS: 1, ISC: 0, STAT: 0 } },
    { text: 'Writing and structuring code', weights: { CS: 3, SWE: 5, IT: 1, IS: 1, ISC: 0, STAT: 0 } },
  ] },
  { id: 6, category: 'Skill', text: 'Which of these would you enjoy improving most?', options: [
    { text: 'Statistical modeling and data analysis', weights: { CS: 1, SWE: 0, IT: 0, IS: 1, ISC: 2, STAT: 5 } },
    { text: 'Programming and software design', weights: { CS: 4, SWE: 5, IT: 1, IS: 1, ISC: 0, STAT: 0 } },
    { text: 'Network and systems administration', weights: { CS: 0, SWE: 0, IT: 5, IS: 1, ISC: 0, STAT: 0 } },
    { text: 'Information systems and business analysis', weights: { CS: 0, SWE: 1, IT: 1, IS: 5, ISC: 3, STAT: 1 } },
  ] },
  { id: 7, category: 'Career Goals', text: 'What kind of role excites you after graduation?', options: [
    { text: 'Data scientist or statistician', weights: { CS: 2, SWE: 0, IT: 0, IS: 1, ISC: 2, STAT: 5 } },
    { text: 'Software developer or engineer', weights: { CS: 3, SWE: 5, IT: 1, IS: 1, ISC: 0, STAT: 0 } },
    { text: 'Network or systems administrator / IT support specialist', weights: { CS: 0, SWE: 0, IT: 5, IS: 1, ISC: 0, STAT: 0 } },
    { text: 'Business or information systems analyst', weights: { CS: 0, SWE: 1, IT: 1, IS: 5, ISC: 3, STAT: 1 } },
  ] },
  { id: 8, category: 'Career Goals', text: 'Which work environment appeals to you most?', options: [
    { text: 'A research lab analyzing data and models', weights: { CS: 2, SWE: 0, IT: 0, IS: 0, ISC: 3, STAT: 5 } },
    { text: 'A product team building an app or platform', weights: { CS: 1, SWE: 5, IT: 1, IS: 1, ISC: 0, STAT: 0 } },
    { text: 'A data center or IT department keeping systems running', weights: { CS: 0, SWE: 0, IT: 5, IS: 1, ISC: 0, STAT: 0 } },
    { text: "An organization's IT/business strategy office", weights: { CS: 0, SWE: 0, IT: 1, IS: 5, ISC: 2, STAT: 1 } },
  ] },
  { id: 9, category: 'Technical Aptitude', text: 'How comfortable are you with advanced mathematics?', options: [
    { text: 'Very comfortable — I enjoy proofs and abstract math', weights: { CS: 5, SWE: 1, IT: 0, IS: 0, ISC: 1, STAT: 5 } },
    { text: 'Comfortable enough for applied, practical problems', weights: { CS: 2, SWE: 3, IT: 1, IS: 3, ISC: 1, STAT: 2 } },
    { text: 'I prefer practical/technical skills over heavy math', weights: { CS: 0, SWE: 2, IT: 5, IS: 1, ISC: 0, STAT: 0 } },
    { text: 'I prefer working with structured information over numbers', weights: { CS: 0, SWE: 0, IT: 1, IS: 2, ISC: 5, STAT: 0 } },
  ] },
  { id: 10, category: 'Technical Aptitude', text: 'Which programming-adjacent activity sounds most appealing?', options: [
    { text: 'Designing algorithms and analyzing their efficiency', weights: { CS: 5, SWE: 2, IT: 0, IS: 0, ISC: 1, STAT: 2 } },
    { text: 'Building full applications end-to-end', weights: { CS: 1, SWE: 5, IT: 1, IS: 1, ISC: 0, STAT: 0 } },
    { text: 'Configuring servers, networks, or cloud infrastructure', weights: { CS: 0, SWE: 1, IT: 5, IS: 1, ISC: 0, STAT: 0 } },
    { text: 'Organizing, cataloging, and retrieving large datasets or documents', weights: { CS: 1, SWE: 0, IT: 0, IS: 1, ISC: 5, STAT: 1 } },
  ] },
  { id: 11, category: 'Problem-Solving', text: 'When facing a difficult problem, you tend to...', options: [
    { text: 'Break it down into logical, step-by-step components', weights: { CS: 5, SWE: 2, IT: 0, IS: 0, ISC: 1, STAT: 2 } },
    { text: 'Look for a working solution quickly, then refine it', weights: { CS: 1, SWE: 5, IT: 1, IS: 1, ISC: 0, STAT: 0 } },
    { text: 'Check the systems or infrastructure for the root cause', weights: { CS: 0, SWE: 1, IT: 5, IS: 1, ISC: 0, STAT: 0 } },
    { text: 'Look at how information flows through the process', weights: { CS: 0, SWE: 0, IT: 1, IS: 5, ISC: 2, STAT: 0 } },
  ] },
  { id: 12, category: 'Problem-Solving', text: 'What aspect of problem-solving satisfies you most?', options: [
    { text: 'Finding the mathematically optimal solution', weights: { CS: 3, SWE: 0, IT: 0, IS: 0, ISC: 1, STAT: 5 } },
    { text: 'Seeing your solution work reliably for real users', weights: { CS: 1, SWE: 5, IT: 1, IS: 1, ISC: 0, STAT: 0 } },
    { text: 'Keeping complex systems running smoothly', weights: { CS: 0, SWE: 1, IT: 5, IS: 1, ISC: 0, STAT: 0 } },
    { text: 'Making information more accessible and organized for people', weights: { CS: 0, SWE: 0, IT: 0, IS: 2, ISC: 5, STAT: 1 } },
  ] },
  { id: 13, category: 'Interest', text: 'Which type of information work interests you most?', options: [
    { text: 'Designing logical models and algorithms to solve complex problems', weights: { CS: 5, SWE: 2, IT: 0, IS: 0, ISC: 1, STAT: 2 } },
    { text: 'Turning ideas into useful software applications', weights: { CS: 2, SWE: 5, IT: 1, IS: 1, ISC: 0, STAT: 0 } },
    { text: 'Managing networks, hardware, servers, and technical infrastructure', weights: { CS: 0, SWE: 1, IT: 5, IS: 1, ISC: 0, STAT: 0 } },
    { text: 'Understanding how organizations use technology to improve their work', weights: { CS: 0, SWE: 1, IT: 1, IS: 5, ISC: 2, STAT: 1 } },
  ] },
  { id: 14, category: 'Information Skills', text: 'Which task would you find most satisfying?', options: [
    { text: 'Organizing a large collection of documents so people can find information easily', weights: { CS: 0, SWE: 0, IT: 0, IS: 2, ISC: 5, STAT: 1 } },
    { text: 'Analyzing numerical data to discover meaningful patterns', weights: { CS: 2, SWE: 0, IT: 0, IS: 1, ISC: 2, STAT: 5 } },
    { text: 'Developing a system that solves a real-world problem', weights: { CS: 2, SWE: 5, IT: 1, IS: 2, ISC: 0, STAT: 0 } },
    { text: 'Designing an efficient method for solving a difficult computational problem', weights: { CS: 5, SWE: 2, IT: 0, IS: 0, ISC: 1, STAT: 2 } },
  ] },
  { id: 15, category: 'Work Environment', text: 'Which project would you most enjoy working on?', options: [
    { text: 'Building a secure and reliable campus network', weights: { CS: 0, SWE: 0, IT: 5, IS: 1, ISC: 0, STAT: 0 } },
    { text: 'Developing a mobile or web application for students', weights: { CS: 2, SWE: 5, IT: 1, IS: 1, ISC: 0, STAT: 0 } },
    { text: "Designing a system that improves how a university manages its business processes", weights: { CS: 0, SWE: 1, IT: 1, IS: 5, ISC: 2, STAT: 1 } },
    { text: 'Creating a system that organizes and provides access to digital information', weights: { CS: 1, SWE: 0, IT: 0, IS: 2, ISC: 5, STAT: 1 } },
  ] },
  { id: 16, category: 'Aptitude', text: 'Which type of problem would you be most comfortable spending hours solving?', options: [
    { text: 'A complex mathematical or statistical problem involving data', weights: { CS: 3, SWE: 0, IT: 0, IS: 1, ISC: 2, STAT: 5 } },
    { text: 'A difficult programming problem requiring logical reasoning', weights: { CS: 5, SWE: 4, IT: 1, IS: 0, ISC: 1, STAT: 2 } },
    { text: 'A technical problem involving computers, networks, or system configuration', weights: { CS: 0, SWE: 1, IT: 5, IS: 1, ISC: 0, STAT: 0 } },
    { text: 'A problem involving how people, information, and organizations interact', weights: { CS: 0, SWE: 1, IT: 1, IS: 5, ISC: 4, STAT: 1 } },
  ] },
  { id: 17, category: 'Career Goals', text: 'Which future responsibility sounds most appealing?', options: [
    { text: 'Developing and maintaining software products', weights: { CS: 2, SWE: 5, IT: 1, IS: 1, ISC: 0, STAT: 0 } },
    { text: "Managing and securing an organization's IT infrastructure", weights: { CS: 0, SWE: 1, IT: 5, IS: 2, ISC: 0, STAT: 0 } },
    { text: 'Helping organizations improve their processes through information systems', weights: { CS: 0, SWE: 1, IT: 1, IS: 5, ISC: 2, STAT: 1 } },
    { text: 'Analyzing data and producing statistical evidence for decisions', weights: { CS: 2, SWE: 0, IT: 0, IS: 1, ISC: 2, STAT: 5 } },
  ] },
  { id: 18, category: 'Personal Preference', text: 'Which statement describes you best?', options: [
    { text: 'I enjoy understanding how things work at a deep logical level', weights: { CS: 5, SWE: 2, IT: 0, IS: 0, ISC: 1, STAT: 3 } },
    { text: 'I enjoy creating practical things that people can use', weights: { CS: 2, SWE: 5, IT: 2, IS: 2, ISC: 0, STAT: 0 } },
    { text: 'I enjoy working with information, organizing it, and making it easy to access', weights: { CS: 0, SWE: 0, IT: 1, IS: 2, ISC: 5, STAT: 1 } },
    { text: 'I enjoy working with numbers, uncertainty, and evidence to reach conclusions', weights: { CS: 2, SWE: 0, IT: 0, IS: 1, ISC: 2, STAT: 5 } },
  ] },

]

async function seed() {
  await connectDB()
  await Question.deleteMany({})
  console.log('Cleared existing questions')
  await Question.insertMany(questionsData)
  console.log('All questions seeded successfully')
  await mongoose.connection.close()
}

seed()