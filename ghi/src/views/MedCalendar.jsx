
import React, { useEffect, useState } from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
// import { Modal, Button } from 'react-bootstrap';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import { useGetEventsQuery } from "../store/medScheduleApi";
import './MedCal.css'; // Import your custom CSS file
// declare events array to populate calendar



// function to get medication data. Note: will change to get med_events data
const MedCalendar = () => {
    const localizer = momentLocalizer(moment);
    const [showSched, setShowSched] = useState(false);
    const handleClose = () => setShowSched(false);
    // const handleShow = () => setShowSched(true);
    let events = [];
    const handleSelectEvent = (event, e) => {
        // Handle event selection
        console.log('Event selected:', event);
        // setShowSched(true)
        let el = document.createElement('div');
        el.innerHTML('<h1>I am here!!</h1>')
    };

    const handleSelectSlot = ({ start, end, slots, action }) => {
        // Handle slot selection
        console.log('Slot selected:', { start, end, slots, action });
    };
    const { data: event_data, isLoading } = useGetEventsQuery();

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
                const _title = event.title

                events.push({
                    title: _title,
                    start: _from,
                    end: _to
                })

            }
            console.log('event: ', events);
        }

    }

    console.log("event_data: ", event_data);
    if (isLoading) {
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
                onSelectSlot={handleSelectSlot}
                style={{ height: '500px' }} // Set the height of the calendar
            />
            <section className='popup'>
                <h1>popup goes here!</h1>
            </section>

        </div >
    );
};

export default MedCalendar;
