import Link from "next/link";
import { Star, ArrowRight, BookOpen } from "lucide-react";

export default function HomeHero() {
  const featuredBook = {
    id: 1,
    title: "The Midnight Library",
    author: "Eleanor Vance",
    rating: 4.8,
    reviewCount: 2450,
    price: 14.99,
    coverColor: "linear-gradient(135deg, #0f172a 0%, #1e1b4b 100%)"
  };

  const roundedRating = Math.round(featuredBook.rating);

  return (
    <section className="relative overflow-hidden bg-linear-to-br from-amber-950 via-stone-900 to-slate-900 text-white">
      {/* SVG Background Grid Pattern */}
      <div
        className="absolute inset-0 opacity-10"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }}
      />

      <div className="relative container mx-auto px-4 py-16 md:py-24">
        <div className="flex flex-col md:flex-row items-center gap-10 md:gap-16">

          {/* Left Content Column */}
          <div className="flex-1 space-y-6 text-center md:text-left">

            {/* Badge */}
            <div className="flex justify-center md:justify-start">
              <div className="inline-flex items-center gap-2 bg-amber-500/10 border border-amber-500/30 text-amber-300 rounded-full px-4 py-1.5 text-xs font-semibold tracking-wide uppercase backdrop-blur-sm">
                <Star className="h-4 w-4 fill-amber-400 text-amber-400 animate-pulse" />
                <span>Editor's Pick of the Season</span>
              </div>
            </div>

            {/* Title */}
            <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl font-bold leading-tight drop-shadow-md">
              {featuredBook.title}
            </h1>

            {/* Author */}
            <p className="text-white/70 text-sm">
              by{" "}
              <Link
                href={`/books`}
                className="text-amber-300 font-medium hover:underline transition-all"
                data-testid="link-hero-author"
              >
                {featuredBook.author}
              </Link>
            </p>

            {/* Description */}
            <p className="text-white/60 text-base leading-relaxed max-w-md mx-auto md:mx-0">
              Between life and death there is a library, and within that library, the shelves go on forever. Every book provides a chance to try another life you could have lived...
            </p>

            {/* Stars Rating (React Way) */}
            <div className="flex items-center justify-center md:justify-start gap-1">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star
                  key={i}
                  className={`h-5 w-5 ${
                    i < roundedRating 
                      ? "fill-amber-400 text-amber-400" 
                      : "text-white/20 fill-transparent"
                  }`}
                />
              ))}
              <span className="text-white/60 text-sm ml-2">
                {featuredBook.rating} ({featuredBook.reviewCount.toLocaleString()} reviews)
              </span>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center md:justify-start gap-4 pt-2">
              <Link
                href={`/books`}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-amber-500 hover:bg-amber-400 text-white font-semibold px-7 py-3.5 rounded-xl transition-all shadow-lg shadow-amber-950/50 hover:-translate-y-0.5 active:translate-y-0"
                data-testid="link-hero-discover"
              >
                Discover Now
                <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                href={`/read`}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 border border-white/20 hover:border-white/40 bg-white/5 hover:bg-white/10 text-white font-medium px-7 py-3.5 rounded-xl transition-all hover:-translate-y-0.5 active:translate-y-0"
                data-testid="link-hero-sample"
              >
                <BookOpen className="h-4 w-4" />
                Read Sample
              </Link>
            </div>
          </div>

          {/* Right Book Cover Column */}
          <div className="shrink-0 flex justify-center w-full md:w-auto">
            <div className="relative group">

              {/* Main Book Cover */}
              <div
                className="w-44 h-64 md:w-52 md:h-72 lg:w-60 lg:h-80 rounded-2xl shadow-2xl shadow-black/80 flex items-end p-5 transition-transform duration-300 group-hover:scale-[1.02]"
                style={{ background: featuredBook.coverColor }}
              >
                <div className="text-white z-10">
                  <p className="font-serif font-bold text-lg md:text-xl leading-snug drop-shadow-md">
                    {featuredBook.title}
                  </p>
                  <p className="text-white/70 text-xs mt-1.5 font-medium">
                    {featuredBook.author}
                  </p>
                </div>
                {/* تأثير إضاءة خفيف على غلاف الكتاب */}
                <div className="absolute inset-0 bg-linear-to-tr from-black/40 via-transparent to-white/10 rounded-2xl pointer-events-none" />
              </div>

              {/* Glow Shadow Effect behind the book */}
              <div
                className="absolute -bottom-3 -right-3 w-44 h-64 md:w-52 md:h-72 lg:w-60 lg:h-80 rounded-2xl -z-10 opacity-30 blur-md transition-transform duration-300 group-hover:translate-x-1 group-hover:translate-y-1"
                style={{ background: featuredBook.coverColor }}
              />

              {/* Price Tag */}
              <div className="absolute -top-3 -left-3 bg-amber-500 text-white text-xs font-bold px-3 py-1.5 rounded-full shadow-lg border border-amber-400/20">
                ${featuredBook.price.toFixed(2)}
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
}