// Reviews.tsx
import type { BookResponse } from "../type";
import { AddReviewForm } from "./add-review-form";
import { RatingsSummary } from "./rating-summary";
import { ReviewsList } from "./reviews-list";

export function Reviews({
    book,
}: {
    book: BookResponse;

}) {
    const averageRate = Number(book?.averageRate) || 0;


    return (
        <section className="container mx-auto px-4 py-8 max-w-4xl bg-background text-foreground">
            <h3 className="text-xl font-serif font-bold mb-6">Ratings & Reviews</h3>

            <RatingsSummary averageRate={averageRate} reviewCount={Number(book?.reviewCount)} />

            {!book?.hasUserReviewed && <AddReviewForm bookId={book?.id ?? ""} />}

            <ReviewsList bookId={book?.id!} />
        </section>
    );
}