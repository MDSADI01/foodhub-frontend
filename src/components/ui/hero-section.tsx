"use client";

import { Button } from "@/components/ui/button";
import Link from "next/link";
import {
  ArrowRight,
  Star,
  Truck,
  Clock,
  ChefHat,
  Leaf,
  Flame,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { useEffect, useState, useCallback } from "react";

const slides = [
  {
    id: 0,
    badge: "🔥 Hot Deals Today",
    heading: "Delicious Food,",
    headingHighlight: "Delivered Fast",
    sub: "Explore hundreds of mouth-watering meals from top local chefs. Fresh ingredients, lightning-fast delivery, and unbeatable taste — every single time.",
    /* full-screen background gradient */
    bg: "from-orange-950 via-orange-900 to-red-950",
    overlayFrom: "from-orange-950/90",
    overlayTo: "to-red-950/80",
    accent: "from-orange-400 to-red-400",
    badgeBg: "bg-orange-400/20 border-orange-400/40 text-orange-200",
    dotActive: "bg-orange-400",
    icon: Flame,
    stat1Val: "< 30 min",
    stat1Label: "Avg. Delivery",
    stat2Val: "24 / 7",
    stat2Label: "Always Open",
    emojis: ["🍕", "🍔", "🍜", "🍱", "🥗", "🍣"],
  },
  {
    id: 1,
    badge: "🌿 Fresh & Healthy",
    heading: "Nourish Your Body,",
    headingHighlight: "Fuel Your Day",
    sub: "Wholesome, nutritious meals crafted with fresh, locally-sourced ingredients. Eat clean, feel great — delivered straight to your door.",
    bg: "from-emerald-950 via-teal-900 to-green-950",
    overlayFrom: "from-emerald-950/90",
    overlayTo: "to-teal-950/80",
    accent: "from-emerald-400 to-teal-300",
    badgeBg: "bg-emerald-400/20 border-emerald-400/40 text-emerald-200",
    dotActive: "bg-emerald-400",
    icon: Leaf,
    stat1Val: "No Preservatives",
    stat1Label: "Always Fresh",
    stat2Val: "500+",
    stat2Label: "Healthy Meals",
    emojis: ["🥗", "🥙", "🥦", "🍎", "🥑", "🍓"],
  },
  {
    id: 2,
    badge: "👨‍🍳 Chef's Specials",
    heading: "Restaurant Quality,",
    headingHighlight: "At Home Comfort",
    sub: "Premium chef-curated recipes from top-rated restaurants in your city. Fine dining experience — right at your dining table.",
    bg: "from-violet-950 via-purple-900 to-indigo-950",
    overlayFrom: "from-violet-950/90",
    overlayTo: "to-indigo-950/80",
    accent: "from-violet-400 to-purple-300",
    badgeBg: "bg-violet-400/20 border-violet-400/40 text-violet-200",
    dotActive: "bg-violet-400",
    icon: ChefHat,
    stat1Val: "4.9 / 5 ★",
    stat1Label: "Avg. Rating",
    stat2Val: "500+ Chefs",
    stat2Label: "Top Restaurants",
    emojis: ["🍣", "🦞", "🥩", "🍷", "🧁", "🍱"],
  },
];

export function HeroSection() {
  const [current, setCurrent] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);

  const goTo = useCallback(
    (index: number) => {
      if (isTransitioning) return;
      setIsTransitioning(true);
      setTimeout(() => {
        setCurrent((index + slides.length) % slides.length);
        setIsTransitioning(false);
      }, 350);
    },
    [isTransitioning]
  );

  const next = useCallback(() => goTo(current + 1), [current, goTo]);
  const prev = useCallback(() => goTo(current - 1), [current, goTo]);

  /* Auto-advance every 6 s */
  useEffect(() => {
    const id = setInterval(next, 6000);
    return () => clearInterval(id);
  }, [next]);

  const slide = slides[current];
  const Icon = slide.icon;

  return (
    <section
      className={`relative w-full min-h-[92vh] flex items-center overflow-hidden bg-gradient-to-br ${slide.bg} transition-all duration-700`}
    >
      {/* Dark overlay so text pops */}
      <div
        className={`absolute inset-0 bg-gradient-to-r ${slide.overlayFrom} ${slide.overlayTo} transition-all duration-700`}
      />

      {/* Floating emoji orbs — decorative */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        {slide.emojis.map((emoji, i) => (
          <span
            key={`${slide.id}-${i}`}
            className="absolute text-4xl opacity-10 select-none"
            style={{
              top: `${10 + (i * 15) % 80}%`,
              left: `${5 + (i * 17) % 90}%`,
              transform: `rotate(${i % 2 === 0 ? 15 : -15}deg)`,
            }}
          >
            {emoji}
          </span>
        ))}
        {/* Glowing blobs */}
        <div className="absolute -top-40 -right-40 w-[500px] h-[500px] rounded-full bg-white/5 blur-[100px]" />
        <div className="absolute -bottom-40 -left-40 w-[500px] h-[500px] rounded-full bg-white/5 blur-[100px]" />
      </div>

      {/* Slide content */}
      <div
        className={`relative z-10 container mx-auto px-6 py-24 md:py-32 transition-all duration-350 ${
          isTransitioning ? "opacity-0 scale-[0.98]" : "opacity-100 scale-100"
        }`}
      >
        <div className="flex flex-col lg:flex-row items-center gap-16">
          {/* ── Left ── */}
          <div className="flex-1 text-center lg:text-left space-y-8">
            {/* Badge */}
            <div
              className={`inline-flex items-center gap-2 px-4 py-2 rounded-full border text-sm font-semibold ${slide.badgeBg}`}
            >
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-current opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-current" />
              </span>
              {slide.badge}
            </div>

            {/* Heading */}
            <div className="space-y-3">
              <h1 className="text-4xl md:text-6xl xl:text-7xl font-black leading-tight tracking-tight text-white">
                {slide.heading}
                <br />
                <span
                  className={`bg-gradient-to-r ${slide.accent} bg-clip-text text-transparent`}
                >
                  {slide.headingHighlight}
                </span>
              </h1>
              <p className="text-base md:text-xl text-white/70 max-w-xl mx-auto lg:mx-0 leading-relaxed">
                {slide.sub}
              </p>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <Button
                asChild
                size="lg"
                className="px-8 py-6 text-base font-bold rounded-full bg-white text-black hover:bg-white/90 hover:-translate-y-1 shadow-xl transition-all duration-300"
              >
                <Link href="/meals">
                  Explore Meals <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              <Button
                asChild
                size="lg"
                variant="outline"
                className="px-8 py-6 text-base font-bold rounded-full border-white/30 text-white bg-white/10 hover:bg-white/20 hover:-translate-y-1 backdrop-blur-sm transition-all duration-300"
              >
                <Link href="/about">About Us</Link>
              </Button>
            </div>

            {/* Social proof */}
            <div className="flex items-center gap-4 justify-center lg:justify-start">
              <div className="flex -space-x-2">
                {["🧑", "👩", "👨", "🧑"].map((e, i) => (
                  <div
                    key={i}
                    className="w-9 h-9 rounded-full bg-white/20 border-2 border-white/30 flex items-center justify-center text-sm backdrop-blur-sm"
                  >
                    {e}
                  </div>
                ))}
              </div>
              <div>
                <p className="text-sm font-bold text-white">50k+ Happy Customers</p>
                <div className="flex items-center gap-0.5">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                  ))}
                  <span className="text-xs text-white/60 ml-1">4.9/5</span>
                </div>
              </div>
            </div>
          </div>

          {/* ── Right visual ── */}
          <div className="flex-1 w-full max-w-sm lg:max-w-md relative">
            <div className="relative aspect-square rounded-3xl bg-white/10 border border-white/20 backdrop-blur-sm flex items-center justify-center shadow-2xl overflow-hidden">
              {/* Grid bg */}
              <div className="absolute inset-0 grid grid-cols-3 grid-rows-3 gap-3 p-6 opacity-30">
                {slide.emojis.map((emoji, i) => (
                  <div
                    key={i}
                    className="text-4xl flex items-center justify-center rounded-2xl bg-white/10"
                  >
                    {emoji}
                  </div>
                ))}
              </div>
              {/* Center icon */}
              <div className="relative z-10 flex flex-col items-center gap-4">
                <div
                  className={`w-28 h-28 rounded-full bg-gradient-to-br ${slide.accent} flex items-center justify-center shadow-2xl`}
                >
                  <Icon className="w-14 h-14 text-white" />
                </div>
                <div className="text-center">
                  <p className="text-2xl font-black text-white">FoodyVerse</p>
                  <p className="text-white/60 text-sm">Your meals, moments away</p>
                </div>
              </div>
            </div>

            {/* Stat cards */}
            <div className="absolute -bottom-5 -left-5 bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl shadow-xl px-5 py-4 flex items-center gap-3">
              <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
                <Truck className="w-5 h-5 text-white" />
              </div>
              <div>
                <p className="text-xs text-white/60 font-medium">{slide.stat1Label}</p>
                <p className="text-sm font-black text-white">{slide.stat1Val}</p>
              </div>
            </div>
            <div className="absolute -top-5 -right-5 bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl shadow-xl px-5 py-4 flex items-center gap-3">
              <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
                <Clock className="w-5 h-5 text-white" />
              </div>
              <div>
                <p className="text-xs text-white/60 font-medium">{slide.stat2Label}</p>
                <p className="text-sm font-black text-white">{slide.stat2Val}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ── Slider Controls ── */}
      {/* Prev / Next arrows */}
      <button
        onClick={prev}
        aria-label="Previous slide"
        className="absolute left-4 md:left-8 top-1/2 -translate-y-1/2 z-20 w-10 h-10 md:w-12 md:h-12 rounded-full bg-white/10 hover:bg-white/25 border border-white/20 backdrop-blur-sm flex items-center justify-center text-white transition-all duration-200 hover:scale-110"
      >
        <ChevronLeft className="w-5 h-5" />
      </button>
      <button
        onClick={next}
        aria-label="Next slide"
        className="absolute right-4 md:right-8 top-1/2 -translate-y-1/2 z-20 w-10 h-10 md:w-12 md:h-12 rounded-full bg-white/10 hover:bg-white/25 border border-white/20 backdrop-blur-sm flex items-center justify-center text-white transition-all duration-200 hover:scale-110"
      >
        <ChevronRight className="w-5 h-5" />
      </button>

      {/* Dot indicators + counter */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-3">
        <div className="flex gap-2">
          {slides.map((_, i) => (
            <button
              key={i}
              onClick={() => goTo(i)}
              aria-label={`Go to slide ${i + 1}`}
              className={`h-2 rounded-full transition-all duration-300 ${
                i === current
                  ? `w-8 ${slide.dotActive}`
                  : "w-2 bg-white/30 hover:bg-white/60"
              }`}
            />
          ))}
        </div>
        <span className="text-xs text-white/40 font-mono">
          {String(current + 1).padStart(2, "0")} / {String(slides.length).padStart(2, "0")}
        </span>
      </div>

      {/* Thin progress bar at bottom */}
      <div className="absolute bottom-0 left-0 w-full h-0.5 bg-white/10 z-20">
        <div
          key={current}
          className={`h-full bg-gradient-to-r ${slide.accent}`}
          style={{ animation: "progress 6s linear forwards" }}
        />
      </div>

      <style jsx>{`
        @keyframes progress {
          from { width: 0% }
          to   { width: 100% }
        }
      `}</style>
    </section>
  );
}
