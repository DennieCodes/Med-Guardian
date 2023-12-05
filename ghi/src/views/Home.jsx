import React from 'react';
import { Link } from 'react-router-dom';

function Home() {

	return (
		<section className='homePage d-flex align-items-center justify-content-center'>
			<div className='d-flex flex-column align-items-center homeSection'>
<<<<<<< HEAD
				<h3 className='container px-5 text-dark text-center'>Med Guardian makes it easy to never miss a beat in your health routine! Sign up for and unlock personalized medication schedules with timely notifications. Take charge of your well-being effortlessly!</h3>
=======
				<h3 className='container px-5 text-dark text-center'>MedGuardian makes it easy to never miss a beat in your health routine! Sign up for and unlock personalized medication schedules with dose tracking. Take charge of your well-being effortlessly!</h3>
>>>>>>> mz-calendar-dev
				<Link to="/register"><button className='btn btn-primary btn-lg'>Sign Up Now</button></Link>
			</div>


		</section>
	)
}

export default Home;
