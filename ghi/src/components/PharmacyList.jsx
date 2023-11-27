import { useGetPharmaciesQuery } from "../store/pharmacies";

const PharmacyList = () => {
    const { data: pharmacies, isLoading } = useGetPharmaciesQuery();
    if (isLoading) {
        return <p>Loading...</p>
    }
    return (
        <>
            <div className="px-5">
                <h1 className="m-5 text-center">My Pharmacies</h1>
                <table className="table table-striped">
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Phone</th>
                            <th>Address</th>
                            <th>Website</th>
                        </tr>
                    </thead>
                    <tbody>
                        {pharmacies.map(pharmacy => {
                            return (
                                <tr key={pharmacy.id}>
                                    <td>{pharmacy.name}</td>
                                    <td>{pharmacy.phone}</td>
                                    <td>{pharmacy.address}</td>
                                    <td>{pharmacy.website}</td>
                                </tr>
                            )
                        })}
                    </tbody>
                </table>
            </div>
        </>
    );
}

export default PharmacyList;
