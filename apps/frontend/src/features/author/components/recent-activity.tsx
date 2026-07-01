import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { ShoppingCart } from "lucide-react";

interface Activity {
    id: string;
    book: string;
    type: "sale" | "review" | "comment";
    amount: number;
    date: string;
}

interface RecentActivityProps {
    activities: Activity[];
}

export function RecentActivity({ activities }: RecentActivityProps) {
    return (
        <Card className="col-span-1">
            <CardHeader>
                <CardTitle>Recent Activity</CardTitle>
            </CardHeader>
            <CardContent>
                <div className="space-y-4">
                    {activities.map((activity) => (
                        <div key={activity.id} className="flex items-center justify-between pb-4 border-b last:border-0">
                            <div className="flex items-center gap-3">
                                <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                                    <ShoppingCart className="h-5 w-5 text-primary" />
                                </div>
                                <div>
                                    <p className="text-sm font-medium">{activity.book}</p>
                                    <p className="text-xs text-muted-foreground">
                                        {new Date(activity.date).toLocaleDateString()}
                                    </p>
                                </div>
                            </div>
                            <p className="font-semibold text-primary">${activity.amount.toFixed(2)}</p>
                        </div>
                    ))}
                </div>
            </CardContent>
        </Card>
    );
}
