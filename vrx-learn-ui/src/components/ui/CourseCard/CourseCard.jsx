import React from "react";
import { Button } from "@/components/ui";
import { defaultCourse } from "@/assets";

function CourseCard({ name, author, image, buttonName, bgClass,textClass }) {
  const hasCustomImage = image?.trim();

  return (
    <div className="flex flex-col gap-4 py-6 px-4 w-full rounded-2xl bg-surface">
      
      
      <div className="relative overflow-hidden rounded-2xl lg:h-28 xl:h-38 2xl:h-60 bg-gray-200 group">
        <img
          src={hasCustomImage ? image : defaultCourse}
          alt={`${name} thumbnail`}
          className="
            w-full h-full object-cover
            transition-transform duration-500 ease-out
            group-hover:scale-110
          "
          onError={(e) => (e.currentTarget.src = defaultCourse)}
        />

        {!hasCustomImage && (
          <div className="
            absolute inset-0
            flex items-center justify-between
            bg-[#840227A3]
            px-4 text-center
          ">
            <img src="/logo-white.svg" alt="logo"/>
            <h2 className="text-white font-semibold text-sm leading-snug">
              {name}
            </h2>
          </div>
        )}
      </div>


      <div className="flex-1 text-main">
        <h1 className="text-h5 truncate">{name}</h1>
        <p className="text-small">{author}</p>
      </div>

      <Button
        buttonName= {buttonName}
        // bgClass= "bg-primary"
        className="p-3 rounded-lg"
      />
    </div>
  );
}

export default CourseCard;
