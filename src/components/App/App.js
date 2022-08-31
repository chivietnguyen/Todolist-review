import "bootstrap/dist/css/bootstrap.min.css";
import { useState, createContext } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Header from "../Header/Header";
import LoginForm from "../LoginForm/LoginForm";
import RegisterForm from "../RegisterForm/RegisterForm";
import Todolist from "../Todolist/Todolist";
import EditProfile from "../EditProfile/EditProfile";

import "./App.css";

export const NavbarContext = createContext();

function App() {
	const [navbar, setNavbar] = useState(localStorage.getItem('user') ? true : false);

	return (
		<div className="wrapper">
			<NavbarContext.Provider value={[navbar, setNavbar]}>
				<Header />

				<Routes>
					<Route path="/" element={<LoginForm />} />
					<Route path="/register" element={<RegisterForm />} />
					<Route
						path="/todolist"
						element={
							localStorage.getItem("user") ? (
								<Todolist />
							) : (
								<Navigate to="/" />
							)
						}
					/>
					<Route path="/edit-profile" element={<EditProfile />}/>
				</Routes>
			</NavbarContext.Provider>
		</div>
	);
}

export default App;
