import LoadingCircle from "@/components/shared/loading-circle";
import { useParams } from "react-router-dom";
import { BookHero } from "../components/book-hero";
import { useGetBookById } from "../store.hook";
import { AboutBook } from "../components/about-book";
import { Reviews } from "../components/reviews";

export default function BookDetailsPage() {
    const { id } = useParams<{ id: string }>();
    if (!id) return;

    const { data: book, isLoading } = useGetBookById({ BookId: id });

    return (
        <main className="container mx-auto py-10 px-4">
            {isLoading ? (
                <LoadingCircle />
            ) : (
                <>
                    <BookHero book={book?.value} />
                    <AboutBook bookDescription={book?.value?.description!} />

                    <Reviews book={book?.value} />
                </>
            )}

        </main>
    )
}   