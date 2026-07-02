import LoadingCircle from "@/components/shared/loading-circle";
import { useUser } from "../user.hook";
import { ProfileAvatar } from "../components/profile-avatar";
import { EditUsernameCard } from "../components/edit-username-card";
import { ChangePasswordCard } from "../components/changepassword-card";
import { Wallet } from "lucide-react";

export default function ProfilePage() {
    const { data: result, isLoading, isError, error } = useUser().getUserProfileQuery;

    if (isLoading) {
        return <LoadingCircle />;
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

    const formattedBalance = new Intl.NumberFormat("en-US", {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
    }).format(Number(user?.balance));

    return (
        <main className="w-full max-w-2xl mx-auto p-6 my-8">
            <h1 className="text-2xl font-bold mb-6 text-foreground border-b pb-2">إعدادات الحساب</h1>

            {/* رأس الملف الشخصي: الصورة + الاسم + الرتبة */}
            <div className="bg-card border rounded-xl p-6 flex flex-col md:flex-row items-center gap-6 mb-6">
                <ProfileAvatar username={user.username} image={user.image} />

                <div className="flex-1 space-y-1 text-center md:text-right w-full">
                    <h2 className="text-xl font-semibold text-foreground">{user.username}</h2>
                    <p className="text-sm text-muted-foreground">{user.email}</p>
                    <span className="inline-block px-3 py-1 text-xs font-medium rounded-full bg-primary/10 text-primary">
                        الرتبة: {user.roles}
                    </span>
                </div>
            </div>

            {/* رصيد المحفظة */}
            <div className="bg-card border rounded-xl p-6 mb-6 flex items-center justify-between">
                <div className="flex items-center gap-3">
                    <div className="p-2.5 rounded-full bg-primary/10 text-primary">
                        <Wallet className="w-5 h-5" />
                    </div>
                    <div>
                        <p className="text-sm text-muted-foreground">Balance</p>
                        <p className="text-lg font-bold text-foreground">{formattedBalance}</p>
                    </div>
                </div>
            </div>

            {/* تعديل البيانات */}
            <div className="flex flex-col gap-4">
                <EditUsernameCard username={user.username} />
                <ChangePasswordCard />
            </div>
        </main>
    );
}