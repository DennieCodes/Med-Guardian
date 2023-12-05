import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { useGetTokenQuery } from './store/authApi';
import Nav from './components/Nav';
import MenuNav from './components/MenuNav';
import Home from './views/Home';
import Login from './views/Login';
import Register from './views/Register';
import DoctorsList from './views/DoctorsList';
import UpdateDoctor from './views/UpdateDoctor';
import Pharmacies from './views/Pharmacy';
import PharmacyDetail from './views/PharmacyDetail';
import MedCalendar from './views/MedCalendar';
import Medications from './views/Medications';
import MedicationDetail from './views/MedicationDetail';
import DrugInteractions from './views/DrugInteractions';
import './App.css'
import Profile from './views/Profile';
import AddProfile from './views/AddProfile';


function App() {
	const { data: account } = useGetTokenQuery();
	return (
		<BrowserRouter>
			<div className='container-fluid wrapper'>
				<header className='text-center'>
					<Nav />
				</header>
				<main>
					{account && (
						<aside className="sideNav">
							<MenuNav />
						</aside>
					)}
					<section className="mainSection">
						<Routes>
							{/* <Route path="/" element={<Home />} /> */}
							<Route path="/" element={account ? <MedCalendar /> : <Home />} />
							<Route path="/login" element={<Login />} />
							<Route path="/register" element={<Register />} />
							<Route path="/doctorsList" element={<DoctorsList />} />
							<Route path="/profile" element={<Profile />} />
							<Route path='/pharmacies' element={<Pharmacies />} />
							<Route path='/pharmacies/:pharmacy_id' element={<PharmacyDetail />} />
							<Route path='/addProfile' element={<AddProfile />} />
							<Route path='/medications' element={<Medications />} />
							<Route path='/medications/:medication_id' element={<MedicationDetail />} />
							<Route path='/medications/interactions/' element={<DrugInteractions />} />
							<Route path='/doctors/:doctor_id' element={<UpdateDoctor />} />
						</Routes>
					</section>
				</main>
				<footer className='text-center p-3'>
					<p>Med Guardian ©2023 developed by DOM Squad</p>
				</footer>
			</div>

		</BrowserRouter>
	);
}

export default App;
