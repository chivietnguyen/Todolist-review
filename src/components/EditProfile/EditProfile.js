import React, { useState, useContext } from "react";
import { Form, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { NavbarContext } from "../App/App";
import "./EditProfile.css";

export default function EditProfile() {
	const [navbar, setNavbar] = useContext(NavbarContext);
	let userInfo = JSON.parse(localStorage.getItem("user"));
	let navigate = useNavigate();

	const [newUsername, setNewUsername] = useState(userInfo.username);
	const [password, setPassword] = useState("");
	const [newPassword, setNewPassword] = useState("");
	const [confirmPassword, setConfirmPassword] = useState("");

	const logout = () => {
		localStorage.removeItem("user");
		setNavbar(false);
		navigate("/");
	};

	const showEditPasswordInputs = () => {
		let dropDownIcon = document.querySelector(".dropdow-icon");
		let editPasswordInputs = document.querySelector(".edit-password-inputs");
		// let saveChangeBtn = document.querySelector('.save-change-btn')

		dropDownIcon.style.transform === "rotate(180deg)"
			? (dropDownIcon.style.transform = "rotate(0)")
			: (dropDownIcon.style.transform = "rotate(180deg)");

			// Show edit password inputs
			editPasswordInputs.style.height === "0px" ? editPasswordInputs.style.height = "100%" : editPasswordInputs.style.height = "0px"
			editPasswordInputs.style.transform === "translateY(-100%)" ? editPasswordInputs.style.transform = "translateY(0px)" : editPasswordInputs.style.transform = "translateY(-100%)"
			
			// move save-change-btn according to edit password inputs
			
		
	};

	// 1. Check newUsername
	const checkNewUserEmpty = () => {
		let isNewUsernameEmpty = false;
		if (newUsername === "") {
			alert("Please enter your username!");
			isNewUsernameEmpty = true;
		}
		return isNewUsernameEmpty;
	};

	// 2.validate Password
	const checkPasswordValidated = async () => {
		let isPasswordValidated = true;
		await fetch(
			`https://630498f6761a3bce77eb3e4a.mockapi.io/todo/users/${userInfo.id}`
		)
			.then((res) => res.json())
			.then((user) => {
				if (password !== user.password) {
					isPasswordValidated = false;
					password === ""
						? alert("Please enter your password")
						: alert("Your password is not correct!");
				}
			});
		return isPasswordValidated;
	};

	// 3. CheckEmptyNewPassword
	const checkEmptyNewPassword = () => {
		let isNewPasswordEmpty = false;
		if (newPassword === "") {
			isNewPasswordEmpty = true;
		}
		return isNewPasswordEmpty;
	};

	// 4. Check confirm password
	const checkConfirmPassword = () => {
		let isPasswordConfirmed = true;
		if (confirmPassword !== newPassword) {
			isPasswordConfirmed = false;
			alert("Please confirm your password!");
		}
		return isPasswordConfirmed;
	};

	// 5. Save changes
	const saveChanges = async (e) => {
		e.preventDefault();

		let isUsernameEmpty = checkNewUserEmpty();
		let isPasswordValidated = await checkPasswordValidated();
		let isNewPasswordEmpty = checkEmptyNewPassword();
		let isPasswordConfirmed = checkConfirmPassword();

		console.log("????");

		if (!isUsernameEmpty && isPasswordValidated) {
			if (!isNewPasswordEmpty && isPasswordConfirmed) {
				await fetch(
					`https://630498f6761a3bce77eb3e4a.mockapi.io/todo/users/${userInfo.id}`,
					{
						method: "PUT",
						headers: {
							"Content-type": "application/json",
						},
						body: JSON.stringify({
							username: newUsername,
							password: newPassword,
						}),
					}
				).then(logout());
			}

			if (isNewPasswordEmpty && isPasswordConfirmed) {
				await fetch(
					`https://630498f6761a3bce77eb3e4a.mockapi.io/todo/users/${userInfo.id}`,
					{
						method: "PUT",
						headers: {
							"Content-type": "application/json",
						},
						body: JSON.stringify({
							username: newUsername,
						}),
					}
				).then(logout());
			}
		}
	};

	return (
		<div className="profile-wrapper d-flex align-items-center justify-content-center">
			<Form className="edit-profile-form" style={{ textAlign: "center" }} onSubmit={saveChanges}>
				<h3>Edit Profile</h3>
				<Form.Group id="edit-username" className="mb-3">
					<Form.Label>New Username</Form.Label>
					<Form.Control
						onChange={(e) => setNewUsername(e.target.value.trim())}
						type="text"
						placeholder="Enter new username"
						className="mb-2"
					/>
					<Form.Control
						value={password}
						onChange={(e) => setPassword(e.target.value.trim())}
						id="password"
						type="password"
						placeholder="Enter password"
					/>
				</Form.Group>

				<Form.Group id="edit-password" className="mb-3 p-relative">
					<Button
						onClick={showEditPasswordInputs}
						className="d-flex align-items-center justify-content-between new-password-btn mb-2 new-password-btn"
					>
						New password
						<div className="dropdow-icon">
							<i className="fa-solid fa-caret-down"></i>
						</div>
					</Button>

					<div className="edit-password-inputs-wrapper">
						<div className="edit-password-inputs">
							<Form.Control
								value={newPassword}
								onChange={(e) => setNewPassword(e.target.value.trim())}
								className="mb-2"
								id="new-password"
								type="password"
								placeholder="Enter new password"
							/>
							<Form.Control
								value={confirmPassword}
								onChange={(e) => setConfirmPassword(e.target.value.trim())}
								id="confirm-password"
								type="password"
								placeholder="Confirm new password"
							/>
						</div>
					</div>
				</Form.Group>

				<Button className="save-change-btn" type="submit">Save Changes</Button>
			</Form>
		</div>
	);
}
