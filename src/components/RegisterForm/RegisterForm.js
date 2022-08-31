import React, {useState} from 'react'
import './RegisterForm.css'

import { Button, Form } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';


export default function RegisterForm() {
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");
	let navigate = useNavigate()

	const checkExistAccount = async (checkUser) => {
		let isAccountExisted = false

		// Get API and compare our input to know whether account existed or not
		await fetch('https://630498f6761a3bce77eb3e4a.mockapi.io/todo/users')
			.then(res => res.json())
			.then(users => {
				users.forEach(user => {
					if (user.username === checkUser.username && user.password === checkUser.password) {
						alert('This account has existed!')
						isAccountExisted = true
					}
				})
			})
		
		// if not exist, post new user to API and navigate to login page
		if (!isAccountExisted) {
			await fetch('https://630498f6761a3bce77eb3e4a.mockapi.io/todo/users', {
				method: 'POST',
				headers: {
					"Content-type": "application/json"
				},
				body: JSON.stringify(checkUser)
			})

			alert('Successfully create your account!')
			navigate('/')
		}
	}

	const register = (e) => {
		e.preventDefault()

		var newUser = {username, password}

		checkExistAccount(newUser)
	}

  return (
    <div className="container">
			<div className="row d-flex justify-content-center">
				<div className="col-lg-5 col-md-8 col-sm-12">
					<Form className="form" onSubmit={register}>
						<h1>Sign Up</h1>
						<p>Sign up and start managing your future!</p>

						<Form.Group className="form-group">
							<Form.Control
								className="input"
								type="text"
								placeholder="Sign Up"
								onChange={(e) => setUsername(e.target.value.trim())}
							/>
							<Form.Control
								className="input"
								type="password"
								placeholder="Password"
								onChange={(e) => setPassword(e.target.value.trim())}
								value={password}
							/>
						</Form.Group>

						<Button onClick={register} className="button">
							Sign Up
						</Button>
					</Form>
				</div>
			</div>
		</div>
	);
}
