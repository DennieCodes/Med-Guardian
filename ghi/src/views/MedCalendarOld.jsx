
import React from 'react';
import Calendar from 'react-awesome-calendar';
import moment from 'moment';
import './MedCal.css';
const localizer = momentLocalizer(moment);
// Events will be populated by MedEvent Class based on Medication dosage, frequency, and pill count

// Construct date formats
const testDate = new Date();
const holdDate = new Date();
holdDate.setMinutes(0);
holdDate.toDateString();
const holdDate2 = new Date();
holdDate2.setMinutes(30);
holdDate2.toDateString();

// let fromDate = testDate;
// fromDate.setHours(startHours);
// const toDate = fromDate;
// fromDate.setMinutes(startminutes);
// toDate.setMinutes(startminutes + 30);
// fromDate.toDateString();
// toDate.toISOString();

const events = [{
    id: 1,
    color: '#fd3153',
    from: holdDate,
    to: holdDate2,
    title: 'Take Tylon',
    // user: 'User Id',
    // med: "med_id",
    // notif_type: "[none, email or text]",
    // pill_count: 'pill_count',
    // prescribed_by: 'doctor',
},
];
async function getData() {
    // "/api/medications"
    const response = await fetch("http://localhost:8000/api/medications", {
        credentials: 'include',
    });
    const med_data = await response.json();
    console.log("medication data: ", med_data)
    const freq = med_data[0].frequency;
    const dosage = med_data[0].dosage;
    const qty = med_data[0].quantity;
    console.log('frquency: ', freq)
    console.log('dosage: ', dosage)
    console.log('qty: ', qty)
    const startDate = new Date();
    startDate.setHours(8);
    let updatedDate = new Date(startDate);
    console.log('startDate: ', startDate)
    const hourChange = 24 / freq;
    let index_id = 2;
    let fromDate = new Date();
    function incrementDate(myDate, hours_to_change) {
        // Increment by 4 hours
        myDate.setHours(myDate.getHours() + hours_to_change);

        // Check if it's the end of the day
        if (myDate.getHours() >= 0 && myDate.getHours() < 8) {
            // Increment the day
            myDate.setDate(myDate.getDate() + 1);

            // Check if it's the end of the month
            if (myDate.getDate() === 1) {
                // Increment the month
                myDate.setMonth(myDate.getMonth() + 1);
            }
        }

        return myDate;
    }
    // create events for calendar based on schedule
    for (let count = 0; count < qty; count++) {
        // Increment date by hourChange
        if (count === 0) {
            fromDate = new Date(updatedDate);

        } else {
            let temp = incrementDate(updatedDate, hourChange);
            fromDate = new Date(temp);
            updatedDate = new Date(temp);

        }
        let toDate = new Date(fromDate);
        fromDate.setMinutes(0);
        fromDate.toISOString();
        toDate.setMinutes(30);
        toDate.toISOString();
        // console.log('from date to use: ', fromDate)
        // console.log('to date to use: ', toDate)

        let newEvent = {
            id: index_id,
            color: '#fd3153',
            from: fromDate,
            to: toDate,
            title: `medication: ${med_data[0].name}`,
        }
        // events.push(newEvent)
        // count = count - dosage;
        index_id++

    }
    let test1 = new Date()
    test1.setHours(-2);
    // test1.setMinutes(0);
    let test2 = new Date(test1);
    test2.setMinutes(test2.getMinutes() + 30);
    test1.toISOString();
    test2.toISOString();
    console.log('test1: ', test1);
    console.log('test1: ', test1);
    let testEvent = {
        id: index_id,
        color: '#fd3153',
        from: test1,
        to: test2,
        title: `medication: ${med_data[0].name}`,
    }
    events.push(testEvent)
    console.log('updated events list: ', events)
}
getData();

class MedCalendar extends React.Component {
    constructor(props) {
        super(props);
        this.calendar = React.createRef();
    }

    componentDidMount() {
        const details = this.calendar.current.getDetails();
        console.log('deatils: ', details)
    }

    render() {
        return (
            <section className='pageCalendar'>
                <Calendar
                    ref={this.calendar}
                    onClickEvent={(event) => console.log('this is an event', event)}
                    onChange={(dates) => console.log(dates)}
                    onClickTimeLine={(date) => console.log(date)}
                    events={events}
                />
            </section>
        );
    }
}

export default MedCalendar;
