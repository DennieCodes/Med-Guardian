import { useState, useEffect } from 'react';
import { useGetProfileQuery } from '../store/profileApi';
import { useGetTokenQuery } from '../store/authApi';

function Profile() {
  const [height, setHeight] = useState(""); // int
  const [weight, setWeight] = useState(""); // int
  const [cholesterol, setCholesterol] = useState(""); // int
  const [bloodPressure, setBloodPressure] = useState(""); // str
  const [a1cSugarLevels, setA1cSugarLevels] = useState(""); // int
  const { data, isLoading } = useGetProfileQuery();

  const account = useGetTokenQuery();

  // If user is logged in then preload their profile into the form
  useEffect(() => {
    if (data) {
      setHeight(data.height);
      setWeight(data.weight);
      setCholesterol(data.cholesterol);
      setBloodPressure(data.blood_pressure);
      setA1cSugarLevels(data.a1c_sugar_level);
    }
  }, [data]);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Call function mutation

    e.target.reset();
  }

  return (
    <div className="forms p-4 d-flex flex-column align-items-center">
      <h1 className="mb-4">Health Profile</h1>
      {isLoading ?
        <div className="spinner-border" role="status">
          <span className="sr-only">Loading...</span>
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
              <label htmlFor="weight">Weight</label>
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
              <label htmlFor="cholesterol">Cholesterol</label>
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
              <label htmlFor="a1cSugarLevels">A1C sugar levels</label>
            </div>

            <div className="d-flex justify-content-center">
              <button className="btn btn-primary px-4" type="submit">Submit</button>
            </div>
          </form>
        )
      }
    </div>
  )
}

export default Profile;