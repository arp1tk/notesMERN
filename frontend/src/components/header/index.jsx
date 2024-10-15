import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { clearUserInfo } from '../../features/userSlice';
import { Link, useNavigate } from 'react-router-dom';

const Navbar = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const user = useSelector((state) => state.user.userInfo); // Get user info from Redux store

  const handleLogout = () => {
    dispatch(clearUserInfo()); // Clear Redux store user info
    localStorage.removeItem('userInfo'); // Clear local storage
    navigate('/'); // Redirect to homepage
  };

  // Check if user is signed in based on user info in Redux store
  const isUserSignedIn = () => {
    return user !== null;
  };

  return (
    <nav className="fixed top-0 left-0 w-full bg-gray-800 text-white p-4 z-10">
      <div className="container mx-auto flex justify-between items-center">
        {/* Brand Name or Logo */}
        <div className="text-2xl font-bold">
          <Link to="/">Notess</Link>
        </div>

        {/* Navigation Links */}
        <div className="flex items-center space-x-6">
          <Link to="/notes" className="hover:text-gray-300">
            My Notes
          </Link>

          {/* Conditional Logout Button */}
          {isUserSignedIn() && (
            <button
              onClick={handleLogout}
              className="bg-red-600 px-4 py-2 rounded-lg hover:bg-red-700 transition-all"
            >
              Logout
            </button>
          )}

          {/* Login/Signup buttons for users not signed in */}
          {!isUserSignedIn() && (
            <>
              <Link to="/login" className="hover:text-gray-300">
                Login
              </Link>
              <Link to="/signup" className="hover:text-gray-300">
                Sign Up
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
