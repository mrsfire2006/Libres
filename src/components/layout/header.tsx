"use client";

import { useState } from "react";
import Link from "next/link";
import { Store, Library, BookOpen, Menu, X, LogOut, User, Wallet } from "lucide-react";
import { ROUTES } from "@/constants/constant";
import { useSession, signOut } from "next-auth/react";
import { Button } from "../ui/button";
import { UserRoles } from "@/libres.domain/enums/user-roles";
import { ToggleTheme } from "../shared/toggle-theme";

const navLinks = [
    { href: ROUTES.STORE, label: "Store", icon: Store, Id: "link-store" },
    { href: ROUTES.MYLIBRARY, label: "My Library", icon: Library, Id: "link-my-library" },
];

export default function Header() {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);


    const { data: session, status } = useSession();
    const isAuthenticated = status === "authenticated";
    const isLoading = status === "loading";
    return (
        <header className="sticky top-0 z-50 w-full border-border border-b bg-background/95 backdrop-blur-md">
            <div className="container mx-auto px-4 h-16 flex items-center justify-between gap-4">

                {/* Logo */}
                <Link href={ROUTES.INDEX} className="flex items-center gap-2 group shrink-0">
                    <BookOpen className="h-6 w-6 text-primary group-hover:scale-110 transition-transform" />
                    <span className="font-serif text-foreground text-xl font-bold tracking-tight">Libres</span>
                </Link>

                {/* Desktop Navigation */}
                <nav className="hidden md:flex items-center gap-1">
                    {navLinks.map((link) => {
                        const Icon = link.icon;
                        return (
                            <Link
                                key={link.href}
                                href={link.href}
                                className="flex text-foreground items-center gap-1.5 px-3 py-2 text-lg font-medium rounded-lg hover:bg-muted transition-colors"
                            >
                                <Icon className="h-5 w-5" />
                                {link.label}
                            </Link>
                        );
                    })}

                    <div className="w-px h-5 bg-border mx-1" />

                    {isLoading ? (
                        <div className="w-20 h-8 bg-muted animate-pulse rounded-lg" /> // تأثير تحميل مؤقت
                    ) : !isAuthenticated ? (
                        <>
                            <Link
                                href={ROUTES.AUTHLOGIN}
                                className="px-3 py-2 text-sm text-foreground font-medium rounded-lg hover:bg-muted transition-colors"
                            >
                                Sign In
                            </Link>
                            <Link
                                href={ROUTES.AUTHREGISTER}
                                className="px-4 text-primary-foreground py-2 text-sm font-medium bg-primary rounded-lg hover:opacity-90 transition-opacity"
                                data-testid="link-login"
                            >
                                Sign Up
                            </Link>
                        </>
                    ) : (
                        <div className="flex items-center gap-3 pl-2">
                            <Link href={ROUTES.PROFILE} className="flex items-center gap-2.5 bg-background border border-border rounded-full px-3.5 py-1.5 hover:bg-muted transition-colors">
                                {/* Avatar */}
                                <div className="w-8.5 h-8.5 rounded-full bg-blue-100 dark:bg-blue-900 flex items-center justify-center text-blue-700 dark:text-blue-300 text-[13px] font-medium shrink-0">
                                    {session?.user?.name?.slice(0, 2).toUpperCase()}
                                </div>

                                {/* Name + Role */}
                                <div className="flex flex-col leading-tight">
                                    <span className="text-[13px] font-medium text-foreground">{session?.user?.name}</span>
                                    <span className="text-[11px] text-muted-foreground">{UserRoles[session.user.role]}</span>
                                </div>

                                {/* Divider */}
                                <div className="w-px h-5.5 bg-border mx-1" />

                                {/* Balance */}
                                <div className="flex items-center gap-1 text-[13px] font-medium text-emerald-600 dark:text-emerald-400">
                                    <Wallet className="h-3.5 w-3.5" />
                                    {/* ${session?.user?.balance} */}
                                </div>
                            </Link>
                            <Button
                                onClick={() => signOut({ callbackUrl: "/" })}
                                className="text-card  p-2 rounded-lg transition-colors"
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
                        <Link href={ROUTES.PROFILE} className="flex items-center gap-2 bg-background border border-border rounded-full px-2.5 py-1 hover:bg-muted transition-colors">
                            <div className="w-7 h-7 rounded-full bg-blue-100 dark:bg-blue-900 flex items-center justify-center text-blue-700 dark:text-blue-300 text-[11px] font-medium shrink-0">
                                {session?.user?.name?.slice(0, 2).toUpperCase()}
                            </div>
                            <div className="flex items-center gap-1 text-[12px] font-medium text-emerald-600 dark:text-emerald-400">
                                <Wallet className="h-3 w-3" />
                                {/* ${session?.user?.balance ?? 0} */}
                            </div>
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
            </div>

            {/* Mobile Menu Dropdown */}
            {mobileMenuOpen && (
                <div className="md:hidden border-t bg-background px-4 py-3 flex flex-col gap-1">
                    {navLinks.map((link) => {
                        const Icon = link.icon;
                        return (
                            <Link
                                key={link.href}
                                href={link.href}
                                className="flex text-foreground items-center gap-1.5 px-3 py-2 text-lg font-medium rounded-lg hover:bg-muted transition-colors"
                                onClick={() => setMobileMenuOpen(false)}
                            >
                                <Icon className="h-5 w-5" />
                                {link.label}
                            </Link>
                        );
                    })}

                    <div className="h-px bg-border my-2" />

                    {isLoading ? null : !isAuthenticated ? (
                        <div className="flex flex-col gap-2">
                            <Link
                                href={ROUTES.AUTHLOGIN || "/login"}
                                className="px-4 text-center text-foreground py-2 text-sm font-medium border border-border rounded-lg hover:bg-muted transition-colors"
                                onClick={() => setMobileMenuOpen(false)}
                            >
                                Sign in
                            </Link>
                            <Link
                                href={ROUTES.AUTHREGISTER || "/register"}
                                className="px-4 text-center text-primary-foreground py-2 text-sm font-medium bg-primary rounded-lg"
                                onClick={() => setMobileMenuOpen(false)}
                            >
                                Sign up
                            </Link>
                        </div>
                    ) : (
                        <div className="flex items-center justify-between px-3 py-2 bg-muted rounded-lg">

                            <Button
                                onClick={() => signOut({ callbackUrl: "/" })}
                                className="flex items-center gap-1 text-sm text-card font-medium"
                            >
                                <LogOut className="h-4 w-4" />
                                Exit
                            </Button>
                        </div>
                    )}
                </div>
            )}
        </header>
    );
}