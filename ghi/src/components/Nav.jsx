import { NavLink } from 'react-router-dom';
import { useGetTokenQuery, useLogoutMutation } from '../store/authApi';

function Nav() {
	// These are what can be returned from these two functions
	// const { data: account, error, isLoading } = useGetTokenQuery();
	// const [logout, logoutStatus] = useLogoutMutation();

	const { data: account } = useGetTokenQuery();
	const [logout] = useLogoutMutation();

	return (
		<nav>
			<ul>
				<li>
					<NavLink to="/">Home</NavLink>
				</li>

				{!account && (
					<li>
						<NavLink to="/login">Login</NavLink>
					</li>
				)}

				{!account && (
					<li>
						<NavLink to="/register">Register</NavLink>
					</li>
				)}
			</ul>
			{account && (
				<li>
					<p>Welcome, {account.account.first_name}</p>
				</li>
			)}
			{account && (
				<li>
					<button
						onClick={() => {
							logout();
						}}
					>
						Logout
					</button>
				</li>
			)}
		</nav>
	);
}

export default Nav;
