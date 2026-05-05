import { userService } from "@/app/services/user.service";
import { sessionType } from "@/app/types/session";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export function ProfilePic({ session }: sessionType) {
  const image =
    session?.user?.image || "https://i.postimg.cc/y8pKC1Nf/images-(1).png";

  return (
    <Avatar className="h-10 w-10 border-2 border-primary/20 hover:border-primary transition-colors">
      <AvatarImage
        src={image}
        alt={session?.user?.name || "User"}
        className="object-cover"
      />
      <AvatarFallback className="bg-primary/10 text-primary font-bold">
        {session?.user?.name?.charAt(0) || "U"}
      </AvatarFallback>
    </Avatar>
  );
}
