import { useState } from 'react';
import { useNavigate } from "react-router-dom";
import { useRegisterMutation } from '../store/authApi';
import { useLoginMutation } from '../store/authApi';


function Register() {
	const [firstName, setFirstName] = useState('');
	const [lastName, setLastName] = useState('');
	const [username, setUsername] = useState('');
	const [email, setEmail] = useState('');
	const [phone, setPhone] = useState('');
	const [password, setPassword] = useState('');
	const [register, regResponse] = useRegisterMutation();
	const [login] = useLoginMutation();
	const navigate = useNavigate();

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

		console.log(regResponse);
		e.target.reset();
		login({ username, password });
		navigate("/addProfile");
	};

	return (
		<div className="forms p-4 d-flex flex-column align-items-center">
			<h1 className="mb-2">Register</h1>
			<form onSubmit={handleSubmit} className="w-50">
				<div className="form-floating mb-3">
					<input
						required
						type="text"
						id="firstName"
						name="firstName"
						value={firstName}
						placeholder="First Name"
						className="form-control"
						onChange={(e) => setFirstName(e.target.value)}
					/>
					<label htmlFor="firstName">First Name</label>
				</div>

				<div className="form-floating mb-3">
					<input
						required
						type="text"
						id="lastName"
						name="lastName"
						value={lastName}
						placeholder="Last Name"
						className="form-control"
						onChange={(e) => setLastName(e.target.value)}
					/>
					<label htmlFor="lastName">Last Name</label>
				</div>

				<div className="form-floating mb-3">
					<input
						required
						type="text"
						id="username"
						name="username"
						value={username}
						placeholder="User Name"
						className="form-control"
						onChange={(e) => setUsername(e.target.value)}
					/>
					<label htmlFor="lastName">User Name</label>
				</div>

				<div className="form-floating mb-3">
					<input
						required
						type="text"
						id="email"
						name="email"
						value={email}
						placeholder="Last Name"
						className="form-control"
						onChange={(e) => setEmail(e.target.value)}
					/>
					<label htmlFor="email">Email</label>
				</div>

				<div className="form-floating mb-3">
					<input
						type="text"
						id="phone"
						name="phone"
						value={phone}
						placeholder="Phone Number"
						className="form-control"
						onChange={(e) => setPhone(e.target.value)}
					/>
					<label htmlFor="phone">Phone Number</label>
				</div>

				<div className="form-floating mb-3">
					<input
						required
						type="password"
						id="password"
						name="password"
						value={password}
						placeholder="Password"
						className="form-control"
						onChange={(e) => setPassword(e.target.value)}
					/>
					<label htmlFor="password">Password</label>
				</div>

				<div className="d-flex justify-content-center">
					<button className="btn btn-primary px-3" type="submit">Register New Account</button>
				</div>
			</form>
		</div>
	);
}

export default Register;
