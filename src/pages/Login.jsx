import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebase';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate('/recipes');  //  home after successful login
    } catch (error) {
      setError('Failed to log in. Incorrect password.');
    }
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-lg mt-10">
      <h2 className="text-2xl font-bold text-center mb-6 text-slate-800">Login</h2>
      <form onSubmit={handleLogin}>
        {/* Email */}
        <div className="mb-4">
          <label className="block text-slate-800">Email</label>
          <input
            type="email"
            className="w-full px-4 py-2 border border-slate-700 rounded-md"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        {/* Password */}
        <div className="mb-4">
          <label className="block text-slate-800">Password</label>
          <input
            type="password"
            className="w-full px-4 py-2 border border-slate-700 rounded-md"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>

        {/* Error Message */}
        {error && <p className="text-red-500 text-sm mb-4">{error}</p>}

        {/* Login Button */}
        <button
          type="submit"
          className="w-full py-2 bg-slate-700 text-white rounded-md hover:bg-slate-600 transition"
        >
          Login 
        </button>
      </form>

      {/* Sign Up Link */}
      <div className="mt-4 text-center">
        <p>
          Don't have an account?{' '}
          <a href="/signup" className="text-slate-800 hover:underline">
            Sign up 
          </a>
        </p>
      </div>

      {/* Forgot Password Link */}
      <div className="mt-2 text-center">
        <a href="/forgot-password" className="text-slate-800 hover:underline">
          Forgot Password?
        </a>
      </div>
    </div>
  );
};

export default Login;
