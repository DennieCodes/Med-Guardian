// id SERIAL PRIMARY KEY NOT NULL,
// color VARCHAR(200) NOT NULL,
// from_date VARCHAR(30) NOT NULL,
// to_date VARCHAR(30) NOT NULL,
// title VARCHAR(100) NOT NULL,
// med_id INTEGER references medications(id),
// user_id INTEGER references user_accounts(id)
import React from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import './MedCal.css'; // Import your custom CSS file
// declare events array to populate calendar
const events = [
    {
        title: 'Event 1',
        start: new Date(2023, 11, 3, 12, 0), // month is zero-based
        end: new Date(2023, 11, 3, 12, 30),
    },

];
const localizer = momentLocalizer(moment);
// function to get medication data. Note: will change to get med_events data
async function getData() {
    const startDate = new Date();
    startDate.setHours(8);
    startDate.setMinutes(0)
    const response = await fetch("http://localhost:8000/api/medications", {
        credentials: 'include',
    });
    const med_data = await response.json();
    console.log("medication data: ", med_data);
    console.log("start date to use: ", startDate)

    // loop through medications list to build event to add to events
    med_data.forEach(item => {
        const freq = item.frequency;
        const dosage = item.dosage;
        const qty = item.quantity;
        const changeHours = Math.floor(24 / freq)
        console.log('item: ', item);
        // construct date formats for calendar
        let beginDate = new Date(startDate)
        console.log('beginning from date, will change per event: ', beginDate);
        // construct events until quantity is 0
        let count = qty
        while (count > 0) {
            // console.log('nums: ', count, dosage)
            if (count === qty) {
                const fromDate = new Date(startDate);
                let toDate = new Date(fromDate);
                toDate.setMinutes(toDate.getMinutes() + 30)
                const y = fromDate.getFullYear();
                const m = fromDate.getMonth() + 1;
                const d = fromDate.getDate();
                const h = fromDate.getHours()
                const min = fromDate.getMinutes();
                const yt = toDate.getFullYear();
                const mt = toDate.getMonth() + 1;
                const dt = toDate.getDate();
                const ht = toDate.getHours();
                const mint = toDate.getMinutes();
                console.log('initial from event date: ', y, m, d, h, min);
                console.log('initial to event date: ', yt, mt, dt, ht, mint);

                events.push({
                    title: item.name,
                    start: new Date(y, m, d, h, min), // month is zero-based
                    end: new Date(yt, mt, dt, ht, mint),
                })
            } else {
                let fromDate = incrementDate(beginDate, changeHours)
                console.log("running fromDate: ", fromDate);
                let toDate = new Date(fromDate);
                toDate.setMinutes(toDate.getMinutes() + 30)
                const y = fromDate.getFullYear();
                const m = fromDate.getMonth() + 1;
                const d = fromDate.getDate();
                const h = fromDate.getHours()
                const min = fromDate.getMinutes();
                const yt = toDate.getFullYear();
                const mt = toDate.getMonth() + 1;
                const dt = toDate.getDate();
                const ht = toDate.getHours();
                const mint = toDate.getMinutes();
                events.push({
                    title: item.name,
                    start: new Date(y, m, d, h, min), // month is zero-based
                    end: new Date(yt, mt, dt, ht, mint),
                })
            }
            count -= dosage;
        }

    })
    function incrementDate(myDate, hours_to_change) {
        // Increment by 4 hours
        myDate.setHours(myDate.getHours() + hours_to_change);

        // Check if it's the end of the day
        // if (myDate.getHours() >= 0 && myDate.getHours() < 8) {
        //     // Increment the day
        //     myDate.setDate(myDate.getDate() + 1);

        //     // Check if it's the end of the month
        //     if (myDate.getDate() === 1) {
        //         // Increment the month
        //         myDate.setMonth(myDate.getMonth() + 1);
        //     }
        // }

        return myDate;
    }
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
