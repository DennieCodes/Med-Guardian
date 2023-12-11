import { useState } from 'react';
import { useAddProfileMutation } from '../store/profileApi';
import { useGetTokenQuery } from '../store/authApi';
import { useNavigate } from 'react-router-dom';
import healthProfile from '../assets/health-profile-web.jpg';

function AddProfile() {
  const [height, setHeight] = useState(0);
  const [weight, setWeight] = useState(0);
  const [cholesterol, setCholesterol] = useState(0);
  const [bloodPressure, setBloodPressure] = useState("");
  const [a1cSugarLevels, setA1cSugarLevels] = useState(0);
  const [notifType, setNotifType] = useState("");

  const [addProfile] = useAddProfileMutation();
  const account = useGetTokenQuery();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    addProfile({
      height: height,
      weight: weight,
      cholesterol: cholesterol,
      blood_pressure: bloodPressure,
      a1c_sugar_level: a1cSugarLevels,
      notif_type: notifType,
      username: account.username,
    });

    setHeight(0);
    setWeight(0);
    setCholesterol(0);
    setBloodPressure("");
    setA1cSugarLevels(0);
    setNotifType("");
    e.target.reset();
    navigate("/");
  }

  return (
    <div className="container d-flex flex-row align-items-center pt-4 mt-4 w-100">
      <div className='w-50'>
        <img src={healthProfile} alt="Doctor interviewing patient" className="img-fluid rounded shadow w-75" />
      </div>
      <div className="forms px-5 d-flex flex-column align-items-center align-self-start w-50">
        <h1 className="mb-4">Health Profile</h1>
        <form onSubmit={handleSubmit} className="w-100">
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
            <input
              type="number"
              id="cholesterol"
              name="cholesterol"
              value={cholesterol}
              placeholder="cholesterol"
              className="form-control"
              onChange={(e) => setCholesterol(e.target.value)}
            />
            <label htmlFor="cholesterol">Total Cholesterol (mg/dL)</label>
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
              onChange={(e) => setNotifType(e.target.value)}
            >
              <option value="">Choose Notification</option>
              <option value="none">None</option>
              <option value="email">Email</option>
              <option value="text">Text</option>
            </select>
          </div>

          <div className="d-flex justify-content-center pt-3 ">
            <button className="btn btn-primary px-5 py-2" type="submit">
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default AddProfile;
