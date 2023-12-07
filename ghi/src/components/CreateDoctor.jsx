import React, { useState } from "react";
import { useCreateDoctorMutation } from '../store/doctorsApi';
import { Form, Button } from 'react-bootstrap';
import doctorImage from '../assets/doctor-web.jpg';

function CreateDoctor() {

    const emptyFields = {
        "full_name": "",
        "specialty": "",
        "phone": "",
        "address": ""
    }
    const [formData, setFormData] = useState(emptyFields)
    const [doctor] = useCreateDoctorMutation();
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };
    async function handleSubmit(e) {
        e.preventDefault();
        const data = { ...formData }
        const result = await doctor(data);
        console.log('result: ', result);
        setFormData(emptyFields);

    }

    return (
        <section className="container d-flex flex-row align-items-center">
            <div className="col-sm-4">
                <img src={doctorImage} alt="Doctor sitting on a stool" className="img-fluid rounded shadow" />
            </div>
            <div className="forms p-4 d-flex flex-column align-items-center col-sm-8">
                <h1 className="mb-2">Add Doctor</h1>
                <form className="w-100" onSubmit={handleSubmit}>
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
                            type="tel"
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
                    <div className="d-flex justify-content-center">
                        <button className="btn btn-primary px-3">
                            Add
                        </button>
                    </div>
                </form>
            </div>
        </section>
    )
}

export default CreateDoctor;
