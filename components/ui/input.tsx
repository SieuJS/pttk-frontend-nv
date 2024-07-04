"use client";
import clsx from "clsx";
import {
  FieldErrors,
  UseFormRegisterReturn,
} from "react-hook-form";
import { ChangeEvent } from "react";
import { AlignLeft } from "lucide-react";

interface InputProps {
  label?: string;
  id: string;
  type?: string;
  register?: UseFormRegisterReturn;
  errors?: FieldErrors;
  disabled?: boolean;
  noLabel?: boolean;
  isTextArea?: boolean;
  placeHolder?: string;
  noBorder?: boolean;
  onChange?: (event: ChangeEvent<HTMLInputElement>) => void;
  value?: string;
  alignRight? : boolean;
  onBlur? : (event: any) => void;
  className? : string;
}

const Input: React.FC<InputProps> = ({
  label,
  id,
  type,
  register,
  errors,
  disabled,
  isTextArea,
  alignRight,
  noLabel,
  placeHolder,
  value,
  onChange,
  noBorder,
  onBlur,
  className
}) => {
  const inputElement = isTextArea ? (
    <textarea
      id={id}
      value = {value}
      autoComplete={id}
      rows={6}
      disabled={disabled}
      placeholder={placeHolder}
      onBlur={onBlur}
      {...register}
      
      className={clsx(
        `block
      w-full
      rounded-md
      border-0
      py-1.5
      px-1
      text-gray-900
      shadow-md
      ring-1
      ring-inset
      ring-gray-300
      placeholder:text-gray-400
      focus:ring-2
      focus:outline-purple-600
      sm:text-sm
      sm:leading-6
      truncate ...
      text-${!alignRight?  "left" : "right"}
       ${className}
      `,
        errors && id && errors[id] && "ring-rose-700",
        disabled && "opacity-50 cursor-default"
      )}
    />
  ) : (
    <input
      id={id}
      type={type}
      autoComplete={id}
      name={id}
      value={value}
      disabled={disabled}
      placeholder={placeHolder}
      onChange={onChange}
      onBlur={onBlur}
      {...register}

      className={clsx(
        `block
      w-full
      rounded-md
      border-0
      py-1.5
      px-1
      text-gray-900
      shadow-md
      ring-1
      ring-inset
      ring-gray-300
      placeholder:text-gray-400
      focus:ring-2
      focus:outline-purple-600
      sm:text-sm
      sm:leading-6
      text-${!alignRight?  "left" : "right"}
      ${className}
      `,

        // DELETED MB-5
        errors && id && errors[id] && "ring-rose-700",
        disabled && "opacity-50 cursor-default",
        noBorder && "ring-0 shadow-none mb-5"
      )}
    />
  );

  return (
    <div>
      {!noLabel && (
        <label
          htmlFor={id}
          className="block text-sm font-medium leading-6 text-gray-900 mb-2 truncate"
        >
          {label}:
        </label>
      )}
      <div>
        {inputElement}
        {errors && id && errors[id] && (
          <span className="text-red-600 text-sm">
            {id && errors[id]?.message && (
              <>{id && errors[id]?.message}</>
            )}
            {id && !errors[id]?.message && `${label} is required`}
          </span>
        )}
      </div>
    </div>
  );
};

export default Input;