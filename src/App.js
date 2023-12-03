import * as React from 'react';
import LandingPage from './components/LandingPage';
import Login from './components/Login';
import Signup from './components/Signup';
import Home from './components/Home';
import Confirmation from './components/Confirmation';
import { Route, Routes } from "react-router-dom"

export default function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/confirmation" element={<Confirmation />} />
        <Route path="/home" element={<Home />} />
      </Routes>
      <LandingPage />
    </>
  );
}
