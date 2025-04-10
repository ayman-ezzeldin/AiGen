import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { loginUser } from '@/store/auth-slice';
import { useNavigate } from 'react-router-dom';


const AuthLogin = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isAuthenticated, isVerified, verificationError } = useSelector((state) => state.auth);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const result = await dispatch(loginUser({
        email: formData.email,
        password: formData.password,
      })).unwrap(); // unwrap() throws error if thunk fails
      
      if (result) {
          navigate('/');
      }
    } catch (error) {
      console.error('Login error:', error);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="p-8 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">Login to your account</h2>
        {isAuthenticated && isVerified && (
          <p className="text-green-500 text-center mb-4">Logged in successfully</p>
        )}
        {verificationError && (
          <p className="text-red-500 text-center mb-4">{verificationError}</p>
        )}
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Enter your email"
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="Enter your password"
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
          <button
            type="submit"
            className="w-full bg-blue-500 font-bold text-white p-3 rounded-lg hover:bg-blue-600 transition duration-300"
          >
            Login
          </button>
        </form>
      <p className='text-center mt-4' >Don{"'"}t have an account? <span onClick={() => navigate('/auth/register')} className="text-blue-500 hover:underline cursor-pointer">Register</span> </p>
      </div>
    </div>
  );
};

export default AuthLogin;