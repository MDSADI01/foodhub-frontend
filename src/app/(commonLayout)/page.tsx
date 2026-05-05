import MealPreview from "@/components/ui/homeMealCard";
import { HeroSection } from "@/components/ui/hero-section";
import { mealService } from "../services/meal.service";
import Marquees from "@/components/ui/marquee";
import {
  CheckCircle,
  Clock,
  MapPin,
  Star,
  Users,
  Utensils,
  ShieldCheck,
  Zap,
  ArrowRight,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

/* ─────────────────────────────────────────────────────
   Small reusable Section Header
───────────────────────────────────────────────────── */
function SectionHeader({
  badge,
  title,
  sub,
}: {
  badge?: string;
  title: string;
  sub?: string;
}) {
  return (
    <div className="text-center max-w-2xl mx-auto space-y-3 mb-14">
      {badge && (
        <span className="inline-block text-xs font-bold uppercase tracking-widest text-primary bg-primary/10 px-4 py-1.5 rounded-full">
          {badge}
        </span>
      )}
      <h2 className="text-3xl md:text-4xl font-black tracking-tight">{title}</h2>
      {sub && (
        <p className="text-muted-foreground text-base md:text-lg leading-relaxed">{sub}</p>
      )}
    </div>
  );
}

export default async function Home() {
  const MealsPreview = await mealService.getMeals();
  const meals = MealsPreview?.data?.data;

  return (
    <>
      {/* ── 1. Hero (full-width, no padding wrapper) ── */}
      <div className="-mt-24 lg:-mt-28">
        <HeroSection />
      </div>

      {/* ── All remaining sections share one container ── */}
      <div className="container mx-auto px-4 md:px-8 max-w-7xl">

        {/* ── 2. Why Choose Us ── */}
        <section className="py-24">
          <SectionHeader
            badge="Why Us"
            title="Why Choose FoodyVerse?"
            sub="We provide the best food delivery experience with a focus on quality, speed, and customer satisfaction."
          />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                icon: Utensils,
                title: "Quality Food",
                desc: "Selected from top-rated local restaurants",
                color: "bg-orange-500/10 text-orange-500",
              },
              {
                icon: Zap,
                title: "Fast Delivery",
                desc: "Average delivery time under 30 minutes",
                color: "bg-yellow-500/10 text-yellow-500",
              },
              {
                icon: ShieldCheck,
                title: "Secure Payment",
                desc: "100% secure payment gateways",
                color: "bg-green-500/10 text-green-600",
              },
              {
                icon: Clock,
                title: "24/7 Service",
                desc: "Order your favourite meals anytime",
                color: "bg-blue-500/10 text-blue-500",
              },
            ].map((f, i) => (
              <div
                key={i}
                className="flex flex-col items-center text-center p-8 bg-card rounded-2xl border hover:shadow-lg hover:-translate-y-1 transition-all duration-300"
              >
                <div className={`w-14 h-14 ${f.color} rounded-2xl flex items-center justify-center mb-5`}>
                  <f.icon className="w-7 h-7" />
                </div>
                <h3 className="font-bold text-lg mb-2">{f.title}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* ── 3. Meal Preview ── */}
        <section className="py-24 border-t">
          <SectionHeader
            badge="Featured"
            title="Popular Meals"
            sub="Handpicked favourites loved by thousands of customers every day."
          />
          <MealPreview meals={meals} />
          <div className="text-center mt-12">
            <Button asChild size="lg" className="rounded-full px-8 gap-2">
              <Link href="/meals">
                View All Meals <ArrowRight className="w-4 h-4" />
              </Link>
            </Button>
          </div>
        </section>

        {/* ── 4. Stats ── */}
        <section className="py-24 border-t">
          <div className="bg-primary text-primary-foreground rounded-3xl px-8 md:px-20 py-16">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
              {[
                { label: "Active Users", value: "50k+", icon: Users },
                { label: "Restaurants", value: "500+", icon: Utensils },
                { label: "Cities", value: "25+", icon: MapPin },
                { label: "Reviews", value: "100k+", icon: Star },
              ].map((stat, i) => (
                <div key={i} className="space-y-2">
                  <stat.icon className="w-8 h-8 mx-auto mb-3 opacity-70" />
                  <div className="text-3xl md:text-4xl font-black">{stat.value}</div>
                  <div className="text-xs uppercase tracking-widest opacity-70 font-semibold">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── 5. How to Use ── */}
        <section className="py-24 border-t">
          <SectionHeader
            badge="Getting Started"
            title="Order in 4 Simple Steps"
            sub="From browsing to your doorstep in minutes — here's how it works."
          />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { step: "01", title: "Browse", desc: "Explore a wide range of meals from local restaurants." },
              { step: "02", title: "Select", desc: "Pick your favourite dishes and add them to your cart." },
              { step: "03", title: "Checkout", desc: "Enter your address and pay securely in seconds." },
              { step: "04", title: "Enjoy!", desc: "Relax while we deliver your meal fresh and hot." },
            ].map((item, i) => (
              <div key={i} className="relative text-center group">
                {/* Step number */}
                <div className="text-8xl font-black text-primary/5 leading-none mb-2 group-hover:text-primary/10 transition-colors">
                  {item.step}
                </div>
                <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4 -mt-6">
                  <span className="text-xs font-black text-primary">{item.step}</span>
                </div>
                <h3 className="text-lg font-bold mb-2">{item.title}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* ── 6. Associated Companies ── */}
        <section className="py-24 border-t">
          <SectionHeader
            badge="Partners"
            title="Our Associated Companies"
          />
          <Marquees />
        </section>

        {/* ── 7. Advanced Features ── */}
        <section className="py-24 border-t">
          <SectionHeader
            badge="Platform"
            title="Advanced Features"
            sub="We leverage cutting-edge technology to make your experience seamless and enjoyable."
          />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                title: "Smart Filtering",
                desc: "Find exactly what you want with our advanced search and multi-criteria filtering system.",
                icon: ShieldCheck,
                color: "bg-violet-500/10 text-violet-500",
              },
              {
                title: "Real-time Tracking",
                desc: "Monitor your order status from the kitchen to your doorstep with live updates.",
                icon: Clock,
                color: "bg-blue-500/10 text-blue-500",
              },
              {
                title: "Personalized Profile",
                desc: "Save favourite meals, addresses, and track your full order history in one place.",
                icon: Users,
                color: "bg-green-500/10 text-green-600",
              },
            ].map((item, i) => (
              <div
                key={i}
                className="p-8 bg-card rounded-2xl border hover:border-primary/40 hover:shadow-md transition-all duration-300 group"
              >
                <div className={`w-12 h-12 ${item.color} rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`}>
                  <item.icon className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-bold mb-3">{item.title}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* ── 8. Quality Standards ── */}
        <section className="py-24 border-t">
          <div className="flex flex-col lg:flex-row items-center gap-16">
            <div className="lg:w-1/2 space-y-6">
              <span className="inline-block text-xs font-bold uppercase tracking-widest text-primary bg-primary/10 px-4 py-1.5 rounded-full">
                Standards
              </span>
              <h2 className="text-3xl md:text-4xl font-black tracking-tight">
                Our Quality Standards
              </h2>
              <p className="text-muted-foreground leading-relaxed">
                We believe that good food starts with great ingredients. That's why we partner only
                with restaurants that meet our strict quality and hygiene standards.
              </p>
              <ul className="space-y-3">
                {[
                  "Strict hygiene audits for all partners",
                  "Freshest ingredients sourced daily",
                  "Temperature-controlled delivery bags",
                  "Eco-friendly packaging options",
                ].map((item, i) => (
                  <li key={i} className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-primary shrink-0" />
                    <span className="font-medium text-sm">{item}</span>
                  </li>
                ))}
              </ul>
              <Button asChild className="rounded-full gap-2 mt-2">
                <Link href="/about">
                  Learn More <ArrowRight className="w-4 h-4" />
                </Link>
              </Button>
            </div>
            <div className="lg:w-1/2 grid grid-cols-2 gap-4 w-full">
              <div className="bg-primary/5 border border-primary/10 rounded-2xl aspect-square flex flex-col items-center justify-center gap-3 p-6 text-center">
                <Utensils className="w-10 h-10 text-primary/50" />
                <p className="text-sm font-semibold text-muted-foreground">Top Quality</p>
              </div>
              <div className="bg-orange-500/5 border border-orange-500/10 rounded-2xl aspect-square flex flex-col items-center justify-center gap-3 p-6 text-center mt-8">
                <ShieldCheck className="w-10 h-10 text-orange-500/50" />
                <p className="text-sm font-semibold text-muted-foreground">Fully Audited</p>
              </div>
              <div className="bg-green-500/5 border border-green-500/10 rounded-2xl aspect-square flex flex-col items-center justify-center gap-3 p-6 text-center -mt-8">
                <CheckCircle className="w-10 h-10 text-green-500/50" />
                <p className="text-sm font-semibold text-muted-foreground">Certified Fresh</p>
              </div>
              <div className="bg-blue-500/5 border border-blue-500/10 rounded-2xl aspect-square flex flex-col items-center justify-center gap-3 p-6 text-center">
                <Zap className="w-10 h-10 text-blue-500/50" />
                <p className="text-sm font-semibold text-muted-foreground">Fast & Safe</p>
              </div>
            </div>
          </div>
        </section>

        {/* ── 9. Testimonials ── */}
        <section className="py-24 border-t">
          <SectionHeader
            badge="Reviews"
            title="What Our Customers Say"
            sub="Real words from real people who love FoodyVerse."
          />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { name: "John Doe", role: "Food Enthusiast", text: "The delivery is always on time and the food is piping hot. Absolutely love it!" },
              { name: "Jane Smith", role: "Busy Professional", text: "Great variety of healthy options perfect for my lunch breaks. A lifesaver!" },
              { name: "Mike Ross", role: "Student", text: "Love the student discounts and the super easy app. 10/10 recommend!" },
            ].map((t, i) => (
              <div key={i} className="p-8 bg-card rounded-2xl border flex flex-col gap-4 hover:shadow-md transition-shadow">
                <div className="flex gap-1">
                  {[...Array(5)].map((_, j) => (
                    <Star key={j} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
                <p className="text-muted-foreground italic leading-relaxed flex-1">
                  &ldquo;{t.text}&rdquo;
                </p>
                <div className="flex items-center gap-3 pt-2 border-t">
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-sm font-bold text-primary">
                    {t.name[0]}
                  </div>
                  <div>
                    <div className="font-bold text-sm">{t.name}</div>
                    <div className="text-xs text-muted-foreground">{t.role}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ── 10. FAQ ── */}
        <section className="py-24 border-t">
          <SectionHeader
            badge="FAQ"
            title="Frequently Asked Questions"
            sub="Got questions? We've got clear, honest answers."
          />
          <div className="max-w-3xl mx-auto">
            <Accordion type="single" collapsible className="w-full space-y-2">
              {[
                { q: "How do I place an order?", a: "Simply browse our meals, add them to your cart, and proceed to checkout." },
                { q: "What are the delivery hours?", a: "We operate 24/7, although some restaurants may have specific hours." },
                { q: "Is there a minimum order amount?", a: "It depends on the restaurant, but usually it's around 200 ৳." },
                { q: "How can I pay for my order?", a: "We accept credit/debit cards, mobile banking, and cash on delivery." },
                { q: "Can I track my order in real time?", a: "Yes! Once your order is confirmed, you'll receive live updates from the kitchen to your door." },
              ].map((faq, i) => (
                <AccordionItem key={i} value={`item-${i}`} className="border rounded-xl px-4">
                  <AccordionTrigger className="text-left font-semibold text-sm py-5">
                    {faq.q}
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground pb-5">
                    {faq.a}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </section>

        {/* ── 11. Community Impact ── */}
        <section className="py-24 border-t">
          <div className="relative overflow-hidden bg-primary text-primary-foreground rounded-3xl px-8 md:px-20 py-20 text-center">
            <div className="relative z-10 max-w-3xl mx-auto space-y-6">
              <span className="inline-block text-xs font-bold uppercase tracking-widest opacity-70 bg-white/10 px-4 py-1.5 rounded-full">
                Community
              </span>
              <h2 className="text-3xl md:text-5xl font-black tracking-tight">
                Making a Difference Together
              </h2>
              <p className="text-lg opacity-80 leading-relaxed">
                Every order you place helps support local restaurants and drivers in your community.
                We're committed to fostering a thriving local food ecosystem.
              </p>
              <div className="flex flex-wrap justify-center gap-12 pt-4">
                {[
                  { v: "500+", l: "Local Partners" },
                  { v: "2000+", l: "Delivery Heroes" },
                  { v: "৳10M+", l: "Community Support" },
                ].map((s, i) => (
                  <div key={i} className="text-center">
                    <div className="text-4xl font-black mb-1">{s.v}</div>
                    <div className="text-xs uppercase tracking-widest opacity-70 font-semibold">{s.l}</div>
                  </div>
                ))}
              </div>
            </div>
            <div className="absolute top-0 left-0 w-64 h-64 bg-white/5 rounded-full -translate-x-1/2 -translate-y-1/2 blur-3xl" />
            <div className="absolute bottom-0 right-0 w-96 h-96 bg-black/5 rounded-full translate-x-1/3 translate-y-1/3 blur-3xl" />
          </div>
        </section>

        {/* ── 12. Call to Action ── */}
        <section className="py-24 border-t">
          <div className="relative overflow-hidden bg-muted rounded-3xl px-8 md:px-20 py-20 text-center">
            <div className="relative z-10 max-w-2xl mx-auto space-y-6">
              <h2 className="text-3xl md:text-5xl font-black tracking-tight">
                Ready to satisfy your hunger?
              </h2>
              <p className="text-muted-foreground text-lg leading-relaxed">
                Join thousands of happy foodies and experience the best food delivery service in town.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center pt-2">
                <Button asChild size="lg" className="rounded-full px-8 py-6 text-base font-bold gap-2">
                  <Link href="/register">
                    Get Started Now <ArrowRight className="w-5 h-5" />
                  </Link>
                </Button>
                <Button asChild variant="outline" size="lg" className="rounded-full px-8 py-6 text-base font-bold">
                  <Link href="/contact">Contact Support</Link>
                </Button>
              </div>
            </div>
            <div className="absolute top-0 right-0 -mt-10 -mr-10 w-48 h-48 bg-primary/10 rounded-full blur-3xl" />
            <div className="absolute bottom-0 left-0 -mb-10 -ml-10 w-48 h-48 bg-primary/10 rounded-full blur-3xl" />
          </div>
        </section>

      </div>
    </>
  );
}
