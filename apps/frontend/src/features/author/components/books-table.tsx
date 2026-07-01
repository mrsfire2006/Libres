import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Eye, Edit, Trash2 } from "lucide-react";
import { Link } from "react-router-dom";

interface Book {
    id: string;
    title: string;
    coverImage: string;
    price: number;
    sales: number;
    revenue: number;
    category: string;
    publishedDate: string;
    status: "published" | "draft";
}

interface BooksTableProps {
    books: Book[];
}

export function BooksTable({ books }: BooksTableProps) {
    return (
        <Card className="col-span-1 lg:col-span-2">
            <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle>Your Books</CardTitle>
                <Link to="/author/upload">
                    <Button size="sm">+ Publish New</Button>
                </Link>
            </CardHeader>
            <CardContent>
                <div className="overflow-x-auto">
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Title</TableHead>
                                <TableHead>Category</TableHead>
                                <TableHead>Price</TableHead>
                                <TableHead>Sales</TableHead>
                                <TableHead>Revenue</TableHead>
                                <TableHead>Status</TableHead>
                                <TableHead className="text-right">Actions</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {books.map((book) => (
                                <TableRow key={book.id}>
                                    <TableCell className="max-w-xs">
                                        <div className="flex items-center gap-3">
                                            <img
                                                src={book.coverImage}
                                                alt={book.title}
                                                className="w-10 h-14 object-cover rounded"
                                            />
                                            <div>
                                                <p className="font-medium truncate">{book.title}</p>
                                                <p className="text-xs text-muted-foreground">
                                                    {new Date(book.publishedDate).toLocaleDateString()}
                                                </p>
                                            </div>
                                        </div>
                                    </TableCell>
                                    <TableCell>
                                        <span className="text-sm">{book.category}</span>
                                    </TableCell>
                                    <TableCell>${book.price.toFixed(2)}</TableCell>
                                    <TableCell>
                                        <span className="font-semibold">{book.sales}</span>
                                    </TableCell>
                                    <TableCell className="font-semibold">
                                        ${book.revenue.toFixed(2)}
                                    </TableCell>
                                    <TableCell>
                                        <Badge variant={book.status === "published" ? "default" : "outline"}>
                                            {book.status}
                                        </Badge>
                                    </TableCell>
                                    <TableCell className="text-right">
                                        <div className="flex gap-2 justify-end">
                                            <Button variant="ghost" size="sm" title="View">
                                                <Eye className="h-4 w-4" />
                                            </Button>
                                            <Button variant="ghost" size="sm" title="Edit">
                                                <Edit className="h-4 w-4" />
                                            </Button>
                                            <Button
                                                variant="ghost"
                                                size="sm"
                                                title="Delete"
                                                className="text-destructive hover:text-destructive"
                                            >
                                                <Trash2 className="h-4 w-4" />
                                            </Button>
                                        </div>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </div>
            </CardContent>
        </Card>
    );
}
