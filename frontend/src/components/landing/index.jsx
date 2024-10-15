import React, { useEffect } from 'react';
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { useSelector } from 'react-redux';

const Landing = () => {
  const navigate = useNavigate();
  const user = useSelector((state) => state.user.userInfo);
  useEffect(() => {
    const userInfo = localStorage.getItem("userInfo");
    if (userInfo) {
      navigate("/notes");
    }
  }, [navigate]);

  return (
    <div className="relative w-full h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black overflow-hidden">
      <div className="absolute inset-0 bg-black opacity-50"></div>
      <div className="absolute inset-0 bg-gradient-to-t from-purple-900/20 via-transparent to-transparent"></div>
      <div className="relative z-10 flex flex-col items-center justify-center h-full text-gray-300 px-4">
        <motion.h1 
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="text-6xl font-bold mb-8 text-center text-white"
        >
          Welcome to <span className="text-purple-400">NoteSphere</span>
        </motion.h1>
        <motion.p
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
          className="text-xl mb-12 text-center max-w-md"
        >
          Capture your thoughts in the depths of inspiration.
        </motion.p>
        <motion.div 
          className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-6"
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5, ease: "easeOut", delay: 0.4 }}
        >
          <Link to="/signup">
            <button className="bg-purple-600 text-white px-8 py-3 rounded-md font-semibold text-lg hover:bg-purple-700 transition duration-300 ease-in-out transform hover:scale-105 shadow-lg shadow-purple-500/50">
              Get Started
            </button>
          </Link>
          <Link to="/login">
            <button className="bg-transparent border border-purple-400 text-purple-400 px-8 py-3 rounded-md font-semibold text-lg hover:bg-purple-400 hover:text-white transition duration-300 ease-in-out transform hover:scale-105 shadow-lg">
              Log In
            </button>
          </Link>
        </motion.div>
      </div>
      <div className="absolute bottom-0 left-0 w-full">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320">
          <path fill="rgba(139, 92, 246, 0.1)" fillOpacity="1" d="M0,224L40,213.3C80,203,160,181,240,181.3C320,181,400,203,480,224C560,245,640,267,720,261.3C800,256,880,224,960,218.7C1040,213,1120,235,1200,229.3C1280,224,1360,192,1400,176L1440,160L1440,320L1400,320C1360,320,1280,320,1200,320C1120,320,1040,320,960,320C880,320,800,320,720,320C640,320,560,320,480,320C400,320,320,320,240,320C160,320,80,320,40,320L0,320Z"></path>
        </svg>
      </div>
    </div>
  );
};

export default Landing;