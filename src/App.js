import React from 'react';
import './App.css';
//import { Route, Routes } from 'react-router-dom';
import NavBar from './components/NavBar/Navbar';
import Footer from './components/Footer/Footer';
import Home from './pages/home/Home';

function App() {
  return (
    <>
      <NavBar  
        name='nav'
        // img={Image} 
      />
      <Home name='home'/>
      <Footer/>
    </>
  );
}

export default App;
