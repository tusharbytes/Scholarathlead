import axios from "axios"

const url = "http://localhost:3001/api/user/"
const token = localStorage.getItem("token")
export const generateOTP = async (payload) => {
    try {
        const response = await axios.post(`${url}generate-otp`,     payload)
        console.log(response, "responsefdaaf")
    } catch (error) {
        console.log(error)
    }
}
export const verifyOTP = async (payload) => {
    console.log(payload, "payload")
    try {
        const response = await axios.get(`${url}verify-otp`, {
            params: payload
        })
        console.log(response.data.id, "responsefdaaf")

        localStorage.setItem("token", response.data.token)
        return response
    } catch (error) {

        return { error: error.response?.data || "Something went wrong" };
    }
}

export const userDelete = async (id) => {
    console.log(id, "id")
    try {
        const response = await axios.delete(`${url}delete-user/${id}`, {
            headers: {
                "Authorization": `Bearer ${token}`
            }
        })
        return response
    } catch (error) {

        return { error: error.response?.data || "Something went wrong" };
    }
}

export const createCustomer = async (id) => {

    try {
        const response = await axios.delete(`${url}create-customer`, {
            headers: {
                "Authorization": `Bearer ${token}`
            }
        })
        return response
    } catch (error) {

        return { error: error.response?.data || "Something went wrong" };
    }
}

