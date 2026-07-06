import { useState } from "react";



export function AboutBook({ bookDescription }: { bookDescription: string }) {
    const [expanded, setExpanded] = useState(false);

    return (
        <section className="mb-12 container mx-auto px-4 py-8 max-w-4xl bg-background text-foreground">
            <h3 className="text-xl font-serif font-bold mb-4">About this ebook</h3>
            <div
                className={`text-muted-foreground leading-relaxed transition-all ${!expanded ? "line-clamp-3" : ""}`}
            >
                {bookDescription}

            </div>
            <button
                onClick={() => setExpanded(!expanded)}
                className="text-primary font-medium mt-2 hover:underline focus:outline-none"
            >
                {expanded ? "Read less" : "Read more"}
            </button>
        </section>
    );
}