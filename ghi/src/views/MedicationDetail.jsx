import { useGetMedicationQuery, useUpdateMedicationMutation, useDeleteMedicationMutation } from "../store/medications"
import { useParams, useNavigate } from 'react-router-dom';
import { useState, useEffect } from "react";
import { useGetTokenQuery } from '../store/authApi';
import { useGetPharmaciesQuery } from "../store/pharmacies";
import { useGetDoctorsQuery } from "../store/doctorsApi"

const MedicationDetail = () => {
    const navigate = useNavigate()
    const account = useGetTokenQuery();
    const { medication_id } = useParams();
    const { data: medication, isLoading } = useGetMedicationQuery(medication_id)
    const [updateMedication, updateResult] = useUpdateMedicationMutation()
    const [deleteMedication, deleteResult] = useDeleteMedicationMutation()
    const { data: doctors, isLoading: doctorsLoading } = useGetDoctorsQuery()
    const { data: pharmacies, isLoading: pharmaciesLoading } = useGetPharmaciesQuery()
    const [name, setName] = useState('');
    const [strength, setStrength] = useState('');
    const [dosage, setDosage] = useState('');
    const [frequency, setFrequency] = useState('');
    const [quantity, setQuantity] = useState('');
    const [refills, setRefills] = useState('');
    const [doctor, setDoctor] = useState('');
    const [pharmacy, setPharmacy] = useState('');
    const [deleteError, setDeleteError] = useState('');
    const [updateError, setUpdateError] = useState('');


    useEffect(() => {
        if (!account.data) {
            navigate("/");
        }
        if (!isLoading && medication) {
            setName(medication.name);
            setStrength(medication.strength);
            setDosage(medication.dosage);
            setFrequency(medication.frequency);
            setQuantity(medication.quantity);
            setRefills(medication.refills);
            setDoctor(medication.doctor_id);
            setPharmacy(medication.pharmacy_id);
        }
        if (updateResult.isSuccess || deleteResult.isSuccess) {
            navigate("/medications")
        } else if (updateResult.isError) {
            setUpdateError(updateResult.error)
        } else if (deleteResult.isError) {
            setDeleteError(deleteResult.error)
        }
    }, [isLoading, medication, account, navigate, updateResult, deleteResult]);


    const handleNameChange = (event) => {
        const value = event.target.value;
        setName(value);
    }
    const handleStrengthChange = (event) => {
        const value = event.target.value;
        setStrength(value);
    }
    const handleDosageChange = (event) => {
        const value = event.target.value;
        setDosage(value);
    }
    const handleFrequencyChange = (event) => {
        const value = event.target.value;
        setFrequency(value);
    }
    const handleQuantityChange = (event) => {
        const value = event.target.value;
        setQuantity(value);
    }
    const handleRefillsChange = (event) => {
        const value = event.target.value;
        setRefills(value);
    }
    const handleDoctorChange = (event) => {
        const value = event.target.value;
        setDoctor(value);
    }
    const handlePharmacyChange = (event) => {
        const value = event.target.value;
        setPharmacy(value);
    }

    const handleUpdate = async (e) => {
        e.preventDefault()
        updateMedication({
            medication_id: medication_id,
            medication: {
                name: name,
                strength: strength,
                dosage: dosage,
                frequency: frequency,
                quantity: quantity,
                refills: refills,
                doctor_id: doctor,
                pharmacy_id: pharmacy
            }
        })
    }

    const handleDelete = async (e) => {
        e.preventDefault()
        deleteMedication(medication_id)
    }

    if (isLoading || doctorsLoading || pharmaciesLoading) {
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
                <h1 className="mb-2">Add Medication</h1>
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
                            onChange={handleStrengthChange}
                            placeholder="Strength"
                            required
                            type="text"
                            id="strength"
                            name="strength"
                            className="form-control"
                            value={strength}
                        />
                        <label htmlFor="strength">Strength</label>
                    </div>
                    <div className="form-floating mb-3">
                        <input
                            onChange={handleDosageChange}
                            placeholder="Dosage"
                            required
                            type="number"
                            id="dosage"
                            name="dosage"
                            className="form-control"
                            value={dosage}
                        />
                        <label htmlFor="dosage">Dosage (how many for 1 dose?)</label>
                    </div>
                    <div className="form-floating mb-3">
                        <input
                            onChange={handleFrequencyChange}
                            placeholder="Frequency"
                            required
                            type="number"
                            id="frequency"
                            name="frequency"
                            className="form-control"
                            value={frequency}
                        />
                        <label htmlFor="frequency">Frequency (how many times a day?)</label>
                    </div>
                    <div className="form-floating mb-3">
                        <input
                            onChange={handleQuantityChange}
                            placeholder="Quantity"
                            required
                            type="number"
                            id="quantity"
                            name="quantity"
                            className="form-control"
                            value={quantity}
                        />
                        <label htmlFor="quantity">Quantity</label>
                    </div>
                    <div className="form-floating mb-3">
                        <input
                            onChange={handleRefillsChange}
                            placeholder="Refills"
                            required
                            type="number"
                            id="refills"
                            name="refills"
                            className="form-control"
                            value={refills}
                        />
                        <label htmlFor="refills">Refills</label>
                    </div>
                    <div className="mb-3">
                        <select
                            onChange={handleDoctorChange}
                            required
                            id="doctor"
                            name="doctor"
                            className="form-select"
                            value={doctor}
                        >
                            <option value="">Choose a doctor</option>
                            {doctors.map((doctor) => {
                                return (
                                    <option key={doctor.id} value={doctor.id}>
                                        {doctor.full_name}
                                    </option>
                                );
                            })}
                        </select>
                    </div>
                    <div className="mb-3">
                        <select
                            onChange={handlePharmacyChange}
                            required
                            id="pharmacy"
                            name="pharmacy"
                            className="form-select"
                            value={pharmacy}
                        >
                            <option value="">Choose a pharmacy</option>
                            {pharmacies.map((pharmacy) => {
                                return (
                                    <option key={pharmacy.id} value={pharmacy.id}>
                                        {pharmacy.name}
                                    </option>
                                );
                            })}
                        </select>
                    </div>
                    <div className="d-flex justify-content-evenly">
                        <button className="btn btn-primary px-3" onClick={handleUpdate}>Update</button>
                        <button className="btn btn-primary px-3" onClick={handleDelete}>Delete</button>
                        {deleteError && <div className="text-center text-danger m-3">There was an error trying to delete this medication.</div>}
                        {updateError && <div className="text-center text-danger m-3">There was an error trying to update this pharmacy.</div>}
                    </div>
                </form>
            </div>
        </>
    );
}

export default MedicationDetail;
