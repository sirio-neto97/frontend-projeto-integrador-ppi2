import React, { useState } from 'react';
import useAuth from '../../../Context/hooks/useAuth';

import Form from 'react-bootstrap/Form';

export default function Login() {
	const initialState = {'email': '', 'password': ''};
	const [user, setUser] = useState(initialState);
	const context = useAuth();

	const handleChange = function(e) {
		setUser({
			...user,
			[e.target.name]: e.target.value
		});
	}

	const handleLogin = async function(e) {
		e.preventDefault();
		await context.Login(user)
		.then(function(res) {
			debugger;
			if (res) {
				console.log(res);
			} else {
				alert('Login ou senha inválidos');
				setUser(initialState);
			}
		});
	}

	return (
		<div className="d-flex justify-content-center">
			<div className="col-8">
				<h1>Login</h1>
				<fieldset className='border p-5'>
					<Form onSubmit={handleLogin}>
						<Form.Group className="mb-3">
							<Form.Label htmlFor="email">E-mail</Form.Label>
							<Form.Control type="email" name="email" id="email" value={user.email} onChange={handleChange}/>
						</Form.Group>
						<Form.Group className="mb-3">
							<Form.Label htmlFor="password">Senha</Form.Label>
							<Form.Control type="password" name="password" id="password" value={user.password} onChange={handleChange}/>
						</Form.Group>
						<button className="btn btn-primary">Login</button>
					</Form>
				</fieldset>
			</div>
		</div>
	);
}