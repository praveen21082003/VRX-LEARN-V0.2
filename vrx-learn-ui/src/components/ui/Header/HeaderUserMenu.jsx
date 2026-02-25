import React from "react";
import { Link, useLocation } from "react-router-dom";


function HeaderUserMenu() {
    const location = useLocation();

    const navigationLinks = [
        {
            name: "Dashboard",
            icon: "material-symbols:dashboard-rounded",
            path: "/dashboard",
        },
        {
            name: "My Learning",
            icon: "mdi:compass",
            path: "/learning",
        },
        {
            name: "Courses",
            icon: "flowbite:graduation-cap-solid",
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
                        <Icon name={navigationLinks.icon} width="16px" height="16px" />
                        <span>{navigationLinks.name}</span>
                    </Link>
                );
            })}
        </nav>
    );
}

export default HeaderUserMenu;
