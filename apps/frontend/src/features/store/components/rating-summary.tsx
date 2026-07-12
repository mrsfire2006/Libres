import { FiStar } from "react-icons/fi";

function getStarPercentage(stars: number) {
    if (stars === 5) return 70;
    if (stars === 4) return 20;
    if (stars === 3) return 5;
    return 2;
}

export function RatingsSummary({
    averageRate,
    reviewCount,
}: {
    averageRate: number;
    reviewCount: number;
}) {
    return (
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
    );
}