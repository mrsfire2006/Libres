"use client";

import { useState } from "react";
import Link from "next/link";
import { Store, Library, BookOpen, Menu, X, LogOut, User } from "lucide-react";
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
                            <Link href={ROUTES.PROFILE} className="text-sm font-medium text-muted-foreground flex items-center gap-1 bg-muted px-2.5 py-1 rounded-full">
                                <User className="h-4 w-4" />
                                {session?.user?.name} <sub>{session?.user?.role ? UserRoles[session.user.role] : ""}</sub>
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
                            <Link href={ROUTES.PROFILE} className="text-sm font-medium">
                                <p className="text-foreground">{session?.user?.name}</p>
                                <p className="text-xs text-muted-foreground">{session?.user?.role ? UserRoles[session.user.role] : ""}</p>
                            </Link>
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