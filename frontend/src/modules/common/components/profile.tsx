import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  Button,
} from "pixel-retroui";
import { useAppState } from "@store/index";

export function UserProfile() {
  const [state, dispatch] = useAppState();

  function handleLogout() {
    dispatch({ type: "logout", payload: {} });
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        borderColor="white"
        className="border-2 border-white transition-transform hover:scale-110 focus:outline-none"
      >
        <img src="/assets/common/user.png" alt="User" height={30} width={30} />
      </DropdownMenuTrigger>
      <DropdownMenuContent className="bg-gray-800 text-white rounded-md shadow-lg">
        <DropdownMenuItem className="px-3 py-2 font-semibold">
          {state?.user?.name || "Guest"}
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem className="px-3 py-2 text-red-500 hover:bg-gray-700 rounded-md">
          <div onClick={handleLogout} className="flex items-center gap-2">
            <span>Logout</span>
          </div>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
