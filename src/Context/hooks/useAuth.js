import { useContext } from 'react';
import { Context } from '../AuthContext';

export default function useAuth() {
	const context = useContext(Context);
	return context;
}