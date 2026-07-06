import { Card, CardContent } from "@/components/ui/card"
import { Star } from "lucide-react"
import { Link } from "react-router-dom"
import { STOREROUTES } from "../paths"
import type { BookSummaryResponse } from "../type"

function BookCard({ book }: { book: BookSummaryResponse }) {
    return (
        <Link
            to={STOREROUTES.BOOKDETAILS.url(book?.id)}
            className="group/card overflow-hidden flex flex-col gap-3 min-w-40 max-w-45 w-45"
        >
            <Card className="border border-border/60 bg-card shadow-sm hover:shadow-md hover:border-border transition-all duration-300 rounded-lg p-2 flex flex-col gap-3">

                {/* قسم غلاف الكتاب */}
                <CardContent className="p-0!">
                    <div className="aspect-3/4 w-full rounded-md shadow-sm overflow-hidden relative bg-muted">
                        {book?.coverImageUrl ? (
                            <img
                                src={book.coverImageUrl}
                                alt={book.title ?? ""}
                                className="w-full h-full object-cover transform group-hover/card:scale-105 transition-transform duration-500"
                            />
                        ) : (
                            // خلفية بديلة بتدرّج دافئ في حال لم يحتوِ الكتاب على صورة
                            <div className="w-full h-full flex items-end p-4 bg-linear-to-br from-orange-600 via-orange-800 to-stone-900" />
                        )}

                        {/* التدرج الظلي السفلي */}
                        <div className="absolute inset-x-0 bottom-0 h-1/3 bg-linear-to-t from-black/70 to-transparent z-10" />

                        {/* العنوان المكتوب داخل الغلاف */}
                        <div className="absolute bottom-3 left-3 right-3 text-white z-20">
                            <p className="font-serif font-bold text-sm leading-tight line-clamp-2">
                                {book?.title}
                            </p>
                        </div>
                    </div>
                </CardContent>

                {/* تفاصيل الكتاب تحت الغلاف */}
                <div className="flex flex-col gap-1 px-1 pb-1">
                    <h3 className="font-serif font-bold text-sm leading-tight line-clamp-1 text-foreground group-hover/card:text-primary transition-colors">
                        {book?.title}
                    </h3>
                    <p className="text-xs text-muted-foreground">
                        {book?.author}
                    </p>

                    {/* التقييم والسعر */}
                    <div className="flex items-center justify-between mt-1">
                        {/* التقييم */}
                        <div className="flex items-center gap-1">
                            <Star className="h-3 w-3 fill-primary text-primary" />
                            <span className="text-xs font-medium text-foreground">
                                {/* {book?.rating ?? "—"} */}4.8
                            </span>
                        </div>

                        {/* السعر */}
                        {book?.price === 0 ? (
                            <span className="text-[10px] font-bold tracking-wide uppercase text-emerald-600 dark:text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-full">
                                Free
                            </span>
                        ) : (
                            <span className="text-sm font-semibold text-foreground">
                                ${book?.price}
                            </span>
                        )}
                    </div>
                </div>

            </Card>
        </Link>
    )
}

export default BookCard