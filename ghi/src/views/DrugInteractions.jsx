import { useNavigate } from 'react-router-dom';
import { useGetTokenQuery } from '../store/authApi';
import { useEffect } from "react";
import { useGetDrugInteractionsQuery } from '../store/medications';
const DrugInteractions = () => {
    const account = useGetTokenQuery();
    const navigate = useNavigate();
    const { data: interactions, isLoading } = useGetDrugInteractionsQuery()

    console.log(interactions)
    useEffect(() => {
        if (!account.data) {
            navigate("/");
        }
    }, [account, navigate]);

    if (isLoading) {
        return (
            <div className="spinner-border" role="status">
                <span className="sr-only">Loading...</span>
            </div>
        )
    }

    return (
        <>
            <div className='px-5'>
                <h1 className='text-center m-3'>Current Drug-Drug Interactions</h1>
                <ul className='text-center'>
                    {interactions.map(interaction => {
                        return (
                            <li className="my-3" key={interaction}>{interaction}</li>
                        )
                    })}
                </ul>
            </div>
        </>
    );
}

export default DrugInteractions;
