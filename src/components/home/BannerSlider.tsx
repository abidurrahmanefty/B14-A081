"use client";

import Link from "next/link";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import "swiper/css";
import "swiper/css/pagination";

const slides = [
  {
    title: "Stories waiting on every shelf",
    text: "Browse community-contributed books and borrow your next favorite title in minutes.",
  },
  {
    title: "Share what you love to read",
    text: "Add books from your collection and help fellow readers discover hidden gems.",
  },
  {
    title: "Borrow lightly, return happily",
    text: "Keep titles for seven days, then return with one click so others can dive in.",
  },
];

export function BannerSlider() {
  return (
    <section className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-stone-800 via-amber-900 to-stone-900 text-amber-50">
      <Swiper
        modules={[Autoplay, Pagination]}
        autoplay={{ delay: 5000, disableOnInteraction: false }}
        pagination={{ clickable: true }}
        className="hero-swiper"
      >
        {slides.map((slide) => (
          <SwiperSlide key={slide.title}>
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex min-h-[320px] flex-col items-start justify-center gap-4 px-8 py-12 md:px-16"
            >
              <h2 className="max-w-2xl text-3xl font-bold tracking-tight text-amber-50 md:text-4xl">
                {slide.title}
              </h2>
              <p className="max-w-xl text-base leading-relaxed text-amber-100/95">{slide.text}</p>
              <Button
                asChild
                size="lg"
                variant="outline"
                className="border-amber-200/80 bg-transparent text-amber-50 hover:bg-amber-950/30"
              >
                <Link href="/books">Browse Books</Link>
              </Button>
            </motion.div>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
}
