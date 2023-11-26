import React from 'react';
import { useGetDoctorsQuery } from '../store/doctorsApi'
import { useGetTokenQuery } from '../store/authApi';


function DoctorsList() {
    const { data, error, isLoading } = useGetDoctorsQuery();
    const { data: account } = useGetTokenQuery();
    console.log('my data: ', data)
    console.log('my error: ', error)
    console.log('my data: ', isLoading)
    account ? console.log('there is an account') : console.log('There is no account')
    return (
        <>
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
                    <tr>
                        <th scope="row">2</th>
                        <td>Jacob Thornton</td>
                        <td>555-555-5555</td>
                        <td>123 Somewhere, Ca 90101 Suite #5</td>
                        <td><button>Edit/Update</button></td>
                    </tr>
                    <tr>
                        <th scope="row">3</th>
                        <td >Larry the Bird</td>
                        <td>555-555-5555</td>
                        <td>123 Somewhere, Ca 90101 Suite #5</td>
                        <td><button>Edit/Update</button></td>
                    </tr>
                </tbody>
            </table>
        </>
    )
}
export default DoctorsList;
