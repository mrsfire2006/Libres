// app/(author)/upload/page.tsx
'use client'

import { useState } from "react"
import { 
  UploadCloud, 
  FileText, 
  Image as ImageIcon, 
  CheckCircle2, 
  AlertCircle,
  BookOpen,
  DollarSign
} from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

 const CATEGORIES = [
  { id: "1", name: "Fiction & Stories" },
  { id: "2", name: "Self-Development" },
  { id: "3", name: "History & Geography" },
  { id: "4", name: "Science & Technology" },
  { id: "5", name: "Business & Management" },
  { id: "6", name: "Kids & Teens" },
]

export default function UploadBookPage() {
  // Form States
  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")
  const [price, setPrice] = useState<string>("")
  const [category, setCategory] = useState<string>("")
  const [extension, setExtension] = useState<'EPUB' | 'PDF'>('EPUB')
  
  // File States
  const [bookFileName, setBookFileName] = useState<string | null>(null)
  const [coverFileName, setCoverFileName] = useState<string | null>(null)

  // UI States
  const [isUploading, setIsUploading] = useState(false)
  const [uploadSuccess, setUploadSuccess] = useState(false)
  const [error, setError] = useState<string | null>(null)

  // Mock Upload Handler
  const handleUpload = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)

    // Basic Validation
    if (!title || !price || !category || !bookFileName || !coverFileName) {
      setError("Please fill in all fields and upload the required files.")
      return
    }

    setIsUploading(true)

    try {
      // Simulate network request (2 seconds)
      await new Promise((resolve) => setTimeout(resolve, 2000))
      
      // Success
      setUploadSuccess(true)
      
      // Reset form after a brief moment (optional)
      setTimeout(() => {
        setUploadSuccess(false)
        setTitle("")
        setDescription("")
        setPrice("")
        setCategory("")
        setBookFileName(null)
        setCoverFileName(null)
      }, 4000)

    } catch (err) {
      setError("An error occurred while uploading the book. Please try again.")
    } finally {
      setIsUploading(false)
    }
  }

  return (
    <section className="container mx-auto py-10 px-4 max-w-4xl">
      
      {/* Header */}
      <div className="mb-8 text-left">
        <h1 className="text-3xl font-extrabold tracking-tight text-foreground flex items-center gap-3">
          <UploadCloud className="text-primary" size={32} />
          Publish a New Book
        </h1>
        <p className="text-sm text-muted-foreground mt-2">
          Upload your creation, set the right price, and share your knowledge with thousands of readers.
        </p>
      </div>

      <div className="bg-card border border-border rounded-2xl shadow-sm p-6 md:p-8">
        
        {/* Error & Success Messages */}
        {error && (
          <div className="mb-6 p-4 bg-red-500/10 border border-red-500/20 rounded-lg flex items-center gap-3 text-red-600 text-sm">
            <AlertCircle size={18} />
            <p>{error}</p>
          </div>
        )}

        {uploadSuccess && (
          <div className="mb-6 p-4 bg-emerald-500/10 border border-emerald-500/20 rounded-lg flex items-center gap-3 text-emerald-600 text-sm font-medium">
            <CheckCircle2 size={18} />
            <p>Book uploaded successfully! It will be reviewed and published in the store soon.</p>
          </div>
        )}

        <form onSubmit={handleUpload} className="grid grid-cols-1 md:grid-cols-2 gap-8">
          
          {/* Column 1: Book Details */}
          <div className="space-y-5">
            <h3 className="font-bold text-lg border-b border-border pb-2 mb-4">Book Information</h3>
            
            {/* Title */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground">Book Title <span className="text-red-500">*</span></label>
              <Input 
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Enter a catchy title..."
                className="bg-background"
              />
            </div>

            {/* Category */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground">Category <span className="text-red-500">*</span></label>
              <select 
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full border border-border rounded-md px-3 py-2 bg-background text-foreground outline-none text-sm h-10"
              >
                <option value="" disabled>Select the appropriate category</option>
                {CATEGORIES.map(cat => (
                  <option key={cat.id} value={cat.id}>{cat.name}</option>
                ))}
              </select>
            </div>

            {/* Price */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground">Price (USD) <span className="text-red-500">*</span></label>
              <div className="relative">
                <Input 
                  type="number"
                  min="0"
                  step="0.01"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                  placeholder="e.g. 15.00"
                  className="bg-background pl-10"
                />
                <DollarSign size={16} className="absolute top-1/2 left-3 -translate-y-1/2 text-muted-foreground" />
              </div>
            </div>

            {/* Description */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground">Short Description</label>
              <textarea 
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="A brief overview of the book's content..."
                className="w-full border border-border rounded-md px-3 py-2 bg-background text-foreground outline-none text-sm min-h-30 resize-y"
              />
            </div>
          </div>

          {/* Column 2: Files & Attachments */}
          <div className="space-y-5">
            <h3 className="font-bold text-lg border-b border-border pb-2 mb-4">Files & Attachments</h3>

            {/* Extension Selection */}
            <div className="space-y-3">
              <label className="text-sm font-medium text-foreground">File Format <span className="text-red-500">*</span></label>
              <div className="flex gap-3">
                <button
                  type="button"
                  onClick={() => setExtension('EPUB')}
                  className={cn(
                    "flex-1 flex flex-col items-center gap-2 py-3 border rounded-lg transition-all",
                    extension === 'EPUB' 
                      ? "border-emerald-500 bg-emerald-500/10 text-emerald-700" 
                      : "border-border bg-background hover:bg-muted text-muted-foreground"
                  )}
                >
                  <BookOpen size={20} />
                  <span className="font-bold text-sm">EPUB</span>
                </button>
                <button
                  type="button"
                  onClick={() => setExtension('PDF')}
                  className={cn(
                    "flex-1 flex flex-col items-center gap-2 py-3 border rounded-lg transition-all",
                    extension === 'PDF' 
                      ? "border-red-500 bg-red-500/10 text-red-700" 
                      : "border-border bg-background hover:bg-muted text-muted-foreground"
                  )}
                >
                  <FileText size={20} />
                  <span className="font-bold text-sm">PDF</span>
                </button>
              </div>
            </div>

            {/* Source File Upload */}
            <div className="space-y-2 mt-6">
              <label className="text-sm font-medium text-foreground">Source Book File <span className="text-red-500">*</span></label>
              <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-border rounded-xl cursor-pointer bg-background hover:bg-muted/50 transition-colors">
                <div className="flex flex-col items-center justify-center pt-5 pb-6">
                  <UploadCloud className="w-8 h-8 mb-2 text-muted-foreground" />
                  <p className="text-sm text-muted-foreground">
                    {bookFileName ? (
                      <span className="text-primary font-bold">{bookFileName}</span>
                    ) : (
                      <span>Click to upload <span className="font-bold">{extension}</span> file</span>
                    )}
                  </p>
                </div>
                <input 
                  type="file" 
                  accept={extension === 'EPUB' ? ".epub" : ".pdf"} 
                  className="hidden" 
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (file) setBookFileName(file.name);
                  }}
                />
              </label>
            </div>

            {/* Cover Image Upload */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground">Cover Image <span className="text-red-500">*</span></label>
              <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-border rounded-xl cursor-pointer bg-background hover:bg-muted/50 transition-colors">
                <div className="flex flex-col items-center justify-center pt-5 pb-6">
                  <ImageIcon className="w-8 h-8 mb-2 text-muted-foreground" />
                  <p className="text-sm text-muted-foreground">
                    {coverFileName ? (
                      <span className="text-primary font-bold">{coverFileName}</span>
                    ) : (
                      <span>Click to upload cover (JPG/PNG)</span>
                    )}
                  </p>
                </div>
                <input 
                  type="file" 
                  accept="image/png, image/jpeg, image/jpg" 
                  className="hidden" 
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (file) setCoverFileName(file.name);
                  }}
                />
              </label>
            </div>
            
          </div>

          {/* Submit Button */}
          <div className="md:col-span-2 mt-6 pt-6 border-t border-border flex justify-end">
            <Button 
              type="submit" 
              disabled={isUploading}
              className="w-full md:w-auto min-w-50 h-11 text-base font-bold bg-primary hover:bg-primary/90 text-primary-foreground"
            >
              {isUploading ? (
                <span className="flex items-center gap-2">
                  <div className="w-4 h-4 border-2 border-primary-foreground border-t-transparent rounded-full animate-spin"></div>
                  Uploading...
                </span>
              ) : (
                "Publish Book Now"
              )}
            </Button>
          </div>
          
        </form>
      </div>
    </section>
  )
}