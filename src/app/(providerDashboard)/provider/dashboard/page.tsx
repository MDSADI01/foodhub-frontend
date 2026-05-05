import { userService } from "@/app/services/user.service";
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import {
  User,
  Mail,
  Utensils,
  Store,
  MapPin,
  Calendar,
  Star,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { FadeIn } from "@/components/ui/fade-in";

const Dashboard = async () => {
  const { data: sessionData } = await userService.getSession();
  const providerData = sessionData?.user;

  if (!providerData) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <p className="text-xl font-bold text-destructive">
          No provider session found. Please login.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-10 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <FadeIn delay={0.1}>
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="space-y-2">
            <h2 className="text-4xl font-black tracking-tight text-primary uppercase italic">
              Merchant Portal
            </h2>
            <p className="text-muted-foreground text-lg">
              Manage your restaurant and culinary offerings
            </p>
          </div>
        </div>
      </FadeIn>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <FadeIn delay={0.2} className="lg:col-span-2">
          <Card className="overflow-hidden border-none shadow-2xl bg-gradient-to-br from-card to-muted/30">
            <div className="h-32 bg-gradient-to-r from-primary via-primary/80 to-accent relative">
              <div className="absolute -bottom-16 left-8 p-1 bg-background rounded-2xl shadow-xl">
                <div className="w-32 h-32 rounded-xl overflow-hidden border-4 border-background">
                  <img
                    src={
                      providerData.image ||
                      "https://i.postimg.cc/y8pKC1Nf/images-(1).png"
                    }
                    alt={providerData.name}
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
              <Badge className="absolute bottom-4 right-8 px-4 py-1.5 text-sm font-bold bg-background/20 backdrop-blur-md border-white/20 text-white">
                Verified Provider
              </Badge>
            </div>

            <CardContent className="pt-20 pb-10 px-8">
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
                <div className="space-y-1">
                  <h1 className="text-3xl font-black tracking-tighter flex items-center gap-2">
                    {providerData.name}
                    <Store className="w-6 h-6 text-primary" />
                  </h1>
                  <p className="text-muted-foreground font-medium flex items-center gap-2">
                    <Mail className="w-4 h-4" />
                    {providerData.email}
                  </p>
                </div>
                <div className="flex flex-wrap gap-3">
                  <div className="px-4 py-2 bg-primary/5 rounded-xl border border-primary/10 flex items-center gap-2">
                    <Calendar className="w-4 h-4 text-primary" />
                    <span className="text-sm font-bold">Partner Since 2024</span>
                  </div>
                  <div className="px-4 py-2 bg-primary/5 rounded-xl border border-primary/10 flex items-center gap-2">
                    <MapPin className="w-4 h-4 text-primary" />
                    <span className="text-sm font-bold">Kitchen HQ</span>
                  </div>
                </div>
              </div>

              <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="p-6 rounded-2xl bg-background/50 border-2 border-primary/5 space-y-4">
                  <h3 className="text-sm font-black uppercase tracking-widest text-primary">
                    Business Profile
                  </h3>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center border-b border-dashed pb-2">
                      <span className="text-muted-foreground font-medium">
                        Business Type
                      </span>
                      <span className="font-bold text-sm">
                        {providerData.role}
                      </span>
                    </div>
                    <div className="flex justify-between items-center border-b border-dashed pb-2">
                      <span className="text-muted-foreground font-medium">
                        Verification
                      </span>
                      <span className="text-green-600 font-bold text-sm flex items-center gap-1">
                        <Star className="w-4 h-4 fill-green-600" />
                        A+ Rated
                      </span>
                    </div>
                  </div>
                </div>

                <div className="p-6 rounded-2xl bg-background/50 border-2 border-primary/5 space-y-4">
                  <h3 className="text-sm font-black uppercase tracking-widest text-primary">
                    Operations
                  </h3>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center border-b border-dashed pb-2">
                      <span className="text-muted-foreground font-medium">
                        Store Status
                      </span>
                      <span className="text-green-600 font-bold flex items-center gap-1 text-sm">
                        <div className="w-2 h-2 rounded-full bg-green-600 animate-pulse" />
                        Accepting Orders
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </FadeIn>

        <FadeIn delay={0.4} className="space-y-6">
          <Card className="p-6 border-none shadow-xl bg-card space-y-4">
            <h3 className="text-lg font-black tracking-tight">Quick Actions</h3>
            <div className="grid grid-cols-1 gap-2">
              <Button
                variant="outline"
                className="justify-start gap-3 rounded-xl border-primary/10 hover:border-primary/30"
                asChild
              >
                <Link href="/provider/orders">
                  <Store className="w-4 h-4 text-primary" />
                  View Orders
                </Link>
              </Button>
            </div>
          </Card>
        </FadeIn>
      </div>
    </div>
  );
};

export default Dashboard;
