import { NavLink } from 'react-router-dom';

function MenuNav() {
	// const { data: account, error, isLoading } = useGetTokenQuery();
	return (
		<nav className='MenuNav'>
			<ul className='text-center p-4'>
				<li className='p-2'>
					<NavLink to="/" className='btn  w-100'>Home</NavLink>
				</li>
				<li className='p-2'>
					<NavLink to="/" className='btn w-100'>Medications</NavLink>
				</li>
				<li className='p-2'>
					<NavLink to="/" className='btn w-100'>Doctors</NavLink>
				</li>
				<li className='p-2'>
					<NavLink to="/" className='btn w-100'>Pharmacies</NavLink>
				</li>
				<li className='p-2'>
					<NavLink to="/" className='btn w-100'>Pharmacies</NavLink>
				</li>
				<li className='p-2'>
					<NavLink to="/" className='btn w-100'>Account Information</NavLink>
				</li>

			</ul>
		</nav>
	);
}

export default MenuNav;
