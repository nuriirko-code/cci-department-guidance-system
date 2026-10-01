// Keep the admin vocabulary aligned with server/config/competencies.js; the API validates tags against that canonical list.
const competencies = [
  { key: 'programming', label: 'Programming' },
  { key: 'algorithmicTheory', label: 'Algorithmic theory' },
  { key: 'softwareEngPractice', label: 'Software engineering practice' },
  { key: 'systemsInfrastructure', label: 'Systems infrastructure' },
  { key: 'dataStatAnalysis', label: 'Data/statistical analysis' },
  { key: 'infoOrganization', label: 'Information organization' },
  { key: 'businessAlignment', label: 'Business alignment' },
  { key: 'securityAwareness', label: 'Security awareness' },
  { key: 'collaborativeWork', label: 'Collaborative work' },
  { key: 'independentAnalyticalWork', label: 'Independent analytical work' },
]

export default competencies
