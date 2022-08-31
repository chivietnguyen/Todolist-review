import React, {useContext} from "react";
import { NavbarContext } from "../App/App";
import Navbar from "../Navbar/Navbar";
import { Link } from "react-router-dom";

import "./Header.css";  

export default function Header() {
	const [navbar] = useContext(NavbarContext)
	return (
		<div className="header-container">
			<div className="header--logo">
				<Link to='/todolist' >Todo</Link>
			</div>
			{navbar ? <Navbar /> : ''}
		</div>
	);
}
