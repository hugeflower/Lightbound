import {BrowserRouter, Navigate, Route, Routes} from "react-router";
import {routes} from "./routes.ts";
import {Navigation} from "./Navigation.tsx";
import {Home} from "../pages/Home.tsx";
import {Profile} from "../pages/Profile.tsx";
import {Admin} from "../pages/Admin.tsx";
import {Login} from "../pages/Login.tsx";
import {Signup} from "../pages/Signup.tsx";
import {ProtectedRoute} from "./ProtectedRoute.tsx";
import {AdminRoute} from "./AdminRoute.tsx";

function Router() {
    return (
        <BrowserRouter>
            <Navigation>
                <Routes>
                    <Route path={routes.login.path} element={<Login/>} />
                    <Route path={routes.register.path} element={<Signup/>} />
                    <Route path={routes.home.path} element={<Home/>} />
                    <Route element={<ProtectedRoute/>}>
                        <Route path={routes.profile.path} element={<Profile/>}/>
                    </Route>
                    <Route element={<AdminRoute/>}>
                        <Route path={routes.admin.path} element={<Admin/>} />
                    </Route>
                    <Route path="*" element={<Navigate to={routes.login.path} replace />} />
                </Routes>
            </Navigation>
        </BrowserRouter>
    )
}

export {Router};