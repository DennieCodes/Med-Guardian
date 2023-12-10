import { useAddPharmacyMutation } from "../store/pharmacies";
import { useState, useEffect } from "react";
import pharmacist from '../assets/pharmacist.jpg';

const AddPharmacy = () => {
    const [name, setName] = useState('');
    const [phone, setPhone] = useState('');
    const [address, setAddress] = useState('');
    const [website, setWebsite] = useState('');
    const [addPharmacy, result] = useAddPharmacyMutation()
    const [error, setError] = useState('');

    useEffect(() => {
        if (result.isSuccess) {
            setAddress('')
            setName("")
            setPhone("")
            setWebsite("")
        } else if (result.isError) {
            setError(result.error)
        }
    }, [result])
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

    const handleSubmit = async (e) => {
        e.preventDefault()
        addPharmacy({
            name: name,
            phone: phone,
            address: address,
            website: website
        })
    }
    return (
        <section className="container d-flex flex-row align-items-center mt-5 pt-2">
            <div className="w-50 px-5 d-flex flex-column align-items-center">
                <img src={pharmacist} alt="A pharmacist at the counter speaking to a customer" className="img-fluid rounded shadow w-75" />
            </div>

            <div className="forms d-flex flex-column align-items-center align-self-start w-50">
                <h1 className="mb-4">Add Pharmacy</h1>
                <form onSubmit={handleSubmit} className="w-75">
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
                    <div className="d-flex justify-content-center pt-3">
                        <button className="btn btn-primary px-5 py-2">Add</button>
                    </div>
                    {error ? <div>There was an error trying to add the pharmacy.</div> : null}
                </form>
            </div>
        </section>
    );
}

export default AddPharmacy;
