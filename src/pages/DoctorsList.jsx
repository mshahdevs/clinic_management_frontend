import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import API from '../api/axios';

const DoctorsList = () => {
  const navigate = useNavigate();

  const [doctors, setDoctors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const fetchDoctors = async () => {
    try {
      const res = await API.get('/doctors');
      setDoctors(res.data.data || []);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to fetch doctors');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDoctors();
  }, []);

  if (loading) {
    return <div className='p-6'>Loading doctors...</div>;
  }

  return (
    <div className='min-h-screen bg-slate-100 p-6'>
      <div className='max-w-6xl mx-auto'>
        <div className='bg-white rounded-xl shadow p-6 mb-6'>
          <h1 className='text-2xl font-bold'>Available Doctors</h1>
          <p className='text-gray-500'>
            Select a doctor and book your appointment.
          </p>
        </div>

        {error && (
          <div className='bg-red-100 text-red-600 p-3 rounded-lg mb-5'>
            {error}
          </div>
        )}

        {doctors.length === 0 ? (
          <div className='bg-white rounded-xl shadow p-6 text-gray-500'>
            No doctors found.
          </div>
        ) : (
          <div className='grid md:grid-cols-2 lg:grid-cols-3 gap-5'>
            {doctors.map((doctor) => (
              <div key={doctor._id} className='bg-white rounded-xl shadow p-6'>
                <h2 className='text-xl font-bold mb-1'>{doctor.fullName}</h2>

                <p className='text-blue-600 font-medium mb-3'>
                  {doctor.specialization || 'General Physician'}
                </p>

                <div className='space-y-2 text-sm text-gray-600'>
                  <p>
                    <b>Email:</b> {doctor.email}
                  </p>
                  <p>
                    <b>Phone:</b> {doctor.phone || 'N/A'}
                  </p>
                  <p>
                    <b>Qualification:</b> {doctor.qualification || 'N/A'}
                  </p>
                  <p>
                    <b>Experience:</b> {doctor.experience || 0} years
                  </p>
                  <p>
                    <b>Fee:</b>{' '}
                    {doctor.consultationFee
                      ? `Rs. ${doctor.consultationFee}`
                      : 'N/A'}
                  </p>
                </div>

                <button
                  onClick={() => navigate(`/appointments/book/${doctor._id}`)}
                  className='w-full mt-5 bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-semibold'
                >
                  Book Appointment
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default DoctorsList;
