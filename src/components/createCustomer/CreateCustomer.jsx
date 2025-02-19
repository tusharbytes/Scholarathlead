import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import axios from "axios";
import { useState } from "react";

const token = localStorage.getItem("token");

const stripePublicKey = process.env.REACT_APP_STRIPE_PUBLIC_KEY; // Ensure correct env variable name

function CreateCustomer({ priceId }) {
    console.log(priceId, "sdfd")

    const stripe = useStripe();
    const elements = useElements();

    const [formData, setFormData] = useState({
        name: "",
        email: "",
        contact_Number: "",
    });
    const [error, setError] = useState({})
    const [checkUserId, setCheckUserId] = useState({})

    const validations = () => {
        const newError = {}

        if (!formData.name) {
            newError.name = "Name is Required"
        }
        if (!formData.email) {
            newError.email = "Email is Required"
        }
        if (!formData.contact_Number) {
            newError.contact_Number = "Contact_Number is Required"
        }
        setError(newError)
        return Object.keys(newError).length === 0;
    }


    const handlePayment = async (e) => {
        if (!stripe || !elements) {
            alert("Stripe is not loaded properly.");
            return;
        }

        const cardElement = elements.getElement(CardElement);

        try {
            const tokens = await stripe.createToken(cardElement);

            console.log("token is ", tokens);

            const response = await axios.post("http://localhost:3001/api/user/customer/payment-method", {
                tokenId: tokens.token.id,
                customerId: "cus_RnLYHt0KEYqG5j",
                name: formData.name,
                token: token
            }, {
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`,
                }
            }
            );
            console.log(response, "paymentdfdfdfsfsf")

            if (response.status === 200) {
                console.log("Payment Successful!");
            } else {
                console.log("Payment Failed!");
            }
        } catch (error) {
            console.error("Payment Error:", error.response?.data || error.message);
            alert("Payment Failed!");
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!validations()) return
        try {
            const response = await axios.post("http://localhost:3001/api/user/create-customer", { formData }, {
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`,
                },


            });
            setCheckUserId(response.data.customer)

            if (response.status === 200) {
                console.log("Customer created successfully!");
                handlePayment();
                handleSubscription()
            } else {
                alert("Customer creation failed.");
            }
        } catch (error) {
            console.error("Error creating customer:", error.response?.data || error.message);
            alert("Failed to create customer.");
        }
    };

    const handleSubscription = async () => {
        try {
            const response = await axios.post('http://localhost:3001/api/user/create-subscription', {
                customerId: "cus_RnLYHt0KEYqG5j",
                items: [{ price: priceId.priceID }],
                userId: 35,
                amount: 100,
                userEmail: 'test@example.com',
                status: "paid",
                payment_behavior: "default_incomplete",
                expand: ["latest_invoice.payment_intent"],


            }, {
                headers: {
                    'Content-Type': 'application/json',
                    "Authorization": `Bearer ${token}`,
                }
            });

            console.log(response.data);
        } catch (error) {
            console.error('Error creating subscription:', error);
        }
    };





    return (
        <div className="grid grid-cols-2 justify-center p-6   items-center gap-4">
            {/* Product Card */}
            <div className=" rounded-lg p-4   ">
                <img src={priceId.image} alt={priceId.title} className="w-full  object-cover rounded" />
                <h2 className="text-xl font-semibold mt-2">{priceId.title}</h2>
                {priceId.originalPricepriceId && (
                    <p className="text-gray-500">Original PricepriceId: <span className="line-through">{priceId.originalPricepriceId}</span></p>
                )}
                <p className="text-green-500 text-lg font-bold">Current PricepriceId: {priceId.amount}</p>
                {priceId.introPricepriceId && <span className="text-sm text-blue-500">Introductory PricepriceId!</span>}
                <h3 className="text-md font-medium mt-4">Day-wise Activities:</h3>
                <ul className="list-disc pl-5">
                    {priceId.dayActivity && priceId.dayActivity.map((item, index) => (
                        <li key={index}>{`Day ${item.day}: ${item.activity}`}</li>
                    ))}
                </ul>

            </div>

            {/* Customer Form */}
            <div className="bg-white w-[500px] h-[500px] p-6 rounded-lg  flex flex-col justify-between">
                <h2 className="text-2xl font-semibold text-gray-800 text-center mb-4">✨ Payment</h2>

                <div className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-600">Customer Name</label>
                        <input
                            type="text"
                            value={formData.name}
                            placeholder="Enter Customer Name"
                            className="w-full mt-1 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none transition"
                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        />
                        {!formData.name && <p className="text-red-500">{error.name}</p>}
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
                        {!formData.email && <p className="text-red-500">{error.email}</p>}
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-600">Customer Contact Number</label>
                        <input
                            type="text"
                            value={formData.contact_Number}
                            placeholder="Enter Contact Number"
                            className="w-full mt-1 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none transition"
                            onChange={(e) => setFormData({ ...formData, contact_Number: e.target.value })}
                        />
                        {!formData.contact_Number && <p className="text-red-500">{error.contact_Number}</p>}
                    </div>

                    {/* Stripe Card Input */}
                    <div>
                        <label className="block text-sm font-medium text-gray-600">Card Details</label>
                        <div className="p-3 border border-gray-300 rounded-lg">
                            <CardElement
                                options={{
                                    style: {
                                        base: {
                                            fontSize: "16px",
                                            color: "#424770",
                                            "::placeholder": {
                                                color: "#aab7c4",
                                            },
                                        },
                                        invalid: {
                                            color: "#9e2146",
                                        },
                                    },
                                }}
                            />
                        </div>
                    </div>
                </div>

                {/* Submit Button */}
                <button
                    className="w-full bg-red-500 text-white border hover:border-red-500 hover:bg-white hover:text-red-500 cursor-pointer px-4 py-3 rounded-xl mt-4"
                    onClick={(e) => handleSubmit(e)}
                >
                    Make Payment
                </button>
            </div>
        </div>

    );
}

export default CreateCustomer;
