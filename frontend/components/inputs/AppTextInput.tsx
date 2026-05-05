"use client";

import { forwardRef, useId } from "react";

interface AppTextInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  hint?: string;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  containerClassName?: string;
  labelClassName?: string;
}

const AppTextInput = forwardRef<HTMLInputElement, AppTextInputProps>(
  (
    {
      label,
      error,
      hint,
      leftIcon,
      rightIcon,
      containerClassName = "",
      labelClassName = "",
      className = "",
      disabled,
      id: externalId,
      ...props
    },
    ref,
  ) => {
    const generatedId = useId();
    const id = externalId ?? generatedId;
    const descriptionId = hint ? `${id}-hint` : undefined;
    const errorId = error ? `${id}-error` : undefined;

    return (
      <div className={`flex flex-col gap-1.5 w-full ${containerClassName}`}>
        {label && (
          <label
            htmlFor={id}
            className={`text-sm font-medium text-gray-300 ${labelClassName}`}
          >
            {label}
          </label>
        )}

        <div className="relative flex items-center">
          {leftIcon && (
            <span className="absolute left-4 flex items-center pointer-events-none text-gray-400">
              {leftIcon}
            </span>
          )}

          <input
            ref={ref}
            id={id}
            disabled={disabled}
            aria-invalid={!!error}
            aria-describedby={
              [descriptionId, errorId].filter(Boolean).join(" ") || undefined
            }
            className={[
              "w-full rounded-xl bg-white/5 border px-4 py-3 text-sm text-white placeholder:text-gray-500",
              "outline-none transition-colors duration-150",
              "focus:ring-2 focus:ring-purple-500 focus:border-transparent",
              leftIcon ? "pl-11" : "",
              rightIcon ? "pr-11" : "",
              error
                ? "border-red-500 focus:ring-red-500"
                : "border-white/10 hover:border-white/20",
              disabled ? "opacity-50 cursor-not-allowed" : "",
              className,
            ]
              .filter(Boolean)
              .join(" ")}
            {...props}
          />

          {rightIcon && (
            <span className="absolute right-4 flex items-center pointer-events-none text-gray-400">
              {rightIcon}
            </span>
          )}
        </div>

        {hint && !error && (
          <p id={descriptionId} className="text-xs text-gray-500">
            {hint}
          </p>
        )}

        {error && (
          <p id={errorId} role="alert" className="text-xs text-red-400">
            {error}
          </p>
        )}
      </div>
    );
  },
);

AppTextInput.displayName = "AppTextInput";

export default AppTextInput;
