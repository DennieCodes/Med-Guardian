import MedicationQuantity from './components/MedicationQuantity';
import DrugList from './components/DrugList';

function App() {
	return (
		<>
			<h2>Medication Quantity</h2>
			<MedicationQuantity />

			<div>
				<h2>Drug List</h2>
				<DrugList />
			</div>
		</>
	);
}

export default App;
