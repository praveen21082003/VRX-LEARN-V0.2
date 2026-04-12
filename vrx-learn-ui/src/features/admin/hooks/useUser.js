import { useCallback, useState } from "react";
import { createUsers, deleteUserService } from "@/services/users.service";

export const useUser = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [deleting, setDeleting] = useState(false);

    const createNewUser = useCallback(async (payload) => {
        try {
            setLoading(true);
            setError(null);

            const res = await createUsers(payload);

            return res;
        } catch (err) {
            const message =
                err.response?.data?.message || "Failed to create user";

            setError(message);
            throw err;
        } finally {
            setLoading(false);
        }
    }, []);


    const deleteUser = useCallback(async (userId) => {
        setDeleting(true);
        setError(null);
        try {
            const res = await deleteUserService(userId);
            return res
        }
        catch (error) {
            setError(
                error.response?.data?.message ||
                error.response?.data?.detail ||
                error.message ||
                "User not deleted. Something went wrong"
            );
        }
        finally {
            setDeleting(false);
        }
    }, []);

    return {
        createNewUser,
        deleteUser,
        loading,
        deleting,
        error,
    };
};
