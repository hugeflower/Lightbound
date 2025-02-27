import { Navigate, Outlet } from 'react-router-dom';
import {routes} from "./routes.ts";
import {isAuthenticated} from "../utils/auth.ts";

function ProtectedRoute() {
    if (!isAuthenticated()) {
        return <Navigate to={routes.login.path} />;
    }
    return <Outlet/>
}

export { ProtectedRoute };