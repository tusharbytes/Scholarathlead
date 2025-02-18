import React, { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";
import axios from "axios";
import CreateCustomer from "../components/createCustomer/CreateCustomer";

// console.log(apiUrl, "URL");
// console.log(process.env.REACT_APP_STRIPE_URL);  // Must match exactly

const packages = [
  {
    priceID: "price_1Qs1Sc08yFVxPUE6S8RCBj4t",
    title: "Weekly",
    introPrice: true,
    price: "$50",
    originalPrice: "$100/child",
    image: "https://3.imimg.com/data3/EV/HN/MY-10425924/tour-package-500x500.jpg",
    link: "https://www.scholarathlead.com/package-card/Frame-5.svg"
  },
  {
    priceID: "price_1QsKLU08yFVxPUE6UhrEoHqX",
    title: "Monthly",
    introPrice: true,
    price: "$200",
    originalPrice: "$300/child",
    image: "https://media1.thrillophilia.com/filestore/dlj2x7v88bqeng9mevlwryen5pwp_1681564600_pocket.jpg?w=400&dpr=2",
    link: "/join-our-community?packageTitle=Monthly"
  },
  {
    priceID: "price_1QsKMX08yFVxPUE6W85PqyyF",
    title: "Bi-Annually",
    introPrice: false,
    price: "$1200/child",
    originalPrice: null,
    image: "https://ubudraftingbali.com/wp-content/uploads/2018/11/ubud-rafting-bali-ayung-river.jpg",
    link: "/join-our-community?packageTitle=Bi-Annually"
  },
  {
    priceID: "price_1QsKN308yFVxPUE6iLxt4It0",
    title: "Annually",
    introPrice: false,
    price: "$2400/child",
    originalPrice: null,
    image: "https://www.area83.in/ElementImages/9d860043-71b7-4b03-9fd5-cc84be0763e6-ProdcuctImg.webp",
    link: "/join-our-community?packageTitle=Annually"
  }
];


const token = localStorage.getItem("token")
const Dashboard = () => {
  const [priceId, setPriceId] = useState("")
  console.log(priceId)

  const [createCustomerModel, setCreateCustomerModel] = useState(packages)


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
      {/* <Sidebar userName={userName} /> */}

      {/* Main Content */}
      <div className="flex-1 p-6">
        <CreateCustomer priceId={priceId} />
        <p
          className="mt-2   text-center   text-2xl  px-4 py-4 rounded-xl">Select Package</p>

        {/* <CreateCustomer isOpen={createCustomerModel} onClose={() => setCreateCustomerModel(false)} /> */}
        <div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mt-2 mb-2">
            {createCustomerModel.map((pkg, index) => (
              <div key={index} className="relative">

                <div className="max-w-sm rounded-[32px] overflow-hidden shadow-lg">
                  <div className="bg-[#9A0000] text-white text-center pt-2 h-[110px] relative z-6">
                    <h1 className="text-xl pt-3 font-semibold">{pkg.title}</h1>
                    {pkg.introPrice && (
                      <p className="text-center text-[12px] text-[#fff] font-[300]">Intro Price</p>
                    )}
                  </div>
                  <div className="relative">
                    <div className="w-full h-[274px]">
                      <img className="w-full h-full object-cover" src={pkg.image} alt={pkg.title} />
                    </div>

                    <button
                      onClick={(e) => setPriceId(pkg.priceID)}
                      className="py-4 w-full cursor-pointer hover:bg-white hover:text-red-500 ring-red-300 text-white  bg-red-500">{pkg.price}</button>


                    <div className="z-[-4] absolute m-2 left-0 right-0 bottom-0 top-[-50px] rounded-full w-20 h-20 outline outline-[#fff] outline-2 outline-offset-8"></div>
                  </div>
                </div>

              </div>
            ))}
          </div>


        </div>


      </div>
    </div>
  );
}

export default Dashboard;
