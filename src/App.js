import './App.css';
import { Route, Routes, Navigate } from 'react-router-dom';
import React from 'react';
import NavBar from './components/NavBar/Navbaar';
import Footer from './components/Footer/Footer';
import Home from './pages/home/Home';
import Error from './pages/error404/Error404';

function App() {
  return (
    <>
      <NavBar name='nav'/>

      <Routes>
        <Route index element={<Navigate to='/home' />} />
        <Route path='/home' element={ <Home /> } />
        <Route path='/error' element={ <Error /> } />
        <Route path='*' element={ <Error/>} />
      </Routes>

      <Footer/>
    </>
  );
}

export default App;
