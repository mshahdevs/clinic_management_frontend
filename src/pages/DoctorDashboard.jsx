import { useEffect, useState } from 'react';
import API from '../api/axios';
import { useAuth } from '../context/AuthContext';

const DoctorDashboard = () => {
  const { user, logout } = useAuth();

  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchAppointments = async () => {
    try {
      const res = await API.get('/appointments/doctor');
      setAppointments(res.data.data || []);
    } catch (error) {
      console.log(error.response?.data?.message || error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAppointments();
  }, []);

  if (loading) {
    return <div className='p-6'>Loading doctor dashboard...</div>;
  }

  return (
    <div className='min-h-screen bg-slate-100 p-6'>
      <div className='max-w-6xl mx-auto'>
        <div className='bg-white rounded-xl shadow p-6 flex justify-between items-center mb-6'>
          <div>
            <h1 className='text-2xl font-bold'>Doctor Dashboard</h1>
            <p className='text-gray-500'>Welcome, {user?.fullName}</p>
          </div>

          <button
            onClick={logout}
            className='bg-red-500 text-white px-4 py-2 rounded-lg'
          >
            Logout
          </button>
        </div>

        <div className='bg-white rounded-xl shadow p-6 mb-6'>
          <h2 className='text-xl font-semibold mb-4'>Doctor Summary</h2>

          <div className='grid md:grid-cols-2 gap-4'>
            <p>
              <b>Name:</b> {user?.fullName}
            </p>
            <p>
              <b>Email:</b> {user?.email}
            </p>
            <p>
              <b>Role:</b> {user?.role}
            </p>
            <p>
              <b>Specialization:</b> {user?.specialization || 'N/A'}
            </p>
            <p>
              <b>Qualification:</b> {user?.qualification || 'N/A'}
            </p>
            <p>
              <b>Consultation Fee:</b> {user?.consultationFee || 'N/A'}
            </p>
          </div>
        </div>

        <div className='bg-white rounded-xl shadow p-6'>
          <h2 className='text-xl font-semibold mb-4'>My Appointments</h2>

          {appointments.length === 0 ? (
            <p className='text-gray-500'>No appointments found.</p>
          ) : (
            <div className='overflow-x-auto'>
              <table className='w-full border'>
                <thead>
                  <tr className='bg-slate-100'>
                    <th className='border p-3 text-left'>Patient</th>
                    <th className='border p-3 text-left'>Date</th>
                    <th className='border p-3 text-left'>Time</th>
                    <th className='border p-3 text-left'>Reason</th>
                    <th className='border p-3 text-left'>Status</th>
                  </tr>
                </thead>

                <tbody>
                  {appointments.map((appointment) => (
                    <tr key={appointment._id}>
                      <td className='border p-3'>
                        {appointment.patientId?.fullName}
                      </td>
                      <td className='border p-3'>
                        {appointment.appointmentDate}
                      </td>
                      <td className='border p-3'>
                        {appointment.appointmentTime}
                      </td>
                      <td className='border p-3'>
                        {appointment.reason || 'N/A'}
                      </td>
                      <td className='border p-3 capitalize'>
                        {appointment.status}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default DoctorDashboard;
