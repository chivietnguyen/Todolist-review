import React, { useState, useContext } from "react";
import "./LoginForm.css";

import { Button, Form } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { NavbarContext } from "../App/App";

export default function LoginForm() {
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");
	const [navbar, setNavbar] = useContext(NavbarContext)

	let navigate = useNavigate();

	const saveUserInfo = async (userInfo) => {
		localStorage.setItem("user", JSON.stringify(userInfo));
	}

	const checkLoginAccount = async (users) => {
		console.log(users)
		let isAccountExisted = false;
		let userInfo = {}

		await users.forEach((user) => {
			if (user.username === username && user.password === password) {
				isAccountExisted = true
				userInfo = {
					username,
					accessToken: user.accessToken,
					id: user.id
				}
				saveUserInfo(userInfo)
			}
		});
		if (isAccountExisted) {
			setNavbar(true)
			navigate("/todolist")
		} else {
			alert("Do not find your account!")
		}
	};

	const login = async (e) => {
		e.preventDefault();

		// Get API to check login account
		await fetch("https://630498f6761a3bce77eb3e4a.mockapi.io/todo/users")
			.then((res) => res.json())
			.then((users) => checkLoginAccount(users));
	};

	return (
		<div className="container">
			<div className="row d-flex justify-content-center">
				<div className="col-lg-5 col-md-8 col-sm-12">
					<Form className="form" onSubmit={login}>
						<h1>Sign In</h1>
						<p>Sign in and start managing your future!</p>

						<Form.Group className="form-group">
							<Form.Control
								className="input"
								type="text"
								placeholder="Sign In"
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

						<Button type="submit" className="button" onSubmit={login}>
							Sign In
						</Button>

						<Button
							type="submit"
							className="button button--create"
							onClick={() => navigate("/register")}
						>
							Create new account
						</Button>
					</Form>
				</div>
			</div>
		</div>
	);
}
