import { BookOpen } from "lucide-react";
import { FiFacebook, FiInstagram, FiTwitter, FiYoutube } from "react-icons/fi";
import { Link } from "react-router-dom";

export default function Footer() {
    return (
        <footer className="border-t bg-background mt-auto border-border">
            <div className="container mx-auto px-4 py-12">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-10">

                    {/* Column 1: Logo and About */}
                    <div className="col-span-2 md:col-span-1">
                        <Link to="/" className="flex items-center gap-2 mb-4" data-testid="link-footer-home">
                            <BookOpen className="h-5 w-5 text-primary" />
                            <span className="font-serif text-lg font-bold text-foreground">Libres</span>
                        </Link>
                        <p className="text-sm text-muted-foreground leading-relaxed mb-4">
                            Your digital home for books. Discover, read, and publish stories that matter.
                        </p>

                        {/* Social Media Links */}
                        <div className="flex items-center gap-3">
                            <a href="#" aria-label="Twitter" className="p-2 rounded-full hover:bg-muted text-muted-foreground hover:text-foreground transition-colors" data-testid="link-twitter">
                                <FiTwitter className="h-4 w-4" />
                            </a>
                            <a href="#" aria-label="Instagram" className="p-2 rounded-full hover:bg-muted text-muted-foreground hover:text-foreground transition-colors" data-testid="link-instagram">
                                <FiInstagram className="h-4 w-4" />
                            </a>
                            <a href="#" aria-label="Facebook" className="p-2 rounded-full hover:bg-muted text-muted-foreground hover:text-foreground transition-colors" data-testid="link-facebook">
                                <FiFacebook className="h-4 w-4" />
                            </a>
                            <a href="#" aria-label="YouTube" className="p-2 rounded-full hover:bg-muted text-muted-foreground hover:text-foreground transition-colors" data-testid="link-youtube">
                                <FiYoutube className="h-4 w-4" />
                            </a>
                        </div>
                    </div>

                    {/* Column 2: Company */}
                    <div>
                        <h3 className="font-semibold text-sm mb-4 text-foreground">Company</h3>
                        <ul className="space-y-2.5 text-sm text-muted-foreground">
                            {["About Us", "Careers", "Press", "Blog", "Contact"].map(item => (
                                <li key={item}>
                                    <a href="#" className="hover:text-foreground transition-colors" data-testid={`link-footer-${item.toLowerCase().replace(" ", "-")}`}>{item}</a>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Column 3: Categories */}
                    <div>
                        <h3 className="font-semibold text-sm mb-4 text-foreground">Categories</h3>
                        <ul className="space-y-2.5 text-sm text-muted-foreground">
                            {["Fiction", "Non-Fiction", "Mystery", "Romance", "Science Fiction", "Biography"].map(cat => (
                                <li key={cat}>
                                    <a href="#" className="hover:text-foreground transition-colors" data-testid={`link-category-${cat.toLowerCase().replace(" ", "-")}`}>{cat}</a>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Column 4: Legal */}
                    <div>
                        <h3 className="font-semibold text-sm mb-4 text-foreground">Legal</h3>
                        <ul className="space-y-2.5 text-sm text-muted-foreground">
                            {["Terms of Service", "Privacy Policy", "Cookie Policy", "Refund Policy"].map(item => (
                                <li key={item}>
                                    <a href="#" className="hover:text-foreground transition-colors" data-testid={`link-legal-${item.toLowerCase().replace(/ /g, "-")}`}>{item}</a>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className="border-t pt-6 flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-muted-foreground">
                    <p>© {new Date().getFullYear()} Libres Digital Bookstore. All rights reserved.</p>
                    <p>Made with care for readers everywhere.</p>
                </div>
            </div>
        </footer>
    );
}