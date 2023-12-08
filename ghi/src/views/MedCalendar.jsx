
import React, { useEffect, useState } from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import { useGetEventsQuery, useUpdateEventColorMutation } from "../store/medScheduleApi";
import { useUpdateMedicationQuantityMutation, useGetMedicationsQuery } from "../store/medications";
import Popup from '../components/Popup';
import './MedCal.css';

// function to get medication data. Note: will change to get med_events data
const MedCalendar = () => {
    const localizer = momentLocalizer(moment);
    const { data: event_data, isLoading } = useGetEventsQuery();
    const { data: medications, medsIsLoading } = useGetMedicationsQuery();
    const [updateColor] = useUpdateEventColorMutation();
    const [updateCount] = useUpdateMedicationQuantityMutation();
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
            color: 'white',
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
            myData.color = "grey";
            await updateCount(data);
            await updateColor({ event_id: myData.id, color: myData.color });
            handleClosePopup();

        }
    }
    useEffect(() => {
        getData();

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [event_data, medications])
    function getData() {
        if (event_data) {
            for (let event of event_data) {
                let fromDate = new Date(event.from_date);
                let toDate = new Date(event.to_date);
                // format dates
                const fy = fromDate.getFullYear();
                const fm = fromDate.getMonth();
                const fd = fromDate.getDate();
                const fh = fromDate.getHours();
                const fmin = fromDate.getMinutes();
                const ty = toDate.getFullYear();
                const tm = toDate.getMonth();
                const td = toDate.getDate();
                const th = toDate.getHours();
                const tmin = toDate.getMinutes();
                const _from = new Date(fy, fm, fd, fh, fmin);
                const _to = new Date(ty, tm, td, th, tmin);
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
            <>
                <div className='d-flex justify-content-center align-items-center vh-100'>
                    <div className="spinner-border" role="status">
                        <span className="sr-only"></span>
                    </div>
                </div>
            </>
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
            <Popup med={med} eventData={eventData} showSched={showSched} handleClosePopup={handleClosePopup} handleUpdateCount={handleUpdateCount} />

        </div >
    );
};

export default MedCalendar;
