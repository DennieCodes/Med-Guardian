import { useNavigate, Link } from 'react-router-dom';
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
            <div className='text-center m-4'>
                <Link to='/medications/interactions' className=''>
                    <button className='btn btn-primary px-3'>Analyze My Drug-Drug Interactions</button>
                </Link>
            </div>
            <AddMedication />

        </>
    );
}

export default Medications;
