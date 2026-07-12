import { useState, useRef } from "react";
import {
  X,
  Upload,
  Image as ImageIcon,
  Save,
  DollarSign,
  Tag,
  AlignLeft,
  Type,
  Pencil,
} from "lucide-react";
import type { AuthorBookResponse, EditBookRequestCommand } from "../type";
import { useCategories } from "@/features/store/store.hook";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useEditAuthorBook } from "../author.hook";
import { useGetUserProfileQuery } from "@/features/user/user.hook";

interface EditBookModalProps {
  book: AuthorBookResponse;
  isOpen: boolean;
  onClose: () => void;
  onSave: (updatedBook: Partial<AuthorBookResponse>) => void;
  categories?: string[];
}

export function EditBookModal({
  book,
  isOpen,
  onClose,
}: EditBookModalProps) {
  const [command, setCommand] = useState<Partial<EditBookRequestCommand>>(
    {
      BookId: book.id,
      Title: book.title,
      CategoryId: undefined,
      Description: book.description ?? "",
      Price: book.price

    });



  const { data: categories } = useCategories();
  const { data: user } = useGetUserProfileQuery();

  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setCommand((prev) => ({ ...prev, [name]: value }));
  };
  const { mutateAsync: Edit, isPending } = useEditAuthorBook(user?.value?.userId ?? "");

  // const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  //   const file = e.target.files?.[0];
  //   if (file) {
  //     const reader = new FileReader();
  //     reader.onloadend = () => {
  //       setCommand((prev) => ({
  //         ...prev,
  //         coverImageFile: file,
  //         coverImagePreview: reader.result as string,
  //       }));
  //     };
  //     reader.readAsDataURL(file);
  //   }
  // };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();


    await Edit(command);

    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4 animate-in fade-in duration-200">
      <div className="relative w-full max-w-2xl rounded-2xl bg-card border border-border/50 shadow-2xl shadow-primary/5 overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-border/50 px-6 py-4 bg-linear-to-r from-primary/5 to-secondary/5">
          <h2 className="text-lg font-semibold text-foreground flex items-center gap-2">
            <Pencil className="h-5 w-5 text-primary" />
            Edit Book
          </h2>
          <button
            onClick={onClose}
            className="rounded-full p-1.5 hover:bg-secondary/60 transition-colors"
            aria-label="Close"
          >
            <X className="h-5 w-5 text-muted-foreground" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-5">
          {/* Cover */}
          <div className="flex items-start gap-5">
            <div className="relative h-28 w-20 shrink-0 rounded-lg overflow-hidden bg-muted/30 border border-border/40 shadow-sm">

              {book.coverImageUrl ? (
                <img
                  src={book.coverImageUrl ?? ""}
                  alt="Cover preview"
                  className="h-full w-full object-cover"
                />
              ) : (
                <div className="flex h-full w-full items-center justify-center text-muted-foreground/40">
                  <ImageIcon className="h-8 w-8" />
                </div>
              )}
            </div>
            <div className="flex flex-col gap-2">
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                className="inline-flex items-center gap-2 text-sm font-medium text-primary hover:underline transition-colors"
              >
                <Upload className="h-4 w-4" />
                Upload new cover
              </button>
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                // onChange={handleFileChange}
                className="hidden"
              />
              <span className="text-[11px] text-muted-foreground">
                JPG, PNG, WebP (Max 5MB)
              </span>
            </div>
          </div>

          {/* Title */}
          <div>
            <label htmlFor="title" className="block text-sm font-medium text-foreground/80 mb-1.5">
              <Type className="inline h-4 w-4 mr-1.5 text-primary/70" />
              Title
            </label>
            <input
              type="text"
              id="title"
              name="Title"
              value={command.Title}
              onChange={handleChange}
              required
              className="w-full rounded-lg border border-input bg-background/50 px-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all"
              placeholder="Book title"
            />
          </div>

          {/* Description */}
          <div>
            <label htmlFor="description" className="block text-sm font-medium text-foreground/80 mb-1.5">
              <AlignLeft className="inline h-4 w-4 mr-1.5 text-primary/70" />
              Description
            </label>
            <textarea
              id="description"
              name="Description"
              value={command.Description}
              onChange={handleChange}
              rows={4}
              className="w-full rounded-lg border border-input bg-background/50 px-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all resize-y"
              placeholder="Write a brief description..."
            />
          </div>

          {/* Price & Category */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label htmlFor="price" className="block text-sm font-medium text-foreground/80 mb-1.5">
                <DollarSign className="inline h-4 w-4 mr-1.5 text-primary/70" />
                Price ($)
              </label>
              <input
                type="number"
                id="price"
                name="Price"
                value={command.Price}
                onChange={handleChange}
                min="0"
                step="0.01"
                className="w-full rounded-lg border border-input bg-background/50 px-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all"
                placeholder="0.00"
              />
            </div>



            <div>
              <label htmlFor="categoryName" className="block text-sm font-medium text-foreground/80 mb-1.5">
                <Tag className="inline h-4 w-4 mr-1.5 text-primary/70" />
                Category
              </label>
              <Select
                value={command.CategoryId || ""}
                onValueChange={(value) => setCommand(prev => ({ ...prev, CategoryId: value }))}
              >
                <SelectTrigger className="w-full rounded-lg border border-input bg-background/50 px-4 py-2.5 text-sm text-foreground focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all">
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="">None</SelectItem>
                  {categories && categories.value?.map((cat) => (
                    <SelectItem key={cat.categoryId} value={cat.categoryId}>
                      {cat.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

          </div>

          {/* Actions */}
          <div className="flex justify-end gap-3 pt-4 border-t border-border/40">
            <button
              type="button"
              onClick={onClose}
              className="px-5 py-2.5 text-sm font-medium rounded-xl border border-border/60 hover:bg-secondary/50 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isPending}
              className="inline-flex items-center gap-2 px-6 py-2.5 text-sm font-medium rounded-xl bg-primary text-primary-foreground shadow-sm hover:bg-primary/90 hover:shadow-md transition-all disabled:opacity-70 disabled:cursor-not-allowed"

            >
              <Save className="h-4 w-4" />
              {isPending ? "Saving..." : "Save Changes"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}