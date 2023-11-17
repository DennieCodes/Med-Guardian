// import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { decrement, increment } from '../slice/medicationQuantitySlice';
// import { useAuthContext } from '@galvanize-inc/jwtdown-for-react';

function MedicationQuantity() {
	const quantity = useSelector((state) => state.medicationQuantity.value);
	const dispatch = useDispatch();
	// const token = useAuthContext();

	// console.log(token);

	// console.log(token.access_token);

	return (
		<div>
			<h1>Medication Form</h1>
			<button
				aria-label="Add 1 to quantity"
				onClick={() => dispatch(increment())}
			>
				Increase medication by 1
			</button>

			<p>{quantity}</p>

			<button
				aria-label="Remove 1 to quantity"
				onClick={() => dispatch(decrement())}
			>
				Decrease medication by 1
			</button>
		</div>
	);
}

export default MedicationQuantity;
