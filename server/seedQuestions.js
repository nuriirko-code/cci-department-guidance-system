
// Weight keys must match a Department.code exactly; this cross-collection relationship is enforced by seed/admin validation convention because MongoDB cannot enforce a foreign key for Map keys.
require('dotenv').config()
const mongoose = require('mongoose')
const connectDB = require('./config/db')
const Question = require('./models/Question')

// Each option stores only the competencies it measures; department fit is derived later from the department's evidence-backed competencyProfile.
const questionsData = [
   { id: 1, category: 'Interest', text: 'Which activity interests you the most?', options: [
    { text: 'Building and managing technology systems', competencies: ['systemsInfrastructure'] },
    { text: 'Designing and developing software', competencies: ['programming', 'softwareEngPractice'] },
    { text: 'Solving computing and programming problems', competencies: ['programming', 'algorithmicTheory'] },
    { text: 'Managing technology and organizational information', competencies: ['businessAlignment'] },
  ] },
  { id: 2, category: 'Interest', text: 'What captures your curiosity most?', options: [
    { text: 'How data can reveal patterns and trends', competencies: ['dataStatAnalysis'] },
    { text: 'How networks and devices connect and communicate', competencies: ['systemsInfrastructure'] },
    { text: 'How software transforms ideas into working products', competencies: ['softwareEngPractice'] },
    { text: 'How complex problems can be solved with elegant logic', competencies: ['algorithmicTheory'] },
  ] },
  { id: 3, category: 'Work Style', text: 'How do you prefer to work on a project?', options: [
    { text: 'Independently, deeply focused on one hard problem', competencies: ['independentAnalyticalWork'] },
    { text: 'In a team, iterating quickly on a working product', competencies: ['collaborativeWork', 'softwareEngPractice'] },
    { text: 'Hands-on, setting up and maintaining systems', competencies: ['systemsInfrastructure'] },
    { text: 'Coordinating between technical and non-technical people', competencies: ['businessAlignment', 'collaborativeWork'] },
  ] },
  { id: 4, category: 'Work Style', text: 'When learning something new, you prefer to...', options: [
    { text: 'Understand the theory before touching anything', competencies: ['algorithmicTheory', 'independentAnalyticalWork'] },
    { text: 'Build a small prototype and learn by doing', competencies: ['softwareEngPractice'] },
    { text: 'Study how existing systems or data are organized', competencies: ['infoOrganization'] },
    { text: 'See how it fits into a bigger organizational process', competencies: ['businessAlignment'] },
  ] },
  { id: 5, category: 'Skill', text: 'Which skill do you already feel strongest in?', options: [
    { text: 'Math and logical reasoning', competencies: ['algorithmicTheory', 'independentAnalyticalWork'] },
    { text: 'Organizing and analyzing information', competencies: ['infoOrganization'] },
    { text: 'Troubleshooting hardware or network issues', competencies: ['systemsInfrastructure'] },
    { text: 'Writing and structuring code', competencies: ['programming'] },
  ] },
  { id: 6, category: 'Skill', text: 'Which of these would you enjoy improving most?', options: [
    { text: 'Statistical modeling and data analysis', competencies: ['dataStatAnalysis'] },
    { text: 'Programming and software design', competencies: ['programming', 'softwareEngPractice'] },
    { text: 'Network and systems administration', competencies: ['systemsInfrastructure'] },
    { text: 'Information systems and business analysis', competencies: ['businessAlignment'] },
  ] },
  { id: 7, category: 'Career Goals', text: 'What kind of role excites you after graduation?', options: [
    { text: 'Data scientist or statistician', competencies: ['dataStatAnalysis'] },
    { text: 'Software developer or engineer', competencies: ['programming', 'softwareEngPractice'] },
    { text: 'Network or systems administrator / IT support specialist', competencies: ['systemsInfrastructure'] },
    { text: 'Business or information systems analyst', competencies: ['businessAlignment'] },
  ] },
  { id: 8, category: 'Career Goals', text: 'Which work environment appeals to you most?', options: [
    { text: 'A research lab analyzing data and models', competencies: ['dataStatAnalysis'] },
    { text: 'A product team building an app or platform', competencies: ['programming', 'softwareEngPractice', 'collaborativeWork'] },
    { text: 'A data center or IT department keeping systems running', competencies: ['systemsInfrastructure'] },
    { text: "An organization's IT/business strategy office", competencies: ['businessAlignment'] },
  ] },
  { id: 9, category: 'Technical Aptitude', text: 'How comfortable are you with advanced mathematics?', options: [
    { text: 'Very comfortable — I enjoy proofs and abstract math', competencies: ['algorithmicTheory', 'independentAnalyticalWork'] },
    // HUMAN REVIEW: "applied, practical problems" gives no subject area, so several competencies could fit equally well.
    { text: 'Comfortable enough for applied, practical problems', competencies: [] },
    // HUMAN REVIEW: "practical/technical skills" could refer to software practice or systems infrastructure without more context.
    { text: 'I prefer practical/technical skills over heavy math', competencies: [] },
    { text: 'I prefer working with structured information over numbers', competencies: ['infoOrganization'] },
  ] },
  { id: 10, category: 'Technical Aptitude', text: 'Which programming-adjacent activity sounds most appealing?', options: [
    { text: 'Designing algorithms and analyzing their efficiency', competencies: ['algorithmicTheory'] },
    { text: 'Building full applications end-to-end', competencies: ['programming', 'softwareEngPractice'] },
    { text: 'Configuring servers, networks, or cloud infrastructure', competencies: ['systemsInfrastructure'] },
    { text: 'Organizing, cataloging, and retrieving large datasets or documents', competencies: ['infoOrganization'] },
  ] },
  { id: 11, category: 'Problem-Solving', text: 'When facing a difficult problem, you tend to...', options: [
    { text: 'Break it down into logical, step-by-step components', competencies: ['algorithmicTheory', 'independentAnalyticalWork'] },
    { text: 'Look for a working solution quickly, then refine it', competencies: ['softwareEngPractice'] },
    { text: 'Check the systems or infrastructure for the root cause', competencies: ['systemsInfrastructure'] },
    // HUMAN REVIEW: information flow can describe information organization or organizational/business processes; the wording does not distinguish them.
    { text: 'Look at how information flows through the process', competencies: [] },
  ] },
  { id: 12, category: 'Problem-Solving', text: 'What aspect of problem-solving satisfies you most?', options: [
    // HUMAN REVIEW: mathematical optimization could be algorithmic theory or statistical analysis; the prompt gives no problem domain.
    { text: 'Finding the mathematically optimal solution', competencies: [] },
    { text: 'Seeing your solution work reliably for real users', competencies: ['softwareEngPractice'] },
    { text: 'Keeping complex systems running smoothly', competencies: ['systemsInfrastructure'] },
    { text: 'Making information more accessible and organized for people', competencies: ['infoOrganization'] },
  ] },
  { id: 13, category: 'Interest', text: 'Which type of information work interests you most?', options: [
    { text: 'Designing logical models and algorithms to solve complex problems', competencies: ['algorithmicTheory'] },
    { text: 'Turning ideas into useful software applications', competencies: ['programming', 'softwareEngPractice'] },
    { text: 'Managing networks, hardware, servers, and technical infrastructure', competencies: ['systemsInfrastructure'] },
    { text: 'Understanding how organizations use technology to improve their work', competencies: ['businessAlignment'] },
  ] },
  { id: 14, category: 'Information Skills', text: 'Which task would you find most satisfying?', options: [
    { text: 'Organizing a large collection of documents so people can find information easily', competencies: ['infoOrganization'] },
    { text: 'Analyzing numerical data to discover meaningful patterns', competencies: ['dataStatAnalysis'] },
    // HUMAN REVIEW: "a system" is unspecified, so it could measure programming, software engineering practice, or another domain.
    { text: 'Developing a system that solves a real-world problem', competencies: [] },
    { text: 'Designing an efficient method for solving a difficult computational problem', competencies: ['algorithmicTheory'] },
  ] },
  { id: 15, category: 'Work Environment', text: 'Which project would you most enjoy working on?', options: [
    { text: 'Building a secure and reliable campus network', competencies: ['systemsInfrastructure', 'securityAwareness'] },
    { text: 'Developing a mobile or web application for students', competencies: ['programming', 'softwareEngPractice'] },
    { text: "Designing a system that improves how a university manages its business processes", competencies: ['softwareEngPractice', 'businessAlignment'] },
    { text: 'Creating a system that organizes and provides access to digital information', competencies: ['infoOrganization'] },
  ] },
  { id: 16, category: 'Aptitude', text: 'Which type of problem would you be most comfortable spending hours solving?', options: [
    { text: 'A complex mathematical or statistical problem involving data', competencies: ['dataStatAnalysis'] },
    { text: 'A difficult programming problem requiring logical reasoning', competencies: ['programming', 'algorithmicTheory'] },
    { text: 'A technical problem involving computers, networks, or system configuration', competencies: ['systemsInfrastructure'] },
    { text: 'A problem involving how people, information, and organizations interact', competencies: ['businessAlignment', 'infoOrganization'] },
  ] },
  { id: 17, category: 'Career Goals', text: 'Which future responsibility sounds most appealing?', options: [
    { text: 'Developing and maintaining software products', competencies: ['programming', 'softwareEngPractice'] },
    { text: "Managing and securing an organization's IT infrastructure", competencies: ['systemsInfrastructure', 'securityAwareness'] },
    { text: 'Helping organizations improve their processes through information systems', competencies: ['businessAlignment'] },
    { text: 'Analyzing data and producing statistical evidence for decisions', competencies: ['dataStatAnalysis'] },
  ] },
  { id: 18, category: 'Personal Preference', text: 'Which statement describes you best?', options: [
    { text: 'I enjoy understanding how things work at a deep logical level', competencies: ['algorithmicTheory', 'independentAnalyticalWork'] },
    // HUMAN REVIEW: "practical things" does not say software or another kind of product, so its competency cannot be selected reliably.
    { text: 'I enjoy creating practical things that people can use', competencies: [] },
    { text: 'I enjoy working with information, organizing it, and making it easy to access', competencies: ['infoOrganization'] },
    { text: 'I enjoy working with numbers, uncertainty, and evidence to reach conclusions', competencies: ['dataStatAnalysis', 'independentAnalyticalWork'] },
  ] },

]

async function seed() {
  await connectDB()
  // Upsert the authored questions by stable numeric ID so competency migration does not delete admin-created questions.
  await Question.bulkWrite(questionsData.map((question) => ({
    updateOne: {
      filter: { id: question.id },
      update: { $set: question },
      upsert: true,
    },
  })))
  console.log('Authored questions seeded successfully')
  await mongoose.connection.close()
}

seed()