import {Link} from "react-router";
import {routes} from "../router/routes.ts";

function Home() {
    return (
        <section className="bg-gray-50 dark:bg-gray-900">
            <h1>Home</h1>
            <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
                <Link to={routes.login.path}>
                    <h3 className="text-2xl leading-tight text-gray-900">Login</h3>
                </Link>
                <Link to={routes.profile.path}>
                    <h3 className="text-2xl leading-tight text-gray-900">Section utilisateurs</h3>
                </Link>
                <Link to={routes.admin.path}>
                    <h3 className="text-2xl leading-tight text-gray-900">Section admin</h3>
                </Link>
            </div>
        </section>
    )
}

export {Home}