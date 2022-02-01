import React, { createContext, useState, useEffect } from 'react';
import { authenticate } from '../services/sessionApi';
import api from '../services/api';

const Context = createContext();

function AuthProvider({ children }) {
	const [user, setUser] = useState({});

	useEffect(() => {
		const storagedUser = localStorage.getItem('@App:user');
		const storagedToken = localStorage.getItem('@App:token');

		if (storagedToken && storagedUser) {
			setUser(JSON.parse(storagedUser));
			api.defaults.headers.common['Authorization'] = `Bearer ${storagedToken}`;
		}
	}, []);

	const Login = async function(loginData) {
		var data = {};

		if (loginData.email && loginData.password) {
			data = {
				'email': loginData.email,
				'password': loginData.password
			};
		}

		return await authenticate(data)
		.then(function(res) {
			if (res) {
				setUser(res.user);
				localStorage.setItem('@App:user', JSON.stringify(res.user));
				localStorage.setItem('@App:token', res.token);

				return res.user;
			}

			setUser({});
			localStorage.removeItem('@App:user');
			localStorage.removeItem('@App:token');
		});
	}

	const isEmpty = function(obj) {
		return Object.keys(obj).length === 0;
	}

	return (
		<Context.Provider value={{signed: !isEmpty(user), user, Login}}>
			{children}
		</Context.Provider>
	);
}

export { Context, AuthProvider };