import { Plus, BookOpen } from "lucide-react";
import { useGetAuthorBooks } from "../author.hook";
import { useGetUserProfileQuery } from "@/features/user/user.hook";
import { useState } from "react";
import { BookCardEdit } from "./book-card-edit";
import type { AuthorBookResponse, BookStatus } from "../type";

type FilterKey = "all" | BookStatus;

interface BookGridProps {
  onEdit?: (book: AuthorBookResponse) => void;
}

export function BookGrid({ onEdit }: BookGridProps) {
  const { data: user } = useGetUserProfileQuery();
  const { data: books } = useGetAuthorBooks(user?.value?.userId ?? "");
  const [filter, setFilter] = useState<FilterKey>("all");

  const filtered = books?.value?.filter((b) => {
    const matchesFilter = filter === "all" || b.bookStatus === filter;
    return matchesFilter;
  });

  return (
    <>
      <div className="mb-6 flex flex-col gap-3 sm:flex-row">
      </div>

      {filtered && filtered.length > 0 ? (
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((b) => (
            <BookCardEdit
              key={b.id}
              book={b}
              onEdit={onEdit}   
            />
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center gap-2 rounded-lg border border-border bg-card py-16 text-center">
          <BookOpen size={28} className="text-muted-foreground" />
          <p className="text-sm font-medium text-card-foreground">لا توجد كتب مطابقة</p>
          <p className="text-xs text-muted-foreground">جرّب تعديل كلمات البحث أو الفلتر</p>
        </div>
      )}
    </>
  );
}

export type { FilterKey };