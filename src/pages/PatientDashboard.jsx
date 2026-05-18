import { useEffect, useState } from 'react';
import API from '../api/axios';
import { useAuth } from '../context/AuthContext';

const PatientDashboard = () => {
  const { user, logout } = useAuth();

  const [dashboard, setDashboard] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchDashboard = async () => {
    try {
      const res = await API.get('/patients/dashboard');
      setDashboard(res.data.data);
    } catch (error) {
      console.log(error.response?.data?.message || error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDashboard();
  }, []);

  if (loading) {
    return <div className='p-6'>Loading dashboard...</div>;
  }

  return (
    <div className='min-h-screen bg-slate-100 p-6'>
      <div className='max-w-5xl mx-auto'>
        <div className='bg-white rounded-xl shadow p-6 flex justify-between items-center mb-6'>
          <div>
            <h1 className='text-2xl font-bold'>Patient Dashboard</h1>
            <p className='text-gray-500'>Welcome, {user?.fullName}</p>
          </div>

          <button
            onClick={logout}
            className='bg-red-500 text-white px-4 py-2 rounded-lg'
          >
            Logout
          </button>
        </div>

        <div className='bg-white rounded-xl shadow p-6'>
          <h2 className='text-xl font-semibold mb-4'>Profile Summary</h2>

          <div className='grid md:grid-cols-2 gap-4'>
            <p>
              <b>Name:</b> {dashboard?.summary?.fullName}
            </p>
            <p>
              <b>Email:</b> {dashboard?.summary?.email}
            </p>
            <p>
              <b>Phone:</b> {dashboard?.summary?.phone || 'N/A'}
            </p>
            <p>
              <b>Gender:</b> {dashboard?.summary?.gender}
            </p>
            <p>
              <b>Age:</b> {dashboard?.summary?.age || 'N/A'}
            </p>
            <p>
              <b>Address:</b> {dashboard?.summary?.address || 'N/A'}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PatientDashboard;
