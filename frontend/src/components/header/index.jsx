import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { clearUserInfo } from '../../features/userSlice';
import { Link, useNavigate } from 'react-router-dom';

const Header = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const user = useSelector((state) => state.user.userInfo);
  const handleLogout = () => {
    dispatch(clearUserInfo);
    localStorage.removeItem('userInfo');
    navigate('/');
  };

  // Check if user is signed in
  const isUserSignedIn = () => {
    return localStorage.getItem('userInfo') !== null;
  };

  return (
    <div className='fixed top-0 left-0 w-full bg-opacity-50 text-white z-10 p-4'>
      <div className='px-5 flex items-center justify-between'>
        <h1 className='text-2xl'>Notess</h1>
        <div className="flex items-center space-x-4">
          <Link to="/notes" className="text-md">
            My Notes
          </Link>
          {isUserSignedIn() && (
            <button
              onClick={handleLogout}
              className="bg-red-600 px-4 py-2 rounded-lg hover:bg-red-700 transition-all text-white"
            >
              Logout
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Header;