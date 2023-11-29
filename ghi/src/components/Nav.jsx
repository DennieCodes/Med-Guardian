import { NavLink } from 'react-router-dom';
import { useGetTokenQuery, useLogoutMutation } from '../store/authApi';

function Nav() {
	// These are what can be returned from these two functions
	// const { data: account, error, isLoading } = useGetTokenQuery();
	// const [logout, logoutStatus] = useLogoutMutation();

	const { data: account } = useGetTokenQuery();
	const [logout] = useLogoutMutation();

	return (
		<nav >
			<ul className='row text-white d-flex justify-content-center'>
				<li className='col-3'>
					<NavLink to="/" className="btn border text-white navHover" >Home</NavLink>
				</li>
				{!account && (
					<li className='col-3'>
						<NavLink to="/login" className="btn border text-white navHover" >Login </NavLink>
					</li>
				)}

				{!account && (
					<li className='col-3'>
						<NavLink to="/register" className='btn border text-white navHover'>Register</NavLink>
					</li>
				)}

				{account && (
					<li className='col'>
						<p>Welcome, {account.account.first_name}</p>
					</li>
				)}
				{account && (
					<li className='col-3'>
						<NavLink className="btn border navHover"
							onClick={() => {
								logout();
							}}
						>
							Logout
						</NavLink>
					</li>
				)}
			</ul>
		</nav >
	);
}

export default Nav;
