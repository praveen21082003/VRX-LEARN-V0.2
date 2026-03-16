import { Button, Icon } from '@/components/ui'
import { roleNavigation } from "@/config/headerMenu";
import { Link, useLocation } from "react-router-dom";

function Sidebar({ open, toggleSidebar, role }) {

    const navigationLinks = roleNavigation[role] || [];

    return (
        <aside
            className={`
        fixed top-0 left-0 z-40 h-screen w-80 p-4
        bg-white shadow-lg
        transform transition-transform duration-300
        ${open ? "translate-x-0" : "-translate-x-full"}
      `}

        >
            <div className='flex justify-between items-center border-b border-default py-4 gap-2'>
                <div className='flex gap-2 items-center'>
                    <img
                        src="/VRX-logo.svg"
                        alt="Logo"
                        className="h-10 cursor-pointer"
                    />
                    <h2 className='text-[#3F3F3F] mt-1 text-h2'>VRX Learn</h2>
                </div>

                <Button
                    frontIconName="charm:cross"
                    frontIconHeight="26"
                    frontIconWidth="26"
                    bgClass=""
                    textClass="text-main"
                    onClick={toggleSidebar}
                />
            </div>
            <nav className="flex flex-col gap-2 py-5 text-main w-full">
                {navigationLinks.map((link) => {
                    const icon = link.icon;
                    const isActive = location.pathname === link.path;

                    return (
                        <Link
                            key={link.name}
                            to={link.path}
                            className={`flex items-center gap-3 px-4 py-2 rounded-md transition-colors
                                ${isActive
                                    ? "bg-brand text-white"
                                    : "hover:bg-gray-100 hover:text-main"
                                }`}
                        >
                            <Icon name={icon} width="24" height="24" />
                            <span className="text-sm font-medium">{link.name}</span>
                        </Link>
                    );
                })}
            </nav>
        </aside>
    );
}

export default Sidebar;