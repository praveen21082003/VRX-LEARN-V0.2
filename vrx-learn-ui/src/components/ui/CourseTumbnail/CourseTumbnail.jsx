import { defaultCourse } from "@/assets";

export default function CourseThumbnail({ name, image, classRounded }) {
  const hasCustomImage = image?.trim();

  return (
    <div
      className={`relative w-full overflow-hidden ${classRounded}
      h-72 lg:h-25 xl:h-45 2xl:h-60 bg-primary group`}
    >
      <img
        src={hasCustomImage ? image : defaultCourse}
        alt={`${name} thumbnail`}
        className="w-full h-full object-cover transition-transform duration-500 ease-out group-hover:scale-110"
        onError={(e) => (e.currentTarget.src = defaultCourse)}
      />

      {!hasCustomImage && (
        <div className="absolute inset-0 flex items-center justify-between bg-[#840227A3] px-4 text-center">
          <img src="/logo-white.svg" alt="logo" className="w-20 md:16" />
          <h2 className="text-white font-semibold text-xl sm:text-2xl md:text-sm leading-snug max-w-[70%]">
            {name}
          </h2>
        </div>
      )}
    </div>
  );
}