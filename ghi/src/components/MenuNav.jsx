import { NavLink } from 'react-router-dom';
import { useGetTokenQuery } from '../store/authApi';
function MenuNav() {
	const { data: account } = useGetTokenQuery();
	return (
		<nav className='MenuNav mt-3'>
			<ul className='text-center p-4'>
				<li className='p-2 mb-1'>
					<NavLink to="/" className='btn w-100 py-3'>Schedule</NavLink>
				</li>
				<li className='p-2 mb-1'>
					<NavLink to="/profile" className='btn w-100 py-3'>Health Profile</NavLink>
				</li>
				{account && <li className='p-2 mb-1'>
					<NavLink to="/DoctorsList" className='btn w-100 py-3'>Doctors</NavLink>
				</li>}
				<li className='p-2 mb-1'>
					<NavLink to="/pharmacies" className='btn w-100 py-3'>Pharmacies</NavLink>
				</li>
				<li className='p-2 mb-1'>
					<NavLink to="/medications" className='btn w-100 py-3'>Medications</NavLink>
				</li>
			</ul>
		</nav>
	);
}

export default MenuNav;
