import { useAddMedicationMutation, useGetDrugListQuery } from "../store/medications"
import { useGetPharmaciesQuery } from "../store/pharmacies";
import { useAddEventMutation, } from "../store/medScheduleApi";
import { useGetDoctorsQuery } from "../store/doctorsApi";
import { useState, useEffect } from "react";

import DrugList from "./DrugList";

const AddMedication = () => {
    const { data: doctors, isLoading: doctorsLoading } = useGetDoctorsQuery()
    const { data: pharmacies, isLoading: pharmaciesLoading } = useGetPharmaciesQuery()
    const { data: drugList, isLoading: drugListLoading } = useGetDrugListQuery()
    const [name, setName] = useState('');
    const [strength, setStrength] = useState('');
    const [dosage, setDosage] = useState('');
    const [frequency, setFrequency] = useState('');
    const [quantity, setQuantity] = useState('');
    const [refills, setRefills] = useState('');
    const [doctor, setDoctor] = useState('');
    const [pharmacy, setPharmacy] = useState('');
    const [error, setError] = useState('');
    const [filteredDrugList, setFilteredDrugList] = useState('');
    const [drugListDisplay, setDrugListDisplay] = useState(false);
    const [addMedication, result] = useAddMedicationMutation();
    const [med_events, event_results] = useAddEventMutation();
    // function to add scheduled event (schedule medication)
    async function createCalendarEvents(medID, userID) {
        let color = "red"
        const events = [];
        const med_data = {
            title: name,
            dosage: dosage,
            freq: frequency,
            qty: quantity,
            doctor_id: doctor,
            pharmacy_id: pharmacy
        }
        const freq = med_data.freq;
        const dose = med_data.dosage;
        const qty = med_data.qty;
        const startDate = new Date();
        startDate.setHours(8);
        startDate.setMinutes(0);
        let beginDate = new Date(startDate)
        const changeHours = Math.floor(24 / freq)

        // construct events until quantity is 0 based on frequency and dosage
        let count = qty
        while (count > 0) {
            if (count === med_data.qty) {
                const fromDate = new Date(beginDate);
                const toDate = new Date(fromDate);
                toDate.setMinutes(30)
                console.log('fromDate: ', fromDate);
                console.log('toDate: ', toDate);
                events.push({
                    color: color,
                    title: med_data.title,
                    from_date: fromDate,
                    to_date: toDate,
                    med_id: medID,
                    user_id: userID
                })
            } else {
                let fromDate = incrementDate(beginDate, changeHours);
                let toDate = new Date(fromDate);
                toDate.setMinutes(30);
                events.push({
                    color: color,
                    title: med_data.title,
                    from_date: fromDate,
                    to_date: toDate,
                    med_id: medID,
                    user_id: userID
                });
                beginDate = new Date(fromDate);
            }
            count -= dose;
        }
        med_events(events);
        function incrementDate(myDate, hours_to_change) {
            myDate.setHours(myDate.getHours() + hours_to_change);
            myDate.setMinutes(0);
            return myDate;
        }
    }
    // createCalendarEvents();
    useEffect(() => {
        if (result.isSuccess) {
            createCalendarEvents(result.data.id, result.data.user_id);
            setName('')
            setStrength("")
            setDosage("")
            setFrequency("")
            setQuantity("")
            setRefills("")
            setDoctor("")
            setPharmacy("")
        } else if (result.isError) {
            setError(result.error)
        }
    }, [result])

    const handleDrugListClick = (value) => {
        setName(value);
        setDrugListDisplay(false);
    }

    const handleNameChange = (event) => {
        const value = event.target.value;
        setName(value);
        setDrugListDisplay(true);

        const filteredDrugList = drugList.filter((item) =>
            item.toLowerCase()
                .includes(value.toLowerCase())
        );

        setFilteredDrugList(filteredDrugList);
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

    const handleSubmit = async (e) => {
        e.preventDefault()
        addMedication({
            name: name,
            strength: strength,
            dosage: dosage,
            frequency: frequency,
            quantity: quantity,
            refills: refills,
            doctor_id: doctor,
            pharmacy_id: pharmacy
        })
    }

    if (doctorsLoading || pharmaciesLoading || drugListLoading) {
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
        <>
            <div className="forms p-4 d-flex flex-column align-items-center">
                <h1 className="mb-2">Add Medication</h1>
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
                    {drugListDisplay && (
                        <DrugList drugList={filteredDrugList}
                            onDrugListClick={handleDrugListClick}
                        />
                    )}

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
                        <label htmlFor="dosage">Dosage</label>
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
                        <label htmlFor="frequency">Frequency</label>
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
                    <div className="d-flex justify-content-center">
                        <button className="btn btn-primary px-3">Add</button>
                    </div>
                    {error ? <div>There was an error trying to add the medication.</div> : null}
                </form>
            </div>
        </>
    );
}

export default AddMedication;
