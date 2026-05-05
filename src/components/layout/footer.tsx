import React from "react";
import Link from "next/link";
import { FaFacebook, FaInstagram, FaTwitter, FaYoutube } from "react-icons/fa";
import { cn } from "@/lib/utils";

interface FooterProps {
  className?: string;
}

const navSections = [
  {
    title: "Explore",
    links: [
      { name: "Home", href: "/" },
      { name: "Browse Meals", href: "/meals" },
      { name: "About Us", href: "/about" },
      { name: "Contact", href: "/contact" },
    ],
  },
  {
    title: "Account",
    links: [
      { name: "Sign In", href: "/login" },
      { name: "Register", href: "/register" },
    ],
  },
  {
    title: "Support",
    links: [
      { name: "Help Center", href: "/help" },
      { name: "Blog", href: "/blog" },
      { name: "Privacy Policy", href: "/privacy" },
      { name: "Terms & Conditions", href: "/terms" },
    ],
  },
];

const socialLinks = [
  { icon: <FaInstagram className="w-4 h-4" />, href: "#", label: "Instagram" },
  { icon: <FaFacebook className="w-4 h-4" />, href: "#", label: "Facebook" },
  { icon: <FaTwitter className="w-4 h-4" />, href: "#", label: "Twitter / X" },
  { icon: <FaYoutube className="w-4 h-4" />, href: "#", label: "YouTube" },
];

const Footer = ({ className }: FooterProps) => {
  return (
    <footer className={cn("border-t bg-muted/30", className)}>
      <div className="container mx-auto px-4 md:px-8 max-w-7xl">
        {/* Top section */}
        <div className="py-14 grid grid-cols-1 lg:grid-cols-4 gap-10">
          {/* Brand column */}
          <div className="lg:col-span-1 space-y-5">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-2 group w-fit">
              <div className="w-9 h-9 rounded-xl bg-primary flex items-center justify-center text-primary-foreground font-black text-sm shadow-sm group-hover:scale-105 transition-transform">
                F
              </div>
              <span className="text-lg font-black tracking-tight">FoodyVerse</span>
            </Link>

            <p className="text-sm text-muted-foreground leading-relaxed max-w-xs">
              Your favourite meals, delivered fast. Connecting hungry people with the best local restaurants.
            </p>

            {/* Social Icons */}
            <div className="flex items-center gap-3">
              {socialLinks.map((s, i) => (
                <a
                  key={i}
                  href={s.href}
                  aria-label={s.label}
                  className="w-9 h-9 rounded-xl bg-background border border-border flex items-center justify-center text-muted-foreground hover:text-primary hover:border-primary/40 hover:bg-primary/5 transition-all duration-200"
                >
                  {s.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Nav link columns */}
          <div className="lg:col-span-3 grid grid-cols-2 md:grid-cols-3 gap-8">
            {navSections.map((section, si) => (
              <div key={si}>
                <h3 className="text-xs font-bold uppercase tracking-widest text-foreground mb-4">
                  {section.title}
                </h3>
                <ul className="space-y-2.5">
                  {section.links.map((link, li) => (
                    <li key={li}>
                      <Link
                        href={link.href}
                        className="text-sm text-muted-foreground hover:text-primary font-medium transition-colors duration-150"
                      >
                        {link.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t py-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-xs text-muted-foreground">
            © {new Date().getFullYear()} FoodyVerse. All rights reserved.
          </p>
          <div className="flex items-center gap-5 text-xs text-muted-foreground">
            <Link href="/privacy" className="hover:text-primary transition-colors">
              Privacy Policy
            </Link>
            <Link href="/terms" className="hover:text-primary transition-colors">
              Terms & Conditions
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export { Footer };
