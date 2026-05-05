"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Mail,
  Phone,
  MapPin,
  Send,
  Clock,
  MessageCircle,
  Twitter,
  Instagram,
  Facebook,
  Youtube,
  CheckCircle,
} from "lucide-react";
import { toast } from "sonner";
import { useState } from "react";

const contactCards = [
  {
    icon: Mail,
    title: "Email Us",
    lines: ["support@foodyverse.com", "info@foodyverse.com"],
    sub: "We reply within 24 hours",
    color: "bg-blue-500/10 border-blue-500/20",
    iconColor: "text-blue-500",
    iconBg: "bg-blue-500/10",
  },
  {
    icon: Phone,
    title: "Call Us",
    lines: ["+880 1234-567890", "+880 9876-543210"],
    sub: "Mon – Fri, 9 am – 9 pm",
    color: "bg-emerald-500/10 border-emerald-500/20",
    iconColor: "text-emerald-500",
    iconBg: "bg-emerald-500/10",
  },
  {
    icon: MapPin,
    title: "Visit Us",
    lines: ["Level 8, Bashundhara City", "Dhaka, Bangladesh 1229"],
    sub: "Open Mon – Sat, 10 am – 6 pm",
    color: "bg-orange-500/10 border-orange-500/20",
    iconColor: "text-orange-500",
    iconBg: "bg-orange-500/10",
  },
  {
    icon: Clock,
    title: "Working Hours",
    lines: ["Mon – Fri: 9 am – 9 pm", "Sat – Sun: 10 am – 6 pm"],
    sub: "Support available 24 / 7",
    color: "bg-violet-500/10 border-violet-500/20",
    iconColor: "text-violet-500",
    iconBg: "bg-violet-500/10",
  },
];

const socials = [
  { icon: Facebook, label: "Facebook", href: "#", color: "hover:text-blue-500" },
  { icon: Instagram, label: "Instagram", href: "#", color: "hover:text-pink-500" },
  { icon: Twitter, label: "X / Twitter", href: "#", color: "hover:text-sky-400" },
  { icon: Youtube, label: "YouTube", href: "#", color: "hover:text-red-500" },
];

export default function ContactPage() {
  const [sent, setSent] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSent(true);
    toast.success("Message sent! We'll get back to you soon. 🍽️");
    setTimeout(() => setSent(false), 3000);
    (e.target as HTMLFormElement).reset();
  };

  return (
    <div className="relative overflow-hidden">
      {/* ── Hero Banner ── */}
      <div className="relative bg-gradient-to-br from-primary/10 via-background to-background py-24 px-4 text-center overflow-hidden">
        {/* Decorative blobs */}
        <div className="pointer-events-none absolute inset-0 -z-10">
          <div className="absolute -top-24 -right-24 w-96 h-96 rounded-full bg-primary/10 blur-[100px]" />
          <div className="absolute -bottom-24 -left-24 w-96 h-96 rounded-full bg-primary/5 blur-[100px]" />
        </div>

        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-primary/20 bg-primary/5 text-sm font-semibold mb-6">
          <MessageCircle className="w-4 h-4 text-primary" />
          We love hearing from you
        </div>

        <h1 className="text-4xl md:text-6xl font-black tracking-tight mb-4">
          Get in{" "}
          <span className="bg-gradient-to-r from-primary to-primary/50 bg-clip-text text-transparent">
            Touch
          </span>
        </h1>
        <p className="text-muted-foreground text-lg md:text-xl max-w-2xl mx-auto leading-relaxed">
          Questions, feedback, or just want to say hi? Our team is here for you
          around the clock. Reach out and we'll serve you like a 5-star meal. 🍽️
        </p>
      </div>

      <div className="container mx-auto px-4 py-20 max-w-7xl space-y-24">
        {/* ── Contact Info Cards ── */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {contactCards.map((card, i) => {
            const Icon = card.icon;
            return (
              <div
                key={i}
                className={`relative p-6 rounded-2xl border ${card.color} bg-card hover:shadow-lg hover:-translate-y-1 transition-all duration-300 space-y-4`}
              >
                <div
                  className={`w-12 h-12 ${card.iconBg} rounded-xl flex items-center justify-center`}
                >
                  <Icon className={`w-6 h-6 ${card.iconColor}`} />
                </div>
                <div>
                  <h3 className="font-bold text-lg mb-1">{card.title}</h3>
                  {card.lines.map((line, j) => (
                    <p key={j} className="text-muted-foreground font-medium">
                      {line}
                    </p>
                  ))}
                </div>
                <p className="text-xs text-muted-foreground border-t border-border pt-3">
                  {card.sub}
                </p>
              </div>
            );
          })}
        </div>

        {/* ── Main Grid: Form + Map placeholder ── */}
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 items-start">
          {/* Contact Form */}
          <div className="lg:col-span-3 bg-card border rounded-3xl p-8 md:p-12 shadow-sm space-y-8">
            <div>
              <h2 className="text-3xl font-black mb-2">Send Us a Message</h2>
              <p className="text-muted-foreground">
                Fill in the form below and we'll get back to you within 24 hours.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-semibold">First Name</label>
                  <Input
                    required
                    placeholder="e.g. Sadi"
                    className="rounded-xl h-12 bg-muted/50 border-border focus:border-primary"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-semibold">Last Name</label>
                  <Input
                    required
                    placeholder="e.g. Rahman"
                    className="rounded-xl h-12 bg-muted/50 border-border focus:border-primary"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-semibold">Email Address</label>
                <Input
                  type="email"
                  required
                  placeholder="you@example.com"
                  className="rounded-xl h-12 bg-muted/50 border-border focus:border-primary"
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-semibold">Phone (optional)</label>
                <Input
                  type="tel"
                  placeholder="+880 XXXX-XXXXXX"
                  className="rounded-xl h-12 bg-muted/50 border-border focus:border-primary"
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-semibold">Subject</label>
                <Input
                  required
                  placeholder="How can we help you?"
                  className="rounded-xl h-12 bg-muted/50 border-border focus:border-primary"
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-semibold">Message</label>
                <Textarea
                  required
                  rows={5}
                  placeholder="Tell us more about your inquiry..."
                  className="rounded-xl bg-muted/50 border-border focus:border-primary resize-none"
                />
              </div>

              <Button
                type="submit"
                size="lg"
                className="w-full h-12 rounded-xl text-base font-semibold gap-2 hover:-translate-y-0.5 transition-transform"
                disabled={sent}
              >
                {sent ? (
                  <>
                    <CheckCircle className="w-5 h-5" />
                    Sent!
                  </>
                ) : (
                  <>
                    <Send className="w-5 h-5" />
                    Send Message
                  </>
                )}
              </Button>
            </form>
          </div>

          {/* Right sidebar info */}
          <div className="lg:col-span-2 space-y-8">
            {/* Map placeholder */}
            <div className="relative rounded-3xl overflow-hidden border bg-muted/30 aspect-[4/3] flex items-center justify-center">
              <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-background" />
              <div className="relative z-10 text-center space-y-3 p-8">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto">
                  <MapPin className="w-8 h-8 text-primary" />
                </div>
                <p className="font-bold text-xl">Our Office</p>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  Level 8, Bashundhara City<br />
                  Panthapath, Dhaka<br />
                  Bangladesh — 1229
                </p>
                <Button asChild variant="outline" size="sm" className="rounded-full mt-2">
                  <a
                    href="https://maps.google.com/?q=Bashundhara+City+Dhaka"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Open in Maps ↗
                  </a>
                </Button>
              </div>
              {/* decorative dots */}
              <div className="absolute top-4 right-4 grid grid-cols-3 gap-1 opacity-20">
                {[...Array(9)].map((_, i) => (
                  <div key={i} className="w-1.5 h-1.5 rounded-full bg-primary" />
                ))}
              </div>
            </div>

            {/* Social links */}
            <div className="bg-card border rounded-3xl p-8 space-y-5">
              <h3 className="font-bold text-xl">Follow FoodyVerse</h3>
              <p className="text-muted-foreground text-sm">
                Stay updated with latest deals, new restaurants, and more!
              </p>
              <div className="grid grid-cols-2 gap-3">
                {socials.map((s, i) => {
                  const Icon = s.icon;
                  return (
                    <a
                      key={i}
                      href={s.href}
                      className={`flex items-center gap-3 px-4 py-3 rounded-xl border bg-muted/30 hover:bg-muted transition-colors text-sm font-semibold text-muted-foreground ${s.color}`}
                    >
                      <Icon className="w-4 h-4" />
                      {s.label}
                    </a>
                  );
                })}
              </div>
            </div>

            {/* Quick facts */}
            <div className="bg-primary text-primary-foreground rounded-3xl p-8 space-y-4">
              <h3 className="font-black text-xl">Quick Response Promise</h3>
              <ul className="space-y-3">
                {[
                  "Email replied within 24 hours",
                  "Live chat in under 2 minutes",
                  "Phone support 7 days a week",
                ].map((item, i) => (
                  <li key={i} className="flex items-center gap-3 text-sm font-medium opacity-90">
                    <CheckCircle className="w-4 h-4 shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
