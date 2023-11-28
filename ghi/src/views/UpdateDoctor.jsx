import React, { useState } from "react";
import { useGetDoctorsQuery } from '../store/doctorsApi'
import { useGetTokenQuery } from '../store/authApi';
import { useCreateDoctorMutation } from '../store/doctorsApi';
import { Form, Button } from 'react-bootstrap';

function UpdateDoctor() {
    const { data: doctors, error, isLoading } = useGetDoctorsQuery();
    const { data: account } = useGetTokenQuery();
    const doctorFields = {
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
