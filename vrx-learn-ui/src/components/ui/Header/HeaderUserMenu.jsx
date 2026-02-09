import React from "react";
import { Link, useLocation } from "react-router-dom";
import { LayoutDashboard, Compass, GraduationCap } from "lucide-react";

function HeaderUserMenu() {
    const location = useLocation();

    const navigationLinks = [
        {
            name: "Dashboard",
            icon: LayoutDashboard,
            path: "/dashboard",
        },
        {
            name: "My Learning",
            icon: Compass,
            path: "/learning",
        },
        {
            name: "Courses",
            icon: GraduationCap,
            path: "/courses",
        },
    ];

    return (
        <nav className="flex items-center gap-8 text-[#fafaf8d3]">
            {navigationLinks.map((link) => {
                const Icon = link.icon;
                const isActive = location.pathname === link.path;

                return (
                    <Link
                        key={link.name}
                        to={link.path}
                        className={`flex items-center gap-2 transition-colors
              ${isActive
                                ? "text-white border-b-2 border-white"
                                : "hover:text-white"
                            }
            `}
                    >
                        <Icon size={16} />
                        <span>{link.name}</span>
                    </Link>
                );
            })}
        </nav>
    );
}

export default HeaderUserMenu;
