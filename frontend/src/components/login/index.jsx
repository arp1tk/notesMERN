import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setUserInfo } from '../../features/userSlice';
import axios from "axios";
import LoadingScreen from '../loading/index';
import { motion } from 'framer-motion';
import { Mail, Lock, LogIn } from 'lucide-react';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const config = {
        headers: {
          'Content-Type': 'application/json',
        },
      };
      
      const { data } = await axios.post(
        "http://localhost:5000/api/users/login",
        { email, password },
        config
      );
      console.log(data);
      dispatch(setUserInfo(data))
      localStorage.setItem("userInfo", JSON.stringify(data));
      navigate("/notes");
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {loading ? (
        <LoadingScreen />
      ) : (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-gray-800 to-black text-gray-300">
          <motion.div
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="w-full max-w-md bg-gray-800 p-8 rounded-xl shadow-lg"
          >
            <h2 className="text-3xl font-bold text-center text-purple-400 mb-6">Login to NoteSphere</h2>
            <form onSubmit={handleLogin} className="space-y-6">
              <div>
                <label htmlFor="email" className="block text-sm text-gray-400 mb-1">Email</label>
                <div className="relative">
                  <input
                    type="email"
                    id="email"
                    className="w-full px-4 py-2 pl-10 bg-gray-700 rounded-lg text-white focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                  <Mail className="absolute left-3 top-2.5 text-gray-400" size={18} />
                </div>
              </div>
              <div>
                <label htmlFor="password" className="block text-sm text-gray-400 mb-1">Password</label>
                <div className="relative">
                  <input
                    type="password"
                    id="password"
                    className="w-full px-4 py-2 pl-10 bg-gray-700 rounded-lg text-white focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                  <Lock className="absolute left-3 top-2.5 text-gray-400" size={18} />
                </div>
              </div>
              <div>
                <button
                  type="submit"
                  className="w-full px-4 py-2 rounded-lg transition-all duration-300 text-white bg-purple-600 hover:bg-purple-700 focus:ring-2 focus:ring-purple-500 focus:ring-opacity-50 flex items-center justify-center"
                  disabled={loading}
                >
                  <LogIn size={18} className="mr-2" />
                  {loading ? "Logging In..." : "Log In"}
                </button>
              </div>
            </form>
            <p className="mt-6 text-center text-gray-400">
              Don't have an account?{' '}
              <Link to="/signup" className="text-purple-400 hover:underline">
                Sign up
              </Link>
            </p>
          </motion.div>
        </div>
      )}
    </>
  );
};

export default Login;