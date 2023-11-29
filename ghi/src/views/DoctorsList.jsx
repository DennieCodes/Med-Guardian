import React, { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useGetDoctorsQuery } from '../store/doctorsApi'
import { useGetTokenQuery } from '../store/authApi';
import CreateDoctor from '../components/CreateDoctor';

function DoctorsList() {
    const { data: doctors, isLoading } = useGetDoctorsQuery();
    const { data: account } = useGetTokenQuery();
    const navigate = useNavigate()
    useEffect(() => {
        if (!account) {
            navigate('/');
        }
    }, []);
    if (isLoading) {
        return (
            <h3>Data Loading</h3>
        )
    }
    return (
        <>
            <section className='docsList'>
                <h1>Users Doctors</h1>
                <table className="table">
                    <thead>
                        <tr>
                            <th scope="col">#</th>
                            <th scope="col">Name</th>
                            <th scope="col">Phone</th>
                            <th scope="col">Address</th>
                            <th scope="col"></th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <th scope="row">1</th>
                            <td>Mark Otto</td>
                            <td>555-555-5555</td>
                            <td>123 Somewhere, Ca 90101 Suite #5</td>
                            <td><button>Edit/Update</button></td>
                        </tr>
                        {doctors && doctors.map(doctor => {
                            return (
                                <tr key={doctor.id} >
                                    <th scope="row">{doctor.id}</th>
                                    <td>{doctor.full_name}</td>
                                    <td>{doctor.phone}</td>
                                    <td>{doctor.address}</td>
                                    <td><Link to={`/doctors/${doctor.id}`}>Edit/Update</Link></td>
                                </tr>
                            )
                        })}


                    </tbody>
                </table>
            </section>
            <CreateDoctor />
        </>
    )
}
export default DoctorsList;
