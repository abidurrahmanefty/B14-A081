import { BannerSlider } from "@/components/home/BannerSlider";
import { NewArrivals } from "@/components/home/NewArrivals";
import { ExtraSections } from "@/components/home/ExtraSections";

export const metadata = { title: "Home" };

export default function HomePage() {
  return (
    <div className="space-y-16">
      <BannerSlider />
      <NewArrivals />
      <ExtraSections />
    </div>
  );
}
