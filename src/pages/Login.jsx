import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import API from '../api/axios';
import { useAuth } from '../context/AuthContext';

const Login = () => {
  const navigate = useNavigate();
  const { login } = useAuth();

  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const res = await API.post('/auth/login', formData);

      const token = res.data.data.token;
      const user = res.data.data.user;

      login(user, token);

      if (user.role === 'doctor') {
        navigate('/doctor/dashboard');
      } else {
        navigate('/patient/dashboard');
      }
    } catch (err) {
      setError(
        err.response?.data?.message || 'Login failed. Please try again.',
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className='min-h-screen flex items-center justify-center bg-slate-100 px-4'>
      <div className='w-full max-w-md bg-white rounded-xl shadow p-6'>
        <h1 className='text-2xl font-bold text-center mb-2'>Clinic Login</h1>

        <p className='text-center text-gray-500 mb-6'>Login to your account</p>

        {error && (
          <div className='mb-4 bg-red-100 text-red-600 p-3 rounded'>
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className='space-y-4'>
          <input
            type='email'
            name='email'
            placeholder='Email address'
            value={formData.email}
            onChange={handleChange}
            className='w-full border rounded-lg px-4 py-3 outline-none'
            required
          />

          <input
            type='password'
            name='password'
            placeholder='Password'
            value={formData.password}
            onChange={handleChange}
            className='w-full border rounded-lg px-4 py-3 outline-none'
            required
          />

          <button
            type='submit'
            disabled={loading}
            className='w-full bg-blue-600 text-white py-3 rounded-lg font-semibold'
          >
            {loading ? 'Logging in...' : 'Login'}
          </button>
        </form>

        <p className='text-center text-sm mt-5'>
          Don&apos;t have an account?{' '}
          <Link to='/register' className='text-blue-600 font-medium'>
            Register
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
