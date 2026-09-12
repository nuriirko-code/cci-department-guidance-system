require('dotenv').config()
const mongoose = require('mongoose')
const connectDB = require('./config/db')
const Department = require('./models/Department')



 const departmentsData = [
    {
      code: 'CS',
      name: 'Computer Science',
      color: '#378ADD',
      blurb: 'a love for abstract problem-solving, algorithms, and theoretical depth',
      verified: 'hod',
      hod: { name: 'Alemu Gudeta', photo: null },
      history: {
        established: 'Confirmed as the oldest department in CCI; exact founding year not formally recorded, estimated at roughly two decades ago',
        origin: 'Originally under the Faculty of Business and Economics before CCI was established as a faculty in the 2008/09 academic year and later reorganized into a college.',
      },
      overview: 'Develops a problem-solving mindset through algorithmic thinking, mathematical reasoning, and software development, spanning roughly 48 courses.',
      duration: '4 years',
      studentBody: '90–100 new students per year; 350–400 across all batches',
      faculty: '15 instructors (2 PhD, 10 MSc, 3 GA-II), ~25:1 student-to-instructor ratio',
      skillsNeeded: ['Strong in math', 'Enjoys abstract problem-solving', 'Comfortable with theory-heavy coursework'],
      facilities: '5 computing labs (4 active, 1 under construction), 24/7 student access',
      activities: ['Cyber Security Club', 'Cyber Code Competition', 'Course projects, internships, final-year projects'],
      careerPaths: ['Software Developer', 'Data Scientist', 'Cybersecurity Analyst', 'AI/ML Engineer', 'Researcher'],
      marketDemand: 'Consistently high global demand for CS graduates as software, AI, and cybersecurity needs grow; the department reports graduate employability above 80% per its 2016 E.C. tracer study.',
      postgrad: 'Direct pathway into MSc/PhD study in Computer Science, Artificial Intelligence, and related fields, locally and internationally.',
    },

      {
    code: 'SWE',    
    name: 'Software Engineering', color: '#639922',
    blurb: 'a preference for hands-on building and shipping real, working software',
    verified: 'general', hod: { name: null, photo: null },
    history: { established: 'Founding year pending direct confirmation from the department', origin: 'Established within the College of Computing and Informatics as a distinct discipline from Computer Science, focused specifically on engineering practices for building reliable software.' },
    overview: 'Focuses on the full software development lifecycle: requirements, design, implementation, testing, and maintenance, with emphasis on team-based, iterative delivery.',
    duration: '5 years', studentBody: 'Figures pending direct confirmation from the department', faculty: 'Figures pending direct confirmation from the department',
    skillsNeeded: ['Enjoys building and shipping working products', 'Comfortable working in teams', 'Values iteration over theoretical perfection'],
    facilities: 'Shared CCI computing labs; specific department facilities pending confirmation',
    activities: ['Course-based team software projects', 'Internships', 'Final-year capstone projects'],
    careerPaths: ['Software Engineer', 'Full-Stack Developer', 'DevOps Engineer', 'QA/Test Engineer', 'Engineering Manager'],
    marketDemand: 'One of the fastest-growing global tech fields; software engineers are in high demand across nearly every industry as digital products continue to expand.',
    postgrad: 'Pathways into MSc study in Software Engineering, Systems Engineering, or related applied computing fields.',
  },

 {
    code: 'IT',
    name: 'Information Technology', color: '#BA7517',
    blurb: 'an interest in infrastructure, networks, and keeping systems running',
    verified: 'general', hod: { name: null, photo: null },
    history: { established: 'Split off from an earlier combined Computer Science and IT department; exact founding year pending direct confirmation', origin: 'Formed as CCI grew, focusing specifically on the practical deployment and maintenance of computing infrastructure.' },
    overview: 'Centers on networks, systems administration, hardware, and the infrastructure that keeps organizational technology running reliably.',
    duration: '4 years', studentBody: 'Figures pending direct confirmation from the department', faculty: 'Figures pending direct confirmation from the department',
    skillsNeeded: ['Hands-on troubleshooting mindset', 'Interest in networks and hardware', 'Comfortable with practical, applied technical work'],
    facilities: 'Shared CCI computing labs with network/systems equipment; specifics pending confirmation',
    activities: ['Systems and networking labs', 'Internships with IT infrastructure teams', 'Final-year capstone projects'],
    careerPaths: ['Network Administrator', 'Systems Administrator', 'IT Support Specialist', 'Cloud Infrastructure Engineer', 'Security Operations'],
    marketDemand: 'Strong, steady demand — nearly every organization requires IT staff to maintain and secure its infrastructure, making this one of the most consistently employable technical fields.',
    postgrad: 'Pathways into MSc study in Information Technology, Network Engineering, or Cloud Computing.',
  },
   {
    code: 'IS',
    name: 'Information Systems', color: '#7F77DD',
    blurb: 'a focus on how technology supports organizations and business processes',
    verified: 'general', hod: { name: null, photo: null },
    history: { established: 'Founding year pending direct confirmation from the department', origin: 'Established to bridge the gap between technical computing and organizational/business needs within CCI.' },
    overview: 'Studies how information technology supports and improves organizational decision-making, business processes, and management.',
    duration: '4 years', studentBody: 'Figures pending direct confirmation from the department', faculty: 'Figures pending direct confirmation from the department',
    skillsNeeded: ['Enjoys bridging technical and business thinking', 'Strong communication skills', 'Interested in organizational processes'],
    facilities: 'Shared CCI computing labs; specifics pending confirmation',
    activities: ['Business process analysis projects', 'Internships in organizational IT roles', 'Final-year capstone projects'],
    careerPaths: ['Business Analyst', 'Systems Analyst', 'IT Project Manager', 'ERP Consultant', 'Information Systems Manager'],
    marketDemand: 'Steady demand across banking, government, and corporate sectors, where organizations increasingly rely on information systems to run efficiently.',
    postgrad: 'Pathways into MSc study in Information Systems, Management Information Systems, or IT Management.',
  },
   {
    code: 'ISC',
    name: 'Information Science', color: '#D4537E',
    blurb: 'a strength in organizing, structuring, and making information accessible',
    verified: 'general', hod: { name: null, photo: null },
    history: { established: 'Founding year pending direct confirmation from the department', origin: 'Established within CCI to address the growing need for organizing, managing, and providing access to information and data resources.' },
    overview: 'Focuses on organizing, structuring, and providing access to information — spanning data organization, knowledge management, and information retrieval systems.',
    duration: '4 years', studentBody: 'Figures pending direct confirmation from the department', faculty: 'Figures pending direct confirmation from the department',
    skillsNeeded: ['Strong organizational and analytical thinking', 'Attention to detail', 'Interest in how information is structured and retrieved'],
    facilities: 'Shared CCI computing labs; specifics pending confirmation',
    activities: ['Information organization and cataloging projects', 'Internships in data/records management', 'Final-year capstone projects'],
    careerPaths: ['Information Specialist', 'Knowledge Manager', 'Data Curator', 'Digital Archivist', 'UX Researcher'],
    marketDemand: 'Growing demand as organizations generate increasing volumes of data and require specialists to organize and make it usable.',
    postgrad: 'Pathways into MSc study in Information Science, Knowledge Management, or Data Curation.',
  },
   {
    code: 'STAT',
    name: 'Statistics', color: '#D85A30',
    blurb: 'a talent for mathematical reasoning and finding patterns in data',
    verified: 'general', hod: { name: null, photo: null },
    history: { established: 'Founding year pending direct confirmation from the department', origin: 'Established within CCI to provide specialized training in statistical theory and data analysis.' },
    overview: 'Centers on mathematical and statistical theory, probability, and the analysis of data to support evidence-based decision-making.',
    duration: '4 years', studentBody: 'Figures pending direct confirmation from the department', faculty: 'Figures pending direct confirmation from the department',
    skillsNeeded: ['Strong mathematical and quantitative reasoning', 'Enjoys working with data and numbers', 'Comfortable with theory-heavy coursework'],
    facilities: 'Shared CCI computing labs with statistical software; specifics pending confirmation',
    activities: ['Data analysis projects', 'Internships in research or analytics roles', 'Final-year capstone projects'],
    careerPaths: ['Statistician', 'Data Analyst', 'Data Scientist', 'Actuary', 'Biostatistician'],
    marketDemand: 'Strong and growing demand as data-driven decision-making becomes standard across finance, health, government, and technology sectors.',
    postgrad: 'Pathways into MSc/PhD study in Statistics, Data Science, or Applied Mathematics.',
  }
  ]

 
async function seed() {
  await connectDB()

  await Department.deleteMany({})
  console.log('Cleared existing departments')

  await Department.insertMany(departmentsData)
  console.log('All 6 departments seeded successfully')

  await mongoose.connection.close()
}

seed()