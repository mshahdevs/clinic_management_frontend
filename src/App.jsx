import { Navigate, Route, Routes } from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';
import ProtectedRoute from './components/ProtectedRoute';
import PatientDashboard from './pages/PatientDashboard';
import DoctorDashboard from './pages/DoctorDashboard';
import DoctorsList from './pages/DoctorsList';

function App() {
  return (
    <Routes>
      <Route path='/' element={<Navigate to='/login' replace />} />

      <Route path='/login' element={<Login />} />
      <Route path='/register' element={<Register />} />

      <Route
        path='/patient/dashboard'
        element={
          <ProtectedRoute allowedRoles={['patient']}>
            <PatientDashboard />
          </ProtectedRoute>
        }
      />

      <Route
        path='/doctor/dashboard'
        element={
          <ProtectedRoute allowedRoles={['doctor']}>
            <DoctorDashboard />
          </ProtectedRoute>
        }
      />
      <Route
        path='/doctors'
        element={
          <ProtectedRoute allowedRoles={['patient']}>
            <DoctorsList />
          </ProtectedRoute>
        }
      />

      <Route path='*' element={<h1>404 Page Not Found</h1>} />
    </Routes>
  );
}

export default App;
