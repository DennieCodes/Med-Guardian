import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from 'react-router-dom';
import { useGetDoctorQuery, useUpdateDoctorMutation, useDeleteDoctorMutation } from '../store/doctorsApi'
import { useGetTokenQuery } from '../store/authApi';

const UpdateDoctor = () => {
    const navigate = useNavigate();
    const { doctor_id } = useParams();
    const { data: doc, isLoading } = useGetDoctorQuery(doctor_id);
    const [updateDoctor, updateResponse] = useUpdateDoctorMutation()
    const [deleteDoctor, deleteResponse] = useDeleteDoctorMutation()
    const [deleteError, setDeleteError] = useState('');
    const [updateError, setUpdateError] = useState('');
    const { data: account } = useGetTokenQuery();
    const doctorFields = {
        "full_name": "",
        "specialty": "",
        "phone": "",
        "address": ""
    }
    const [formData, setFormData] = useState(doctorFields)
    useEffect(() => {
        if (!account) {
            navigate('/');
        }
        if (!isLoading && doc) {
            setFormData({
                specialty: doc.specialty,
                full_name: doc.full_name,
                phone: doc.phone,
                address: doc.address
            });
        }
        if (updateResponse.isSuccess || deleteResponse.isSuccess) {
            navigate('/DoctorsList')
        } else if (updateResponse.isError) {
            setUpdateError(updateResponse.error)
        } else if (deleteResponse.isError) {
            setDeleteError(deleteResponse.error)
        }
    }, [isLoading, doc, updateResponse, deleteResponse, account, navigate]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };
    async function handleUpdate(e) {
        e.preventDefault();
        const info = { ...formData }
        updateDoctor({
            doctor_id: doctor_id,
            doctor: info
        })
        setFormData(doctorFields);

    }

    const handleDelete = async (e) => {
        e.preventDefault()
        deleteDoctor(doctor_id)
    }

    if (isLoading) {
        return (
            <>
                <div className='d-flex justify-content-center'>
                    <div className="spinner-border" role="status">
                        <span className="sr-only"></span>
                    </div>
                </div>
            </>
        )
    }
    return (
        <section className='forms p-4 d-flex flex-column align-items-center'>
            <h1>Update Doctor</h1>
            <form className="w-75">
                <div className="form-floating mb-3">
                    <input
                        type="text"
                        placeholder="Full Name"
                        name="full_name"
                        required
                        id="full_name"
                        className="form-control"
                        value={formData.full_name}
                        onChange={handleChange}
                    />
                    <label htmlFor="full_name">Full Name</label>
                </div>
                <div className="form-floating mb-3">
                    <input
                        type="text"
                        placeholder="Specialty"
                        name="specialty"
                        id="specialty"
                        required
                        className="form-control"
                        value={formData.specialty}
                        onChange={handleChange}
                    />
                    <label htmlFor="specialty">Specialty</label>
                </div>
                <div className="form-floating mb-3">
                    <input
                        type="phone"
                        placeholder="Phone Number"
                        name="phone"
                        id="phone"
                        className="form-control"
                        value={formData.phone}
                        onChange={handleChange}
                    />
                    <label htmlFor="phone">Phone Number</label>
                </div>
                <div className="form-floating mb-3">
                    <input
                        type="text"
                        placeholder="Address"
                        name="address"
                        id="address"
                        className="form-control"
                        value={formData.address}
                        onChange={handleChange}
                    />
                    <label htmlFor="address">Address</label>
                </div>
                <div className="d-flex justify-content-evenly">
                    <button onClick={handleUpdate} className="btn btn-primary px-3">
                        Update
                    </button>
                    <button className="btn btn-primary px-3" onClick={handleDelete}>Delete</button>
                </div>
                {deleteError && <div className="text-center text-danger m-3">There was an error trying to delete this pharmacy, make sure it is not linked to a medication.</div>}
                {updateError && <div className="text-center text-danger m-3">There was an error trying to update this pharmacy.</div>}

            </form>
        </section>
    )
}


export default UpdateDoctor;
