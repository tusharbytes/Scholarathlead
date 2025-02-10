import React, { useState } from 'react'
import Input from '../common/Input'
import { IoIosArrowRoundBack } from 'react-icons/io'
import { Link } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { applicationRegister } from '../redux/application/AplicationSlice'

function ApplicationForm() {
    const [formData, setFromData] = useState({
        parent_name_prefix: " ",
        // parent_name_prefix: null,
        parent_name: "",
        student_name_prefix: "",
        parent_phone: "",
        email: "",
        student_name: "",
        studentNumber: "",
        studentEmail: "",
        birth_date: null,
        dob: "",
        age: "",
        password:"",
        school_name: "",
        linkedinProfile: "",
        ClimbingExperience: "",
        address: "",
        leaderShip: "",
        climbingGoal: "",
        availability: "",
        package: ""
    })
    const [error, setError] = useState("")
    const dispatch = useDispatch()

    // const payload = {
    //     parent_name_prefix: formData.parent_name_prefix,
    //     parent_name: formData.parent_name,
    //     parent_phone: formData.parent_phone,
    //     student_name: formData.student_name,
    //     student_phone: formData.studentNumber,
    //     student_name_prefix:null,
    //     birth_date: null,
    //     age: formData.age,
    //     school_name: formData.school_name,
    //     linkedin_profile: formData.linkedinProfile,
    //     climbing_goal: formData.climbingGoal,
    //     email: formData.email,
    //     student_email: formData.studentEmail,
    //     package  : formData.package    ,
    //     address: formData.address,
    // };


    const validationForm = () => {
        let newError = {}

        if (!formData.parent_name) {
            newError.parent_name = "Parent Name is Required"
        }
        if (!formData.availability) {
            newError.availability = "Please select Yes or No";
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!formData.parentEmail) newError.parentEmail = "Enter a valid email address";
        else if (!emailRegex.test(formData.parentEmail)) newError.parentEmail = "Invalid email format";

        if (formData.studentEmail && !emailRegex.test(formData.studentEmail))
            newError.studentEmail = "Invalid student email format";

        const phoneRegex = /^[0-9]{10}$/;
        if (!formData.parent_phone) newError.parent_phone = "Phone number is required";
        else if (!phoneRegex.test(formData.parent_phone))
            newError.parent_phone = "Phone number must be 10 digits";

        if (formData.studentNumber && !phoneRegex.test(formData.studentNumber))
            newError.studentNumber = "Phone number must be 10 digits";
        if (!formData.student_name) {
            newError.student_name = "Student Name is Required"
        }

        if (!formData.dob) {
            newError.dob = "dob is Required"
        }
        if (!formData.age) {
            newError.age = "age is Required"
        }
        if (!formData.school_name) {
            newError.school_name = "School name is required"
        }
        if (!formData.address) {
            newError.address = " Enter your Address"
        }
        if (!formData.ClimbingExperience) {
            newError.ClimbingExperience = "Enter Experience only 0-12"
        }
        if (!formData.leaderShip) {
            newError.leaderShip = "Leadership Goal is required"
        }
        if (!formData.climbingGoal) {
            newError.climbingGoal = "Climbing Goal is required"
        }
        if (!formData.linkedinProfile) {
            newError.linkedinProfile = "Enter a valid LinkedIn profile link"
        }
        return newError
    }
    const handleSubmit = (e) => {
        e.preventDefault();
        // const formError = validationForm();
        // if (Object.keys(formError).length === 0) {
        dispatch(applicationRegister(formData));
     
        // } else {
        //     setError(formError);
        // }
    };

    return (
        <div className="container max-w-[1000px] mx-auto px-4 lg:px-8">

            <form onSubmit={handleSubmit} className="bg-white   font-semibold rounded-lg    ">
                <span className=" ">
                    <Link href="/previous-page" className="flex   lg:ml-[-140px] items-center  ">
                        <IoIosArrowRoundBack className="w-6 h-6 mr-2" />
                        <span className="text-lg py-2"> Go Back</span>
                    </Link>
                </span>
                <h1 className="text-2xl font-bold text-center mb-4 "> Application Form </h1>
                <p className=' text-center  mb-8 lg:w-[605px] m-auto   '>Dive into your ScholarAthLead adventure! Fill out our application form,
                    which helps us tailor our coaching and support to each athlete's unique background and needs.</p>
                <div className=" ">
                    <div className=' '>
                        <div
                            className="flex flex-col sm:flex-row md:justify-between   items-center gap-2"
                        >
                            <div className=' flex items-end w-[100%]'>

                                <select
                                    value={formData.parent_name_prefix}
                                    onChange={(e) => setFromData({ ...formData, parent_name_prefix: e.target.value })}
                                    className='mr-2 p-2 border-t-0 border-b-[1px] opacity-50  border-[#0000004D] '>
                                    <option >Mr./Mrs. </option>
                                    <option  >Mr  </option>
                                    <option > Mrs. </option>

                                </select>
                                <div className='w-[100%]  '>
                                    <p className='block ml-[-100px]  text-left mb-2 text-[13px] font-semibold'>NAME OF PARENT</p>
                                    <Input

                                        type="text"

                                        value={formData.parent_name}
                                        placeholder="Enter Parent Name"
                                        onChange={(e) => setFromData({ ...formData, parent_name: e.target.value })}
                                        error={!formData.parent_name && error.parent_name}
                                    />
                                </div>
                            </div>
                            <div className='w-[100%]   '>
                                <Input
                                    label="PARENT CONTACT PHONE"
                                    type="number"
                                    value={formData.parent_phone}
                                    placeholder="Enter Contact Phone"
                                    onChange={(e) => setFromData({ ...formData, parent_phone: e.target.value })}
                                    error={!formData.parent_phone && error.parent_phone}
                                /></div>
                        </div>
                    </div>
                </div>
                <div
                    className="flex flex-col sm:flex-row md:justify-between py-4 items-center gap-2">
                    <div className='w-[100%]'>

                        <Input
                            label="PARENT CONTACT EMAIL"
                            type="email"

                            value={formData.email}
                            placeholder="Enter Contact Email"
                            onChange={(e) => setFromData({ ...formData, email: e.target.value })}
                            error={!formData.email && error.email}
                        /></div>
                    <div className='w-[100%]'>
                        <Input
                            label="NAME OF STUDENT"
                            type="text"
                            value={formData.student_name}
                            placeholder="Enter Student Name"
                            onChange={(e) => setFromData({ ...formData, student_name: e.target.value })}
                            error={!formData.student_name && error.student_name}
                        />
                    </div>
                </div>
                <div
                    className="flex flex-col sm:flex-row md:justify-between py-4 items-center gap-2">
                    <div className='w-[100%]'>
                        <Input
                            label="STUDENT CONTACT PHONE (optional)"
                            type="number"
                            value={formData.studentNumber}
                            placeholder="Enter Contact Phone"
                            onChange={(e) => setFromData({ ...formData, studentNumber: e.target.value })}
                            error={!formData.studentNumber && error.studentNumber}
                        /></div>
                    <div className='w-[100%]'>
                        <Input
                            label="STUDENT CONTACT EMAIL(optional)"
                            type="email"
                            value={formData.studentEmail}
                            placeholder="Enter Student Email"
                            onChange={(e) => setFromData({ ...formData, studentEmail: e.target.value })}
                            error={!formData.studentEmail && error.studentEmail}
                        />
                    </div>
                </div>
                <div
                    className="flex flex-col sm:flex-row md:justify-between py-4 items-center gap-2">
                    <div className='w-[100%]'>
                        <Input
                            label="BIRTH DATE OF STUDENT"
                            type="date"
                            value={formData.dob}
                            placeholder="MM/DD/YY"
                            onChange={(e) => setFromData({ ...formData, dob: e.target.value })}
                            error={!formData.dob && error.dob}
                        /></div>
                    <div className='w-[100%]'>
                        <Input
                            label="AGE"
                            type="number"
                            value={formData.age}
                            placeholder="In Years(10-18)"
                            onChange={(e) => setFromData({ ...formData, age: e.target.value })}
                            error={!formData.age && error.age}
                        />
                    </div>
                </div>
                <div
                    className="flex flex-col sm:flex-row md:justify-between py-4 items-center gap-2">
                    <div className='w-[100%]'>
                        <Input
                            label="SCHOOL NAME"
                            type="text"
                            value={formData.school_name}
                            placeholder="Enter School Name"
                            onChange={(e) => setFromData({ ...formData, school_name: e.target.value })}
                            error={!formData.school_name && error.school_name}
                        /></div>
                    <div className='w-[100%] '>
                        <Input
                            label="CLIMBING EXPERIENCE"
                            type="text"
                            value={formData.ClimbingExperience}
                            placeholder="Months"
                            onChange={(e) => setFromData({ ...formData, ClimbingExperience: e.target.value })}
                            error={!formData.ClimbingExperience && error.ClimbingExperience}
                        />
                    </div>
                </div>
                <div
                    className="flex flex-col sm:flex-row md:justify-between py-4 items-center gap-2">
                    <div className='w-[100%]'>
                        <Input
                            label="ADDRESS"
                            type="text"
                            name="parentPhone"
                            value={formData.address}
                            placeholder="Enater Your Address"
                            onChange={(e) => setFromData({ ...formData, address: e.target.value })}
                            error={!formData.address && error.address}
                        /></div>
                    <div className='w-[100%]'>
                        <Input
                            label="PARENT LINKEDIN PROFILE"
                            type="link"
                            value={formData.linkedinProfile}
                            placeholder="Enter Valid Linkedin Profile link"
                            onChange={(e) => setFromData({ ...formData, linkedinProfile: e.target.value })}
                            error={!formData.linkedinProfile && error.linkedinProfile}
                        />
                    </div>
                </div>
                <div
                    className=' md:flex  justify-between  items-center  gap-2 '>
                    <div className='w-[100%]'>
                        <p className='opacity-80'>CLIMBING GOAL</p>
                        <textarea
                            onChange={(e) => setFromData({ ...formData, climbingGoal: e.target.value })}
                            value={formData.climbingGoal}
                            className='w-full px-4 focus:outline-none py-3 mt-2 border-b-2'
                            rows={4}
                            placeholder="My daughter has climbed only 3 times in a gym"
                        >

                        </textarea>

                    </div>
                    <div className='w-[100%]'>
                        <div className='w-[100%]'>
                            <p className='opacity-80'>LEADERSHIP GOALL</p>
                            <textarea
                                value={formData.leaderShip}
                                onChange={(e) => setFromData({ ...formData, leaderShip: e.target.value })}
                                className='w-full focus:outline-none  px-4 py-3 mt-2 border-b-2'
                                rows={4}
                                placeholder="Describe leadership activities">

                            </textarea>
                        </div>
                    </div>

                </div>
                <div className='py-2'>
                    <p className=' p-2'>Select package  </p>
                    <select onChange={(e) => setFromData({ ...formData, package: e.target.value })}
                        value={formData.package}
                        className='px-2  focus:outline-none   py-2 w-full opacity-70' name="" id="">

                        <option>Selected package    </option>
                        <option value="weekly">Weekly</option>
                        <option value="monthly">Monthly</option>
                        <option value="bi-annually">Bi-Annually</option>
                        <option value="annually">Annually</option>
                        <option value="private-pay">Private-Pay</option>

                    </select>
                </div>
                <div className="md:flex  items-center justify-between mb-5">
                    <label className="block text-black font-semibold text-[15px]">
                        Available once a week for 3 hours on 1 evening or 1 weekend slot every week?
                    </label>
                    <div className="flex gap-5 items-center">
                        <label className="inline-flex items-center">
                            <input
                                type="radio"
                                name="availability"
                                value="yes"
                                checked={formData.availability === "yes"}
                                onChange={(e) => setFromData({ ...formData, availability: e.target.value })}
                                className="form-radio"
                            />
                            <span className="ml-2">Yes</span>
                        </label>
                        <label className="inline-flex items-center">
                            <input
                                type="radio"
                                name="availability"
                                value="no"
                                checked={formData.availability === "no"}
                                onChange={(e) => setFromData({ ...formData, availability: e.target.value })}
                                className="form-radio"
                            />
                            <span className="ml-2">No</span>
                        </label>
                    </div>
                </div>



                <button type='submit'
                    // disabled={!formData.parent_name || !formData.email || !formData.dob}
                    className={`py-3 px-3 rounded-xl bg-gray-500 hover:bg-gray-600 w-full text-white disabled:opacity-40 ${formData ? "bg-red-500 hover:bg-red-600  text-white" : ""}`}>
                    Submit
                </button>



            </form>
        </div>
    )
}

export default ApplicationForm