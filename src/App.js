import React from 'react';
import Routes from './routes';
import { AuthProvider } from './Context/AuthContext';
import GlobaStyle from './styles/global';
import { Container } from './Components/StyledComponents/StyledPage';

export default function App() {
	return (
		<AuthProvider>
			<Container>
				<Routes />
				<GlobaStyle />
			</Container>
		</AuthProvider>
	);
}

