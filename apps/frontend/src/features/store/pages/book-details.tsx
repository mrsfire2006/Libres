import LoadingCircle from "@/components/shared/loading-circle";
import { useParams } from "react-router-dom";
import { BookHero } from "../components/book-hero";
import { useGetBookById } from "../store.hook";

export default function BookDetailsPage() {
    const { id } = useParams<{ id: string }>();
    if (!id) return;

    const { data, isLoading } = useGetBookById({ BookId: id });
    
    return (
        <main className="bg-background">
            {isLoading ? (<LoadingCircle />) : <BookHero book={data?.value} />}
        </main>
    )
}