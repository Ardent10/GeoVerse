import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  Button,
} from "pixel-retroui";
import { useAppState } from "@store/index";
import { useAuth } from "@modules/home/hooks";
import { HowToPlay } from "./howToPlay";
import { SoundToggleButton } from "./sound";

export function UserProfile() {
  const [state, dispatch] = useAppState();
  const { logout } = useAuth();

  function handleLogout() {
    logout();
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        borderColor="white"
        className="bg-yellow-400 transition-transform hover:scale-110 focus:outline-none"
      >
        <img src="/assets/common/user.png" alt="User" height={30} width={30} />
      </DropdownMenuTrigger>

      <DropdownMenuContent className="bg-gray-800 text-white rounded-md shadow-lg">
        <DropdownMenuItem className="px-3 py-2 font-semibold">
          {state?.user?.username || "Guest"}
        </DropdownMenuItem>


        <div className="md:hidden">
          <DropdownMenuSeparator />
          <DropdownMenuItem className="px-3 py-2">
            <HowToPlay/>
          </DropdownMenuItem>
          <DropdownMenuItem className="px-3 py-2">
            <SoundToggleButton/>
          </DropdownMenuItem>
        </div>

        {state?.user?.username && (
          <>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="px-3 py-2 text-red-500 hover:bg-gray-700 rounded-md">
              <div onClick={handleLogout} className="flex items-center gap-2">
                <span>Logout</span>
              </div>
            </DropdownMenuItem>
          </>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
