'use client'

import RankBadge from "@/components/shared/rang-badge";
import { GetTopSellingsResponse } from "@/libres.application/features/book-features/queries/get-top-sellings/get-top-sellings-response";
import { useEffect, useState } from "react";
import { Error } from "@/libres.domain/common/error";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import BookCard from "@/components/shared/book-card";
import GetTopSellingsAction from "../actions/get-top-sellings-action";
import LoadingCircle from "@/components/shared/loading-circle";


function TopSelling() {
    const [sellings, setSellings] = useState<GetTopSellingsResponse[] | undefined>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<Error | undefined>(Error.None);

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);
                const result = await GetTopSellingsAction();
                if (result.isSuccess) {
                    setSellings(result.value);
                }
                else {
                    setError(Error.InternalServer("حدث خطأ ما أثناء جلب البيانات"));
                }
            } catch (err) {
                setError(Error.InternalServer("InternalServer"));
            } finally {
                setLoading(false);
            }
        }
        fetchData();
    }, [])
    return (
        <section className="container mx-auto py-10 px-4">
            {/* عنوان القسم */}
            <div className="mb-6">
                <h2 className="text-2xl font-bold tracking-tight text-foreground">Top Sellings</h2>
                {/* <p className="text-sm text-muted-foreground mt-1">تصفح قائمة الكتب الأكثر طلباً هذا الأسبوع</p> */}
            </div>

            <Carousel
                opts={{ align: "start", loop: false, dragFree: true }}
                className="w-full relative group"
            >
                {loading ? <LoadingCircle /> : sellings && sellings.length == 0 ? (<div>no top sellings</div>) : (

                    <CarouselContent className="-ml-4">
                        {sellings?.map((book, index) => (
                            <CarouselItem
                                key={book.bookId}
                                className="relative shrink-0 grow-0 basis-1/2 md:basis-1/4 lg:basis-1/6 flex justify-center"
                            >
                                <RankBadge index={index} />

                                <BookCard book={book} />
                            </CarouselItem>
                        ))}
                    </CarouselContent>

                )}


                {/* حاوية التحكم - تم ضبط الارتفاع ليتوسط غلاف الكتاب فقط (أعلى من النصوص والسعر) */}
                <div className="absolute inset-10 flex items-center justify-between z-20 pointer-events-none">

                    {/* زر التالي (Next) - في الـ RTL يكون على اليمين ليتجه للكتاب التالي */}
                    <CarouselNext
                        className=" h-10 w-10 bg-zinc-800/80 text-white rounded-full p-0 hover:bg-zinc-700 hover:text-white pointer-events-auto transition-all scale-0 group-hover:scale-100 shadow-lg border-none flex items-center justify-center"
                    />

                    {/* زر السابق (Previous) - في الـ RTL يكون على اليسار للعودة للخلف */}
                    <CarouselPrevious
                        className=" h-10 w-10 bg-zinc-800/80 text-white rounded-full p-0 hover:bg-zinc-700 hover:text-white pointer-events-auto transition-all scale-0 group-hover:scale-100 shadow-lg border-none flex items-center justify-center"
                    />

                </div>
            </Carousel>
        </section>
    )
}

export default TopSelling