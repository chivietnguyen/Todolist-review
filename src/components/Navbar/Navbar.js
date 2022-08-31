import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "react-bootstrap";
import { NavbarContext } from "../App/App";

import "./Navbar.css";

export default function Navbar() {
	const [navbar, setNavbar] = useContext(NavbarContext);
	let userInfo = JSON.parse(localStorage.getItem("user"));
	let navigate = useNavigate();

	const logout = () => {
		localStorage.removeItem("user");
		setNavbar(false);
		navigate("/");
	};

	const deleteAccount = async () => {
		await fetch(
			`https://630498f6761a3bce77eb3e4a.mockapi.io/todo/users/${userInfo.id}`,
			{
				method: "DELETE",
			}
		).then(logout())
	};

	return (
		<ul className="navbar-wrapper d-flex align-items-center justify-content-center">
			<li className="profile mx-1 p-2">
				<a>
					<i className="fa-solid fa-user"></i>
				</a>
				<ul className="dropdown-navbar">
					<li className="option edit-account" onClick={() => navigate('/edit-profile')}>
						<a>Edit Account</a>
					</li>
					<li className="option delete-account" onClick={deleteAccount}>
						<a>Delete Account</a>
					</li>
				</ul>
			</li>

			<li className="mx-1">
				<a>{userInfo.username}</a>
			</li>

			<li className="ms-5">
				<Button className="logout-btn" onClick={logout}>
					Log out
				</Button>
			</li>
		</ul>
	);
}
