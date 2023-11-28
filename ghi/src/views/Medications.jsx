import { useNavigate } from 'react-router-dom';
import { useGetTokenQuery } from '../store/authApi';
import { useEffect } from "react";
import MedicationList from "../components/MedicationList"
import AddMedication from '../components/AddMedication';

const Medications = () => {
    const account = useGetTokenQuery();
    const navigate = useNavigate();

    useEffect(() => {
        if (!account.data) {
            navigate("/");
        }
    }, [account, navigate]);

    return (
        <>
            <MedicationList />
            <AddMedication />
        </>
    );
}

export default Medications;
