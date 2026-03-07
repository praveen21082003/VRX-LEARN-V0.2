import React from "react";
import HeaderUserMenu from "./HeaderUserMenu";
import BreadcrumbMenu from "./BreadcrumbMenu";
import HeaderProfile from "./HeaderProfile";

function Header({ menu, breadcrumbs = [], profileURL }) {
    return (
        <header className="sticky  shrink-0 top-0 z-50 flex h-[50px] w-full items-center justify-between bg-brand px-10  text-[#FAFAF8]">

            {/* Logo */}
            <div className="flex items-center gap-10">
                <img
                    src="/logo-white.svg"
                    alt="Logo"
                    className="h-10 cursor-pointer"
                />

                {!menu &&
                    (
                        <div className="">
                            <BreadcrumbMenu
                                items={breadcrumbs}
                            />
                        </div>
                    )}
            </div>




            {/* Right Section */}
            <div className="flex items-center gap-10">
                {menu && <HeaderUserMenu />}
                <HeaderProfile/> 
            </div>
        </header>
    );
}

export default Header;
