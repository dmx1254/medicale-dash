import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";
import { CaretSortIcon } from "@radix-ui/react-icons";

// import notificationSong from "@/public/song/notif.mp3";

export function UserNav() {
  return (
    <div className="flex items-start gap-2">
      <div>
        <Avatar className="mr-2 h-8 w-8">
          <AvatarImage
            src="/avatars/03.png"
            alt={"John Green"}
            className="grayscale"
          />
          <AvatarFallback>SC</AvatarFallback>
        </Avatar>
      </div>
      <div className="flex flex-col items-start gap-1">
        <span className="text-sm font-bold text-dark-500">John Green</span>
        <span className="text-sm text-green-500 font-extrabold">Admin</span>
      </div>
    </div>
  );
}
