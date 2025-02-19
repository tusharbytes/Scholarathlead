import React, { useState } from 'react'
import CreateCustomer from '../components/createCustomer/CreateCustomer';

const packages = [
    {
        "priceID": "price_1Qs1Sc08yFVxPUE6S8RCBj4t",
        "title": "Weekly",
        "introPrice": true,
        "amount": "$50",
        "originalPrice": "$100/child",
        "image": "https://3.imimg.com/data3/EV/HN/MY-10425924/tour-package-500x500.jpg",
        "link": "https://www.scholarathlead.com/package-card/Frame-5.svg",
        "dayActivity": [
            {
                "day": 1,
                "activity": "Mountain Hiking"
            },
            {
                "day": 2,
                "activity": "Forest Camping"
            }
        ]
    },
    {
        "priceID": "price_1QsKLU08yFVxPUE6UhrEoHqX",
        "title": "Monthly",
        "introPrice": true,
        "amount": "$200",
        "originalPrice": "$300/child",
        "image": "https://media1.thrillophilia.com/filestore/dlj2x7v88bqeng9mevlwryen5pwp_1681564600_pocket.jpg?w=400&dpr=2",
        "link": "/join-our-community?packageTitle=Monthly",
        "dayActivity": [
            {
                "day": 1,
                "activity": "Beach Exploration"
            },
            {
                "day": 2,
                "activity": "Snorkeling and Diving"
            },
            {
                "day": 3,
                "activity": "Island Hopping"
            }
        ]
    },
    {
        "priceID": "price_1QsKMX08yFVxPUE6W85PqyyF",
        "title": "Bi-Annually",
        "introPrice": false,
        "amount": "$1200/child",
        "originalPrice": null,
        "image": "https://ubudraftingbali.com/wp-content/uploads/2018/11/ubud-rafting-bali-ayung-river.jpg",
        "link": "/join-our-community?packageTitle=Bi-Annually",
        "dayActivity": [
            {
                "day": 1,
                "activity": "River Rafting"
            },
            {
                "day": 2,
                "activity": "Jungle Safari"
            },
            {
                "day": 3,
                "activity": "Local Village Tour"
            },
            {
                "day": 4,
                "activity": "Cultural Dance Night"
            }
        ]
    },
    {
        "priceID": "price_1QsKN308yFVxPUE6iLxt4It0",
        "title": "Annually",
        "introPrice": false,
        "amount": "$2400/child",
        "originalPrice": null,
        "image": "https://www.area83.in/ElementImages/9d860043-71b7-4b03-9fd5-cc84be0763e6-ProdcuctImg.webp",
        "link": "/join-our-community?packageTitle=Annually",
        "dayActivity": [
            {
                "day": 1,
                "activity": "Mountain Trekking"
            },
            {
                "day": 2,
                "activity": "Hot Air Balloon Ride"
            },
            {
                "day": 3,
                "activity": "Wildlife Safari"
            },
            {
                "day": 4,
                "activity": "River Kayaking"
            },
            {
                "day": 5,
                "activity": "Cave Exploration"
            }
        ]
    }
]

function Packages() {
    const [createCustomerModel, setCreateCustomerModel] = useState(packages)
    const [priceId, setPriceId] = useState(null);
    console.log(priceId)



    return (
        <div className='container mx-auto p-6 flex justify-center items-center '>
            {priceId === null ?
                <div>
                    <h1 className='text-center text-3xl font-bold mb-6 text-gray-800'>Package Subscriptions</h1>

                    <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8'>
                        {createCustomerModel.map((pkg, index) => (
                            <div
                                key={index}
                                className='relative h-[400px] bg-white rounded-3xl overflow-hidden shadow-md hover:shadow-xl transition-shadow duration-300 ease-in-out flex flex-col'>
                                {/* Title Section */}
                                <div className='bg-red-600 text-white text-center py-4 relative z-10'>
                                    <h2 className='text-xl font-semibold'>{pkg.title}</h2>
                                    {pkg.introPrice && (
                                        <p className='text-sm font-light'>Intro Price Available</p>
                                    )}
                                </div>

                                {/* Image Section */}
                                <div className='flex-1 relative'>
                                    <img
                                        className='w-full h-full object-cover'
                                        src={pkg.image}
                                        alt={pkg.title}
                                    />
                                </div>

                                {/* Button Section */}
                                <button
                                    onClick={() => setPriceId(pkg)}
                                    className='py-3 w-full bg-red-500 text-white rounded-b-3xl font-medium hover:bg-white hover:text-red-500 transition-all duration-300 ease-in-out border-t border-red-500'>
                                    {pkg.amount}
                                </button>
                            </div>
                        ))}

                    </div>
                </div> :
                <CreateCustomer priceId={priceId} />}
        </div>
    );
};

export default Packages