import React, { useState } from "react";
import {
  Input,
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  Button,
  DropdownMenuSeparator,
} from "pixel-retroui";
import { PixelBubble } from "@modules/common/components/bubble";
import { Controller } from "react-hook-form";

type DropdownInputProps = {
  control: any;
  name: string;
  options: string[];
  placeholder?: string;
  error?: string;
  onSelect?: (value: string) => void;
};

const DropdownInput: React.FC<DropdownInputProps> = ({
  control,
  name,
  options,
  placeholder = "Type or select",
  error,
  onSelect,
}) => {
  const [inputValue, setInputValue] = useState("");

  return (
    <div className="relative w-full">
      {error && (
        <PixelBubble
          text={error}
          direction="left"
          className="text-xs font-normal text-red-500"
          borderColor="#ef4444"
        />
      )}

      <Controller
        name={name}
        control={control}
        render={({ field }) => (
          <div className="relative flex">
            <DropdownMenu className="w-full ">
              <DropdownMenuTrigger type="button">
                <Input
                  {...field}
                  type="text"
                  placeholder={placeholder}
                  className="rounded-md w-full"
                  borderColor="#eab308"
                  value={inputValue}
                  onChange={(e) => {
                    setInputValue(e.target.value);
                    field.onChange(e.target.value);
                  }}
                />
              </DropdownMenuTrigger>

              <DropdownMenuContent className=" bg-yellow-400 max-h-[18rem] overflow-y-scroll">
                {options.length > 0 ? (
                  options.map((option) => (
                    <div
                      key={option}
                      onClick={() => {
                        setInputValue(option);
                        field.onChange(option);
                        if (onSelect) onSelect(option);
                      }}
                    >
                      <DropdownMenuItem>{option}</DropdownMenuItem>
                      <DropdownMenuSeparator />
                    </div>
                  ))
                ) : (
                  <DropdownMenuItem>No options available</DropdownMenuItem>
                )}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        )}
      />
    </div>
  );
};

export default DropdownInput;
