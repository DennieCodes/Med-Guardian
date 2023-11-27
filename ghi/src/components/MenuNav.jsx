import { NavLink } from 'react-router-dom';
import { useGetTokenQuery } from '../store/authApi';
function MenuNav() {
	const { data: account } = useGetTokenQuery();
	console.log({ account })
	return (
		<nav className='MenuNav'>
			<ul className='text-center p-4'>
				<li className='p-2'>
					<NavLink to="/" className='btn  w-100'>Home</NavLink>
				</li>
				<li className='p-2'>
					<NavLink to="/" className='btn w-100'>Medications</NavLink>
				</li>
				{account && <li className='p-2'>
					<NavLink to="/DoctorsList" className='btn w-100'>Doctors</NavLink>
				</li>}
				<li className='p-2'>
					<NavLink to="/pharmacies" className='btn w-100'>Pharmacies</NavLink>
				</li>
				<li className='p-2'>
					<NavLink to="/" className='btn w-100'>Account Information</NavLink>
				</li>
				<li className='p-2'>
					<NavLink to="/profile" className='btn w-100'>Health Profile</NavLink>
				</li>

			</ul>
		</nav>
	);
}

export default MenuNav;
