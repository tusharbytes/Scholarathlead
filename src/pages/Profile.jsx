import axios from "axios";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";


const token = localStorage.getItem("token")



const Profile = () => {
    const [userDetail, setUserDetail] = useState({})
    const user = useSelector((state)=>state)
    console.log(user ,"userrrr")


    const getProfile = async () => {
        try {
            const response = await axios.get(`http://localhost:3001/api/user/profile/me`, {
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                }
            })

            console.log(response.data, "responsefdaaf")
            setUserDetail(response.data)
            return response
        } catch (error) {

            return { error: error.response?.data || "Something went wrong" };
        }

    }
    useEffect(() => {
        if (token) {
            getProfile()
        }
    }, [])

    const handleEdit = (userDetail) => {
        console.log(userDetail, "userdetail")
    }

    return (
        <div className="flex justify-center items-center h-screen bg-gray-100">
            <div className="bg-white shadow-lg rounded-2xl p-6  w-[500px] text-center">
                <div className=" w-[200px]  mx-auto rounded-full bg-gray-300 mb-4">
                    <img className="object-cover rounded-full" src="https://marketplace.canva.com/EAFuJ5pCLLM/1/0/1600w/canva-black-and-gold-simple-business-man-linkedin-profile-picture-BM_NPo97JwE.jpg" />
                </div>
                <h2 className="text-xl font-semibold text-gray-800">{userDetail.student_name}</h2>
                <p className=" flex justify-center items-center gap-4 text-sm"> Your Package :  <p className="text-2xl">{userDetail.package}</p></p>
                <div className="mt-4">
                    <button
                        onClick={() => handleEdit(userDetail)}
                        className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600">
                        Edit Profile
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Profile;
