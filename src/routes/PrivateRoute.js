import { Outlet, Navigate } from "react-router-dom";
import useAuth from "../Context/hooks/useAuth";

export default function PrivateRoute() {
	const { signed } = useAuth();

	if (signed) {
		return <Outlet/>;
	}

	return <Navigate to="/login"/>;
}