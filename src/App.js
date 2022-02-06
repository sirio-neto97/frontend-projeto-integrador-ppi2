import React from 'react';
import { BrowserRouter } from 'react-router-dom';

import AppRoutes from './routes';
import { AuthProvider } from './Context/AuthContext';
import GlobaStyle from './styles/global';

import Navbar from './Components/Layout/Navbar';
import Container from './Components/Layout/Container';
import Footer from './Components/Layout/Footer';

export default function App() {
	return (
		<AuthProvider>
			<BrowserRouter>
					<Navbar />
					<Container customClass="min-h-75">
						<AppRoutes />
						<GlobaStyle />
					</Container>
					<Footer />
			</BrowserRouter>
		</AuthProvider>
	);
}

