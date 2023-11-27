import { useState } from 'react';
import { useRegisterMutation, useGetTokenQuery } from '../store/authApi';

function Register() {
	const [firstName, setFirstName] = useState('');
	const [lastName, setLastName] = useState('');
	const [username, setUsername] = useState('');
	const [email, setEmail] = useState('');
	const [phone, setPhone] = useState('');
	const [password, setPassword] = useState('');
	const [register, regResponse] = useRegisterMutation();

	const handleSubmit = async (e) => {
		e.preventDefault();
		const result = await register({
			firstName,
			lastName,
			username,
			email,
			phone,
			password,
		});

		console.log('Result: ', result);
		e.target.reset();
	};

	return (
		<div>
			<h1>Register</h1>
			<div>
				<form onSubmit={handleSubmit}>
					<label htmlFor="firstName">First Name</label>
					<input
						required
						type="text"
						id="firstName"
						name="firstName"
						value={firstName}
						placeholder="First Name"
						onChange={(e) => setFirstName(e.target.value)}
					/>

					<label htmlFor="lastName">Last Name</label>
					<input
						required
						type="text"
						id="lastName"
						name="lastName"
						value={lastName}
						placeholder="Last Name"
						onChange={(e) => setLastName(e.target.value)}
					/>

					<label htmlFor="lastName">User Name</label>
					<input
						required
						type="text"
						id="username"
						name="username"
						value={username}
						placeholder="User Name"
						onChange={(e) => setUsername(e.target.value)}
					/>

					<label htmlFor="email">Email</label>
					<input
						required
						type="text"
						id="email"
						name="email"
						value={email}
						placeholder="Last Name"
						onChange={(e) => setEmail(e.target.value)}
					/>

					<label htmlFor="phone">Phone Number</label>
					<input
						type="text"
						id="phone"
						name="phone"
						value={phone}
						placeholder="Phone Number"
						onChange={(e) => setPhone(e.target.value)}
					/>

					<label htmlFor="password">Password</label>
					<input
						required
						type="password"
						id="password"
						name="password"
						value={password}
						placeholder="Password"
						onChange={(e) => setPassword(e.target.value)}
					/>

					<button type="submit">Register New Account</button>
				</form>
			</div>
		</div>
	);
}

export default Register;
