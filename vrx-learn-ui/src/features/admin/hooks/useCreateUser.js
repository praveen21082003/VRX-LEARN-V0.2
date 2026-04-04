import { useState } from "react";
import { createUsers } from "@/services/users.service";

export const useCreateUser = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const createNewUser = async (payload) => {
        try {
            setLoading(true);
            setError(null);

            const res = await createUsers(payload);

            return res.data; 
        } catch (err) {
            const message =
                err.response?.data?.message || "Failed to create user";

            setError(message);
            throw err;
        } finally {
            setLoading(false);
        }
    };

    return {
        createNewUser,
        loading,
        error,
    };
};
