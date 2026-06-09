import HomeHero from "@/features/home/components/home-hero";
import TopSelling from "@/features/home/components/top-selling";
export default async function Home() {

  return (
    <main className="w-full flex flex-col bg-background">
      <HomeHero />
      <TopSelling/>
    </main>
  );
}
