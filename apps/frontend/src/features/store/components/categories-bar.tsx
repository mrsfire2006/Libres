import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { cn } from "@/lib/utils";
import { useStore } from "../store.hook";
import type { CategoryName } from "../type";

interface CategoriesBarProps {
    selectedCategory: CategoryName | null;
    setSelectedCategory: (category: CategoryName | null) => void;
}

export function CategoriesBar({ selectedCategory, setSelectedCategory }: CategoriesBarProps) {
    const { data: categories } = useStore().getAllCategories;

    return (<div className="mb-6">
        <p className="text-sm text-muted-foreground mb-3">Categories</p>
        <Carousel
            opts={{ align: "start", dragFree: true }}
            className="w-full relative group"
        >
            <CarouselContent className="-ml-2">
                {/* All */}
                <CarouselItem className="basis-auto pl-2">
                    <button
                        onClick={() => setSelectedCategory(null)}
                        className={cn(
                            "px-4 py-1.5 rounded-full text-sm font-medium border transition-all",
                            selectedCategory === null
                                ? "bg-primary text-primary-foreground border-transparent"
                                : "bg-secondary text-secondary-foreground border-border hover:border-foreground/30"
                        )}
                    >
                        All
                    </button>
                </CarouselItem>

                {categories?.value && categories?.value.map((cat) => (
                    <CarouselItem key={cat.categoryId} className="basis-auto pl-2">
                        <button
                            onClick={() => { setSelectedCategory(cat); console.log(cat) }}
                            className={cn(
                                "px-4 py-1.5 rounded-full text-sm font-medium border transition-all whitespace-nowrap",
                                selectedCategory?.categoryId === cat.categoryId
                                    ? "bg-primary text-primary-foreground border-transparent"
                                    : "bg-secondary text-secondary-foreground border-border hover:border-foreground/30"
                            )}
                        >
                            {cat.name}
                        </button>
                    </CarouselItem>
                ))}
            </CarouselContent>

            <div className="absolute inset-y-0 flex items-center justify-between z-20 pointer-events-none -inset-x-2">
                <CarouselPrevious className="h-8 w-8 bg-card text-foreground rounded-full pointer-events-auto opacity-0 group-hover:opacity-100 transition-all shadow-sm border border-border" />
                <CarouselNext className="h-8 w-8 bg-card text-foreground rounded-full pointer-events-auto opacity-0 group-hover:opacity-100 transition-all shadow-sm border border-border" />
            </div>
        </Carousel>
    </div>)
}