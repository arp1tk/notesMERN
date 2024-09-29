import React from 'react';
import Header from './components/header';
import  Landing  from './components/landing';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import  MyNotes  from './components/myNotes';

const App = () => {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/notes" element={<MyNotes />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
