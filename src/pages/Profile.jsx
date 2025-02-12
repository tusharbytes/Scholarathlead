import axios from "axios";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";

const token = localStorage.getItem("token");

const Profile = () => {
    const [userDetail, setUserDetail] = useState({});
    const user = useSelector((state) => state);

    const getProfile = async () => {
        try {
            const response = await axios.get(`http://localhost:3001/api/user/profile/me`, {
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`,
                },
            });

            setUserDetail(response.data);
            return response;
        } catch (error) {
            return { error: error.response?.data || "Something went wrong" };
        }
    };

    useEffect(() => {
        if (token) {
            getProfile();
        }
    }, []);

    const handleEdit = (userDetail) => {
        console.log(userDetail, "userdetail");
    };

    return (
        <div className="flex justify-center items-center h-screen bg-gradient-to-br from-blue-200 to-blue-400">
            <div className="bg-white shadow-xl rounded-2xl p-6 w-[500px] text-center">
                <div className="w-[150px] mx-auto rounded-full overflow-hidden mb-6">
                    <img
                        className="object-cover w-full h-full"
                        src="https://marketplace.canva.com/EAFuJ5pCLLM/1/0/1600w/canva-black-and-gold-simple-business-man-linkedin-profile-picture-BM_NPo97JwE.jpg"
                        alt="Profile"
                    />
                </div>
                <h2 className="text-2xl font-semibold text-gray-800 mb-2">{userDetail.student_name}</h2>
                <p className="text-sm text-gray-600 mb-4">Student Profile</p>
                <div className="flex justify-center items-center gap-4 text-sm text-gray-700">
                    <span>Your Package:</span>
                    <span className="text-lg font-semibold">{userDetail.package || "N/A"}</span>
                </div>
                <div className="mt-6">
                    <button
                        onClick={() => handleEdit(userDetail)}
                        className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-all duration-300"
                    >
                        Edit Profile
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Profile;
