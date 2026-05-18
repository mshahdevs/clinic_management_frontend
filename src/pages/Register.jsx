import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';

import API from '../api/axios';
import { useAuth } from '../context/AuthContext';

const Register = () => {
  const navigate = useNavigate();
  const { login } = useAuth();

  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
    phone: '',
    gender: 'male',
    age: '',
    address: '',
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const validateForm = () => {
    if (!formData.fullName.trim()) {
      return 'Full name is required';
    }

    if (!formData.email.trim()) {
      return 'Email is required';
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(formData.email)) {
      return 'Enter a valid email address';
    }

    if (!formData.password) {
      return 'Password is required';
    }

    if (formData.password.length < 6) {
      return 'Password must be at least 6 characters';
    }

    if (formData.phone && formData.phone.length < 10) {
      return 'Enter a valid phone number';
    }

    if (formData.age && Number(formData.age) <= 0) {
      return 'Age must be greater than 0';
    }

    return null;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setError('');

    const validationError = validateForm();

    if (validationError) {
      setError(validationError);
      return;
    }

    setLoading(true);

    try {
      const res = await API.post('/auth/register', formData);

      const token = res.data.data.token;
      const user = res.data.data.user;

      login(user, token);

      navigate('/patient/dashboard');
    } catch (err) {
      setError(
        err.response?.data?.message || 'Registration failed. Please try again.',
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className='min-h-screen flex items-center justify-center bg-slate-100 px-4 py-10'>
      <div className='w-full max-w-lg bg-white rounded-2xl shadow-lg p-8'>
        <h1 className='text-3xl font-bold text-center mb-2'>
          Patient Register
        </h1>

        <p className='text-center text-gray-500 mb-6'>
          Create your clinic account
        </p>

        {error && (
          <div className='mb-4 bg-red-100 text-red-600 px-4 py-3 rounded-lg'>
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className='space-y-4'>
          <input
            type='text'
            name='fullName'
            placeholder='Full Name'
            value={formData.fullName}
            onChange={handleChange}
            className='w-full border rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500'
          />

          <input
            type='email'
            name='email'
            placeholder='Email Address'
            value={formData.email}
            onChange={handleChange}
            className='w-full border rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500'
          />

          <input
            type='password'
            name='password'
            placeholder='Password'
            value={formData.password}
            onChange={handleChange}
            className='w-full border rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500'
          />

          <input
            type='number'
            name='phone'
            placeholder='Phone Number'
            value={formData.phone}
            onChange={handleChange}
            className='w-full border rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500'
          />

          <select
            name='gender'
            value={formData.gender}
            onChange={handleChange}
            className='w-full border rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500'
          >
            <option value='male'>Male</option>

            <option value='female'>Female</option>

            <option value='other'>Other</option>
          </select>

          <input
            type='number'
            name='age'
            placeholder='Age'
            value={formData.age}
            onChange={handleChange}
            className='w-full border rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500'
          />

          <textarea
            name='address'
            placeholder='Address'
            rows='3'
            value={formData.address}
            onChange={handleChange}
            className='w-full border rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500'
          />

          <button
            type='submit'
            disabled={loading}
            className='w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-semibold transition'
          >
            {loading ? 'Creating Account...' : 'Register'}
          </button>
        </form>

        <p className='text-center text-sm mt-6'>
          Already have an account?{' '}
          <Link to='/login' className='text-blue-600 font-medium'>
            Login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
