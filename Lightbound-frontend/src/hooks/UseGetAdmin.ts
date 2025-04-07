import {useState} from "react";
import {admin, host, secret} from "../api/endpoints.ts";
import {SecretResponse} from "../Schema/SecretResponse.ts";

function useGetAdmin() {
    const [message, setMessage] = useState("");
    const [username, setUsername] = useState("");
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState("");


    const getAdmin = async () => {
        setLoading(true);
        setError("");
        setUsername("");
        setMessage("");
        try {
            const response = await fetch(`${host}/${secret}/${admin}`, {
                method: 'GET',
                credentials: "include"
            })
            const result:SecretResponse = await response.json()
            if (!response.ok) {
                throw new Error()
            }

            setMessage(result.secretMessage);
            setUsername(result.username);
        } catch (error) {
            const errorMessage = error instanceof Error ? error.message : "Information non accessible";
            setError(errorMessage)
        } finally {
            setLoading(false)
        }
    }
    return {message, username, loading, error, getAdmin}
}

export { useGetAdmin };