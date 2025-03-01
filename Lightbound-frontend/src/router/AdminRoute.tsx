import { Navigate, Outlet } from 'react-router-dom';
import {routes} from "./routes.ts";
import {hasRole, isAuthenticated} from "../utils/auth.ts";
import {Roles} from "../utils/roles.ts";


function AdminRoute() {
    if (!isAuthenticated() || !hasRole(Roles.ADMIN)) {
        return <Navigate to={routes.home.path} />;
    }
    return <Outlet/>
}

export { AdminRoute };