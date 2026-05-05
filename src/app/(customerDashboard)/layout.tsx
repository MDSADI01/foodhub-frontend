import { CustomerDashboard } from "@/components/layout/customer-dashboard";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { ProfileDrop } from "@/components/ui/profile-drop";
import { userService } from "@/app/services/user.service";
import { ModeToggle } from "@/components/layout/modeToggle";
import { Separator } from "@/components/ui/separator";

export default async function customerDashboard({
  children,
}: {
  children: React.ReactNode;
}) {
  const { data } = await userService.getSession();
  const session = data;

  return (
    <SidebarProvider>
      <CustomerDashboard />
      <SidebarInset>
        <header className="flex h-16 shrink-0 items-center justify-between gap-2 border-b px-4 sticky top-0 bg-background/95 backdrop-blur z-10">
          <div className="flex items-center gap-2">
            <SidebarTrigger className="-ml-1" />
            <Separator orientation="vertical" className="mr-2 h-4" />
            <span className="font-semibold">Customer Portal</span>
          </div>
          <div className="flex items-center gap-4">
            <ModeToggle />
            <ProfileDrop session={session} />
          </div>
        </header>
        <div className="flex flex-1 flex-col gap-4 p-4 md:p-8 bg-muted/20">
          {children}
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
