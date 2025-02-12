import React, { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";
import axios from "axios";
import { loadStripe } from "@stripe/stripe-js";

const apiUrl = process.env.REACT_APP_STRIPE_URL;
console.log(apiUrl, "URL");
console.log(process.env.REACT_APP_STRIPE_URL);  // Must match exactly





const Dashboard = () => {

 


  const [userName, setUserName] = useState({})
  const getProfile = async () => {
    try {
      const response = await axios.get(`http://localhost:3001/api/user/single-user/34`)
      setUserName(response.data.student_name)
    } catch {

    }
  }
  useEffect(() => {

    getProfile()

  }, [])

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <Sidebar userName={userName} />

      {/* Main Content */}
      <div className="flex-1 p-6">
        <h1 className="text-2xl font-semibold text-gray-800">Dashboard</h1>
        <button className="mt-2 bg-red-600 text-white border hover:border-red-500 hover:bg-white hover:text-red-500 cursor-pointer px-4 py-4 rounded-xl">Create Customer</button>

        {/* Example Content */}
        <div className="mt-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="bg-white p-4 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold text-gray-700">Card 1</h2>
            <p className="text-gray-500">Some details here.</p>
          </div>
          <div className="bg-white p-4 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold text-gray-700">Card 2</h2>
            <p className="text-gray-500">Some details here.</p>
          </div>
          <div className="bg-white p-4 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold text-gray-700">Card 3</h2>
            <p className="text-gray-500">Some details here.</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
