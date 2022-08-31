import React from "react";
import { useState, useEffect, useRef } from "react";
import { Button, Table, Form } from "react-bootstrap";

import "./Todolist.css";

export default function Todolist() {
	const [tasks, setTasks] = useState([]);
	const [input, setInput] = useState("");

	// Render giao diện
	useEffect(() => {
		fetch("https://630498f6761a3bce77eb3e4a.mockapi.io/todo/tasks")
			.then((res) => res.json())
			.then((tasks) => setTasks(tasks));
	}, [input])

	const handleSubmit = async (e) => {
		e.preventDefault();
		
		// POST API
		await fetch("https://630498f6761a3bce77eb3e4a.mockapi.io/todo/tasks", {
			method: "POST",
			headers: {
				"Content-type": "application/json",
			},
			body: JSON.stringify({
				title: input,
			}),
		});

		setInput('')
	};

	return (
		<div className="todolist-wrapper text-center">
			{/* Search Input && add newTask button */}
			<h1>Chưa làm xong, còn thiếu add, delete, edit category and Task, search, chức năng debounce ở search tag và category</h1>
			<div className="container">
				<div className="row d-flex justify-content-center">
					<div className="col-lg-8 col-md-8 col-sm-12">
						<Form onSubmit={handleSubmit}>
							<Form.Group className="form-group d-flex">
								<Form.Control
									value={input}
									className="todo-input"
									type="text"
									placeholder="Add todo..."
									onChange={(e) => setInput(e.target.value)}
								/>
								<Button
									className="addtodo-btn"
									type="submit"
									onClick={handleSubmit}
								>
									Add todo
								</Button>
							</Form.Group>
						</Form>
					</div>
				</div>
			</div>

			<Table className="todo-table" striped bordered hover size="sm">
				<thead>
					<tr>
						<th className="order-heading">No.</th>
						<th className="title-heading">Title</th>
						<th className="categories-heading">Categories</th>
						<th className="status-heading">Status</th>
					</tr>
				</thead>
				<tbody>
					{/* <tr>
						<td>1</td>
						<td>
							<div className="task-title">
								Cleaning the house
								<div>
									<a>
										<i className="ms-2 me-3 fa-solid fa-pen"></i>
									</a>
									<a>
										<i className="fa-solid fa-trash-can"></i>
									</a>
								</div>
							</div>
						</td>
						<td>
							<div className="categories d-flex align-items-center justify-content-center mb-2">
								<div className="category">
									Life
									<i className="fa-solid fa-xmark"></i>
								</div>
								<div className="category">
									Study
									<i className="fa-solid fa-xmark"></i>
								</div>
								<div className="category">
									Work
									<i className="fa-solid fa-xmark"></i>
								</div>
							</div>

							<select>
								<option value="life">Choose your categories</option>
								<option value="life">Life</option>
								<option value="work">Work</option>
								<option value="study">Study</option>
							</select>
						</td>
						<td>
							<input type="checkbox" />
						</td>
					</tr> */}
					{tasks.map((task) => (
						<tr key={task.id}>
							<td>{task.id}</td>
							<td>
								<div className="task-title">
									<p>{task.title}</p>
									<div>
										<a>
											<i className="ms-2 me-3 fa-solid fa-pen"></i>
										</a>
										<a>
											<i className="fa-solid fa-trash-can"></i>
										</a>
									</div>
								</div>
							</td>
							<td>
								<div className="categories d-flex align-items-center justify-content-center mb-2">
									{task.categories.map((category, index) => (
										<div key={index} className="category">
											{category} <i className="fa-solid fa-xmark"></i>
										</div>
									))}
								</div>
								<select>
									<option value="life">Choose your categories</option>
									<option value="life">Life</option>
									<option value="work">Work</option>
									<option value="study">Study</option>
								</select>
							</td>
							<td>
								<input type="checkbox" />
							</td>
						</tr>
					))}
				</tbody>
			</Table>
		</div>
	);
}
