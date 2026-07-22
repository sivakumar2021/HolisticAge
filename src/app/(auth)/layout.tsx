import Link from "next/link";

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-full flex-col items-center justify-center bg-stone-50 px-6 py-16">
      <Link href="/" className="mb-8 text-lg font-semibold tracking-tight text-emerald-900">
        Holistic Age
      </Link>
      <div className="w-full max-w-sm">{children}</div>
    </div>
  );
}
