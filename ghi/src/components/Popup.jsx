import React from "react";

function Popup(props) {

    return (
        <section className='popup' style={{ opacity: props.showSched.opacity, display: props.showSched.display }}>
            <div className='medDetail'></div>
            <p>medication: {props.med.name}</p>
            <p>strength: {props.med.strength}</p>
            <p>dosage: {props.med.dosage} pills</p>
            <h5>{props.eventData.color !== 'grey' ? 'Medication Taken? Press confirm' : 'Already taken'}</h5>
            <p></p>
            <div className='row m-0 p-2 justify-content-between'>
                <button id={props.eventData.title} className='col-4 back' onClick={props.handleClosePopup}>close</button>
                {props.eventData.color !== 'grey' && <button className='col-4 confirm' onClick={props.handleUpdateCount}>confirm</button>}
            </div>
        </section>
    )
}
export default Popup
