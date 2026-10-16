import Link from "next/link"

import { cn } from "@/lib/utils"

/** Hard-edged window: 3px ink frame, ember offset shadow, circle-× close on the left, centred title. */
export function OsWindow({
  title,
  closeHref = "/",
  className,
  bodyClassName,
  children,
  id,
}: {
  title: string
  closeHref?: string
  className?: string
  bodyClassName?: string
  children: React.ReactNode
  id?: string
}) {
  return (
    <section
      aria-labelledby={id ? `${id}-title` : undefined}
      className={cn("rv-dither flex flex-col border-[3px] border-encre bg-papier shadow-ombre", className)}
    >
      <div className="relative flex items-center gap-0.5 border-b-[3px] border-encre px-2 py-[3px] text-[14px]">
        <Link
          href={closeHref}
          aria-label="Close window"
          className="group/x grid h-[34px] w-[38px] shrink-0 place-items-center focus-visible:outline-2 focus-visible:outline-offset-[-2px] focus-visible:outline-encre focus-visible:outline-dashed max-[720px]:size-10"
        >
          <span className="relative block size-[22px] rounded-full border-2 border-current transition-[background-color,color,box-shadow] duration-100 ease-out group-hover/x:bg-encre group-hover/x:text-papier group-hover/x:shadow-[0_0_0_2px_color-mix(in_srgb,var(--encre)_18%,transparent)] group-active/x:scale-[.94] before:absolute before:top-1/2 before:left-1/2 before:h-0.5 before:w-[9px] before:-translate-1/2 before:rotate-45 before:bg-current after:absolute after:top-1/2 after:left-1/2 after:h-0.5 after:w-[9px] after:-translate-1/2 after:-rotate-45 after:bg-current" />
        </Link>
        <h2
          id={id ? `${id}-title` : undefined}
          className="pointer-events-none absolute top-1/2 left-1/2 max-w-[calc(100%-110px)] -translate-1/2 truncate text-[14px] tracking-[0.04em] max-[480px]:text-[12.5px]"
        >
          {title}
        </h2>
      </div>
      <div className={cn("min-h-0 flex-auto overflow-y-auto text-[15px] leading-[1.6]", bodyClassName)}>{children}</div>
    </section>
  )
}
