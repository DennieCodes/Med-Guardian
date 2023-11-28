import { useGetMedicationsQuery } from "../store/medications"
import { Link } from "react-router-dom"
import { useGetPharmaciesQuery } from "../store/pharmacies"
import { useGetDoctorsQuery } from "../store/doctorsApi"

const MedicationList = () => {
    const { data: medications, isLoading } = useGetMedicationsQuery()
    const { data: pharmacies, isLoading: pharmaciesLoading } = useGetPharmaciesQuery()
    const { data: doctors, isLoading: doctorsLoading } = useGetDoctorsQuery()
    if (isLoading || pharmaciesLoading || doctorsLoading) {
        return (
            <div className="spinner-border" role="status">
                <span className="sr-only">Loading...</span>
            </div>
        )
    }
    return (
        <>
            <div className="px-5">
                <h1 className="m-5 text-center">My Medications</h1>
                <table className="table table-striped">
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Strength</th>
                            <th>Dosage</th>
                            <th>Frequency</th>
                            <th>Quantity</th>
                            <th>Refills</th>
                            <th>Doctor</th>
                            <th>Pharmacy</th>
                        </tr>
                    </thead>
                    <tbody>
                        {medications.map(medication => {
                            return (
                                <tr key={medication.id}>
                                    <td><Link to={`/medications/${medication.id}`}>{medication.name}</Link></td>
                                    <td>{medication.strength}</td>
                                    <td>{medication.dosage}</td>
                                    <td>{medication.frequency}</td>
                                    <td>{medication.quantity}</td>
                                    <td>{medication.refills}</td>
                                    <td>{doctors.find(doctor => doctor.id === medication.doctor_id).full_name}</td>
                                    <td>{pharmacies.find(pharmacy => pharmacy.id === medication.pharmacy_id).name}</td>
                                </tr>
                            )
                        })}
                    </tbody>
                </table>
            </div >
        </>
    );
}

export default MedicationList;
