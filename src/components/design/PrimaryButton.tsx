"use client";

import { cn } from "@/lib/utils";
import { Button } from "../ui/button";
import React from "react";

interface PrimaryButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {}

const PrimaryButton = React.forwardRef<HTMLButtonElement, PrimaryButtonProps>(
  ({ className, children, ...props }, ref) => {
    return (
      <Button
        ref={ref}
        {...props}
        className={cn(
          "rounded-bl-3xl rounded-br-3xl rounded-tl-none rounded-tr-3xl drop-shadow-md",
          className,
        )}
      >
        {children}
      </Button>
    );
  },
);
PrimaryButton.displayName = "PrimaryButton";

export default PrimaryButton;
