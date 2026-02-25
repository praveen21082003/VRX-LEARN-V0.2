import React, { useState } from "react";
import InputWarnMessage from "../Warning";
import Icon from "../Icon";

function Input({
    ref,
    name,
    label,
    placeholder,
    icon,
    type = "text",
    value,
    onChange,
    maxLength,
    min,
    max,
    inputWarning,
    disabled = false,
    bgClass = "bg-white",
    onKeyDown,


}) {

    const [showPassword, setShowPassword] = useState(false);
    const isPassword = type === "password";




    return (
        <div className="flex flex-col gap-2 w-full">
            {/* Label */}
            {label && (
                <label className="text-sm font-bold">
                    {label}
                </label>
            )}


            {/* Input wrapper */}
            <div className="relative flex items-center">
                {/* Icon */}
                {icon && (
                    <span className="absolute left-3">
                        {icon}
                    </span>
                )}

                {/* Input */}
                <input
                    ref={ref}
                    name={name}
                    type={isPassword && showPassword ? "text" : type}
                    value={value}
                    onChange={onChange}
                    onKeyDown={onKeyDown}
                    min={min}
                    max={max}
                    maxLength={maxLength}
                    disabled={disabled}
                    placeholder={placeholder}
                    className={`
                        w-full rounded-lg border
                        p-3 ${icon ? "pl-10" : ""}
                        text-sm
                        outline-none
                        transition
                        border-border
                        ${bgClass}
                        focus:ring-1 focus:ring-primary
                        focus:border-primary
                        disabled:bg-gray-100 disabled:cursor-not-allowed
                        [&::-ms-reveal]:hidden
                        [&::-ms-clear]:hidden
                    `}

                />
                {isPassword && (
                    <button
                        type="button"
                        onClick={() => setShowPassword((prev) => !prev)}
                        className="absolute right-3 top-1/2 -translate-y-1/2"
                    >
                        {showPassword ? <Icon name="solar:eye-bold" width="18" height="18" /> : <Icon name="humbleicons:eye-close" width="18" height="18" />}
                    </button>
                )}
            </div>
            {inputWarning && <InputWarnMessage message={inputWarning} />}

        </div>
    );
}

export default Input;
