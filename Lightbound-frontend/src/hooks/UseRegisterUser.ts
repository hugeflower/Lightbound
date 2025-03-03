import {useState} from "react";
import {auth, host, register} from "../api/endpoints.ts";

function useRegisterUser() {
    const [success, setSuccess] = useState("");
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState("");

    
    const postRegisterUser = async (username: string, password: string, admin: boolean) => {
        setLoading(true);
        setError("");
        setSuccess("");
        try {
            const response = await fetch(`${host}/${auth}/${register}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({username: username, password: password, admin: admin}),
            })
            const result = await response.text()
            if (!response.ok) {
                throw new Error(result)
            } else setSuccess(result)
        } catch (error) {
            const errorMessage = error instanceof Error ? error.message : "Erreur inconnue";
            setError(errorMessage)
        } finally {
            setLoading(false)
        }
    }
    return {success, loading, error, setError, postRegisterUser}
}

export { useRegisterUser };