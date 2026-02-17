import Icon from "../Icon";

export default function Dropdown({ buttons, closeDropdown }) {


  return (
    <div
      className="
        absolute top-full mt-3
        w-full min-w-36 z-20 bg-white border-[#E0E0E0] border text-black text-sm  
        shadow-lg overflow-hidden
      "
    >
      {buttons.map((button) => {

        return (
          <button
            key={button.key}
            className="flex gap-1 p-4 h-10 items-center w-full font-semibold hover:text-primary hover:bg-gray-100"
            onClick={(e) => {
              e.stopPropagation();
              e.preventDefault();
              button.onClick?.();
              closeDropdown?.();
            }}

          >
            <Icon name={button.icon} className="h-6 w-6 text-muted-foreground" />
            {button.title}
          </button>

        )

      })}
    </div>
  );
}
