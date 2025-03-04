import React from "react";
import {
  Input,
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
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
            <DropdownMenu className="w-full">
              <DropdownMenuTrigger type="button" className="rounded-md">
                <Input
                  type="text"
                  placeholder={placeholder}
                  className="h-8 text-sm rounded-md  focus:ring-yellow-400"
                  value={field.value || ""}
                  onChange={(e) => field.onChange(e.target.value)}
                  borderColor="#eab308"
                />
              </DropdownMenuTrigger>

              <DropdownMenuContent className="bg-yellow-400 max-h-[14rem] overflow-y-auto text-sm p-1">
                {options.length > 0 ? (
                  options.map((option) => (
                    <div
                      key={option}
                      onClick={() => {
                        field.onChange(option);
                        if (onSelect) onSelect(option);
                      }}
                      className="p-1 cursor-pointer hover:bg-yellow-500 rounded-md"
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
