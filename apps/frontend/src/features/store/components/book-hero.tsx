
import { Button } from "@/components/ui/button";
import {
    ChevronLeft,
    Star,
    FileText,
    Globe,
    BookOpen,
    Clock
} from "lucide-react";
import type { BookResponse } from "../type";
import { Link } from "react-router-dom";
import { STOREROUTES } from "../paths";


export function BookHero({ book }: { book: BookResponse }) {

    return (
        <section className="container mx-auto px-4 py-8 max-w-4xl bg-background text-foreground">

            {/* Back Button */}
            <Link
                to={`${STOREROUTES.STORE}`}
                className="inline-flex items-center text-sm text-muted-foreground hover:text-primary mb-6 transition-colors"
            >
                <ChevronLeft className="h-4 w-4 mr-1" /> Back to Bookstore
            </Link>

            <div className="flex flex-col md:flex-row gap-8 mb-12">
                {/* Cover */}
                <div className="shrink-0 mx-auto md:mx-0 "
                >
                    <div className={`w-60 md:w-75 aspect-2/3 rounded-xl shadow-xl relative overflow-hidden bg-zinc-900`}>
                        {book?.coverImageUrl && (
                            <img
                                src={book.coverImageUrl}
                                alt={book.title}
                                className="w-full h-full object-cover"
                            />
                        )}
                        <div className="absolute inset-x-0 bottom-0 h-1/2 bg-linear-to-t from-black/80 to-transparent flex items-end p-6">
                            <h2 className="text-white font-serif font-bold text-2xl leading-tight">{book?.title}</h2>
                        </div>
                    </div>
                </div>

                {/* Info Section */}
                <div className="flex flex-col flex-1">

                    <h1 className="text-3xl md:text-4xl font-serif font-bold mb-2 text-foreground">{book?.title}</h1>
                    <p className="text-lg text-muted-foreground mb-4">
                        by <span className="text-primary hover:underline cursor-pointer">{book?.author}</span>
                    </p>

                    {/* Metadata */}
                    <div className="flex items-center gap-4 mb-6 text-sm">
                        <div className="flex items-center gap-1">
                            <span className="font-bold text-lg">{book?.averageRate}</span>
                            <Star className="h-5 w-5 fill-primary text-primary" />
                        </div>
                        <div className="w-1 h-1 rounded-full bg-muted-foreground/50" />
                        <span className="text-muted-foreground">{book?.reviews?.length || 0} reviews</span>
                        <div className="w-1 h-1 rounded-full bg-muted-foreground/50" />
                        <span className="text-muted-foreground">{book?.bookStatus}</span>
                    </div>

                    <div className="mb-8">
                        {book?.price === 0 ? (
                            <span className="inline-flex items-center text-sm font-bold uppercase tracking-wide text-emerald-600 dark:text-emerald-400 bg-emerald-500/10 px-3 py-1 rounded-full">
                                Free
                            </span>
                        ) : (
                            <span className="text-3xl font-bold text-foreground">
                                ${book?.price}
                            </span>
                        )}
                    </div>
                    {/* Buttons */}
                    <div className="flex flex-col sm:flex-row gap-4 mb-8">
                        <Button
                            className="flex-1 bg-primary text-primary-foreground hover:bg-primary/90 font-semibold text-base py-3 rounded-xl transition-all shadow-md active:scale-[0.98]"
                            data-testid="button-buy"
                        >
                            {book?.price === 0 ? "Dowload" : "Buy Now"}
                        </Button>
                        <Button
                            variant="outline"
                            className="flex-1 border border-input bg-background hover:bg-accent hover:text-accent-foreground font-semibold text-base py-3 rounded-xl transition-all active:scale-[0.98]"
                            // onClick={() => navigate(`/read/${book.id}`)}
                            data-testid="button-read-preview"
                        >
                            Read Preview
                        </Button>
                    </div>

                    {/* Feature Grid */}
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 py-6 border-y border-border">
                        <div className="flex flex-col items-center text-center gap-2">
                            <FileText className="h-5 w-5 text-muted-foreground" />
                            <div className="text-sm font-medium">{book?.pageCount}</div>
                            <div className="text-xs text-muted-foreground">Pages</div>
                        </div>
                        <div className="flex flex-col items-center text-center gap-2">
                            <Globe className="h-5 w-5 text-muted-foreground" />
                            <div className="text-sm medium">en</div>
                            <div className="text-xs text-muted-foreground">Language</div>
                        </div>
                        <div className="flex flex-col items-center text-center gap-2">
                            <BookOpen className="h-5 w-5 text-muted-foreground" />
                            <div className="text-sm font-medium">{formatFileSize(Number(book?.fileSizeInBytes))}</div>
                            <div className="text-xs text-muted-foreground">Size</div>
                        </div>
                        <div className="flex flex-col items-center text-center gap-2">
                            <Clock className="h-5 w-5 text-muted-foreground" />
                            <div className="text-sm font-medium">{book?.createdAt && new Date(book.createdAt).toLocaleDateString('en-US', {
                                year: 'numeric',
                                month: 'long',
                                day: 'numeric'
                            })}
                            </div>
                            <div className="text-xs text-muted-foreground">Published</div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
function formatFileSize(bytes: number) {
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(0)} KB`;
    return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}