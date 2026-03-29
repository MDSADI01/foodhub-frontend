import { userService } from "@/app/services/user.service"
import { sessionType } from "@/app/types/session"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

export function ProfilePic({session}: sessionType) {
  
  const image = session?.user?.image || "https://i.postimg.cc/y8pKC1Nf/images-(1).png";
 
  if (!image) return null;

  return (
    <Avatar>
      <AvatarImage
        src={image} alt={session.user?.name || "User"}
        className="grayscale"
      />
      <AvatarFallback>CN</AvatarFallback>
    </Avatar>
  )
}
