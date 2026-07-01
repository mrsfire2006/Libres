import { BookOpen } from "lucide-react";
import { Link } from "react-router-dom";
import HeaderActions from "../shared/header-actions";




export default function Header() {

    return (
        <header className="sticky top-0 z-50 w-full border-border border-b bg-background/95 backdrop-blur-md">
            <div className="container mx-auto px-4 h-16 flex items-center justify-between gap-4">

                {/* Logo */}
                <Link to={"/"} className="flex items-center gap-2 group shrink-0">
                    <BookOpen className="h-6 w-6 text-primary group-hover:scale-110 transition-transform" />
                    <span className="font-serif text-foreground text-xl font-bold tracking-tight">Libres</span>
                </Link>

                <HeaderActions

                />


            </div>

        </header>
    );
}