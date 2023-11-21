import React from 'react';
import { useGetDrugListQuery } from '../store/drugListApi';

function DrugList() {
	const { data, isLoading } = useGetDrugListQuery();

	return (
		<div>
			<h1>Drug List</h1>

			{isLoading ? (
				<p>Loading</p>
			) : (
				<div>
					<label htmlFor="drugList">Drug List:</label>
					<select name="drugList" id="drugList">
						<option value="">Select a drug from the list</option>
						{data &&
							data.map((drug) => {
								return <option value={drug}>{drug}</option>;
							})}
					</select>
				</div>
			)}
		</div>
	);
}

export default DrugList;
