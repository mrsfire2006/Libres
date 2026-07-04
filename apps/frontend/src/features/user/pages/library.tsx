import LoadingCircle from "@/components/shared/loading-circle";
import { useGetUserProfileQuery } from "../user.hook";

export default function LibraryPage() {


    const { data: result, isLoading, isError, error } = useGetUserProfileQuery();


    if (isLoading) {
        return (
            <LoadingCircle />
        );
    }

    if (isError) {
        return (
            <div className="p-4 bg-destructive/10 text-destructive rounded-md my-4">
                <p>حدث خطأ أثناء جلب البيانات: {(error as any)?.message || "فشل الاتصال"}</p>
            </div>
        );
    }
    const user = result?.value;
    if (!user) {
        return <div className="text-center p-8">لم يتم العثور على بيانات المستخدم.</div>;
    }
    return (
        <main className="w-full max-w-2xl mx-auto p-6 bg-card rounded-xl border shadow-sm my-8">
            <h1 className="text-2xl font-bold mb-6 text-foreground border-b pb-2">ملف المستخدم الفني</h1>

            <div className="flex flex-col md:flex-row items-center gap-6 mb-8">
                {/* عرض الصورة الشخصية أو حرف من الاسم كبديل */}
                <div className="w-24 h-24 rounded-full bg-accent flex items-center justify-center text-3xl font-bold overflow-hidden border">
                    {user.image ? (
                        <img src={user.image} alt={user.username} className="w-full h-full object-cover" />
                    ) : (
                        user.username.charAt(0).toUpperCase()
                    )}
                </div>

                {/* البيانات الأساسية */}
                <div className="flex-1 space-y-2 text-center md:text-right w-full">
                    <h2 className="text-xl font-semibold text-foreground">{user.username}</h2>
                    <p className="text-sm text-muted-foreground">{user.email}</p>
                    <span className="inline-block px-3 py-1 text-xs font-medium rounded-full bg-primary/10 text-primary">
                        الرتبة: {user.roles}
                    </span>
                </div>
            </div>

            {/* طباعة البيانات بالكامل كـ Object نظيف للمطور (Debugging) */}
            <div className="mt-6">
                <h3 className="text-sm font-medium mb-2 text-muted-foreground">بيانات الـ JSON القادمة من الـ API:</h3>
                <pre className="bg-muted p-4 rounded-lg overflow-x-auto text-xs font-mono text-left dir-ltr">
                    {JSON.stringify(user, null, 2)}
                </pre>
            </div>
        </main>
    );
}