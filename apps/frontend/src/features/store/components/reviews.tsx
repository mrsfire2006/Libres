import { useState } from "react";
import { FiStar } from "react-icons/fi";
import type { BookResponse, ReviewRequestCommand } from "../type";
import { useAddReview } from "../store.hook";

export function Reviews({ book }: { book: BookResponse }) {

    const [command, setCommand] = useState<ReviewRequestCommand>({
        bookId: book!.id,
        comment: "",
        rating: 0
    });

    const [hoverRating, setHoverRating] = useState(0);

    const { mutateAsync: AddReview } = useAddReview(book!.id);

    const getStarPercentage = (stars: number) => {
        if (stars === 5) return 70;
        if (stars === 4) return 20;
        if (stars === 3) return 5;
        return 2;
    };

    if (!book) {
        return null;
    }

    const averageRate = Number(book.averageRate) || 0;
    const reviewCount = book.reviews?.length ?? 0;
    const bookReviews = book.reviews ?? [];

    const handleAddReview = async () => {
        if (command.rating === 0 || command.comment.trim() === "") return;

        const res = await AddReview(command);
        if (res.isFailure) {

        }

    };
     return (
        <section className="container mx-auto px-4 py-8 max-w-4xl bg-background text-foreground">
            <h3 className="text-xl font-serif font-bold mb-6">Ratings & Reviews</h3>
            <div className="flex flex-col md:flex-row gap-8 mb-8">

                {/* Big Score Box */}
                <div className="flex flex-col items-center justify-center shrink-0 w-32">
                    <div className="text-5xl font-bold font-serif mb-2">{averageRate.toFixed(1)}</div>
                    <div className="flex mb-1 gap-0.5">
                        {[1, 2, 3, 4, 5].map((star) => (
                            <FiStar
                                key={star}
                                className={`h-4 w-4 ${star <= Math.round(averageRate) ? 'fill-primary text-primary' : 'text-muted-foreground/30'}`}
                            />
                        ))}
                    </div>
                    <div className="text-sm text-muted-foreground">{reviewCount} reviews</div>
                </div>

                {/* Progress Bars List */}
                <div className="flex-1 flex flex-col gap-3">
                    {[5, 4, 3, 2, 1].map((stars) => {
                        const percentage = getStarPercentage(stars);
                        return (
                            <div key={stars} className="w-full flex items-center gap-3">
                                <span className="text-sm font-medium w-3 text-foreground">{stars}</span>
                                <div className="h-2 flex-1 bg-secondary rounded-full overflow-hidden relative">
                                    <div
                                        className="h-full bg-primary rounded-full transition-all duration-500"
                                        style={{ width: `${percentage}%` }}
                                    />
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>

            {/* Add Comment & Rating */}
            {book.hasUserReviewed ? <></> : <div className="border border-border rounded-lg p-4 mb-8 bg-card">
                <h4 className="font-medium mb-3 text-foreground">اكتب تقييمك</h4>

                <div className="flex gap-1 mb-3">
                    {[1, 2, 3, 4, 5].map((star) => (
                        <button
                            key={star}
                            type="button"
                            onClick={() => setCommand({ ...command, rating: hoverRating })}
                            onMouseEnter={() => setHoverRating(star)}
                            onMouseLeave={() => setHoverRating(0)}
                        >
                            <FiStar
                                className={`h-6 w-6 ${star <= (hoverRating || Number(command.rating))
                                    ? 'fill-primary text-primary'
                                    : 'text-muted-foreground/30'
                                    }`}
                            />
                        </button>
                    ))}
                </div>

                <textarea
                    value={command.comment}
                    onChange={(e) => setCommand({ ...command, comment: e.target.value })}
                    placeholder="اكتب رأيك في الكتاب..."
                    rows={3}
                    className="w-full resize-none rounded-md border border-input bg-background px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
                />

                <div className="flex justify-end mt-3">
                    <button
                        type="button"
                        onClick={handleAddReview}
                        disabled={command.rating === 0 || command.comment.trim() === ""}
                        className="rounded-md bg-primary cursor-pointer text-primary-foreground px-4 py-2 text-sm font-medium disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        إرسال التقييم
                    </button>
                </div>
            </div>}

            {/* User Reviews Feed */}
            <div className="space-y-6">
                {bookReviews.map((review) => (
                    <div
                        key={review.reviewId}
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
                ))}

                {

                }

                {/* Show empty state cleanly */}
                {bookReviews.length === 0 && (
                    <p className="text-muted-foreground italic">No reviews yet.</p>
                )}
            </div>
        </section>
    );
}