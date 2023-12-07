import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useGetTokenQuery } from '../store/authApi';
import {
    useGetProfileQuery,
    useUpdateProfileMutation,
} from '../store/profileApi';
//
// Note: need to update Calendar if NotifType changes
//
function Profile() {
    const account = useGetTokenQuery();
    const navigate = useNavigate();

    const [height, setHeight] = useState(0);
    const [weight, setWeight] = useState(0);
    const [bmi, setBmi] = useState();
    const [cholesterol, setCholesterol] = useState(0);
    const [bloodPressure, setBloodPressure] = useState("");
    const [a1cSugarLevels, setA1cSugarLevels] = useState(0);
    const [notifType, setNotifType] = useState("");

    const { data, isLoading } = useGetProfileQuery();
    const [updateProfile] = useUpdateProfileMutation();

    console.log("Data: ", data);

    // Redirect user if not authenticated
    useEffect(() => {
        if (!account.data) {
            navigate("/");
        }
    }, [account.data, navigate]);

    useEffect(() => {
        let value = (weight * 703) / height ** 2;
        setBmi(value.toFixed(2));

    }, [height, weight])

    // If user is logged in then preload their profile into the form
    useEffect(() => {
        if (data && !isLoading) {
            setHeight(data.height);
            setWeight(data.weight);
            setCholesterol(data.cholesterol);
            setBloodPressure(data.blood_pressure);
            setA1cSugarLevels(data.a1c_sugar_level);
            setNotifType(data.notif_type);
        }
    }, [data, isLoading]);

    const handleSubmit = (e) => {
        e.preventDefault();

        updateProfile({
            height: height,
            weight: weight,
            cholesterol: cholesterol,
            blood_pressure: bloodPressure,
            a1c_sugar_level: a1cSugarLevels,
            notif_type: notifType,
            profile_id: data.id
        })
    }

    return (
        <div className="forms p-4 d-flex flex-column align-items-center">
            <h1 className="mb-4">Health Profile</h1>
            {isLoading ?
                <div className='d-flex justify-content-center align-items-center vh-100'>
                    <div className="spinner-border" role="status">
                        <span className="sr-only"></span>
                    </div>
                </div>
                :
                (
                    <form onSubmit={handleSubmit} className="w-75">
                        <div className="form-floating mb-3">
                            <input
                                type="number"
                                id="height"
                                name="height"
                                value={height}
                                placeholder="height"
                                className="form-control"
                                onChange={(e) => setHeight(e.target.value)}
                            />
                            <label htmlFor="height">Height (inches)</label>
                        </div>

                        <div className="form-floating mb-3">
                            <input
                                type="number"
                                id="weight"
                                name="weight"
                                value={weight}
                                placeholder="weight"
                                className="form-control"
                                onChange={(e) => setWeight(e.target.value)}
                            />
                            <label htmlFor="weight">Weight (lbs)</label>
                        </div>

                        <div className="form-floating mb-3">
                            <p className="form-control" id="bmi">
                                {bmi}
                            </p>
                            <label htmlFor="weight">BMI (auto-calculated) </label>
                        </div>

                        <div className="form-floating mb-3">
                            <input
                                type="number"
                                id="cholesterol"
                                name="cholesterol"
                                value={cholesterol}
                                placeholder="cholesterol"
                                className="form-control"
                                onChange={(e) => setCholesterol(e.target.value)}
                            />
                            <label htmlFor="cholesterol"> Total Cholesterol (mg/dL)</label>
                        </div>

                        <div className="form-floating mb-3">
                            <input
                                type="text"
                                id="bloodPressure"
                                name="bloodPressure"
                                value={bloodPressure}
                                placeholder="bloodPressure"
                                className="form-control"
                                onChange={(e) => setBloodPressure(e.target.value)}
                            />
                            <label htmlFor="bloodPressure">Blood pressure (Systolic/Diastolic)</label>
                        </div>

                        <div className="form-floating mb-3">
                            <input
                                type="number"
                                id="a1cSugarLevels"
                                name="a1cSugarLevels"
                                value={a1cSugarLevels}
                                placeholder="a1cSugarLevels"
                                className="form-control"
                                onChange={(e) => setA1cSugarLevels(e.target.value)}
                            />
                            <label htmlFor="a1cSugarLevels">A1C sugar levels (%)</label>
                        </div>
                        <div className="mb-3">
                            <select
                                id="notifType"
                                name="notifType"
                                className="form-select"
                                value={notifType}
                                onChange={(e) => setNotifType(e.target.value)}>
                                <option value="">Choose Notification</option>
                                <option value="none">None</option>
                                <option value="email">Email</option>
                                <option value="text">Text</option>
                            </select>
                        </div>

                        <div className="d-flex justify-content-center">
                            <button className="btn btn-primary px-4" type="submit">
                                Update
                            </button>
                        </div>
                    </form>
                )
            }
        </div>
    )
}

export default Profile;
