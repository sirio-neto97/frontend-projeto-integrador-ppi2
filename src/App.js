import React from 'react';
import AppRoutes from './routes';
import GlobaStyle from './styles/global';
import { Container } from './Components/StyledComponents/StyledPage';

export default function App() {
  return (
	  <Container>
		  <AppRoutes />
		  <GlobaStyle />
	  </Container>
  );
}

