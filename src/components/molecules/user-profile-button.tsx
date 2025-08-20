import { LogOut, User } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/atoms/button";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/molecules/popover";
import { useAuthStore } from "@/lib/store/auth.store";

export function UserProfileButton() {
  const navigate = useNavigate();
  const { user, logout } = useAuthStore();

  if (!user) return null;

  const handleLogout = () => {
    logout();
    navigate("/auth");
  };

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant="ghost"
          className="w-full justify-start gap-2 px-2 hover:bg-accent"
        >
          <Avatar>
            <AvatarImage src="https://github.com/shadcn.png" />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
          <div className="flex flex-col items-start text-left">
            <span className="text-sm font-medium">{user.name}</span>
            <span className="text-xs text-muted-foreground">{user.email}</span>
          </div>
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-56 p-2" align="end" side="right">
        <div className="grid gap-1">
          <Button
            variant="ghost"
            className="w-full justify-start gap-2"
            onClick={() => navigate("/account")}
          >
            <User size={16} />
            Account
          </Button>
          <Button
            variant="ghost"
            className="w-full justify-start gap-2"
            onClick={handleLogout}
          >
            <LogOut size={16} />
            Log out
          </Button>
        </div>
      </PopoverContent>
    </Popover>
  );
}