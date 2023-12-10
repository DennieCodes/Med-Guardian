import React from 'react';
import { Link } from 'react-router-dom';
import medGuardians from '../assets/med-guardians.jpg';
import medGuardianLogo from '../assets/Med Guardian logo.png'

function Home() {

	return (
		<section className="homePage container d-flex flex-row align-items-start mt-5">
			<div className="home-image d-flex flex-column align-items-center mt-5">
				<img src={medGuardians} alt="A Doctor and a nurse standing alert" className="img-fluid rounded shadow w-75" />
			</div>

			<div className='home-info d-flex flex-column align-items-start justify-content-start mt-5'>
				<div className="d-flex flex-column align-items-center justify-content-center w-100">
					<img className="rounded" src={medGuardianLogo} alt="Med Guardian logo" />
				</div>
				<h2 className="">Empowering Health: Seamless Medication Management, Tracking, and Scheduling for Your Well-Being</h2>

				<p>
					MedGuardian makes it easy to never miss a beat in your health routine!
				</p>
				<p>
					Sign up for and unlock personalized medication schedules with dose tracking.
					Take charge of your well-being effortlessly!
				</p>

				<div className="d-flex flex-column align-items-center justify-content-center w-100">
					<Link to="/register"><button className='mt-2 px-5 py-2 btn btn-primary btn-lg'>Sign Up Now</button></Link>
				</div>

				<p className="mt-4">Already a member?  Log into your account</p>

				<div className="d-flex flex-column align-items-center justify-content-center w-100">
					<Link to="/login"><button className='mt-2 px-5 py-2 btn btn-secondary btn-lg'>Login</button></Link>
				</div>

				{/* <div className='d-flex flex-column align-items-center homeSection'>
					<h3 className='container px-5 text-dark text-center'>
					MedGuardian makes it easy to never miss a beat in your health routine!
					Sign up for and unlock personalized medication schedules with dose tracking.
					Take charge of your well-being effortlessly!</h3>
					<Link to="/register"><button className='btn btn-primary btn-lg'>Sign Up Now</button></Link>
				</div> */}
			</div>
		</section>
	)
}

export default Home;
