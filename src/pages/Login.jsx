import React, { useState } from "react";
import { generateOTP, verifyOTP } from "../api/Api";
import { useNavigate } from "react-router-dom";

function Login() {
    const [formData, setFormData] = useState(
        {
            email: "",
            otp: ""

        }
    );

    const navigate = useNavigate()
    const token = localStorage.getItem("token")
 
    const [getOtp, setGetOtp] = useState(false);
    const [error, setError] = useState("");
    const [OtpError, setOtpError] = useState("")
    const validateForm = () => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (!formData.email) {
            setError("Enter a valid email address");
            return false;
        } else if (!emailRegex.test(formData.email)) {
            setError("Invalid email format");
            return false;
        }

        setError("");
        return true;
    };

   

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!validateForm()) return;


        try {
            await generateOTP({ email: formData.email });
            setGetOtp(true);
            setOtpError("");
        } catch (err) {
            setError("Failed to send OTP. Please try again.");
        }
    };
    const submitOTP = async (e) => {
        e.preventDefault()

        const response = await verifyOTP({ email: formData.email, otp: formData.otp });
        if (response?.error) {
            setOtpError("")
        } else {
            setOtpError("OTP verified successfully")
            setTimeout(() => {
                navigate("/dashboard")
            }, 3000);
        }
    }

    return (
        <div className="bg-gray-50 text-[#333] min-h-screen flex flex-col items-center justify-center py-6 px-4">
            <div className="max-w-md w-full py-8 px-6 rounded bg-white">
                <div className="text-center flex justify-center">
                    <img
                        src="https://www.scholarathlead.com/logo/grp-login.svg"
                        alt="Logo"
                    />
                </div>
                <form onSubmit={handleSubmit} className="mt-10 space-y-4">
                    <div className="mb-4">

                        <input
                            onChange={(e) =>
                                setFormData({ ...formData, email: e.target.value })
                            }
                            className="w-full text-sm px-4 py-3 rounded outline-none border-b-2 focus:border-blue-500"
                            type="email"
                            placeholder="Email address"
                        />

                        {getOtp &&
                            <div className="py-4"> <input
                                onChange={(e) => setFormData({ ...formData, otp: e.target.value })}
                                className="w-full text-sm px-4 py-3 rounded outline-none border-b-2 focus:border-blue-500"
                                type="number"
                                placeholder="Enter OTP"
                            />
                                <p className={`text-green-500 text-center py-2 ${!OtpError ? " text-red-500" : ""}`}>{!OtpError ? "OTP InVaild" : "OTP verify successfully"}</p>
                            </div>}

                        {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
                    </div>

                    {!getOtp ? <button
                        type="submit"
                        disabled={!formData.email}
                        className="w-full py-2.5 px-4 text-sm rounded text-white bg-gray-400 
              hover:bg-blue-500 disabled:bg-gray-300 disabled:cursor-not-allowed focus:outline-none"
                    >
                        Send-OTP
                    </button>

                        : <button
                            onClick={submitOTP}
                            value={formData.otp}
                            className="w-full py-2.5 px-4 text-sm rounded text-white bg-gray-400 
              hover:bg-blue-500 disabled:bg-gray-300 disabled:cursor-not-allowed focus:outline-none"
                        >
                            Verify-OTP
                        </button>}
                </form>
            </div>
        </div>
    );
}

export default Login;
