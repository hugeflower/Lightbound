import {useRegisterUser} from "../hooks/UseRegisterUser.ts";
import {useState} from "react";
import {useNavigate} from "react-router";
import {routes} from "../router/routes.ts";

function Signup() {
    const {error, success, postRegisterUser} = useRegisterUser();
    const [username, setUsername] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [admin, setAdmin] = useState<boolean>(false);
    const navigate = useNavigate();

    const handleRegisterUser = (e: React.FormEvent) => {
        e.preventDefault();
        postRegisterUser(username, password, admin);

    }

    return (
        <form className="bg-gray-50 dark:bg-gray-900" onSubmit={handleRegisterUser}>
            <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
                <div>
                    <div className="">
                        <h1>
                            Create your new account
                        </h1>
                        <div>
                            <h2 className="mb-2" color="blue-gray">
                                Username
                            </h2>
                            <input name="username" id="username"
                                   placeholder="username"
                                   value={username}
                                   onChange={(e) => setUsername(e.target.value)}
                            />
                        </div>
                        <div className="mb-2">
                            <h2 className="mb-2">
                                Password
                            </h2>
                            <input type="password" name="password" id="password"
                                   placeholder="••••••••"
                                   value={password}
                                   onChange={(e) => setPassword(e.target.value)}
                            />
                        </div>
                        <div className="mt-5">
                            <span>
                                Admin
                            </span>
                            <input type="checkbox" name="admin"
                                   checked={admin}
                                   onChange={(e) => setAdmin(e.target.checked)}
                            />
                        </div>
                        <div>
                            <button type="submit">
                                Create
                            </button>
                        </div>
                        {error &&
                            <div className="text-red-600">
                                <p>{error}</p>
                            </div>
                        }
                        {success &&
                            <div className="text-green-600">
                            <p>{success}</p>
                                <button onClick={() =>navigate(routes.login.path)}>
                                    Go to Login
                                </button>
                            </div>
                        }
                    </div>
                </div>
            </div>
        </form>
    )
}

export {Signup};