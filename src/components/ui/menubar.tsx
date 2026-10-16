"use client"

import * as React from "react"
import { Menubar as MenubarPrimitive } from "radix-ui"

import { cn } from "@/lib/utils"

// shadcn/ui menubar, restyled as the OS menu bar: bracketed triggers, hard-edged
// 304px dropdowns with a grid-coloured offset shadow, and a "›" marker on hover.

function Menubar({ className, ...props }: React.ComponentProps<typeof MenubarPrimitive.Root>) {
  return <MenubarPrimitive.Root data-slot="menubar" className={cn("flex items-stretch", className)} {...props} />
}
function MenubarMenu(props: React.ComponentProps<typeof MenubarPrimitive.Menu>) {
  return <MenubarPrimitive.Menu data-slot="menubar-menu" {...props} />
}
function MenubarGroup(props: React.ComponentProps<typeof MenubarPrimitive.Group>) {
  return <MenubarPrimitive.Group data-slot="menubar-group" {...props} />
}
function MenubarPortal(props: React.ComponentProps<typeof MenubarPrimitive.Portal>) {
  return <MenubarPrimitive.Portal data-slot="menubar-portal" {...props} />
}
function MenubarRadioGroup(props: React.ComponentProps<typeof MenubarPrimitive.RadioGroup>) {
  return <MenubarPrimitive.RadioGroup data-slot="menubar-radio-group" {...props} />
}
function MenubarTrigger({ className, ...props }: React.ComponentProps<typeof MenubarPrimitive.Trigger>) {
  return (
    <MenubarPrimitive.Trigger
      data-slot="menubar-trigger"
      className={cn(
        "mbtn flex items-center px-4 text-[14px] text-encre outline-none select-none max-[720px]:px-3 max-[720px]:text-[13px] max-[480px]:px-[11px] max-[480px]:text-[11px]",
        className,
      )}
      {...props}
    />
  )
}
function MenubarContent({
  className,
  align = "start",
  alignOffset = 0,
  sideOffset = 0,
  ...props
}: React.ComponentProps<typeof MenubarPrimitive.Content>) {
  return (
    <MenubarPortal>
      <MenubarPrimitive.Content
        data-slot="menubar-content"
        align={align}
        alignOffset={alignOffset}
        sideOffset={sideOffset}
        className={cn(
          "menu-stair z-[300] max-h-[calc(100dvh-64px)] w-[304px] max-w-[calc(100vw-16px)] overflow-y-auto border border-encre bg-papier p-1.5 text-encre shadow-light outline-none",
          className,
        )}
        {...props}
      />
    </MenubarPortal>
  )
}
function MenubarItem({
  className,
  inset,
  ...props
}: React.ComponentProps<typeof MenubarPrimitive.Item> & { inset?: boolean }) {
  return (
    <MenubarPrimitive.Item
      data-slot="menubar-item"
      data-inset={inset}
      className={cn(
        "di flex min-h-11 cursor-default items-baseline justify-between gap-3 py-2.5 pr-2.5 pl-6 text-[14px] text-encre outline-none select-none data-[disabled]:pointer-events-none data-[disabled]:opacity-50 data-[highlighted]:bg-grid data-[highlighted]:text-creme",
        className,
      )}
      {...props}
    />
  )
}
function MenubarRadioItem({ className, children, ...props }: React.ComponentProps<typeof MenubarPrimitive.RadioItem>) {
  return (
    <MenubarPrimitive.RadioItem
      data-slot="menubar-radio-item"
      className={cn(
        "di flex min-h-11 cursor-default items-baseline justify-between gap-3 py-2.5 pr-2.5 pl-6 text-[14px] text-encre outline-none select-none data-[highlighted]:bg-grid data-[highlighted]:text-creme",
        className,
      )}
      {...props}
    >
      {children}
      <MenubarPrimitive.ItemIndicator className="text-[10px]">◆</MenubarPrimitive.ItemIndicator>
    </MenubarPrimitive.RadioItem>
  )
}
function MenubarLabel({ className, inset, ...props }: React.ComponentProps<typeof MenubarPrimitive.Label> & { inset?: boolean }) {
  return (
    <MenubarPrimitive.Label
      data-slot="menubar-label"
      data-inset={inset}
      className={cn("px-2.5 pt-2 pb-1 pl-6 text-[10px] tracking-[0.1em] text-creme/60 uppercase", className)}
      {...props}
    />
  )
}
function MenubarSeparator({ className, ...props }: React.ComponentProps<typeof MenubarPrimitive.Separator>) {
  return <MenubarPrimitive.Separator data-slot="menubar-separator" className={cn("mx-2.5 my-1.5 h-px bg-grid", className)} {...props} />
}
function MenubarShortcut({ className, ...props }: React.ComponentProps<"kbd">) {
  return <kbd data-slot="menubar-shortcut" className={cn("shrink-0 border border-grid px-[5px] font-sans text-[11px]", className)} {...props} />
}
function MenubarSub(props: React.ComponentProps<typeof MenubarPrimitive.Sub>) {
  return <MenubarPrimitive.Sub data-slot="menubar-sub" {...props} />
}
function MenubarSubTrigger({
  className,
  inset,
  children,
  ...props
}: React.ComponentProps<typeof MenubarPrimitive.SubTrigger> & { inset?: boolean }) {
  return (
    <MenubarPrimitive.SubTrigger
      data-slot="menubar-sub-trigger"
      data-inset={inset}
      className={cn(
        "di flex min-h-11 cursor-default items-baseline justify-between gap-3 py-2.5 pr-2.5 pl-6 text-[14px] text-encre outline-none select-none data-[highlighted]:bg-grid data-[highlighted]:text-creme data-[state=open]:bg-grid data-[state=open]:text-creme",
        className,
      )}
      {...props}
    >
      {children}
      <span aria-hidden className="text-[16px] leading-none opacity-70">›</span>
    </MenubarPrimitive.SubTrigger>
  )
}
function MenubarSubContent({ className, ...props }: React.ComponentProps<typeof MenubarPrimitive.SubContent>) {
  return (
    <MenubarPortal>
      <MenubarPrimitive.SubContent
        data-slot="menubar-sub-content"
        className={cn("z-[310] w-60 border border-encre bg-papier p-1.5 text-encre shadow-light outline-none", className)}
        {...props}
      />
    </MenubarPortal>
  )
}

export {
  Menubar, MenubarPortal, MenubarMenu, MenubarTrigger, MenubarContent, MenubarGroup, MenubarSeparator,
  MenubarLabel, MenubarItem, MenubarShortcut, MenubarRadioGroup, MenubarRadioItem,
  MenubarSub, MenubarSubTrigger, MenubarSubContent,
}
