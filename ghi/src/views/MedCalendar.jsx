
import React, { useEffect, useState } from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
// import { useNavigate } from 'react-router-dom';
import moment from 'moment';
// import { Modal, Button } from 'react-bootstrap';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import { useGetEventsQuery, } from "../store/medScheduleApi";
import { useUpdateMedicationQuantityMutation, useGetMedicationsQuery } from "../store/medications"
import './MedCal.css'; // Import your custom CSS file
// declare events array to populate calendar



// function to get medication data. Note: will change to get med_events data
const MedCalendar = () => {
    const localizer = momentLocalizer(moment);
    const { data: event_data, isLoading } = useGetEventsQuery();
    const { data: medications, medsIsLoading } = useGetMedicationsQuery();
    const [updateCount] = useUpdateMedicationQuantityMutation();
    const [showSched, setShowSched] = useState({ display: "none", opacity: 0 });
    const [stateChange, setStateChange] = useState(false);
    // const navigate = useNavigate();
    // const handleShow = () => setShowSched(true);
    let events = [];
    const handleSelectEvent = (event, e) => {
        // variables needed
        // const medId = event_data[0].med_title;
        console.log("medication: ", medications)
        const medication = (medications.filter(med => med.name === event.title)[0])
        // Handle event selection
        console.log("medication: ", medication)
        setShowSched({ display: "block", opacity: 1 })

        //


    };
    const handleClosePopup = () => setShowSched({ display: "none", opacity: 0 });
    const handleUpdateCount = async (event) => {

        if (!medsIsLoading) {
            const medication = await (medications.filter(med => med.name === event.title)[0])
            console.log("medication: ", medication)
            // let data = {
            //     medications_id: medication.id
            // }
            // const countData = {}
            // updateCount(data);

            handleClosePopup();
            let val = !stateChange
            setStateChange(val);
        }
    }

    useEffect(() => {
        console.log('get data state changed')
        getData();
    }, [event_data])
    // useEffect(() => {
    //     console.log('state Changed')
    // }, [stateChange])
    function getData() {
        if (event_data !== undefined) {
            // console.log('event_data: ', event_data)
            for (let event of event_data) {
                let fromDate = new Date(event.from_date)
                let toDate = new Date(event.to_date)
                // format dates
                const fy = fromDate.getFullYear();
                const fm = fromDate.getMonth();
                const fd = fromDate.getDate();
                const fh = fromDate.getHours();
                const fmin = fromDate.getMinutes()
                const ty = toDate.getFullYear();
                const tm = toDate.getMonth();
                const td = toDate.getDate();
                const th = toDate.getHours();
                const tmin = toDate.getMinutes();
                const _from = new Date(fy, fm, fd, fh, fmin);
                const _to = new Date(ty, tm, td, th, tmin);
                const _title = event.title

                events.push({
                    title: _title,
                    start: _from,
                    end: _to
                })

            }
            // console.log('event: ', events);
        }

    }

    // console.log("event_data: ", event_data);
    if (isLoading || medsIsLoading) {
        return (
            <h1>is loading</h1>
        )
    }
    return (

        < div className="calendar-container" >

            <Calendar
                localizer={localizer}
                events={events}
                startAccessor="start"
                endAccessor="end"
                onSelectEvent={handleSelectEvent}
                style={{ height: '500px' }} // Set the height of the calendar
            />
            <section className='popup' style={{ opacity: showSched.opacity, display: showSched.display }}>
                <p>med details goes here</p>
                <h4>Taking your meds?</h4>
                <h3>Press confirm</h3>
                <div>
                    <button className='back' onClick={handleClosePopup}>back</button>
                    <button className='confirm' onClick={handleUpdateCount}>confirm</button>
                </div>
            </section>

        </div >
    );
};

export default MedCalendar;
