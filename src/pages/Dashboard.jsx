import React, { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";
import axios from "axios";

// console.log(apiUrl, "URL");
// console.log(process.env.REACT_APP_STRIPE_URL);  // Must match exactly




const token = localStorage.getItem("token")
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
    <div className="flex h-screen ">
      {/* Sidebar */}
      <Sidebar userName={userName} />

      {/* Main Content */}
      <div className="flex-1 p-6">
        {/* <CreateCustomer /> */}
        <p
          className="mt-2   text-center   text-2xl  px-4 py-4 rounded-xl flex justify-center items-center">You don't have any Active Subcription</p>

        {/* <CreateCustomer isOpen={createCustomerModel} onClose={() => setCreateCustomerModel(false)} /> */}
        <div>



        </div>


      </div>
    </div>
  );
}

export default Dashboard;
