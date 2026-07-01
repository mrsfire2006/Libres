import { DollarSign, BookOpen, TrendingUp, ShoppingCart } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface StatCardProps {
    title: string;
    value: string | number;
    subtitle?: string;
    icon: React.ReactNode;
    valueClassName?: string;
}

export function StatCard({ title, value, subtitle, icon, valueClassName = "text-3xl font-bold" }: StatCardProps) {
    return (
        <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">{title}</CardTitle>
                <div className="text-primary">{icon}</div>
            </CardHeader>
            <CardContent>
                <div className={valueClassName}>${value.toLocaleString()}</div>
                {subtitle && <p className="text-xs text-muted-foreground mt-1">{subtitle}</p>}
            </CardContent>
        </Card>
    );
}

interface EarningsStatsProps {
    earnings: {
        totalRevenue: number;
        totalBooks: number;
        totalSales: number;
        monthlyRevenue: number;
        monthlyGrowth: number;
        averageSalePrice: number;
    };
}

export function EarningsStats({ earnings }: EarningsStatsProps) {
    return (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <StatCard
                title="Total Revenue"
                value={earnings.totalRevenue}
                subtitle="All time earnings"
                icon={<DollarSign className="h-4 w-4" />}
            />
            <StatCard
                title="Total Sales"
                value={earnings.totalSales}
                subtitle="Books sold"
                icon={<ShoppingCart className="h-4 w-4" />}
                valueClassName="text-3xl font-bold text-primary"
            />
            <StatCard
                title="This Month"
                value={earnings.monthlyRevenue}
                subtitle={`↑ ${earnings.monthlyGrowth}% growth`}
                icon={<TrendingUp className="h-4 w-4" />}
            />
            <StatCard
                title="Published Books"
                value={earnings.totalBooks}
                subtitle="Active titles"
                icon={<BookOpen className="h-4 w-4" />}
                valueClassName="text-3xl font-bold text-primary"
            />
        </div>
    );
}
