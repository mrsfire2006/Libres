import { Moon, Sun } from "lucide-react"
import { useTheme } from "next-themes"
import { useEffect, useState } from "react"


export function ToggleTheme() {
    const { setTheme, theme } = useTheme()
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);

    }, [])

    if (!mounted) {
        return <div className="p-2 h-9 w-9" />
    }
    return (
        <button
            onClick={() => theme == "dark" ? setTheme("light") : setTheme("dark")}
            className="p-2 rounded-full hover:bg-muted transition-colors text-muted-foreground hover:text-foreground ml-1"
            data-testid="button-theme-toggle"
            aria-label="Toggle dark mode"
        >
            {theme == "dark" ? <Sun className="h-5 w-5 text-muted-foreground" /> : <Moon className="h-5 w-5 text-muted-foreground" />}
        </button>
    )
}
