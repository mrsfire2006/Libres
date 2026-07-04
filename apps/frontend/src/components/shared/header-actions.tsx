import { Library, LogOut, Menu, PenLine, Store, Wallet, X } from "lucide-react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "../ui/button";
import { ROUTES } from "@/constants";
import { ToggleTheme } from "./toggle-theme";
import { useAuth } from "@/features/auth/auth-hook";
import { UserRoles } from "@/features/user/type";
import { AUTHROUTES } from "@/features/auth/paths";
import { HOMEROUTES } from "@/features/home/paths";
import { STOREROUTES } from "@/features/store/paths";
import { USERROUTES } from "@/features/user/paths";
import { useGetUserProfileQuery } from "@/features/user/user.hook";



const navLinks = [
    { href: STOREROUTES.STORE, label: "Store", icon: Store, Id: "link-store" },
    { href: USERROUTES.USERLIBRARY, label: "My Library", icon: Library, Id: "link-my-library" },
];



export default function HeaderActions() {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const { mutateAsync: logout } = useAuth().logoutMutation;
    const { data, isLoading } = useGetUserProfileQuery();
    const user = data?.value;
    const isAuthenticated = !!data?.value
    const isAuthor = user?.roles.includes(UserRoles.Author);
    const navigate = useNavigate()
    if (isLoading) {
        return (
            <div className="flex items-center gap-2">
                <div className="w-24 h-8 bg-muted animate-pulse rounded-lg hidden md:block" />
                <ToggleTheme />
            </div>
        );
    }
    return (
        <>
            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center gap-1">
                {navLinks.map((link) => {
                    const Icon = link.icon;
                    return (
                        <Link
                            key={link.Id}
                            to={link.href}
                            className="flex text-foreground items-center gap-1.5 px-3 py-2 text-lg font-medium rounded-lg hover:bg-muted transition-colors"
                        >
                            <Icon className="h-5 w-5" />
                            {link.label}
                        </Link>
                    );
                })}
                {isAuthenticated && isAuthor && (
                    <Link
                        to={`${ROUTES.AUTHOR}`}
                        className="flex items-center gap-2 px-3 py-2 text-sm text-foreground font-medium rounded-lg hover:bg-muted transition-colors"
                    >
                        <PenLine className="w-4 h-4" />
                        Author Dashboard
                    </Link>
                )}
                <div className="w-px h-5 bg-border mx-1" />

                {!isAuthenticated ? (
                    <>
                        <Link
                            to={`${AUTHROUTES.LOGIN}`}
                            className="px-3 py-2 text-sm text-foreground font-medium rounded-lg hover:bg-muted transition-colors"
                        >
                            Sign In
                        </Link>
                        <Link
                            to={`${AUTHROUTES.REGISTER}`}
                            className="px-4 text-primary-foreground py-2 text-sm font-medium bg-primary rounded-lg hover:opacity-90 transition-opacity"
                            data-testid="link-login"
                        >
                            Sign Up
                        </Link>
                    </>
                ) : (
                    <div className="flex items-center gap-3 pl-2">
                        <Link
                            to={USERROUTES.USERPROFILE}
                            className="flex items-center gap-2.5 bg-background border border-border rounded-full px-3.5 py-1.5 hover:bg-muted transition-colors"

                        >
                            {/* Avatar */}
                            <div className="w-8 h-8 rounded-full bg-blue-100 dark:bg-blue-900 flex items-center justify-center text-blue-700 dark:text-blue-300 text-[13px] font-medium shrink-0">
                                {user?.username.slice(0, 2).toUpperCase()}
                            </div>

                            {/* Name + Role */}
                            <div className="flex flex-col leading-tight">
                                <span className="text-[13px] font-medium text-foreground">{user?.username}</span>
                                <span className="text-[11px] text-muted-foreground">
                                    {user?.roles !== null ? user?.roles : ""}
                                </span>
                            </div>

                            {/* Divider */}
                            <div className="w-px h-5 bg-border mx-1" />

                            {/* Balance */}
                            {user?.roles == "Reader" ? <div className="flex items-center gap-1 text-[13px] font-medium text-emerald-600 dark:text-emerald-400">
                                <Wallet className="h-3.5 w-3.5" />
                                ${user?.balance}
                            </div> : <></>
                            }
                        </Link>

                        <Button
                            onClick={async () => { await logout(); navigate(HOMEROUTES.INDEX) }}
                            className="p-2 rounded-lg transition-colors"
                            title="Sign Out"
                        >
                            <LogOut className="h-5 w-5" />
                        </Button>
                    </div>
                )}

                <ToggleTheme />
            </nav>

            {/* Mobile Actions Button */}
            <div className="flex md:hidden items-center gap-2">
                {isAuthenticated && (
                    <Link
                        to={USERROUTES.USERPROFILE}
                        className="flex items-center gap-2 bg-background border border-border rounded-full px-2.5 py-1 hover:bg-muted transition-colors"
                    >
                        <div className="w-7 h-7 rounded-full bg-blue-100 dark:bg-blue-900 flex items-center justify-center text-blue-700 dark:text-blue-300 text-[11px] font-medium shrink-0">
                            {user?.username?.slice(0, 2).toUpperCase()}
                        </div>

                        {user?.roles == "Reader" ? <div className="flex items-center gap-1 text-[12px] font-medium text-emerald-600 dark:text-emerald-400">
                            <Wallet className="h-3 w-3" />
                            ${user?.balance}
                        </div> : <></>}
                    </Link>
                )}

                <ToggleTheme />

                <Button
                    onClick={() => setMobileMenuOpen(!mobileMenuOpen)}

                    className="p-2 rounded-lg hover:bg-muted transition-colors"
                    data-testid="button-mobile-menu"
                    aria-label="Menu"
                >
                    {mobileMenuOpen ? (
                        <X className="text-foreground h-6 w-6" />
                    ) : (
                        <Menu className="text-foreground h-6 w-6" />
                    )}
                </Button>
            </div>

            {/* Mobile Menu Dropdown */}
            {mobileMenuOpen && (
                <div className="absolute top-16 left-0 right-0 z-50 md:hidden border-b bg-background px-4 py-4 flex flex-col gap-2 shadow-lg animate-in fade-in slide-in-from-top-5 duration-200">
                    {isAuthenticated && (
                        <div className="flex items-center gap-3 pb-3 mb-1 border-b border-border">
                            <div className="w-9 h-9 rounded-full bg-blue-100 dark:bg-blue-900 flex items-center justify-center text-blue-700 dark:text-blue-300 text-[13px] font-medium shrink-0">
                                {user?.username?.slice(0, 2).toUpperCase()}
                            </div>
                            <div className="flex flex-col leading-tight">
                                <span className="text-sm font-medium text-foreground">{user?.username}</span>
                                <span className="text-[11px] text-muted-foreground">
                                    {user?.roles !== null ? user?.roles : ""}
                                </span>
                            </div>
                        </div>
                    )}

                    {navLinks.map((link) => {
                        const Icon = link.icon;
                        return (
                            <Link
                                key={link.href}
                                to={link.href}
                                className="flex text-foreground items-center gap-2.5 px-3 py-2.5 text-lg font-medium rounded-lg hover:bg-muted transition-colors"
                                onClick={() => setMobileMenuOpen(false)}
                            >
                                <Icon className="h-5 w-5 text-muted-foreground" />
                                {link.label}
                            </Link>
                        );
                    })}
                    {isAuthenticated && isAuthor && (
                        <Link
                            to="/"
                            className="flex items-center gap-2 px-3 py-2 text-sm text-foreground font-medium rounded-lg hover:bg-muted transition-colors"
                            onClick={() => setMobileMenuOpen(false)}

                        >
                            <PenLine className="w-4 h-4" />
                            Author Dashboard
                        </Link>
                    )}

                    <div className="h-px bg-border my-1" />

                    {!isAuthenticated ? (
                        <div className="flex flex-col gap-2 pt-1">
                            <Link
                                to={AUTHROUTES.LOGIN}
                                className="px-4 text-center text-foreground py-2.5 text-sm font-medium border border-border rounded-lg hover:bg-muted transition-colors"
                                onClick={() => setMobileMenuOpen(false)}
                            >
                                Sign in
                            </Link>
                            <Link
                                to={AUTHROUTES.REGISTER}
                                className="px-4 text-center text-primary-foreground py-2.5 text-sm font-medium bg-primary rounded-lg hover:opacity-90 transition-opacity"
                                onClick={() => setMobileMenuOpen(false)}
                            >
                                Sign up
                            </Link>
                        </div>
                    ) : (
                        <div className="flex items-center justify-between mt-1 pt-2 border-t border-border">
                            <Button
                                onClick={async () => { await logout(); setMobileMenuOpen(false) }}

                                variant="destructive"
                                className="w-full flex items-center justify-center gap-2 text-sm font-medium py-2.5"
                            >
                                <LogOut className="h-4 w-4" />
                                Sign Out
                            </Button>
                        </div>
                    )}
                </div>
            )}
        </>
    );
}