import {useState} from "react";
import {auth, host, logout} from "../api/endpoints.ts";

function useLogoutUser() {
    const [success, setSuccess] = useState("");
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState("");


    const postLogoutUser = async () => {
        setLoading(true);
        setError("");
        setSuccess("");
        try {
            const response = await fetch(`${host}/${auth}/${logout}`, {
                method: 'GET',
                credentials: "include"
            })
            const result = await response.text()
            if (!response.ok) {
                throw new Error(result)
            }

            localStorage.clear();
            setSuccess("Déonnexion réussie, un nouveau cookie vide a été reçu et le localStorage a été vidé");
        } catch (error) {
            const errorMessage = error instanceof Error ? error.message : "Erreur inconnue";
            setError(errorMessage)
        } finally {
            setLoading(false)
        }
    }
    return {success, loading, error, postLogoutUser}
}

export { useLogoutUser };