"use client";

import * as React from "react";
import * as TooltipPrimitive from "@radix-ui/react-tooltip@1.1.8";

import { cn } from "./utils";

// Filter out Figma inspector props that shouldn't be passed to DOM elements
const filterFigmaProps = (props: any) => {
  const { _fgT, _fgt, _fgS, _fgs, _fgB, _fgb, ...rest } = props;
  return rest;
};

function TooltipProvider({
  delayDuration = 0,
  ...props
}: React.ComponentProps<typeof TooltipPrimitive.Provider>) {
  return (
    <TooltipPrimitive.Provider
      data-slot="tooltip-provider"
      delayDuration={delayDuration}
      {...filterFigmaProps(props)}
    />
  );
}

function Tooltip({
  ...props
}: React.ComponentProps<typeof TooltipPrimitive.Root>) {
  return (
    <TooltipProvider>
      <TooltipPrimitive.Root data-slot="tooltip" {...filterFigmaProps(props)} />
    </TooltipProvider>
  );
}

function TooltipTrigger({
  ...props
}: React.ComponentProps<typeof TooltipPrimitive.Trigger>) {
  const filteredProps = filterFigmaProps(props);
  
  // If asChild is true and there are children, we need to clone the child and filter its props too
  if (filteredProps.asChild && React.isValidElement(filteredProps.children)) {
    const child = filteredProps.children as React.ReactElement;
    const childPropsFiltered = filterFigmaProps(child.props);
    const clonedChild = React.cloneElement(child, childPropsFiltered);
    
    return <TooltipPrimitive.Trigger data-slot="tooltip-trigger" {...filteredProps}>
      {clonedChild}
    </TooltipPrimitive.Trigger>;
  }
  
  return <TooltipPrimitive.Trigger data-slot="tooltip-trigger" {...filteredProps} />;
}

function TooltipContent({
  className,
  sideOffset = 0,
  children,
  ...props
}: React.ComponentProps<typeof TooltipPrimitive.Content>) {
  return (
    <TooltipPrimitive.Portal>
      <TooltipPrimitive.Content
        data-slot="tooltip-content"
        sideOffset={sideOffset}
        className={cn(
          "bg-primary text-primary-foreground animate-in fade-in-0 zoom-in-95 data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 z-50 w-fit origin-(--radix-tooltip-content-transform-origin) rounded-md px-2 py-1.5 text-xs text-balance",
          className,
        )}
        {...props}
      >
        {children}
        <TooltipPrimitive.Arrow className="bg-primary fill-primary z-50 size-2.5 translate-y-[calc(-50%_-_2px)] rotate-45 rounded-[2px]" />
      </TooltipPrimitive.Content>
    </TooltipPrimitive.Portal>
  );
}

export { Tooltip, TooltipTrigger, TooltipContent, TooltipProvider };