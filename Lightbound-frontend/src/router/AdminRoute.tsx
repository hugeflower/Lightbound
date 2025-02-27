import { Navigate, Outlet } from 'react-router-dom';
import {routes} from "./routes.ts";
import {hasRole, isAuthenticated} from "../utils/auth.ts";


function AdminRoute() {
    if (!isAuthenticated() || !hasRole('ROLE_ADMIN')) {
        return <Navigate to={routes.login.path} />;
    }
    return <Outlet/>
}

export { AdminRoute };