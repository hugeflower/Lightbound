import {useState} from "react";
import {admin, host, secret} from "../api/endpoints.ts";

function useGetAdmin() {
    const [success, setSuccess] = useState("");
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState("");


    const getAdmin = async () => {
        setLoading(true);
        setError("");
        setSuccess("");
        try {
            const response = await fetch(`${host}/${secret}/${admin}`, {
                method: 'GET',
                credentials: "include"
            })
            const result = await response.text()
            if (!response.ok) {
                throw new Error(result)
            }

            setSuccess(result);
        } catch (error) {
            const errorMessage = error instanceof Error ? error.message : "Information non accessible";
            setError(errorMessage)
        } finally {
            setLoading(false)
        }
    }
    return {success, loading, error, getAdmin}
}

export { useGetAdmin };