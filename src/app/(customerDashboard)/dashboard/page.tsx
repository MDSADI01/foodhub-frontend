import { userService } from "@/app/services/user.service";
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import {
  User,
  Mail,
  ShoppingBag,
  MapPin,
  Calendar,
  ShieldCheck,
  Phone,
  Activity
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { FadeIn } from "@/components/ui/fade-in";

const CustomerDashboard = async () => {
  const { data: sessionData } = await userService.getSession();
  const userData = sessionData?.user;

  if (!userData) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <p className="text-xl font-bold text-destructive">
          No user session found. Please login.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-10 animate-in fade-in slide-in-from-bottom-4 duration-700 w-full max-w-7xl mx-auto">
      <FadeIn delay={0.1}>
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6">
          <div className="space-y-2">
            <h2 className="text-4xl font-black tracking-tight text-primary uppercase italic">
              User Hub
            </h2>
            <p className="text-muted-foreground text-lg">
              Welcome back to your FoodyVerse profile
            </p>
          </div>
          <Button
            asChild
            size="lg"
            className="rounded-2xl font-bold shadow-lg hover:scale-105 transition-transform w-full sm:w-auto"
          >
            <Link href="/meals">Order Something New</Link>
          </Button>
        </div>
      </FadeIn>

      <div className="grid grid-cols-1 lg:grid-cols-3 xl:grid-cols-4 gap-6 lg:gap-8 items-start">
        {/* Profile Card */}
        <FadeIn delay={0.2} className="lg:col-span-2 xl:col-span-3">
          <Card className="overflow-hidden border-none shadow-2xl bg-gradient-to-br from-card to-muted/30">
            <div className="h-40 sm:h-48 bg-gradient-to-r from-primary via-primary/80 to-accent relative">
              <div className="absolute -bottom-16 left-6 sm:left-8 p-1 bg-background rounded-2xl shadow-xl">
                <div className="w-28 h-28 sm:w-32 sm:h-32 rounded-xl overflow-hidden border-4 border-background">
                  <img
                    src={
                      userData.image ||
                      "https://i.postimg.cc/y8pKC1Nf/images-(1).png"
                    }
                    alt={userData.name}
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
              <Badge className="absolute bottom-4 right-4 sm:right-8 px-4 py-1.5 text-xs sm:text-sm font-bold bg-background/20 backdrop-blur-md border-white/20 text-white">
                Verified Member
              </Badge>
            </div>

            <CardContent className="pt-20 sm:pt-24 pb-8 sm:pb-10 px-6 sm:px-8">
              <div className="flex flex-col xl:flex-row justify-between items-start xl:items-center gap-6">
                <div className="space-y-1">
                  <h1 className="text-2xl sm:text-3xl font-black tracking-tighter flex items-center gap-2">
                    {userData.name}
                    <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                  </h1>
                  <p className="text-sm sm:text-base text-muted-foreground font-medium flex items-center gap-2">
                    <Mail className="w-4 h-4 sm:w-5 sm:h-5 text-primary/70" />
                    {userData.email}
                  </p>
                </div>
                <div className="flex flex-wrap gap-2 w-full xl:w-auto">
                  <div className="flex-1 xl:flex-none px-4 py-2 sm:py-3 bg-primary/5 rounded-xl border border-primary/10 flex items-center justify-center xl:justify-start gap-2">
                    <Calendar className="w-4 h-4 sm:w-5 sm:h-5 text-primary" />
                    <span className="text-xs sm:text-sm font-bold whitespace-nowrap">Member Since 2024</span>
                  </div>
                  <div className="flex-1 xl:flex-none px-4 py-2 sm:py-3 bg-primary/5 rounded-xl border border-primary/10 flex items-center justify-center xl:justify-start gap-2">
                    <MapPin className="w-4 h-4 sm:w-5 sm:h-5 text-primary" />
                    <span className="text-xs sm:text-sm font-bold whitespace-nowrap">Dhaka, BD</span>
                  </div>
                </div>
              </div>

              <div className="mt-10 sm:mt-12 grid grid-cols-1 sm:grid-cols-2 gap-6 sm:gap-8">
                <div className="p-5 sm:p-6 rounded-2xl bg-background/50 border-2 border-primary/5 space-y-4 hover:border-primary/20 transition-colors">
                  <h3 className="text-xs sm:text-sm font-black uppercase tracking-widest text-primary flex items-center gap-2">
                    <User className="w-4 h-4" />
                    Personal Details
                  </h3>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center border-b border-dashed border-primary/10 pb-2">
                      <span className="text-sm text-muted-foreground font-medium">
                        Account Type
                      </span>
                      <Badge variant="outline" className="font-bold text-xs uppercase bg-primary/5">
                        {userData.role}
                      </Badge>
                    </div>
                    <div className="flex justify-between items-center border-b border-dashed border-primary/10 pb-2">
                      <span className="text-sm text-muted-foreground font-medium">
                        Security
                      </span>
                      <span className="text-green-600 dark:text-green-400 font-bold text-sm flex items-center gap-1">
                        <ShieldCheck className="w-4 h-4" />
                        Active
                      </span>
                    </div>
                  </div>
                </div>

                <div className="p-5 sm:p-6 rounded-2xl bg-background/50 border-2 border-primary/5 space-y-4 hover:border-primary/20 transition-colors">
                  <h3 className="text-xs sm:text-sm font-black uppercase tracking-widest text-primary flex items-center gap-2">
                    <Activity className="w-4 h-4" />
                    Account Activity
                  </h3>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center border-b border-dashed border-primary/10 pb-2">
                      <span className="text-sm text-muted-foreground font-medium">
                        Recent Orders
                      </span>
                      <span className="font-bold text-sm">--</span>
                    </div>
                    <div className="flex justify-between items-center border-b border-dashed border-primary/10 pb-2">
                      <span className="text-sm text-muted-foreground font-medium">
                        Saved Contacts
                      </span>
                      <span className="text-primary font-bold text-sm flex items-center gap-1">
                        <Phone className="w-4 h-4" />
                        1 Linked
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </FadeIn>

        {/* Sidebar Info */}
        <FadeIn delay={0.4} className="lg:col-span-1 xl:col-span-1 space-y-6">
          <Card className="p-6 border-none shadow-2xl bg-gradient-to-b from-card to-card/50 space-y-6 sticky top-6">
            <div>
              <h3 className="text-lg sm:text-xl font-black tracking-tight text-foreground">Quick Actions</h3>
              <p className="text-xs text-muted-foreground mt-1">Manage your account and preferences.</p>
            </div>
            
            <div className="grid grid-cols-1 gap-3">
              <Button
                variant="outline"
                className="justify-start gap-4 rounded-xl border-primary/10 hover:border-primary hover:bg-primary/5 py-6 transition-all group"
                asChild
              >
                <Link href="/profile">
                  <div className="p-2 rounded-lg bg-primary/10 group-hover:bg-primary/20 transition-colors">
                    <User className="w-5 h-5 text-primary" />
                  </div>
                  <div className="flex flex-col items-start gap-0.5">
                    <span className="font-bold">Edit Profile</span>
                    <span className="text-xs font-normal text-muted-foreground">Update your details</span>
                  </div>
                </Link>
              </Button>
              <Button
                variant="outline"
                className="justify-start gap-4 rounded-xl border-primary/10 hover:border-primary hover:bg-primary/5 py-6 transition-all group"
                asChild
              >
                <Link href="/orders">
                  <div className="p-2 rounded-lg bg-primary/10 group-hover:bg-primary/20 transition-colors">
                    <ShoppingBag className="w-5 h-5 text-primary" />
                  </div>
                  <div className="flex flex-col items-start gap-0.5">
                    <span className="font-bold">Order History</span>
                    <span className="text-xs font-normal text-muted-foreground">Track past purchases</span>
                  </div>
                </Link>
              </Button>
            </div>
          </Card>
        </FadeIn>
      </div>
    </div>
  );
};

export default CustomerDashboard;

