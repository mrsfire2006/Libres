import { useState, type ChangeEvent, type FormEvent } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { DollarSign, UploadCloud, ImageIcon, AlertCircle, CheckCircle2 } from 'lucide-react';

import type { CreateBookRequest, UploadStatus } from '../type';
import { useAuthor } from '../author.hook';
import { useGetUserProfileQuery } from '@/features/user/user.hook';
import { useCategories } from '@/features/store/store.hook';


export function FileUploader() {
    const { data: categories } = useCategories();
    const [book, setBook] = useState<Partial<CreateBookRequest>>({});
    const [status, setStatus] = useState<UploadStatus>("idle");
    const [error, setError] = useState("");
    const { data: user } = useGetUserProfileQuery();


    const { mutateAsync: upload } = useAuthor().uploadBook;

    const handleFileChange = (e: ChangeEvent<HTMLInputElement>, fieldName: keyof CreateBookRequest) => {
        if (e.target.files && e.target.files.length > 0) {
            setBook(prev => ({ ...prev, [fieldName]: e.target.files![0] }));
        }
    };

    const handleUpload = async (e: FormEvent) => {
        e.preventDefault();
        setError("");

        if (!book.Title || !book.File || !book.CoverImage) {
            setError("Please fill all required fields and upload the files.");
            return;
        }


        setStatus("uploading");
        const formData = new FormData();
        book.UserId = user?.value?.userId;
        Object.entries(book).forEach(([key, value]) => {
            if (value !== undefined && value !== null) {
                if (value instanceof File) {
                    formData.append(key, value);
                } else {
                    formData.append(key, value.toString());
                }
            }
        });



        try {
            const result = await upload(formData);

            if (result.isSuccess) {
                setStatus("success");
                setBook({});
            } else {
                setError(result.errorMessage! || "An error occurred during upload");
                setStatus("error");
            }
        } catch (ex) {
            setError("Failed to connect to the server.");
            setStatus("error");
        }
    };

    const isUploading = status === "uploading";

    return (
        <form onSubmit={handleUpload} className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Column 1: Book Details */}
            <div className="space-y-5">
                <h3 className="font-bold text-lg border-b border-border pb-2 mb-4">Book Information</h3>

                {/* Title */}
                <div className="space-y-2">
                    <label className="text-sm font-medium text-foreground">Book Title *</label>
                    <Input
                        value={book.Title || ""}
                        onChange={(e) => setBook({ ...book, Title: e.target.value })}
                        placeholder="Enter a catchy title..."
                        required
                    />
                </div>

                {/* Category */}
                <div className="space-y-2">
                    <label className="text-sm font-medium text-foreground">Category *</label>
                    <Select
                        value={book.CategoryId || ""}
                        onValueChange={(value) => setBook({ ...book, CategoryId: value })}
                        required
                    >
                        <SelectTrigger className="w-full h-10">
                            <SelectValue placeholder="Select the appropriate category" />
                        </SelectTrigger>
                        <SelectContent>
                            {categories?.value && categories.value.map((cat) => (
                                <SelectItem key={cat.categoryId} value={cat.categoryId}>
                                    {cat.name}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                </div>

                {/* Price */}
                <div className="space-y-2">
                    <label className="text-sm font-medium text-foreground">Price (USD) *</label>
                    <div className="relative rounded-md shadow-sm">
                        <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                            <DollarSign className="h-4 w-4 text-muted-foreground" aria-hidden="true" />
                        </div>
                        <Input
                            type="number"
                            min="0"
                            step="0.1"
                            value={book.Price}
                            onChange={(e) => setBook({ ...book, Price: Number(e.target.value) })}
                            placeholder="0.00"
                            className="pl-9"
                            required
                        />
                    </div>
                </div>

                {/* Description */}
                <div className="space-y-2">
                    <label className="text-sm font-medium text-foreground">Short Description</label>
                    <textarea
                        value={book.Description || ""}
                        onChange={(e) => setBook({ ...book, Description: e.target.value })}
                        placeholder="A brief overview..."
                        className="w-full border border-input rounded-md px-3 py-2 bg-background text-foreground outline-none focus:ring-2 focus:ring-ring focus:border-transparent text-sm min-h-24 resize-y"
                    />
                </div>
            </div>

            {/* Column 2: Files & Attachments */}
            <div className="space-y-5">
                <h3 className="font-bold text-lg border-b border-border pb-2 mb-4">Files & Attachments</h3>

                {/* Source File Upload */}
                <div className="space-y-2">
                    <label className="text-sm font-medium text-foreground">Source Book File (PDF) *</label>
                    <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-border rounded-xl cursor-pointer bg-background hover:bg-muted/50 transition-colors">
                        <div className="flex flex-col items-center justify-center pt-5 pb-6">
                            <UploadCloud className="w-8 h-8 mb-2 text-muted-foreground" />
                            <p className="text-sm text-muted-foreground">
                                {book.File ? (
                                    <span className="text-primary font-bold">{book.Title}</span>
                                ) : (
                                    <span>Click to upload PDF file</span>
                                )}
                            </p>
                        </div>
                        <input
                            type="file"
                            accept=".pdf"
                            className="hidden"
                            onChange={(e) => handleFileChange(e, "File")}
                        />
                    </label>
                </div>

                {/* Cover Image Upload */}
                <div className="space-y-2">
                    <label className="text-sm font-medium text-foreground">Cover Image *</label>
                    <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-border rounded-xl cursor-pointer bg-background hover:bg-muted/50 transition-colors">
                        <div className="flex flex-col items-center justify-center pt-5 pb-6">
                            <ImageIcon className="w-8 h-8 mb-2 text-muted-foreground" />
                            <p className="text-sm text-muted-foreground">
                                {book.CoverImage ? (
                                    <span className="text-primary font-bold">{book.CoverImage.name}</span>
                                ) : (
                                    <span>Click to upload cover (JPG/PNG)</span>
                                )}
                            </p>
                        </div>
                        <input
                            type="file"
                            accept="image/png, image/jpeg, image/jpg"
                            className="hidden"
                            onChange={(e) => handleFileChange(e, "CoverImage")}
                        />
                    </label>
                </div>

                {/* Status Messages */}
                {error && (
                    <div className="flex items-center gap-2 text-destructive text-sm p-3 bg-destructive/10 rounded-md">
                        <AlertCircle className="w-4 h-4" />
                        <p>{error}</p>
                    </div>
                )}

                {status === "success" && (
                    <div className="flex items-center gap-2 text-green-600 text-sm p-3 bg-green-50 rounded-md">
                        <CheckCircle2 className="w-4 h-4" />
                        <p>Book published successfully!</p>
                    </div>
                )}
            </div>

            {/* Submit Button */}
            <div className="md:col-span-2 mt-6 pt-6 border-t border-border flex justify-end">
                <Button type="submit" disabled={isUploading} className="w-full md:w-auto min-w-48">
                    {isUploading ? "Uploading..." : "Publish Book Now"}
                </Button>
            </div>
        </form>
    );
}