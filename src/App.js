import React from 'react'
import './index.css';
import { Route, Routes } from 'react-router-dom'
import Login from './pages/Login'
import Register from './pages/Register'
import ApplicationForm from './pages/ApplicationForm'
import Dashboard from './pages/Dashboard';
import Profile from './pages/Profile';
import Home from './pages/Home';
import AllForms from './pages/AllForms';


function App() {
  return (
    <>
      <Routes>
        <Route path='/' element={<Home /> } ></Route>
        <Route path='/applicationform' element={<ApplicationForm />} ></Route>
        <Route path='/login' element={<Login />} ></Route>
        <Route path='/register' element={<Register />} ></Route>
        <Route path='/profile' element={<Profile />} ></Route>
        <Route path='/forms' element={<AllForms />} ></Route>



        <Route path='/dashboard' element={<Dashboard />} ></Route>

      </Routes>
    </ >
  )
}

export default App