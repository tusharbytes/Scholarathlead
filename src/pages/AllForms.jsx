import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { userDelete } from '../api/Api';

const token = localStorage.getItem("token");

function AllForms() {
    const [getAllForms, setGetAllForms] = useState([]);
    const [editValue, setEditValue] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const [deleteId, setDeleteId] = useState(null);

    const getForms = async () => {
        try {
            const response = await axios.get(`http://localhost:3001/api/user/forms`, {
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                }
            });
            setGetAllForms(response.data);
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        getForms();
    }, []);

    const confirmDelete = (id) => {
        setDeleteId(id);
        setShowModal(true);
    };

    const handleDelete = async () => {
        if (deleteId) {
            await userDelete(deleteId);
            setGetAllForms(getAllForms.filter(form => form.id !== deleteId));
            setShowModal(false);
            setDeleteId(null);
        }
    };

    return (
        <div className="p-6 bg-gray-100 h-screen flex justify-center items-center">
            <table className="w-[90%] max-w-6xl bg-white shadow-xl rounded-lg overflow-hidden border border-gray-300">
                <thead className="bg-gradient-to-r from-blue-600 to-blue-800 text-white">
                    <tr className="text-left text-sm uppercase tracking-wide">
                        <th className="p-4">#</th>
                        <th className="p-4">Student Name</th>
                        <th className="p-4">Age</th>
                        <th className="p-4">Parent</th>
                        <th className="p-4">Phone</th>
                        <th className="p-4">Email</th>
                        <th className="p-4">School</th>
                        <th className="p-4">Package</th>
                        <th className="p-4">Payment Status</th>
                        <th className="p-4 text-center">Action</th>
                    </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                    {getAllForms.map((form, index) => (
                        <tr key={form.id} className="hover:bg-gray-50 transition-all">
                            <td className="p-4 text-gray-700 font-medium">{index + 1}</td>
                            <td className="p-4">{form.student_name || "N/A"}</td>
                            <td className="p-4">{form.age || "N/A"}</td>
                            <td className="p-4">{form.parent_name || "N/A"}</td>
                            <td className="p-4">{form.parent_phone || "N/A"}</td>
                            <td className="p-4">{form.email || "N/A"}</td>
                            <td className="p-4">{form.school_name || "N/A"}</td>
                            <td className="p-4">{form.package || "N/A"}</td>
                            <td className="p-4">
                                <span className={`px-4 py-2 rounded-lg text-sm font-semibold shadow-md border 
                        ${form.payment_status === "Paid" ? "bg-green-100 text-green-700 border-green-500" : "bg-red-100 text-red-700 border-red-500"}
                    `}>
                                    {form.payment_status || "N/A"}
                                </span>
                            </td>
                            <td className="p-4 flex gap-3 justify-center">
                                <button onClick={() => setEditValue(form)}
                                    className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg shadow-md transition">
                                    Edit
                                </button>
                                <button onClick={() => confirmDelete(form.id)}
                                    className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg shadow-md transition">
                                    Delete
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            {showModal && (
                <div className="fixed inset-0 flex items-center justify-center  bg-opacity-100  ">
                    <div className="bg-white p-6 rounded-xl shadow-xl text-center w-[90%] max-w-sm transform transition-all scale-95 hover:scale-100">
                        <h2 className="text-xl font-semibold text-gray-800 mb-4">
                            Are you sure you want to delete this form?
                        </h2>
                        <div className="flex justify-center gap-4">
                            <button
                                onClick={handleDelete}
                                className="bg-red-600 hover:bg-red-700 text-white px-5 py-2.5 rounded-lg shadow-md transition-all">
                                Yes, Delete
                            </button>
                            <button
                                onClick={() => setShowModal(false)}
                                className="bg-gray-300 hover:bg-gray-400 text-gray-800 px-5 py-2.5 rounded-lg shadow-md transition-all">
                                Cancel
                            </button>
                        </div>
                    </div>
                </div>

            )}
        </div>
    );
}

export default AllForms;