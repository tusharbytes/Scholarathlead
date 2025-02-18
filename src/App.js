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
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';

const stripePromise = loadStripe("pk_test_51QrdyK08yFVxPUE62v6HooTeWZMJaMabvv6iDx7EpCxsx7AOPJVDMYFfGOkIh7GcsAF8PgSH9ut0wqy3dubcZ7VL00apQb6LeX");

function App() {
  return (
    <Elements stripe={stripePromise}>


      <Routes>
        <Route path='/' element={<Home />} ></Route>
        <Route path='/applicationform' element={<ApplicationForm />} ></Route>
        <Route path='/login' element={<Login />} ></Route>
        <Route path='/register' element={<Register />} ></Route>
        <Route path='/profile' element={<Profile />} ></Route>
        <Route path='/forms' element={<AllForms />} ></Route>
        <Route path='/makepayment' element={<AllForms />} ></Route>
        <Route path='/dashboard' element={<Dashboard />} ></Route>
      </Routes>
    </Elements>
  )
}

export default App