import { DropDownProfile, Moon, Logout } from "@/assets";

export default function ProfileDropdown() {
  const buttons = [
    { key: "profile", title: "Profile", icon: DropDownProfile },
    { key: "darkmode", title: "Dark Mode", icon: Moon },
    { key: "logout", title: "Log out", icon: Logout },
  ];

  return (
    <div
      className="
        absolute top-full mt-2
        w-36 bg-white text-black text-sm  
        shadow-lg rounded-b-lg z-50 overflow-hidden
      "
    >
      {buttons.map((button) => {
        const Icon = button.icon;
        return (
          <button
            key={button.key}
            className="flex gap-1 p-4 h-10 items-center w-full font-semibold hover:bg-gray-100"
          >
            <Icon className="h-6 w-6 text-muted-foreground" />
            {button.title}
          </button>

        )

      })}
    </div>
  );
}
