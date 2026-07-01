
export default function DashboardPage() {
    // const {
    //     getEarningsStats,
    //     getAuthorBooks,
    //     getRecentActivity,
    // } = useAuthor();

    // const isLoading =
    //     getEarningsStats.isLoading ||
    //     getAuthorBooks.isLoading ||
    //     getRecentActivity.isLoading;

    // if (isLoading) {
    //     return (
    //         <section className="container mx-auto py-10 px-4">
    //             <div className="flex items-center justify-center h-96">
    //                 <Loader2 className="h-8 w-8 animate-spin text-primary" />
    //             </div>
    //         </section>
    //     );
    // }

    // return (
    //     <section className="container mx-auto py-10 px-4 space-y-8">
    //         {/* Header */}
    //         <div className="mb-8">
    //             <h1 className="text-4xl font-extrabold tracking-tight text-foreground flex items-center gap-3">
    //                 <BarChart3 className="text-primary" size={32} />
    //                 Author Dashboard
    //             </h1>
    //             <p className="text-muted-foreground mt-2">
    //                 Manage your books and track your earnings
    //             </p>
    //         </div>

    //         {/* Earnings Stats */}
    //         {getEarningsStats.data?.value && (
    //             <EarningsStats earnings={getEarningsStats.data.value} />
    //         )}

    //         {/* Books and Activity */}
    //         <div className="grid gap-6 lg:grid-cols-3">
    //             {/* Books Table */}
    //             {getAuthorBooks.data?.value && (
    //                 <BooksTable books={getAuthorBooks.data.value} />
    //             )}

    //             {/* Recent Activity */}
    //             {getRecentActivity.data?.value && (
    //                 <RecentActivity activities={getRecentActivity.data.value} />
    //             )}
    //         </div>
    //     </section>
    // );
}
