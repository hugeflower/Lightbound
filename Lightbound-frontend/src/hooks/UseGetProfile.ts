import {useState} from "react";
import {host, secret, user} from "../api/endpoints.ts";
import {SecretResponse} from "../Schema/SecretResponse.ts";

function useGetProfile() {
    const [message, setMessage] = useState("");
    const [username, setUsername] = useState("");
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState("");


    const getProfile = async () => {
        setLoading(true);
        setError("");
        setMessage("");
        try {
            const response = await fetch(`${host}/${secret}/${user}`, {
                method: 'GET',
                credentials: "include",
                headers: {
                    "Content-Type": "application/json",
                }
            })
            const result:SecretResponse = await response.json();
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
    return {message, username, loading, error, getProfile}
}

export { useGetProfile };