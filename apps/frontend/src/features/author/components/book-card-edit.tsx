import { Eye, Star, Pencil, BookOpen } from "lucide-react";
import type { AuthorBookResponse, BookStatus } from "../type";

// ====== StatusBadge (بنفس التصميم الأنيق) ======
export function StatusBadge({ status }: { status: BookStatus }) {
  const statusConfig = {
    Accepted: {
      bg: "bg-emerald-500/15",
      text: "text-emerald-600 dark:text-emerald-400",
      border: "border-emerald-500/30",
      dot: "bg-emerald-500",
      label: "Published",
    },
    Rejected: {
      bg: "bg-rose-500/15",
      text: "text-rose-600 dark:text-rose-400",
      border: "border-rose-500/30",
      dot: "bg-rose-500",
      label: "Rejected",
    },
    Pending: {
      bg: "bg-amber-500/15",
      text: "text-amber-600 dark:text-amber-400",
      border: "border-amber-500/30",
      dot: "bg-amber-500",
      label: "Pending",
    },
  };

  const config = statusConfig[status] || statusConfig.Pending;

  return (
    <span
      className={`inline-flex items-center shrink-0 rounded-full px-2.5 py-0.5 text-[11px] font-semibold ${config.bg} ${config.text} border ${config.border} backdrop-blur-sm`}
    >
      <span className={`h-1.5 w-1.5 rounded-full ${config.dot} mr-1.5 animate-pulse`} />
      {config.label}
    </span>
  );
}

// ====== BookCardEdit (فقط الخصائص الموجودة في AuthorBookResponse) ======
interface BookCardEditProps {
  book: AuthorBookResponse;
  onEdit?: (book: AuthorBookResponse) => void;
}

export function BookCardEdit({ book, onEdit }: BookCardEditProps) {
  // تأمين الحالة
  const currentStatus: BookStatus =
    book.bookStatus === "Pending" ||
    book.bookStatus === "Accepted" ||
    book.bookStatus === "Rejected"
      ? book.bookStatus
      : "Pending";

  return (
    <div
      className="group relative flex items-start gap-4 rounded-2xl border border-border/40 bg-linear-to-br from-card to-secondary/10 p-4 shadow-sm transition-all duration-300 hover:shadow-lg hover:shadow-primary/5  hover:border-primary/20"
    >
      {/* صورة الغلاف */}
      <div className="relative h-24 w-16 shrink-0 overflow-hidden rounded-xl bg-muted/30 shadow-md transition-transform duration-300 group-hover:scale-[1.02]">
        <img
          src={book.coverImageUrl ?? "/placeholder-book.png"}
          alt={book.title}
          className="h-full w-full object-cover"
        />
        {/* شارة صغيرة للتصنيف (أسفل الصورة) */}
        <div className="absolute bottom-0 left-0 right-0 bg-linear-to-t from-black/60 to-transparent p-1">
          <span className="block text-[8px] font-medium text-white text-center uppercase tracking-wider">
            {book.categoryName || "Uncategorized"}
          </span>
        </div>
      </div>

      {/* المحتوى الرئيسي */}
      <div className="flex min-w-0 flex-1 flex-col gap-1.5">
        {/* الصف العلوي: التصنيف + الحالة */}
        <div className="flex items-center justify-between gap-2">
          <span className="inline-flex items-center gap-1 text-[10px] font-semibold tracking-wider text-muted-foreground/70 uppercase">
            <BookOpen size={12} className="opacity-60" />
            {book.categoryName || "Uncategorized"}
          </span>
          <StatusBadge status={currentStatus} />
        </div>

        {/* العنوان */}
        <h3 className="font-sans text-base font-bold leading-snug text-foreground line-clamp-2 group-hover:text-primary transition-colors">
          {book.title}
          
        </h3>

        {/* شريط المقاييس (المشاهدات، التقييم، السعر) */}
        <div className="mt-0.5 flex flex-wrap items-center gap-x-4 gap-y-1 border-t border-border/40 pt-1.5 text-xs font-medium">
          <span className="flex items-center gap-1.5 text-muted-foreground">
            <Eye size={14} className="opacity-60" />
            {book.order ?? 0}
          </span>

          {Number(book.averageRate) > 0 && (
            <span className="flex items-center gap-1.5 text-amber-500 dark:text-amber-400 font-semibold">
              <Star size={14} className="fill-current" />
              {Number(book.averageRate).toFixed(1)}
            </span>
          )}

          <span className="ml-auto text-sm font-bold text-primary">
            ${Number(book.price).toLocaleString()}
          </span>
        </div>
      </div>

      {/* فاصل عمودي */}
      <div className="hidden sm:block h-12 w-px self-center bg-border/40" />

      {/* زر التعديل */}
      <button
        type="button"
        onClick={() => onEdit?.(book)}
        aria-label="Edit book"
        className="inline-flex h-9 w-9 sm:w-auto shrink-0 self-center items-center justify-center gap-1.5 rounded-xl border border-border/50 bg-background/50 px-0 sm:px-3.5 text-xs font-medium text-foreground/70 transition-all duration-200 hover:bg-primary hover:text-primary-foreground hover:border-primary hover:shadow-md active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/40 backdrop-blur-sm"
      >
        <Pencil size={15} className="transition-transform group-hover:rotate-12" />
        <span className="hidden sm:inline">Edit</span>
      </button>
    </div>
  );
}