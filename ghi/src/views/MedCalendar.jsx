
import React, { useEffect, useState } from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import { useGetEventsQuery, useUpdateEventColorMutation } from "../store/medScheduleApi";
import { useUpdateMedicationQuantityMutation, useGetMedicationsQuery } from "../store/medications"
import './MedCal.css'; // Import your custom CSS file

// function to get medication data. Note: will change to get med_events data
const MedCalendar = () => {
    const localizer = momentLocalizer(moment);
    const { data: event_data, isLoading } = useGetEventsQuery();
    const { data: medications, medsIsLoading } = useGetMedicationsQuery();
    const [updateColor] = useUpdateEventColorMutation();
    const [showSched, setShowSched] = useState({ display: "none", opacity: 0 });
    const [eventData, setEventData] = useState({});
    const [med, setMed] = useState({})
    let events = [];
    const handleSelectEvent = async (event, e) => {
        if (!medsIsLoading) {
            const medication = await (medications.filter(med => med.id === event.med_id)[0])
            setMed({ ...medication })
        }
        setShowSched({ display: "block", opacity: 1 })
        setEventData({ ...event });
    };
    const eventPropGetter = (event, start, end, isSelected) => {
        const style = {
            backgroundColor: event.color, // Use the color specified in the event
            borderRadius: '0px',
            opacity: 0.8,
            color: 'black',
            border: '0px',
            display: 'block',
        };
        return { style };
    };

    const handleClosePopup = () => {
        setShowSched({ display: "none", opacity: 0 });
        window.location.reload();
    }
    const handleUpdateCount = async (event) => {
        if (!medsIsLoading) {
            const medication = await (medications.filter(med => med.name === eventData.title)[0])
            let data = {
                medications_id: medication.id,
                medication: { dosage: medication.dosage, quantity: medication.quantity }
            }

            const colorData = await event_data.filter(event => event.id === eventData.id)[0]
            let myData = { ...colorData }
            myData.color = "brown";
            // updateCount(data);
            updateColor({ event_id: myData.id, color: myData.color });
            handleClosePopup();

        }
    }
    useEffect(() => {
        getData();
    }, [event_data])
    function getData() {
        if (event_data !== undefined) {
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
                // const _title = event.title

                events.push({
                    title: event.title,
                    start: _from,
                    end: _to,
                    color: event.color,
                    id: event.id,
                    user_id: event.user_id,
                    med_id: event.med_id
                })
            }
        }
    }
    if (isLoading || medsIsLoading) {
        return (
            <h1>is loading</h1>
        )
    }
    return (
        < div className="calendar-container" >
            <Calendar
                localizer={localizer}
                eventPropGetter={eventPropGetter}
                events={events}
                startAccessor="start"
                endAccessor="end"
                onSelectEvent={handleSelectEvent}
                style={{ height: '500px' }} // Set the height of the calendar
            />
            <section className='popup' style={{ opacity: showSched.opacity, display: showSched.display }}>
                <div className='medDetail'></div>
                <p>medication: {med.name}</p>
                <p>strength: {med.strength}</p>
                <p>dosage: {med.dosage} pills</p>
                <h5>Medication Taken? Press confirm</h5>
                <p></p>
                <div className='row m-0 p-2 justify-content-between'>
                    <button id={eventData.title} className='col-4 back' onClick={handleClosePopup}>close</button>
                    <button className='col-4 confirm' onClick={handleUpdateCount}>confirm</button>
                </div>
            </section>

        </div >
    );
};

export default MedCalendar;
