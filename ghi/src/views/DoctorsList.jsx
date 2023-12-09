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
    }, [account, navigate]);

    if (isLoading) {
        return (
            <>
                <div className='d-flex justify-content-center align-items-center vh-100'>
                    <div className="spinner-border" role="status">
                        <span className="sr-only"></span>
                    </div>
                </div>
            </>
        )
    }

    return (
        <>
            <section className='px-5 pb-2'>
                <h1 className="mt-5 mb-4 text-center">Users Doctors</h1>
                <table className="table table-striped">
                    <thead>
                        <tr>
                            <th scope="col">Name</th>
                            <th scope="col">Phone</th>
                            <th scope="col">Address</th>
                            <th scope="col">Specialty</th>
                        </tr>
                    </thead>
                    <tbody>
                        {doctors && doctors.map(doctor => {
                            return (
                                <tr key={doctor.id} >
                                    <td className='activeHoverBackground'><Link to={`/doctors/${doctor.id}`}>{doctor.full_name}</Link></td>
                                    <td>{doctor.phone}</td>
                                    <td>{doctor.address}</td>
                                    <td>{doctor.specialty}</td>
                                </tr>

                            )
                        })}
                    </tbody>
                </table>
            </section >
            <CreateDoctor />
        </>
    )
}
export default DoctorsList;
