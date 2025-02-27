import {useState} from "react";
import {auth, host, login} from "../api/endpoints.ts";

function useLoginUser() {
    const [success, setSuccess] = useState("");
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState("");


    const postLoginUser = async (username: string, password: string) => {
        setLoading(true);
        setError("");
        setSuccess("");
        try {
            const response = await fetch(`${host}/${auth}/${login}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({username: username, password: password}),
            })
            const result = await response.text()
            if (!response.ok) {
                throw new Error(result)
            }

            localStorage.setItem("cookie", result);
            setSuccess("Connexion réussie, le cooke est dans le local storage");
        } catch (error) {
            const errorMessage = error instanceof Error ? error.message : "Erreur inconnue";
            setError(errorMessage)
        } finally {
            setLoading(false)
        }
    }
    return {success, loading, error, postLoginUser}
}

export { useLoginUser };