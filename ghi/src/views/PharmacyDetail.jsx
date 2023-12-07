import { useGetPharmacyQuery, useUpdatePharmacyMutation, useDeletePharmacyMutation } from "../store/pharmacies";
import { useParams, useNavigate } from 'react-router-dom';
import { useState, useEffect } from "react";
import { useGetTokenQuery } from '../store/authApi';

const PharmacyDetail = () => {
    const navigate = useNavigate()
    const account = useGetTokenQuery();
    const { pharmacy_id } = useParams();
    const { data: pharmacy, isLoading } = useGetPharmacyQuery(pharmacy_id)
    const [name, setName] = useState("");
    const [phone, setPhone] = useState("");
    const [address, setAddress] = useState("");
    const [website, setWebsite] = useState("");
    const [updatePharmacy, updateResult] = useUpdatePharmacyMutation()
    const [deletePharmacy, deleteResult] = useDeletePharmacyMutation()
    const [deleteError, setDeleteError] = useState('');
    const [updateError, setUpdateError] = useState('');

    useEffect(() => {
        if (!account.data) {
            navigate("/");
        }
        if (!isLoading && pharmacy) {
            setName(pharmacy.name);
            setPhone(pharmacy.phone);
            setAddress(pharmacy.address);
            setWebsite(pharmacy.website);
        }
        if (updateResult.isSuccess || deleteResult.isSuccess) {
            navigate("/pharmacies")
        } else if (updateResult.isError) {
            setUpdateError(updateResult.error)
        } else if (deleteResult.isError) {
            setDeleteError(deleteResult.error)
        }
    }, [isLoading, pharmacy, updateResult, deleteResult, account, navigate]);

    const handleNameChange = (event) => {
        const value = event.target.value;
        setName(value);
    }
    const handlePhoneChange = (event) => {
        const value = event.target.value;
        setPhone(value);
    }
    const handleAddressChange = (event) => {
        const value = event.target.value;
        setAddress(value);
    }
    const handleWebsiteChange = (event) => {
        const value = event.target.value;
        setWebsite(value);
    }

    const handleUpdate = async (e) => {
        e.preventDefault()
        updatePharmacy({
            pharmacy_id: pharmacy_id,
            pharmacy: {
                name: name,
                phone: phone,
                address: address,
                website: website
            }
        }
        )
    }


    const handleDelete = async (e) => {
        e.preventDefault()
        deletePharmacy(pharmacy_id)
    }
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
            <div className="forms p-4 d-flex flex-column align-items-center">
                <h1 className="mb-2">Edit Pharmacy</h1>
                <form className="w-75">
                    <div className="form-floating mb-3">
                        <input
                            onChange={handleNameChange}
                            placeholder="Name"
                            required
                            type="text"
                            id="name"
                            name="name"
                            className="form-control"
                            value={name}
                        />
                        <label htmlFor="name">Name</label>
                    </div>
                    <div className="form-floating mb-3">
                        <input
                            onChange={handlePhoneChange}
                            placeholder="Phone Number (xxx-xxx-xxxx)"
                            required
                            type="tel"
                            pattern='[0-9]{3}-[0-9]{3}-[0-9]{4}'
                            id="phone"
                            name="phone"
                            className="form-control"
                            value={phone}
                        />
                        <label htmlFor="phone">Phone Number (xxx-xxx-xxxx)</label>
                    </div>
                    <div className="form-floating mb-3">
                        <input
                            onChange={handleAddressChange}
                            placeholder="Address"
                            required
                            type="text"
                            id="address"
                            name="address"
                            className="form-control"
                            value={address}
                        />
                        <label htmlFor="address">Address</label>
                    </div>
                    <div className="form-floating mb-3">
                        <input
                            onChange={handleWebsiteChange}
                            placeholder="Website"
                            required
                            type="text"
                            id="website"
                            name="website"
                            className="form-control"
                            value={website}
                        />
                        <label htmlFor="website">Website</label>
                    </div>
                    <div className="d-flex justify-content-evenly">
                        <button className="btn btn-primary px-3" onClick={handleUpdate}>Update</button>
                        <button className="btn btn-primary px-3" onClick={handleDelete}>Delete</button>
                    </div>
                    {deleteError && <div className="text-center text-danger m-3">There was an error trying to delete this pharmacy, make sure it is not linked any medication.</div>}
                    {updateError && <div className="text-center text-danger m-3">There was an error trying to update this pharmacy.</div>}

                </form>
            </div>
        </>
    );
}

export default PharmacyDetail;
