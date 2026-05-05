"use client";

import { MenuIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import Link from "next/link";
import { ModeToggle } from "./modeToggle";
import { ProfileDrop } from "../ui/profile-drop";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";

interface NavbarProps {
  className?: string;
  session: any;
}

const navLinks = [
  { label: "Home", href: "/" },
  { label: "Meals", href: "/meals" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
];

const Navbar = ({ className, session }: NavbarProps) => {
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-500",
        scrolled
          ? "py-2 mx-4 mt-3"
          : "py-0 mx-0 mt-0",
        className
      )}
    >
      <div
        className={cn(
          "transition-all duration-500",
          scrolled
            ? "backdrop-blur-xl bg-background/70 border border-border/50 shadow-lg shadow-black/10 rounded-2xl px-6 py-3 dark:bg-background/50"
            : "bg-background/95 backdrop-blur-sm border-b border-border/30 px-8 py-4"
        )}
      >
        <nav className="flex items-center justify-between max-w-7xl mx-auto">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 group">
            <div className="w-8 h-8 rounded-xl bg-primary flex items-center justify-center text-primary-foreground font-black text-sm shadow-sm group-hover:scale-110 transition-transform duration-200">
              F
            </div>
            <span className="text-lg font-black tracking-tight">
              FoodyVerse
            </span>
          </Link>

          {/* Desktop nav links */}
          <NavigationMenu className="hidden lg:block">
            <NavigationMenuList>
              {navLinks.map((link) => (
                <NavigationMenuItem key={link.href}>
                  <NavigationMenuLink
                    href={link.href}
                    className={cn(
                      navigationMenuTriggerStyle(),
                      "relative font-medium transition-colors hover:bg-primary/10 hover:text-primary focus:bg-primary/10 focus:text-primary",
                      pathname === link.href
                        ? "text-primary after:absolute after:bottom-0 after:left-1/2 after:-translate-x-1/2 after:w-4 after:h-0.5 after:rounded-full after:bg-primary"
                        : ""
                    )}
                  >
                    {link.label}
                  </NavigationMenuLink>
                </NavigationMenuItem>
              ))}
            </NavigationMenuList>
          </NavigationMenu>

          {/* Desktop right side */}
          <div className="hidden items-center gap-3 lg:flex">
            <ModeToggle />
            {session ? (
              <ProfileDrop session={session} />
            ) : (
              <>
                <Link href="/login">
                  <Button
                    variant="ghost"
                    className="rounded-full font-medium hover:bg-primary/10 hover:text-primary"
                  >
                    Sign in
                  </Button>
                </Link>
                <Link href="/register">
                  <Button className="rounded-full font-medium px-5 hover:bg-primary/90">
                    Sign up
                  </Button>
                </Link>
              </>
            )}
          </div>

          {/* Mobile hamburger */}
          <Sheet>
            <SheetTrigger asChild className="lg:hidden">
              <Button
                variant="outline"
                size="icon"
                className="rounded-xl border-border/50"
              >
                <MenuIcon className="h-4 w-4" />
              </Button>
            </SheetTrigger>
            <SheetContent side="top" className="max-h-screen overflow-auto rounded-b-3xl">
              <SheetHeader className="mb-6">
                <SheetTitle>
                  <Link href="/" className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-xl bg-primary flex items-center justify-center text-primary-foreground font-black text-sm">
                      F
                    </div>
                    <span className="text-lg font-black tracking-tight">FoodyVerse</span>
                  </Link>
                </SheetTitle>
              </SheetHeader>

              <div className="flex flex-col gap-1 pb-4">
                {navLinks.map((link) => (
                  <a
                    key={link.href}
                    href={link.href}
                    className={cn(
                      "px-4 py-3 rounded-xl font-medium transition-colors hover:bg-primary/10 hover:text-primary",
                      pathname === link.href
                        ? "bg-primary/10 text-primary font-bold"
                        : "text-foreground"
                    )}
                  >
                    {link.label}
                  </a>
                ))}
              </div>

              <div className="border-t pt-4 flex flex-col gap-3">
                <ModeToggle />
                {session ? (
                  <ProfileDrop session={session} />
                ) : (
                  <>
                    <Link href="/login">
                      <Button variant="outline" className="w-full rounded-xl">Sign in</Button>
                    </Link>
                    <Link href="/register">
                      <Button className="w-full rounded-xl">Sign up</Button>
                    </Link>
                  </>
                )}
              </div>
            </SheetContent>
          </Sheet>
        </nav>
      </div>
    </header>
  );
};

export { Navbar };
