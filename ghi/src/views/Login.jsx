import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLoginMutation, useGetTokenQuery } from '../store/authApi';

function Login() {
	const [username, setUsername] = useState('');
	const [password, setPassword] = useState('');
	const { data: account } = useGetTokenQuery();
	const [login, result] = useLoginMutation();
	const navigate = useNavigate();


	const handleSubmit = (e) => {
		e.preventDefault();
		login({ username, password });
		navigate("/");
		e.target.reset();
	};

	return (
		<div className="forms p-4 d-flex flex-column align-items-center">
			<h1 className="mb-2">Login</h1>
			{account && <p>Welcome, {account.account.name}</p>}

			<form className="w-50" onSubmit={handleSubmit}>
				<div className="form-floating mb-3">
					<input
						onChange={(e) => setUsername(e.target.value)}
						type="text"
						name="username"
						value={username}
						placeholder="username"
						className="form-control"
						id="username"
						required
					/>
					<label htmlFor="username">username</label>
				</div>

				<div className="form-floating mb-3">
					<input
						onChange={(e) => setPassword(e.target.value)}
						type="password"
						name="password"
						value={password}
						placeholder="password"
						id="password"
						className="form-control"
						required
					/>
					<label htmlFor="password">Password</label>
				</div>

				<div className="d-flex justify-content-center">
					<button className="btn btn-primary px-5" type="submit">Login</button>
				</div>

			</form>
		</div>
	);
}

export default Login;

/*
alt. login

import { useState } from 'react';
import { useAuthContext } from '@galvanize-inc/jwtdown-for-react';
import useToken from '@galvanize-inc/jwtdown-for-react';

const { login } = useToken();
const [username, setUsername] = useState('');
const [password, setPassword] = useState('');

const handleSubmit = (e) => {
	e.preventDefault();
	login(username, password);
	e.target.reset();
};
	<div className="card-body">
		<form onSubmit={(e) => handleSubmit(e)}>
			<div className="mb-3">
				<label className="form-label">Username:</label>
				<input
					name="username"
					type="text"
					className="form-control"
					onChange={(e) => setUsername(e.target.value)}
				/>
			</div>
			<div className="mb-3">
				<label className="form-label">Password:</label>
				<input
					name="password"
					type="password"
					className="form-control"
					onChange={(e) => setPassword(e.target.value)}
				/>
			</div>
			<div>
				<input className="btn btn-primary" type="submit" value="Login" />
			</div>
		</form>
	</div>
*/
