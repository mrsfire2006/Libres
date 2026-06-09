'use client'
import Link from "next/link"
import { Star } from "lucide-react"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { GetTopSellingsResponse } from "@/libres.application/features/book-features/queries/get-top-sellings/get-top-sellings-response"




function BookCard({ book }: { book: GetTopSellingsResponse }) {

    return (
        <Link href={`/books/${book.bookId}`} className="group/card overflow-hidden flex flex-col gap-3 min-w-40 max-w-45 w-45">
            <Card className="border-0 bg-transparent shadow-none flex flex-col gap-3">

                {/* قسم غلاف الكتاب */}
                <CardContent className="p-0">
                    <div className="aspect-2/3 w-full rounded-md shadow-sm overflow-hidden  relative bg-muted">
                        {/* هنا يمكنك دمج الـ book.coverColor إذا أردت لاحقاً */}

                        {/* {book.image ? (
                            <img
                                src={book.image}
                                alt={book.name}
                                className="w-full h-full object-cover transform group-hover/card:scale-105 transition-transform duration-500"
                            />
                        ) : (
                            // خلفية بديلة أنيقة في حال لم يحتوي الكتاب على صورة
                            <div className="w-full h-full flex items-center justify-center p-4 text-center bg-linear-to-br from-amber-100 to-amber-200 dark:from-zinc-800 dark:to-zinc-700">
                                <span className="text-xs font-serif font-bold text-amber-900/40 dark:text-zinc-400 select-none">
                                    {book.name}
                                </span>
                            </div>
                        )} */}

                        {/* تأثير الـ Hover (الطبقة المظلمة) */}
                        <div className="absolute inset-0 opacity-0 group-hover/card:opacity-100 bg-black/10 transition-opacity duration-300 z-10" />

                        {/* التدرج الظلي السفلي */}
                        <div className="absolute inset-x-0 bottom-0 h-1/3 bg-linear-to-t from-black/60 to-transparent z-10" />

                        {/* العنوان المكتوب داخل الغلاف */}
                        <div className="absolute bottom-3 left-3 right-3 text-white z-20">
                            <p className="font-serif font-bold text-sm leading-tight line-clamp-2">
                                {book.name}
                            </p>
                        </div>
                    </div>
                </CardContent>

                {/* تفاصيل الكتاب تحت الغلاف */}
                <div className="flex flex-col gap-1   px-1">
                    <h3 className="font-medium text-sm leading-tight line-clamp-1 group-hover/card:text-primary text-foreground transition-colors">
                        {book.name}
                    </h3>
                    <p className="text-xs text-muted-foreground">
                        {book.authorName}
                    </p>

                    {/* التقييم والسعر */}
                    <div className="flex items-center justify-between mt-1 flex-row-reverse">

                        {/* السعر */}
                        <span className="text-sm font-semibold text-foreground">
                            ${book.price.toFixed(2)}
                        </span>
                        {/* التقييم */}
                        <div className="flex items-center gap-1">
                            <Star className="h-3 w-3 fill-primary text-primary border-none" />
                            <span className="text-xs font-medium text-foreground">
                                {book.rating.toFixed(1)}
                            </span>
                        </div>
                    </div>
                </div>

            </Card>
        </Link>
    )
}

export default BookCard