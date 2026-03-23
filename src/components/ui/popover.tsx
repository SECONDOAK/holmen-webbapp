"use client";

import * as React from "react";
import * as PopoverPrimitive from "@radix-ui/react-popover@1.1.6";

import { cn } from "./utils";

// Filter out Figma inspector props that shouldn't be passed to DOM elements
const filterFigmaProps = (props: any) => {
  const { _fgT, _fgt, _fgS, _fgs, _fgB, _fgb, ...rest } = props;
  return rest;
};

function Popover(props: React.ComponentProps<typeof PopoverPrimitive.Root>) {
  return <PopoverPrimitive.Root data-slot="popover" modal={false} {...filterFigmaProps(props)} />;
}

function PopoverTrigger(props: React.ComponentProps<typeof PopoverPrimitive.Trigger>) {
  const filteredProps = filterFigmaProps(props);
  
  // If asChild is true and there are children, we need to clone the child and filter its props too
  if (filteredProps.asChild && React.isValidElement(filteredProps.children)) {
    const child = filteredProps.children as React.ReactElement;
    const childPropsFiltered = filterFigmaProps(child.props);
    const clonedChild = React.cloneElement(child, childPropsFiltered);
    
    return (
      <PopoverPrimitive.Trigger data-slot="popover-trigger" {...filteredProps}>
        {clonedChild}
      </PopoverPrimitive.Trigger>
    );
  }
  
  return <PopoverPrimitive.Trigger data-slot="popover-trigger" {...filteredProps} />;
}

function PopoverContent({
  className,
  align = "center",
  sideOffset = 4,
  ...props
}: React.ComponentProps<typeof PopoverPrimitive.Content>) {
  return (
    <PopoverPrimitive.Portal>
      <PopoverPrimitive.Content
        data-slot="popover-content"
        align={align}
        sideOffset={sideOffset}
        onCloseAutoFocus={(e) => {
          // Prevent focus issues that can cause blocking
          e.preventDefault();
        }}
        className={cn(
          "bg-popover text-popover-foreground data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 z-[9999] w-72 origin-(--radix-popover-content-transform-origin) rounded-md border p-4 shadow-md outline-hidden",
          className,
        )}
        {...filterFigmaProps(props)}
      />
    </PopoverPrimitive.Portal>
  );
}

function PopoverAnchor(props: React.ComponentProps<typeof PopoverPrimitive.Anchor>) {
  return <PopoverPrimitive.Anchor data-slot="popover-anchor" {...filterFigmaProps(props)} />;
}

export { Popover, PopoverTrigger, PopoverContent, PopoverAnchor };