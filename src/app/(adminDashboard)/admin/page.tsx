import { userService } from "@/app/services/user.service";
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { User, Mail, ShieldCheck, Calendar, MapPin } from "lucide-react";
import { Badge } from "@/components/ui/badge";

const AdminProfile = async () => {
  const { data: sessionData } = await userService.getSession();
  const adminData = sessionData?.user;

  if (!adminData) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <p className="text-xl font-bold text-destructive">
          No admin session found. Please login.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-10 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="flex flex-col gap-2">
        <h2 className="text-4xl font-black tracking-tight text-primary uppercase italic">
          Admin Control Center
        </h2>
        <p className="text-muted-foreground text-lg">
          System Overview & Administrator Profile
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Profile Card */}
        <Card className="lg:col-span-2 overflow-hidden border-none shadow-2xl bg-gradient-to-br from-card to-muted/30">
          <div className="h-32 bg-gradient-to-r from-primary via-primary/80 to-accent relative">
            <div className="absolute -bottom-16 left-8 p-1 bg-background rounded-2xl shadow-xl">
              <div className="w-32 h-32 rounded-xl overflow-hidden border-4 border-background">
                <img
                  src={
                    adminData.image ||
                    "https://i.postimg.cc/y8pKC1Nf/images-(1).png"
                  }
                  alt={adminData.name}
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
            <Badge className="absolute bottom-4 right-8 px-4 py-1.5 text-sm font-bold bg-background/20 backdrop-blur-md border-white/20 text-white">
              System Administrator
            </Badge>
          </div>

          <CardContent className="pt-20 pb-10 px-8">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
              <div className="space-y-1">
                <h1 className="text-3xl font-black tracking-tighter flex items-center gap-2">
                  {adminData.name}
                  <ShieldCheck className="w-6 h-6 text-primary" />
                </h1>
                <p className="text-muted-foreground font-medium flex items-center gap-2">
                  <Mail className="w-4 h-4" />
                  {adminData.email}
                </p>
              </div>
              <div className="flex flex-wrap gap-3">
                <div className="px-4 py-2 bg-primary/5 rounded-xl border border-primary/10 flex items-center gap-2">
                  <Calendar className="w-4 h-4 text-primary" />
                  <span className="text-sm font-bold">Joined May 2024</span>
                </div>
                <div className="px-4 py-2 bg-primary/5 rounded-xl border border-primary/10 flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-primary" />
                  <span className="text-sm font-bold">Main Office</span>
                </div>
              </div>
            </div>

            <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="p-6 rounded-2xl bg-background/50 border-2 border-primary/5 space-y-4">
                <h3 className="text-sm font-black uppercase tracking-widest text-primary">
                  Account Details
                </h3>
                <div className="space-y-4">
                  <div className="flex justify-between items-center border-b border-dashed pb-2">
                    <span className="text-muted-foreground font-medium">
                      Account Status
                    </span>
                    <span className="text-green-600 font-bold flex items-center gap-1 text-sm">
                      <div className="w-2 h-2 rounded-full bg-green-600 animate-pulse" />
                      Active
                    </span>
                  </div>
                  <div className="flex justify-between items-center border-b border-dashed pb-2">
                    <span className="text-muted-foreground font-medium">
                      Security Level
                    </span>
                    <span className="font-bold text-sm">L3 - Root Access</span>
                  </div>
                </div>
              </div>

              <div className="p-6 rounded-2xl bg-background/50 border-2 border-primary/5 space-y-4">
                <h3 className="text-sm font-black uppercase tracking-widest text-primary">
                  System Role
                </h3>
                <div className="space-y-4">
                  <div className="flex justify-between items-center border-b border-dashed pb-2">
                    <span className="text-muted-foreground font-medium">
                      Primary Role
                    </span>
                    <span className="font-bold text-sm">{adminData.role}</span>
                  </div>
                  <div className="flex justify-between items-center border-b border-dashed pb-2">
                    <span className="text-muted-foreground font-medium">
                      Last Login
                    </span>
                    <span className="font-bold text-sm">2 hours ago</span>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Quick Stats/Info */}
        <div className="space-y-6">
          <Card className="p-6 border-none shadow-xl bg-primary text-primary-foreground relative overflow-hidden group">
            <div className="relative z-10 space-y-4">
              <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold">Security Notice</h3>
              <p className="text-sm opacity-90 leading-relaxed">
                Your session is encrypted and protected with multi-factor
                authentication. Always logout after use.
              </p>
            </div>
            <ShieldCheck className="absolute -bottom-4 -right-4 w-32 h-32 opacity-10 group-hover:scale-110 transition-transform" />
          </Card>

          <Card className="p-6 border-none shadow-xl bg-card space-y-4">
            <h3 className="text-lg font-black tracking-tight">System Status</h3>
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 rounded-full bg-green-500" />
                <span className="text-sm font-medium">Database Connected</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 rounded-full bg-green-500" />
                <span className="text-sm font-medium">Auth Service Online</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 rounded-full bg-green-500" />
                <span className="text-sm font-medium">API Gateway Active</span>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default AdminProfile;
