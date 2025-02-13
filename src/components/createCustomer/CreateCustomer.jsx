import axios from "axios";
import { useState } from "react";
import StripeCheckout from "react-stripe-checkout";

const token = localStorage.getItem("token")
const stripePublicKey = process.env.REACT_APP_STRIPE_URL;

function CreateCustomer() {
    const [formData, setFormData] = useState({ name: "", email: "", });

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post("http://localhost:3001/api/user/create-customer", formData, {

                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                },

            });
            console.log("data cusomer create", response)

        } catch (error) {
            console.log(error)

        }
    }
    const handleToken = async () => {


        try {
            const response = await axios.post("http://localhost:3001/api/user/create-payment", {
                token,
                amount: 5000,
            });

            console.log("Payment Success:", response.data);
            alert("Payment Successful!");
        } catch (error) {
            console.error("Payment Error:", error);
            alert("Payment Failed!");
        }
    };

    return (
        <div className=" flex justify-center">
            <div
                className="bg-white w-[500px] p-6 rounded-2xl shadow-2xl  "
            >
                {/* Header */}
                <h2 className="text-2xl font-semibold text-gray-800 text-center mb-4">✨ Add Customer</h2>

                {/* Input Fields */}
                <div className="space-y-6">
                    <div>
                        <label className="block text-sm font-medium text-gray-600">Customer Name</label>
                        <input
                            type="text"
                            value={formData.name}
                            placeholder="Enter Customer Name"
                            className="w-full mt-1 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none transition"
                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-600">Customer Email</label>
                        <input
                            type="email"
                            value={formData.email}
                            placeholder="Enter Customer Email"
                            className="w-full mt-1 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none transition"
                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        />
                    </div>
                </div>

                {/* Buttons */}
                <div className="  mt-6">

                    <button
                        className="mt-2   text-center  bg-red-500 text-white w-full border hover:border-red-500 hover:bg-white hover:text-red-500 cursor-pointer px-4 py-4 rounded-xl"
                        onClick={(e) => handleSubmit(e)}
                    >
                        Add Customer
                    </button>
                </div>
                <div className="w-[500px]">
                <StripeCheckout 
                    stripeKey={stripePublicKey}
                    token={handleToken}
                    amount={5000} // amount in cents ($50)
                    name={ "User"}
                    currency="USD"
                >
                    <button className="mt-6 bg-green-500 text-white px-4 py-2 rounded">
                        Click Here to Pay
                    </button>
                </StripeCheckout></div>
            </div>
        </div>

    );
};

export default CreateCustomer;
