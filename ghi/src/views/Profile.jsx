import { useState } from 'react';
import { useGetProfileQuery } from '../store/profileApi';
import { useGetTokenQuery } from '../store/authApi';

function Profile() {
  const [height, setHeight] = useState(""); // int
  const [weight, setWeight] = useState(""); // int
  const [cholesterol, setCholesterol] = useState(""); // int
  const [bloodPressure, setBloodPressure] = useState(""); // str
  const [a1cSugarLevels, setA1cSugarLevels] = useState(""); // int
  const { data: account } = useGetTokenQuery();
  console.log("Profile account: ", account.account);

  const { data, isLoading } = useGetProfileQuery();

  console.log("Data: ", data);

  return (
    <div>
      <h1>Health Profile</h1>
      <div className="p-4 forms shadow w-50">
        <form>
          <div className="form-floating mb-3">
            <label htmlFor="height">Height (inches)</label>
            <input
              type="number"
              id="height"
              name="height"
              value={height}
              placeholder="height"
              className="form-control"
              onChange={(e) => setHeight(e.target.value)}
            />
          </div>

          <div className="form-floating mb-3">
            <label htmlFor="weight">Weight</label>
            <input
              type="number"
              id="weight"
              name="weight"
              value={weight}
              placeholder="weight"
              className="form-control"
              onChange={(e) => setWeight(e.target.value)}
            />
          </div>

          <div className="form-floating mb-3">
            <label htmlFor="cholesterol">Cholesterol</label>
            <input
              type="number"
              id="cholesterol"
              name="cholesterol"
              value={cholesterol}
              placeholder="cholesterol"
              className="form-control"
              onChange={(e) => setCholesterol(e.target.value)}
            />
          </div>

          <div className="form-floating mb-3">
            <label htmlFor="bloodPressure">Blood pressure (Systolic/Diastolic)</label>
            <input
              type="text"
              id="bloodPressure"
              name="bloodPressure"
              value={bloodPressure}
              placeholder="bloodPressure"
              className="form-control"
              onChange={(e) => setBloodPressure(e.target.value)}
            />
          </div>

          <div className="form-floating mb-3">
            <label htmlFor="a1cSugarLevels">A1C sugar levels</label>
            <input
              type="number"
              id="a1cSugarLevels"
              name="a1cSugarLevels"
              value={a1cSugarLevels}
              placeholder="a1cSugarLevels"
              className="form-control"
              onChange={(e) => setA1cSugarLevels(e.target.value)}
            />
          </div>

          <button type="submit">Submit</button>
        </form>
      </div>
    </div>
  )
}

export default Profile;