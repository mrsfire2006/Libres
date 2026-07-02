
import { UploadCloud } from "lucide-react"
import { FileUploader } from "@/features/author/components/file-uploader"
import { useCategories } from "@/features/store/store.hook"


export default function UploadBookPage() {
    const { data: categories } = useCategories();



    return (
        <section className="container mx-auto py-10 px-4 max-w-4xl">
            {/* Header */}
            <div className="mb-8 text-left">
                <h1 className="text-3xl font-extrabold tracking-tight text-foreground flex items-center gap-3">
                    <UploadCloud className="text-primary" size={32} />
                    Publish a New Book
                </h1>
            </div>

            {/* Container for the form component */}
            <div className="bg-card border border-border rounded-2xl shadow-sm p-6 md:p-8">
                <FileUploader categories={categories?.value} />
            </div>
        </section>
    )
}