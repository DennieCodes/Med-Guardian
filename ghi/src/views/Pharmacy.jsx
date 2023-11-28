import PharmacyList from "../components/PharmacyList";
import AddPharmacy from "../components/AddPharmacy";
import { useNavigate } from 'react-router-dom';
import { useGetTokenQuery } from '../store/authApi';
import { useEffect } from "react";

const Pharmacies = () => {
    const account = useGetTokenQuery();
    const navigate = useNavigate();

    useEffect(() => {
        if (!account.data) {
            navigate("/");
        }
    }, [account, navigate]);
    return (
        <>
            <PharmacyList />
            <AddPharmacy />
        </>
    );
}

export default Pharmacies;
