
import { useState } from "react"

import SubTitle from "@/components/shared/sub-title"
import { CategoriesBar } from "@/features/store/components/categories-bar"
import type { CategoryName } from "@/features/store/type"

// const ITEMS_PER_PAGE = 24



function StorePage() {
  // const [books, setBooks] = useState<GetAllBooksResponse[]>([])
  // const [filteredBooks, setFilteredBooks] = useState<GetAllBooksResponse[]>([])
  const [selectedCategory, setSelectedCategory] = useState<CategoryName | null>(null)
  // const [search, setSearch] = useState("")
  // const [page, setPage] = useState(1)






  return (
    <section className="container mx-auto py-10 px-4">
      {/* Header */}
      <SubTitle mainTitle="All Books" description="Browse our full collection" />

      {/* Search */}
      {/* <div className="flex items-center gap-2 border border-border rounded-lg px-3 py-2 mb-6 bg-card">
                <Search size={16} className="text-muted-foreground shrink-0" />
                <Input
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    placeholder="Search by title, author..."
                    className="border-0 shadow-none p-0 h-auto focus-visible:ring-0 text-sm bg-transparent"
                />
                <SlidersHorizontal size={16} className="text-muted-foreground shrink-0" />
            </div> */}

      {/* Categories Carousel */}
      <CategoriesBar selectedCategory={selectedCategory} setSelectedCategory={setSelectedCategory} />

      <div className="border-t border-border mb-5" />

      {/* Filter row */}
      {/* <div className="flex items-center justify-between mb-5 flex-wrap gap-2">
          <span className="text-sm text-muted-foreground">
            Showing{" "}
            <span className="font-medium text-foreground">
              {filteredBooks.length}
            </span>{" "}
            books
          </span>
          <select className="text-sm border border-border rounded-md px-3 py-1.5 bg-card text-foreground outline-none cursor-pointer">
            <option>Sort: Most Popular</option>
            <option>Sort: Newest</option>
            <option>Sort: Price ↑</option>
            <option>Sort: Price ↓</option>
          </select>
        </div> */}

      {/* Books Grid */}
      {/* {loading ? (
          <LoadingCircle />
        ) : paginatedBooks.length === 0 ? (
          <div className="text-center py-20 text-muted-foreground text-sm">
            No books found.
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {paginatedBooks.map((book) => (
              <BookCard key={book.bookId} book={book} />
            ))}
          </div>
        )} */}

      {/* Pagination */}
      {/* {totalPages > 1 && (
          <div className="flex justify-center items-center gap-2 mt-10">
            <Button
              variant="outline"
              size="icon"
              className="h-8 w-8"
              disabled={page === 1}
              onClick={() => setPage((p) => p - 1)}
            >
              ‹
            </Button>

            {Array.from({ length: totalPages }, (_, i) => i + 1)
              .filter((p) => p === 1 || p === totalPages || Math.abs(p - page) <= 1)
              .reduce<(number | "...")[]>((acc, p, i, arr) => {
                if (i > 0 && p - (arr[i - 1] as number) > 1) acc.push("...")
                acc.push(p)
                return acc
              }, [])
              .map((p, i) =>
                p === "..." ? (
                  <span key={`ellipsis-${i}`} className="text-muted-foreground text-sm px-1">
                    ...
                  </span>
                ) : (
                  <Button
                    key={p}
                    variant={page === p ? "default" : "outline"}
                    size="icon"
                    className="h-8 w-8 text-sm"
                    onClick={() => setPage(p as number)}
                  >
                    {p}
                  </Button>
                )
              )}

            <Button
              variant="outline"
              size="icon"
              className="h-8 w-8"
              disabled={page === totalPages}
              onClick={() => setPage((p) => p + 1)}
            >
              ›
            </Button>
          </div>
        )} */}
    </section>
  )
}

export default StorePage