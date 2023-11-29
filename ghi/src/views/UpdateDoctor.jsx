import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from 'react-router-dom';
import { useGetDoctorQuery, useUpdateDoctorMutation } from '../store/doctorsApi'
import { useGetTokenQuery } from '../store/authApi';
import { Form, Button } from 'react-bootstrap';

const UpdateDoctor = () => {
    const navigate = useNavigate();
    const { doctor_id } = useParams();
    const { data: doc, isLoading } = useGetDoctorQuery(doctor_id);
    const [updateDoctor, response] = useUpdateDoctorMutation()
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
    }, [isLoading, doc]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };
    async function handleSubmit(e) {
        e.preventDefault();
        const info = { ...formData }
        updateDoctor({
            doctor_id: doctor_id,
            doctor: info
        })
        setFormData(doctorFields);

    }
    if (isLoading) {
        return (
            <h3>Data Loading</h3>
        )
    }
    return (
        <section className='docsForm'>
            <h1>Create Doctor Component</h1>
            <Form className="w-50" onSubmit={handleSubmit}>
                { }

                <Form.Group>
                    <Form.Label>Full Name</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="Enter Full Name"
                        name="full_name"
                        value={formData.full_name}
                        onChange={handleChange}
                    />
                </Form.Group>
                <Form.Group>
                    <Form.Label>Specialty</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="Enter Specialty"
                        name="specialty"
                        value={formData.specialty}
                        onChange={handleChange}
                    />
                </Form.Group>
                <Form.Group>
                    <Form.Label>Price</Form.Label>
                    <Form.Control
                        type="phone"
                        placeholder="Enter Phone"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                    />
                </Form.Group>
                <Form.Group>
                    <Form.Label>Address</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="Enter Address"
                        name="address"
                        value={formData.address}
                        onChange={handleChange}
                    />
                </Form.Group>
                <Button variant="primary" type="submit">
                    Create
                </Button>
            </Form>
        </section>
    )
}


export default UpdateDoctor;
