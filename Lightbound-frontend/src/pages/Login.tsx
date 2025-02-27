import {Link} from "react-router";
import {routes} from "../router/routes.ts";
import {useLoginUser} from "../hooks/UseLoginUser.ts";
import {useState} from "react";

function Login() {
    const {error, success, postLoginUser} = useLoginUser()
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleLoginUser = () => {
        postLoginUser(username, password)
    }

    return (
        <section className="bg-gray-50 dark:bg-gray-900">
            <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
                <div>
                    <div className="">
                        <h1>
                            Sign in to your account
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
                        <div>
                            <button onClick={handleLoginUser}>
                                Sign in
                            </button>
                        </div>
                        <p>
                            Don’t have an account yet?
                            <Link to={routes.register.path}>
                                Sign up
                            </Link>
                        </p>
                        {error &&
                            <div className="text-red-600">
                                <p>{error}</p>
                            </div>
                        }
                        {success &&
                            <div className="text-green-600">
                                <p>{success}</p>
                            </div>
                        }
                    </div>
                </div>
            </div>
        </section>
    )
}

export {Login};