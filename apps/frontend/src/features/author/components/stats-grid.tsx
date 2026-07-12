import { useGetUserProfileQuery } from "@/features/user/user.hook";
import {   useGetBookBio } from "../author.hook";


export function StatsGrid() {
    const { data: user } = useGetUserProfileQuery();
    const { data: bioResult } = useGetBookBio(user?.value?.userId!);

    const bio = bioResult?.value;
    const stats = [
        { label: "إجمالي الكتب", value: bio?.totalBook, dot: "bg-chart-1" },
        { label: "منشور", value: bio?.pulibshed, dot: "bg-chart-2" },
        { label: "إجمالي المشاهدات", value: bio?.totalOrder, dot: "bg-chart-3" },
    ];

    return (
        <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
            {stats.map((s) => (
                <div key={s.label} className="rounded-lg border border-border bg-card p-4">
                    <span className={`mb-3 block h-2 w-2 rounded-full ${s.dot}`} />
                    <div className="font-serif text-2xl text-card-foreground">{s.value}</div>
                    <div className="text-xs text-muted-foreground">{s.label}</div>
                </div>
            ))}
        </div>
    );
}