import React from 'react';

function DrugList({ drugList, onDrugListClick }) {
	const lengthOfList = 7;

	return (
		<ul className="list-group" style={{ cursor: "pointer" }}>
			{
				drugList.slice(0, lengthOfList)
					.map((item, index) => (
						<li
							key={index}
							className="list-group-item activeHoverBackground"
							onClick={() => onDrugListClick(item)}
						>
							{item}
						</li>
					))
			}

		</ul>
	);
}

export default DrugList;
