import { notFound } from "next/navigation"

// Unknown paths inside a language ("/mn/nope") get that language's 404 page.
export default function CatchAll() {
  notFound()
}
