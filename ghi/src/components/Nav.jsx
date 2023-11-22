import { NavLink } from 'react-router-dom';
import { useGetTokenQuery, useLogoutMutation } from '../store/authApi';
import { useEffect } from 'react';

function Nav() {
	// const { data: account, error, isLoading } = useGetTokenQuery();
	const { data: account } = useGetTokenQuery();
	const [logout, logoutStatus] = useLogoutMutation();

	console.log('Logout Status: ', logoutStatus);
	useEffect(() => {
		console.log("updating component");
	}, [logoutStatus])


	return (
		<nav >
			<ul className='row m-0 p-0'>
				<li className='col-1'>
					<NavLink to="/" >Home</NavLink>
				</li>

				{!account && (
					<li className='col-1'>
						<NavLink to="/login" >Login</NavLink>
					</li>
				)}

				{!account && (
					<li className='col-1'>
						<NavLink to="/register" className='btn border'>Register</NavLink>
					</li>
				)}

				{account && (
					<li className='col'>
						<p>Welcome, {account.account.first_name}</p>
					</li>
				)}
				{account && (
					<li className='col-1'>
						<button
							onClick={() => {
								logout();
							}}
						>
							Logout
						</button>
					</li>
				)}
			</ul>
		</nav>
	);
}

export default Nav;
