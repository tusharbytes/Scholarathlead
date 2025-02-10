import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Login from './pages/Login'
import Register from './pages/Register'
import ApplicationForm from './pages/ApplicationForm'

function App() {
  return (
    <>
      <Routes>
        <Route path='/' ></Route> 
        <Route path='/applicationform' element={<ApplicationForm/>} ></Route>
        <Route path='/login' element={<Login/>} ></Route>
        <Route path='/register' element={<Register/>} ></Route>
      </Routes>
    </ >
  )
}

export default App