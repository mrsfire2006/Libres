import { useState } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { BookOpen, Upload, UploadCloud } from "lucide-react";
import { StatsGrid } from "../components/stats-grid";
import { FileUploader } from "../components/file-uploader";
import { BookGrid } from "../components/book-grid";
import type { AuthorBookResponse } from "../type";
import { EditBookModal } from "../components/edit-book-modal";

type Tab = "books" | "upload";

export default function AuthorDashboard() {
    const queryClient = useQueryClient();
    const [tab, setTab] = useState<Tab>("books");
    const [editingBook, setEditingBook] = useState<AuthorBookResponse | null>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleEdit = (book: AuthorBookResponse) => {
        setEditingBook(book);
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
        setEditingBook(null);
    };

    const handleSave = async (updatedData: Partial<AuthorBookResponse>) => {
        console.log("Saving updated book:", updatedData);

        await queryClient.invalidateQueries({ queryKey: ["authorBooks"] });

        handleCloseModal();
    };

    return (
        <div className="min-h-screen bg-background font-sans text-foreground">
            <div className="mx-auto max-w-6xl px-4 py-8 md:px-8 md:py-10">
                {/* Header */}
                <div className="mb-8 flex items-center justify-between">
                    <div>
                        <h1 className="mb-1 font-serif text-3xl md:text-4xl">Author Dashboard</h1>
                        <p className="text-sm text-muted-foreground">إدارة كتبك المنشورة على منصة Libres</p>
                    </div>
                </div>

                {/* Stats */}
                <div className="mb-8">
                    <StatsGrid />
                </div>

                {/* Tabs */}
                <div className="mb-6 flex items-center gap-6 border-b border-border">
                    <button
                        onClick={() => setTab("books")}
                        className={`flex items-center gap-2 border-b-2 pb-3 text-sm font-medium transition-colors ${tab === "books"
                            ? "border-primary text-foreground"
                            : "border-transparent text-muted-foreground"
                            }`}
                    >
                        <BookOpen size={15} /> My Books
                    </button>
                    <button
                        onClick={() => setTab("upload")}
                        className={`flex items-center gap-2 border-b-2 pb-3 text-sm font-medium transition-colors ${tab === "upload"
                            ? "border-primary text-foreground"
                            : "border-transparent text-muted-foreground"
                            }`}
                    >
                        <Upload size={15} />
                        Upload Book
                    </button>
                </div>

                {/* Content */}
                {tab === "books" && (
                    <BookGrid onEdit={handleEdit} />
                )}

                {tab === "upload" && (
                    <>
                        <div className="mb-8 text-left">
                            <h1 className="text-3xl font-extrabold tracking-tight text-foreground flex items-center gap-3">
                                <UploadCloud className="text-primary" size={32} />
                                Publish a New Book
                            </h1>
                        </div>
                        <div className="bg-card border border-border rounded-2xl shadow-sm p-6 md:p-8">
                            <FileUploader />
                        </div>
                    </>
                )}
            </div>

            {/* Modal */}
            {editingBook && (
                <EditBookModal
                    book={editingBook}
                    isOpen={isModalOpen}
                    onClose={handleCloseModal}
                    onSave={handleSave}
                    categories={["Fiction", "Non-Fiction", "Science", "History", "Biography"]}
                />
            )}
        </div>
    );
}