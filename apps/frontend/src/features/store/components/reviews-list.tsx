// ReviewsList.tsx
import { FiStar } from "react-icons/fi";
import type { ReviewResponse } from "../type";
import { useGetReviewsInfinite } from "../store.hook";

function ReviewItem({ review }: { review: ReviewResponse }) {
    return (
        <div
            className="border-b border-border pb-6 last:border-0"
            data-testid={`review-${review.reviewId}`}
        >
            <div className="flex items-center gap-3 mb-2">
                <div className="w-8 h-8 rounded-full bg-blue-100 dark:bg-blue-900 flex items-center justify-center text-blue-700 dark:text-blue-300 text-[13px] font-medium shrink-0">
                    {review.image ? <img src={review.image} alt="" /> : review?.username.slice(0, 2).toUpperCase()}
                </div>

                <div>
                    <div className="font-medium text-foreground">{review.username}</div>
                    <div className="text-xs text-muted-foreground">
                        {review?.createdAt && new Date(review.createdAt).toLocaleDateString('en-US', {
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric'
                        })}
                    </div>
                </div>
            </div>
            <div className="flex mb-2 gap-0.5">
                {[1, 2, 3, 4, 5].map((star) => (
                    <FiStar
                        key={star}
                        className={`h-3 w-3 ${star <= Number(review.rating) ? 'fill-primary text-primary' : 'text-muted-foreground/30'}`}
                    />
                ))}
            </div>
            <p className="text-muted-foreground text-sm leading-relaxed">{review.comment}</p>
        </div>
    );
}


export function ReviewsList({ bookId }: { bookId: string }) {
    const {
        data,
        fetchNextPage,
        hasNextPage,
        isFetchingNextPage,
        isLoading,
    } = useGetReviewsInfinite(bookId);

    const reviews = data?.pages.flat() ?? [];

    if (isLoading) return <p className="text-muted-foreground">جاري التحميل...</p>;

    if (reviews.length === 0) {
        return <p className="text-muted-foreground italic">No reviews yet.</p>;
    }

    return (
        <div className="space-y-6">
            {reviews.map((review) => (
                <ReviewItem key={review?.reviewId} review={review!} />
            ))}

            {hasNextPage && (
                <button
                    type="button"
                    onClick={() => fetchNextPage()}
                    disabled={isFetchingNextPage}
                    className="text-sm font-medium text-primary hover:underline disabled:opacity-50"
                >
                    {isFetchingNextPage ? "جاري التحميل..." : "عرض المزيد"}
                </button>
            )}
        </div>
    );
}