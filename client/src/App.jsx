
import  {BrowserRouter, Routes, Route} from 'react-router-dom'
import Welcome from './pages/Welcome'
import Questionnaire from './pages/Questionnaire'
import Results from './pages/Results'
import Departments from './pages/Departments'
import DepartmentInfo from './pages/DepartmentInfo'
import Comparison from './pages/Comparison'

function App() {
return (
    <BrowserRouter>
    <Routes>
      <Route path = "/" element = {<Welcome />} />
       <Route path="/questionnaire" element={<Questionnaire />} />
       <Route path="/results" element = {<Results />}/>
       <Route path="/departments" element= {<Departments />} />
       <Route path="/departments/:code" element={ <DepartmentInfo />} />
       <Route path="/compare"   element ={ <Comparison />} />
    </Routes>
  </BrowserRouter>
)
}

export default App