// AddReviewForm.tsx
import { useState } from "react";
import { FiStar } from "react-icons/fi";
import type { CreateReviewRequestCommand } from "../type";
import { useAddReview } from "../store.hook";
import { useGetUserProfileQuery } from "@/features/user/user.hook";
import { ShowToast } from "@/components/shared/toast";
import { useNavigate } from "react-router-dom";
import { AUTHROUTES } from "@/features/auth/paths";



export function AddReviewForm({ bookId }: { bookId: string }) {
    const navigate = useNavigate();

    const [command, setCommand] = useState<CreateReviewRequestCommand>({
        bookId,
        comment: "",
        rating: 0,
    });
    const { data: user } = useGetUserProfileQuery();


    const [hoverRating, setHoverRating] = useState(0);
    const { mutateAsync: addReview } = useAddReview(bookId);

    const handleAddReview = async () => {
        if (command.rating === 0) return;

        
        if (user?.isFailure) {
            ShowToast({
                message: "Create new account", actionLabel: "Create", onAction: () => navigate(`${AUTHROUTES.REGISTER}`)
            })
            return;
        }

        const res = await addReview(command);
        if (res.isFailure) {

        } else {
            setCommand({ bookId, comment: "", rating: 0 });
        }
    };

    return (
        <div className="border border-border rounded-lg p-4 mb-8 bg-card">
            <h4 className="font-medium mb-3 text-foreground">اكتب تقييمك</h4>

            <div className="flex gap-1 mb-3">
                {[1, 2, 3, 4, 5].map((star) => (
                    <button
                        key={star}
                        type="button"
                        onClick={() => setCommand({ ...command, rating: star })}
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
                value={command.comment ?? ""}
                onChange={(e) => setCommand({ ...command, comment: e.target.value })}
                placeholder="اكتب رأيك في الكتاب..."
                rows={3}
                className="w-full resize-none rounded-md border border-input bg-background px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
            />

            <div className="flex justify-end mt-3">
                <button
                    type="button"
                    onClick={handleAddReview}
                    disabled={command.rating === 0}
                    className="rounded-md bg-primary cursor-pointer text-primary-foreground px-4 py-2 text-sm font-medium disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    إرسال التقييم
                </button>
            </div>
        </div>
    );
}