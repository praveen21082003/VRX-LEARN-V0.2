import React from "react";
import Icon from "../Icon";
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
            icon: "streamline-plump:graduation-cap-solid",
            path: "/courses",
        },
    ];

    return (
        <nav className="flex items-center gap-8 text-[#fafaf8d3]">
            {navigationLinks.map((link) => {
                const icon = link.icon;
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
                        <Icon name={icon} width="20" height="20" />
                        <span className="text-h5">{link.name}</span>
                    </Link>
                );
            })}
        </nav>
    );
}

export default HeaderUserMenu;
