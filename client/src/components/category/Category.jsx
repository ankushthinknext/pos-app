import { Button, Container, TextField, Paper } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router";

export default function Category() {
	const [id, setId] = useState(useParams().id ? useParams : "");
	const URL = process.env.REACT_APP_API_URL;
	const [formData, setFormData] = useState({ id: id });
	const [method, setMethod] = useState("POST");
	const handleFormChange = (e) => {
		setFormData({ ...formData, [e.target.name]: e.target.value });
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		let response = await fetch(`${URL}category/${id}`, {
			method: method,
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(formData),
		});
		response = response.json();
		if (response.status === "success") {
		}
	};
	console.log(id);

	useEffect(() => {
		async function getCategory(id) {
			let response = await fetch(`${URL}category/${id ? id : ""}`);
			response = response.json();
			if (response.status === "success") {
				setMethod("PUT");
				setFormData(response.data);
			}
			setId("");
		}
		getCategory();
	}, []);
	return (
		<div>
			<Container>
				<Paper>
					<form onChange={handleFormChange} onSubmit={handleSubmit}>
						<TextField
							id="standard-helperText"
							name="name"
							label="Helper text"
							defaultValue="Default Value"
							helperText="Some important text"
						/>
						<Button
							type="submit"
							variant="contained"
							color="primary"
							class="p-button">
							SUBMIT
						</Button>
					</form>
				</Paper>
			</Container>
		</div>
	);
}
