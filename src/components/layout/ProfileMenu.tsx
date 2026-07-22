import Link from "next/link";
import { LogoutButton } from "@/components/auth/LogoutButton";
import { Dropdown } from "@/components/layout/Dropdown";

export function ProfileMenu({
  name,
  email,
  image,
}: {
  name: string | null;
  email: string;
  image: string | null;
}) {
  const initial = (name ?? email).trim().charAt(0).toUpperCase();

  return (
    <Dropdown
      align="right"
      trigger={
        image ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={image} alt="" className="h-9 w-9 rounded-full object-cover" />
        ) : (
          <span className="flex h-9 w-9 items-center justify-center rounded-full bg-emerald-800 text-sm font-semibold text-white">
            {initial}
          </span>
        )
      }
    >
      <div className="border-b border-stone-100 px-4 py-3">
        <p className="truncate text-sm font-medium text-stone-800">{name ?? "Your account"}</p>
        <p className="truncate text-xs text-stone-500">{email}</p>
      </div>
      <Link href="/profile" className="block px-4 py-2 text-sm text-stone-700 hover:bg-stone-50">
        Profile
      </Link>
      <Link href="/settings" className="block px-4 py-2 text-sm text-stone-700 hover:bg-stone-50">
        Settings
      </Link>
      <LogoutButton className="block w-full px-4 py-2 text-left text-sm text-stone-700 hover:bg-stone-50" />
    </Dropdown>
  );
}
