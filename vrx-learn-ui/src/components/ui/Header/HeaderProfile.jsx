
import { useAuth } from "@/context/AuthContext"
import { useEffect, useRef, useState } from "react";
import Dropdown from "../Dropdown";
import { Icon } from '@/components/ui';
import { useNavigate } from "react-router-dom";
import { getProfileDropdown } from "@/config/DropdownButtons";
import { useTheme } from "@/features/dashboard/hook/useTheme";

export default function HeaderProfile() {
    const { user, loading } = useAuth();
    const [open, setOpen] = useState(false);
    // const [mode, setMode] = useState(true);
    const ref = useRef(null);
    const navigate = useNavigate();

     const { darkMode, toggleTheme } = useTheme();

    const buttons = getProfileDropdown({
        mode : darkMode,
        handleMode: toggleTheme,
        navigate,
    });



    useEffect(() => {
        function handleClickOutside(event) {
            if (ref.current && !ref.current.contains(event.target)) {
                setOpen(false);
            }
        }

        document.addEventListener("mousedown", handleClickOutside);
        return () =>
            document.removeEventListener("mousedown", handleClickOutside);
    }, []);



    if (loading) return null;

    return (
        <div ref={ref} className="relative flex items-center">

            {/* CLICK TARGET */}
            <div
                className="flex items-center gap-2 cursor-pointer select-none"
                onClick={() => setOpen((prev) => !prev)}
            >

                {user?.avatar ?
                    <img
                        src={user?.avatar}
                        alt="User profile"
                        className="h-10 w-10 rounded-full object-cover"
                    /> :
                    <Icon name="mingcute:user-4-fill" height="36" width="36" />
                }

                <span>Profile</span>
                <Icon name="iconamoon:arrow-down-2" width="16px" height="16px" />
            </div>

            {/* DROPDOWN (POSITIONED FROM WRAPPER) */}
            {open && <Dropdown buttons={buttons} />}
        </div>
    );
}
