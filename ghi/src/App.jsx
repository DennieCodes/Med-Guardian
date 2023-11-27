import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { useGetTokenQuery } from './store/authApi';
import Nav from './components/Nav';
import MenuNav from './components/MenuNav';
import Home from './views/Home';
import Login from './views/Login';
import Register from './views/Register';
import DoctorsList from './views/DoctorsList'
import './App.css'

function App() {
	const { data: account } = useGetTokenQuery();
	return (
		<BrowserRouter>
			<div className='container-fluid wrapper'>
				<header className='text-center'>
					<h1>The App Name medication tracker</h1>
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
							<Route path="/" element={<Home />} />
							<Route path="/login" element={<Login />} />
							<Route path="/register" element={<Register />} />
							<Route path="/doctorsList" element={<DoctorsList />} />
						</Routes>
					</section>
				</main>
				<footer className='bg-info'>
					<h6>App Name &copy;2023 developed by DOM Squad</h6>
				</footer>
			</div>

		</BrowserRouter>
	);
}

export default App;
