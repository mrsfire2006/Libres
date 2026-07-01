import { ROUTES } from "@/constants";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { BarChart3, UploadCloud } from "lucide-react";


export default function AuthorPage() {
    return (
        <section className="container mx-auto py-10 px-4">
            <div className="max-w-2xl">
                <h1 className="text-4xl font-extrabold tracking-tight text-foreground mb-8">
                    Author Center
                </h1>

                <div className="grid gap-4 md:grid-cols-2">
                    <Link to={`${ROUTES.AUTHOR}`}>
                        <Button className="w-full h-24 text-lg" variant="default">
                            <div className="flex flex-col items-center gap-2">
                                <BarChart3 className="h-6 w-6" />
                                <span>Dashboard</span>
                            </div>
                        </Button>
                    </Link>

                    <Link to={`${ROUTES.UPLOAD}`}>
                        <Button className="w-full h-24 text-lg" variant="outline">
                            <div className="flex flex-col items-center gap-2">
                                <UploadCloud className="h-6 w-6" />
                                <span>Upload Book</span>
                            </div>
                        </Button>
                    </Link>
                </div>
            </div>
        </section>
    )
}