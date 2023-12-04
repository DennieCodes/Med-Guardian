import { NavLink } from 'react-router-dom';
import { useGetTokenQuery, useLogoutMutation } from '../store/authApi';
import logo from '../assets/Med Guardian logo.png';

function Nav() {

	const { data: account } = useGetTokenQuery();
	const [logout] = useLogoutMutation();

	return (
		<nav className="navbar navbar-expand-lg">
			<NavLink to="/" className="navbar-brand d-inline-block align-top logo">
				<img src={logo} alt="Med Guardian Logo" />
			</NavLink>

			{/* <ul className='row text-white d-flex justify-content-center'> */}
			<div className="w-100">
				<ul className='navbar-nav justify-content-end top-nav'>
					<li className='nav-item'>
						<NavLink to="/" className="nav-link" >Home</NavLink>
					</li>
					{!account && (
						<li className='col-3'>
							<NavLink to="/login" className="nav-link" >Login </NavLink>
						</li>
					)}

					{!account && (
						<li className='col-3'>
							<NavLink to="/register" className='nav-link'>Register</NavLink>
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
			</div>
		</nav >
	);
}

export default Nav;
