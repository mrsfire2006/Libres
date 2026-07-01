import HomeHero from "@/features/home/components/home-hero";
import TopSelling from "@/features/home/components/top-selling";
import { Helmet } from "react-helmet-async";

export default function Home() {
    return (
        <>
            <Helmet>
                <title>Home</title>
                <meta name="description" content="منصة متخصصة في الكتب الرقمية" />
                <meta property="og:title" content="Libres Bookstore" />
                <meta property="og:type" content="website" />
            </Helmet>

            <main className="w-full flex flex-col bg-background">
                <HomeHero />
                <TopSelling />
            </main>
        </>
    );
}