// CalendarComponent.js
import React from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import './MedCal.css'; // Import your custom CSS file
const events = [
    {
        title: 'Event 1',
        start: new Date(2023, 11, 3, 12, 0), // month is zero-based
        end: new Date(2023, 11, 3, 12, 30),
    },

];
const localizer = momentLocalizer(moment);

async function getData() {
    // "/api/medications"
    const response = await fetch("http://localhost:8000/api/medications", {
        credentials: 'include',
    });
    const med_data = await response.json();
    console.log("medication data: ", med_data);
    let startDate = new Date();
    startDate.setHours(8);
    startDate.setMinutes(0)
    let endDate = new Date(startDate);
    endDate.setMinutes(endDate.getMinutes() + 45)
    const fromDate = moment(startDate).format('YYYY, MM, DD, hh, mm');
    const toDate = moment(endDate).format('YYYY, MM, DD, hh, mm');
    console.log("time: ", fromDate)
    console.log("time2: ", toDate)
    let newEvent = {
        title: 'New Event',
        start: new Date(fromDate), // month is zero-based
        end: new Date(toDate),
    }
    events.push(newEvent);


    const freq = med_data[0].frequency;
    const dosage = med_data[0].dosage;
    const qty = med_data[0].quantity;
    console.log('frquency: ', freq)
    console.log('dosage: ', dosage)
    console.log('qty: ', qty)


    // let updatedDate = new Date(startDate);
    // console.log('startDate: ', startDate)
    // const hourChange = 24 / freq;
    // let index_id = 2;
    // let fromDate = new Date();
    // function incrementDate(myDate, hours_to_change) {
    //     // Increment by 4 hours
    //     myDate.setHours(myDate.getHours() + hours_to_change);

    //     // Check if it's the end of the day
    //     if (myDate.getHours() >= 0 && myDate.getHours() < 8) {
    //         // Increment the day
    //         myDate.setDate(myDate.getDate() + 1);

    //         // Check if it's the end of the month
    //         if (myDate.getDate() === 1) {
    //             // Increment the month
    //             myDate.setMonth(myDate.getMonth() + 1);
    //         }
    //     }

    //     return myDate;
    // }
}

getData();
const MedCalendar = () => {
    return (
        <div className="calendar-container">
            <Calendar
                localizer={localizer}
                events={events}
                startAccessor="start"
                endAccessor="end"
                style={{ height: '500px' }} // Set the height of the calendar
            />
        </div>
    );
};

export default MedCalendar;
