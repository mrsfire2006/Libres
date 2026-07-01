





function TopSelling() {

    return (<></>)
    // const [sellings, setSellings] = useState<BookDto[] | undefined>([]);
    // const [loading, setLoading] = useState(true);
    // const [error, setError] = useState<Error | undefined>(Error.None);

    // useEffect(() => {
    //     const fetchData = async () => {
    //         try {
    //             setLoading(true);
    //             const result = await GetTopSellingsAction();
    //             if (result.isSuccess) {
    //                 setSellings(result.value);
    //             }
    //             else {
    //                 setError(Error.InternalServer("حدث خطأ ما أثناء جلب البيانات"));
    //             }
    //         } catch (err) {
    //             setError(Error.InternalServer("InternalServer"));
    //         } finally {
    //             setLoading(false);
    //         }
    //     }
    //     fetchData();
    // }, [])
    // return (
    //     <section className="container mx-auto py-10 px-4">
    //         {/* عنوان القسم */}
    //         <div className="mb-6">
    //             <h2 className="text-2xl font-bold tracking-tight text-foreground">Top Sellings</h2>
    //             {/* <p className="text-sm text-muted-foreground mt-1">تصفح قائمة الكتب الأكثر طلباً هذا الأسبوع</p> */}
    //         </div>


    //     {loading ? <LoadingCircle /> : sellings && sellings.length == 0 ? (<div>no top sellings</div>) :
    //         (<Carousel
    //             opts={{ align: "start", loop: false, dragFree: true }}
    //             className="w-full relative group"
    //         >


    //                 <CarouselContent className="-ml-4">
    //                     {sellings?.map((book, index) => (
    //                         <CarouselItem
    //                             key={book.bookId}
    //                             className="relative shrink-0 grow-0 basis-1/2 md:basis-1/4 lg:basis-1/6 flex justify-center"
    //                         >
    //                             <RankBadge index={index} />

    //                             <BookCard book={book} />
    //                         </CarouselItem>
    //                     ))}
    //                 </CarouselContent>




    //             <div className="absolute inset-10 flex items-center justify-between z-20 pointer-events-none">

    //                 <CarouselNext
    //                     className=" h-10 w-10 bg-zinc-800/80 text-white rounded-full p-0 hover:bg-zinc-700 hover:text-white pointer-events-auto transition-all scale-0 group-hover:scale-100 shadow-lg border-none flex items-center justify-center"
    //                 />

    //                 <CarouselPrevious
    //                     className=" h-10 w-10 bg-zinc-800/80 text-white rounded-full p-0 hover:bg-zinc-700 hover:text-white pointer-events-auto transition-all scale-0 group-hover:scale-100 shadow-lg border-none flex items-center justify-center"
    //                 />

    //             </div>
    //         </Carousel>)}
    //     </section>
    // )
}

export default TopSelling