
import  {BrowserRouter, Routes, Route} from 'react-router-dom'
import Welcome from './pages/Welcome'
import Questionnaire from './pages/Questionnaire'
import Results from './pages/Results'
import Departments from './pages/Departments'
import DepartmentInfo from './pages/DepartmentInfo'
import Comparison from './pages/Comparison'
import AdminLogin from './pages/admin/AdminLogin'
import AdminDashboard from './pages/admin/AdminDashboard'
import ProtectedRoute from './components/admin/ProtectedRoute'
import { AuthProvider } from './context/AuthContext'

function App() {
return (
  <AuthProvider>
    <BrowserRouter>
    <Routes>
      <Route path = "/" element = {<Welcome />} />
       <Route path="/questionnaire" element={<Questionnaire />} />
       <Route path="/results" element = {<Results />}/>
       <Route path="/departments" element= {<Departments />} />
       <Route path="/departments/:code" element={ <DepartmentInfo />} />
       <Route path="/compare"   element ={ <Comparison />} />
       <Route path="/admin/login" element={<AdminLogin />} />
       <Route element={<ProtectedRoute />}>
         <Route path="/admin/dashboard" element={<AdminDashboard />} />
       </Route>
    </Routes>
  </BrowserRouter>
  </AuthProvider>
)
}

export default App