import Link from "next/link";
import { Dropdown } from "@/components/layout/Dropdown";

export function AboutMenu() {
  return (
    <Dropdown
      trigger={
        <span className="flex items-center gap-1 text-sm font-medium text-stone-600 hover:text-stone-900">
          About
          <svg viewBox="0 0 20 20" fill="currentColor" className="h-4 w-4">
            <path
              fillRule="evenodd"
              d="M5.23 7.21a.75.75 0 011.06.02L10 11.19l3.71-3.96a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z"
              clipRule="evenodd"
            />
          </svg>
        </span>
      }
    >
      <Link href="/about" className="block px-4 py-2 text-sm text-stone-700 hover:bg-stone-50">
        About Us
      </Link>
      <Link
        href="/how-it-works"
        className="block px-4 py-2 text-sm text-stone-700 hover:bg-stone-50"
      >
        How it works
      </Link>
      <Link href="/science" className="block px-4 py-2 text-sm text-stone-700 hover:bg-stone-50">
        Science
      </Link>
    </Dropdown>
  );
}
