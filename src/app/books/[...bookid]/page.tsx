import { ROUTES } from "@/constants/constant";
import GetBookByIdAction from "@/features/books/actions/get-book-id-action"
import { BookHero } from "@/features/books/components/book-hero";
import { BookDto } from "@/libres.application/features/book-features/common/book-dto";
import { Result } from "@/libres.domain/common/result";
import { redirect } from "next/navigation";

interface PageProps {
    params: Promise<{ bookid: string | string[] }>;
}
async function BookDetails({ params }: PageProps) {
    const resolvedParams = await params;
    const cleanBookId = Array.isArray(resolvedParams.bookid) 
        ? resolvedParams.bookid[0] 
        : resolvedParams.bookid;
    const book: Result<BookDto> = await GetBookByIdAction(cleanBookId);
    if (book.isFailure) {
        redirect(ROUTES.INDEX);
    }



    return (
        <main className="w-full flex flex-col bg-background">
            <BookHero book={book.value!} />
        </main>
    )
}

export default BookDetails