import type { Content } from "@/content"

// The four "rooms" of the desktop, in corner order (top-left, top-right, bottom-left, bottom-right).
const base = [
  { id: "projects", href: "/projects", file: "projects.vol", key: "1" },
  { id: "experience", href: "/experience", file: "career.log", key: "2" },
  { id: "profile", href: "/profile", file: "profile.sys", key: "3" },
  { id: "contact", href: "/contact", file: "contact.app", key: "4" },
] as const

export type Room = (typeof base)[number] & { label: string; note: string }

/** Rooms with their labels in the page's language. `href` has no locale prefix. */
export const getRooms = (ui: Content["ui"]): Room[] => base.map((r) => ({ ...r, ...ui.rooms[r.id] }))
