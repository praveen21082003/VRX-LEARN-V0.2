
import { useAuth } from "@/context/AuthContext"
import { ChevronDown, Bell } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import ProfileDropdown from "../ProfileDropdown";
import { Icon } from '@/components/ui';



export default function HeaderProfile() {
    const { user, loading } = useAuth();
    const [open, setOpen] = useState(false);
    const ref = useRef(null);

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
                    <Icon name="mingcute:user-4-fill" height="36" width="36"/>
                }

                <span>Profile</span>
                <ChevronDown size={20} />
            </div>

            {/* DROPDOWN (POSITIONED FROM WRAPPER) */}
            {open && <ProfileDropdown />}
        </div>
    );
}
