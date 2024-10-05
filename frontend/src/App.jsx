import React from 'react';
import Header from './components/header';
import  Landing  from './components/landing';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import  MyNotes  from './components/myNotes';
import Login from './components/login';
import Signup from './components/signup';

const App = () => {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/notes" element={<MyNotes />} />
        <Route path="/login" element={<Login/>} />
        <Route path="/signup" element={<Signup />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
