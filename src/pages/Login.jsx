import axios from 'axios'
import React, { useState } from 'react'

const userlogin = async (payload) => {
    try {
        const response = await axios.post(`http://localhost:3001/api/user/generate-otp`, payload)
        console.log(response, "response")
    } catch (error) {
        console.log(error)
    }
}
function Login() {

    const [formData, setFromData] = useState({
        email: ""
    })
    const [error, setError] = useState("")

    const handleSubmit = (e) => {
        e.preventDefault()
        userlogin(formData)
    }



    return (
        <div className="bg-gray-50 text-[#333] min-h-screen flex flex-col items-center justify-center py-6 px-4">

            <div className='max-w-md w-full py-8 px-6 rounded bg-white'>
                <div className='text-center flex justify-center'>
                    <img src="https://www.scholarathlead.com/logo/grp-login.svg" alt="" ></img>
                </div>
                <form onSubmit={handleSubmit} className="mt-10 space-y-4">
                    <div className="mb-4">
                        <input
                            onChange={(e) => setFromData({ ...formData, email: e.target.value })}
                            className="w-full text-sm px-4 py-3 rounded outline-none border-b-2 focus:border-blue-500"
                            type="email"
                            placeholder="  email address"
                        />
                    </div>
                    {!formData.email && <p>{error}</p>}




                    <button
                        type="submit"
                        disabled={!formData.email}
                        className="w-full py-2.5 px-4 text-sm rounded text-white bg-gray-400 
                       hover:bg-blue-500 disabled:bg-gray-300 disabled:cursor-not-allowed focus:outline-none"
                    >
                        Send OTP
                    </button>




                </form>
            </div>
        </div >

    )
}

export default Login