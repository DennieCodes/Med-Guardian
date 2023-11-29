import React from 'react';
import Calendar from 'react-awesome-calendar';
import './MedCal.css';
// Events will be populated by MedEvent Class based on Medication dosage, frequency, and pill count
const events = [{
    id: 1,
    color: '#fd3153',
    from: '2023-11-28T18:00:00+00:00',
    to: '2023-11-28T19:00:00+00:00',
    title: 'Take Tylon',
    user: 'User Id',
    med: "med_id",
    notif_type: "[none, email or text]",
    pill_count: 'pill_count',
    prescribed_by: 'doctor',
}, {
    id: 2,
    color: '#1ccb9e',
    from: '2023-11-27T18:00:00+00:00',
    to: '2023-11-27T19:00:00+00:00',
    title: 'Holiday',
    user: 'User Id',
    med: "med_id",
    notification_type: "[none, email or text]",
    pill_count: 'pill_count',
    prescribed_by: 'doctor',
}, {
    id: 3,
    color: '#F480A8',
    from: '2023-11-29T05:00:00+00:00',
    to: '2023-11-29T06:01:00+00:00',
    title: 'Jet skiing',
    user: 'User Id',
    med: "med_id",
    notification_type: "[none, email or text]",
    pill_count: 'pill_count',
    prescribed_by: 'doctor',
}, {
    id: 4,
    color: '#fda256',
    from: '2020-11-05T18:00:00+00:00',
    to: '2020-11-05T19:30:00+00:00',
    title: 'Dinner',
    user: 'User Id',
    med: "med_id",
    notification_type: "[none, email or text]",
    pill_count: 'pill_count',
    prescribed_by: 'doctor',
}, {
    id: 5,
    color: '#8281fd',
    from: '2020-11-15T12:00:00+00:00',
    to: '2020-11-15T21:00:00+00:00',
    title: {},
    user: 'User Id',
    med: "med_id",
    notification_type: "[none, email or text]",
    pill_count: 'pill_count',
    prescribed_by: 'doctor',
}];

class MedCalendar extends React.Component {
    constructor(props) {
        super(props);
        this.calendar = React.createRef();
    }

    componentDidMount() {
        const details = this.calendar.current.getDetails();
        console.log('deatils: ', details)
        // call get events endpoint
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
