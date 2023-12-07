import { useState } from 'react';
import { useNavigate } from "react-router-dom";
import { useRegisterMutation } from '../store/authApi';
import { useLoginMutation } from '../store/authApi';
import registerComputer from '../assets/register-web.jpg';

function Register() {
	const [firstName, setFirstName] = useState('');
	const [lastName, setLastName] = useState('');
	const [username, setUsername] = useState('');
	const [email, setEmail] = useState('');
	const [phone, setPhone] = useState('');
	const [password, setPassword] = useState('');
	const [register] = useRegisterMutation();
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

		e.target.reset();
		login({ username, password });
		navigate("/addProfile");
	};

	return (
		<div className="container d-flex flex-row align-items-center pt-4">
			<div className="w-50">
				<img src={registerComputer} alt="Registering" className="img-fluid rounded shadow" />
			</div>
			<div className="forms p-4 d-flex flex-column align-items-center w-50">
				<h1 className="mb-2">Register Account</h1>
				<form onSubmit={handleSubmit} className="w-100">
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

<<<<<<< HEAD
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
=======
				<div className="form-floating mb-3">
					<input
						required
						type="email"
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
						type="tel"
						pattern='[0-9]{3}-[0-9]{3}-[0-9]{4}'
						id="phone"
						name="phone"
						value={phone}
						placeholder="Phone Number (xxx-xxx-xxxx)"
						className="form-control"
						onChange={(e) => setPhone(e.target.value)}
					/>
					<label htmlFor="phone">Phone Number (xxx-xxx-xxxx)</label>
				</div>
>>>>>>> d80ab7f082f96d5d5e5c435b274b0efa59240750

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
		</div>
	);
}

export default Register;
