import React, { createContext, useState, useEffect } from 'react';
import { authenticate } from '../services/sessionApi';
import api from '../services/api';

const Context = createContext();

function AuthProvider({ children }) {
	const [user, setUser] = useState({});

	const Login = async function(loginData) {
		var data = parseDataToAuth(loginData);

		if (isEmpty(data)) {
			clearUser();
			return;
		}

		return await authenticate(data)
		.then(function(res) {
			if (res) {
				setUser(res.user);
				localStorage.setItem('@App:user', JSON.stringify(res.user));
				localStorage.setItem('@App:token', res.token);

				return res.user;
			}

			clearUser();
			Logout();
		});
	}

	const Logout = function() {
		clearUser();
	}

	const parseDataToAuth = function(data) {
		if (data.email && data.password) {
			return {
				'email': data.email,
				'password': data.password
			};
		}

		return {};
	}

	const clearUser = function() {
		setUser({});
		localStorage.removeItem('@App:user');
		localStorage.removeItem('@App:token');
	}

	const isEmpty = function(obj) {
		return Object.keys(obj).length === 0;
	}

	const checkSigned = function() {
		const storagedUser = localStorage.getItem('@App:user');
		const storagedToken = localStorage.getItem('@App:token');

		if (storagedToken && storagedUser) {
			api.defaults.headers.common['Authorization'] = `Bearer ${storagedToken}`;
			return true;
		}

		return false;
	}

	useEffect(() => {
		const storagedUser = localStorage.getItem('@App:user');
		const storagedToken = localStorage.getItem('@App:token');

		if (storagedToken && storagedUser) {
			setUser(JSON.parse(storagedUser));
			api.defaults.headers.common['Authorization'] = `Bearer ${storagedToken}`;
		}
	}, []);

	return (
		<Context.Provider value={{signed: checkSigned(), user, Login, Logout}}>
			{children}
		</Context.Provider>
	);
}

export { Context, AuthProvider };