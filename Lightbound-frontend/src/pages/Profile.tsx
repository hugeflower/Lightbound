import {useGetProfile} from "../hooks/UseGetProfile.ts";
import {routes} from "../router/routes.ts";
import {useNavigate} from "react-router";
import {useEffect} from "react";
import {useLogoutUser} from "../hooks/UseLogoutUser.ts";


function Profile() {
    const {error, success, getProfile} = useGetProfile()
    const {error: errorLogout, success: successLogout, postLogoutUser} = useLogoutUser()
    const navigate = useNavigate()

    useEffect(() => {
        if (successLogout) navigate(routes.home.path)
    }, [successLogout]);
    useEffect(() => {
        getProfile();
    }, []);

    return (
        <section className="bg-gray-50 dark:bg-gray-900">
            <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
                <h1 className="text-2xl leading-tight text-gray-900">
                    Ceci est la page réservée aux utilisateurs!
                </h1>

            </div>
            {error &&
                <div className="text-red-600">
                    <p>{error}</p>
                </div>
            }
            {errorLogout &&
                <div className="text-red-600">
                    <p>{errorLogout}</p>
                </div>
            }
            {success &&
                <div className="text-green-600">
                    <p>{success}</p>
                    <button onClick={() =>navigate(routes.home.path)}>
                        Go to Home
                    </button>
                </div>
            }
            <button onClick={postLogoutUser}>
                Logout
            </button>
        </section>
    )
}

export {Profile};