import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import React from "react";

import { FieldErrors, FieldValues, UseFormRegister } from "react-hook-form";
import { ErrorMessage } from "@hookform/error-message";
import { Textarea } from "@/components/ui/textarea";

type Props = {
  type?: "text" | "email" | "password" | "number";
  inputType: "select" | "input" | "textarea";
  options?: { value: string; label: string; id: string }[];
  label?: string;
  placeholder: string;
  register: UseFormRegister<any>;
  name: string;
  errors?: FieldErrors<FieldValues>;
  lines?: number;
};

const FormGenerator = (props: Props) => {
  switch (props.inputType) {
    case "input":
      return (
        <Label
          className="flex flex-col gap-2 text-[#9D9D9D]"
          htmlFor={`input - ${props.label}`}
        >
          {props.label && props.label}
          <Input
            id={`input - ${props.label}`}
            type={props.type}
            placeholder={props.placeholder}
            className="bg-transparent border-themeGray  text-themeTextGray"
            {...props.register(props.name)}
          />
          <ErrorMessage
            errors={props.errors}
            name={props.name}
            render={({ message }) => (
              <p className="text-red-400 mt-2">
                {message === "Required" ? "" : message}
              </p>
            )}
          />
        </Label>
      );

    case "select":
      return (
        <Label
          className="flex flex-col gap-2 text-[#9D9D9D]"
          htmlFor={`input - ${props.label}`}
        >
          {props.label && props.label}
          <select
            id={`select-${props.label}`}
            className="w-full bg-transparent border-[1px] p-3 rounded-lg"
            {...props.register(props.name)}
          >
            {props.options?.length &&
              props.options.map((option) => (
                <option
                  value={option.value}
                  key={option.id}
                  className="dark:bg-muted"
                >
                  {option.label}
                </option>
              ))}
          </select>

          <ErrorMessage
            errors={props.errors}
            name={props.name}
            render={({ message }) => (
              <p className="text-red-400 mt-2">
                {message === "Required" ? "" : message}
              </p>
            )}
          />
        </Label>
      );

    case "textarea":
      return (
        <Label
          className="flex flex-col gap-2 text-[#9D9D9D]"
          htmlFor={`input - ${props.label}`}
        >
          {props.label && props.label}
          <Textarea
            className="bg-transparent border-themeGray text-themeTextGray"
            id={`input-${props.label}`}
            placeholder={props.placeholder}
            rows={props.lines}
            {...props.register(props.name)}
          />
          <ErrorMessage
            errors={props.errors}
            name={props.name}
            render={({ message }) => (
              <p className="text-red-400 mt-2">
                {message === "Required" ? "" : message}
              </p>
            )}
          />
        </Label>
      );
    default:
      break;
  }
};
export default FormGenerator;
