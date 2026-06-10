'use client'

import { useEffect, useState } from "react"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"
import BookCard from "@/components/shared/book-card"
import LoadingCircle from "@/components/shared/loading-circle"
import { Search, SlidersHorizontal } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

const ITEMS_PER_PAGE = 24

 export interface GetAllBooksResponse {
  bookId: string
  categoryId: string
  title: string
  authorName: string
  price?: number
  coverUrl?: string
}

interface GetCategoriesResponse {
  id: string
  name: string
}

// محاكاة كائن الخطأ (Error) المتوقع في الكود الأصلي
const LocalError = {
  None: undefined,
  InternalServer: (message: string) => ({ message, type: "InternalServer" })
}

// --- البيانات الوهمية (Mock Data) ---
const MOCK_CATEGORIES: GetCategoriesResponse[] = [
  { id: "1", name: "روايات وقصص" },
  { id: "2", name: "تطوير الذات" },
  { id: "3", name: "التاريخ والجغرافيا" },
  { id: "4", name: "العلوم والتكنولوجيا" },
  { id: "5", name: "إدارة وأعمال" },
  { id: "6", name: "الأطفال والناشئة" },
]

const MOCK_BOOKS: GetAllBooksResponse[] = Array.from({ length: 35 }, (_, i) => ({
  bookId: `book-${i + 1}`,
  categoryId: String((i % 6) + 1),
  title: `كتاب وهمي مميز رقم ${i + 1}`,
  authorName: `الكاتب والمؤلف رقم ${(i % 4) + 1}`,
  price: 150 + (i * 10),
  coverUrl: "https://images.unsplash.com/photo-1543002588-bfa74002ed7e?w=500&auto=format&fit=crop&q=60"
}))

function AllBooksPage() {
  return(<div></div>)
  // const [books, setBooks] = useState<GetAllBooksResponse[]>([])
  // const [categories, setCategories] = useState<GetCategoriesResponse[]>([])
  // const [filteredBooks, setFilteredBooks] = useState<GetAllBooksResponse[]>([])
  // const [loading, setLoading] = useState(true)
  // const [error, setError] = useState<any>(LocalError.None)
  // const [selectedCategory, setSelectedCategory] = useState<string | null>(null)
  // const [search, setSearch] = useState("")
  // const [page, setPage] = useState(1)

  // useEffect(() => {
  //   const fetchData = async () => {
  //     try {
  //       setLoading(true)
  //       // محاكاة تأخير بسيط للشبكة 500ms
  //       await new Promise((resolve) => setTimeout(resolve, 500))
        
  //       setBooks(MOCK_BOOKS)
  //       categoriesResult: setCategories(MOCK_CATEGORIES)
  //     } catch {
  //       setError(LocalError.InternalServer("InternalServer"))
  //     } finally {
  //       setLoading(false)
  //     }
  //   }
  //   fetchData()
  // }, [])

  // useEffect(() => {
  //   let result = books
  //   if (selectedCategory) {
  //     result = result.filter((b) => b.categoryId === selectedCategory)
  //   }
  //   if (search.trim()) {
  //     const q = search.toLowerCase()
  //     result = result.filter(
  //       (b) =>
  //         b.title?.toLowerCase().includes(q) ||
  //         b.authorName?.toLowerCase().includes(q)
  //     )
  //   }
  //   setFilteredBooks(result)
  //   setPage(1)
  // }, [books, selectedCategory, search])

  // const totalPages = Math.ceil(filteredBooks.length / ITEMS_PER_PAGE)
  // const paginatedBooks = filteredBooks.slice(
  //   (page - 1) * ITEMS_PER_PAGE,
  //   page * ITEMS_PER_PAGE
  // )

  // return (
  //   <section className="container mx-auto py-10 px-4">
  //     {/* Header */}
  //     <div className="mb-6">
  //       <h1 className="text-2xl font-bold tracking-tight text-foreground">
  //         All Books
  //       </h1>
  //       <p className="text-sm text-muted-foreground mt-1">
  //         Browse our full collection
  //       </p>
  //     </div>

  //     {/* Search */}
  //     <div className="flex items-center gap-2 border border-border rounded-lg px-3 py-2 mb-6 bg-card">
  //       <Search size={16} className="text-muted-foreground shrink-0" />
  //       <Input
  //         value={search}
  //         onChange={(e) => setSearch(e.target.value)}
  //         placeholder="Search by title, author..."
  //         className="border-0 shadow-none p-0 h-auto focus-visible:ring-0 text-sm bg-transparent"
  //       />
  //       <SlidersHorizontal size={16} className="text-muted-foreground shrink-0" />
  //     </div>

  //     {/* Categories Carousel */}
  //     <div className="mb-6">
  //       <p className="text-sm text-muted-foreground mb-3">Categories</p>
  //       <Carousel
  //         opts={{ align: "start", dragFree: true }}
  //         className="w-full relative group"
  //       >
  //         <CarouselContent className="-ml-2">
  //           {/* All */}
  //           <CarouselItem className="basis-auto pl-2">
  //             <button
  //               onClick={() => setSelectedCategory(null)}
  //               className={cn(
  //                 "px-4 py-1.5 rounded-full text-sm font-medium border transition-all",
  //                 selectedCategory === null
  //                   ? "bg-primary text-primary-foreground border-transparent"
  //                   : "bg-secondary text-secondary-foreground border-border hover:border-foreground/30"
  //               )}
  //             >
  //               All
  //             </button>
  //           </CarouselItem>

  //           {categories.map((cat) => (
  //             <CarouselItem key={cat.id} className="basis-auto pl-2">
  //               <button
  //                 onClick={() => setSelectedCategory(cat.id)}
  //                 className={cn(
  //                   "px-4 py-1.5 rounded-full text-sm font-medium border transition-all whitespace-nowrap",
  //                   selectedCategory === cat.id
  //                     ? "bg-primary text-primary-foreground border-transparent"
  //                     : "bg-secondary text-secondary-foreground border-border hover:border-foreground/30"
  //                 )}
  //               >
  //                 {cat.name}
  //               </button>
  //             </CarouselItem>
  //           ))}
  //         </CarouselContent>

  //         <div className="absolute inset-y-0 flex items-center justify-between z-20 pointer-events-none -inset-x-2">
  //           <CarouselPrevious className="h-8 w-8 bg-card text-foreground rounded-full pointer-events-auto opacity-0 group-hover:opacity-100 transition-all shadow-sm border border-border" />
  //           <CarouselNext className="h-8 w-8 bg-card text-foreground rounded-full pointer-events-auto opacity-0 group-hover:opacity-100 transition-all shadow-sm border border-border" />
  //         </div>
  //       </Carousel>
  //     </div>

  //     <div className="border-t border-border mb-5" />

  //     {/* Filter row */}
  //     <div className="flex items-center justify-between mb-5 flex-wrap gap-2">
  //       <span className="text-sm text-muted-foreground">
  //         Showing{" "}
  //         <span className="font-medium text-foreground">
  //           {filteredBooks.length}
  //         </span>{" "}
  //         books
  //       </span>
  //       <select className="text-sm border border-border rounded-md px-3 py-1.5 bg-card text-foreground outline-none cursor-pointer">
  //         <option>Sort: Most Popular</option>
  //         <option>Sort: Newest</option>
  //         <option>Sort: Price ↑</option>
  //         <option>Sort: Price ↓</option>
  //       </select>
  //     </div>

  //     {/* Books Grid */}
  //     {loading ? (
  //       <LoadingCircle />
  //     ) : paginatedBooks.length === 0 ? (
  //       <div className="text-center py-20 text-muted-foreground text-sm">
  //         No books found.
  //       </div>
  //     ) : (
  //       <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
  //         {paginatedBooks.map((book) => (
  //           <BookCard key={book.bookId} book={book} />
  //         ))}
  //       </div>
  //     )}

  //     {/* Pagination */}
  //     {totalPages > 1 && (
  //       <div className="flex justify-center items-center gap-2 mt-10">
  //         <Button
  //           variant="outline"
  //           size="icon"
  //           className="h-8 w-8"
  //           disabled={page === 1}
  //           onClick={() => setPage((p) => p - 1)}
  //         >
  //           ‹
  //         </Button>

  //         {Array.from({ length: totalPages }, (_, i) => i + 1)
  //           .filter((p) => p === 1 || p === totalPages || Math.abs(p - page) <= 1)
  //           .reduce<(number | "...")[]>((acc, p, i, arr) => {
  //             if (i > 0 && p - (arr[i - 1] as number) > 1) acc.push("...")
  //             acc.push(p)
  //             return acc
  //           }, [])
  //           .map((p, i) =>
  //             p === "..." ? (
  //               <span key={`ellipsis-${i}`} className="text-muted-foreground text-sm px-1">
  //                 ...
  //               </span>
  //             ) : (
  //               <Button
  //                 key={p}
  //                 variant={page === p ? "default" : "outline"}
  //                 size="icon"
  //                 className="h-8 w-8 text-sm"
  //                 onClick={() => setPage(p as number)}
  //               >
  //                 {p}
  //               </Button>
  //             )
  //           )}

  //         <Button
  //           variant="outline"
  //           size="icon"
  //           className="h-8 w-8"
  //           disabled={page === totalPages}
  //           onClick={() => setPage((p) => p + 1)}
  //         >
  //           ›
  //         </Button>
  //       </div>
  //     )}
  //   </section>
  // )
}

export default AllBooksPage