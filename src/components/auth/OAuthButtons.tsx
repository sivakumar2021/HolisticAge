"use client";

import { signIn } from "next-auth/react";
import { Button } from "@/components/ui/Button";

const PROVIDER_LABELS = {
  google: "Continue with Google",
  apple: "Continue with Apple",
  facebook: "Continue with Facebook",
} as const;

export function OAuthButtons({
  enabled,
}: {
  enabled: { google: boolean; apple: boolean; facebook: boolean };
}) {
  const providers = (Object.keys(PROVIDER_LABELS) as (keyof typeof PROVIDER_LABELS)[]).filter(
    (p) => enabled[p],
  );

  if (providers.length === 0) return null;

  return (
    <div className="flex flex-col gap-2">
      {providers.map((provider) => (
        <Button
          key={provider}
          type="button"
          variant="outline"
          onClick={() => signIn(provider, { callbackUrl: "/dashboard" })}
        >
          {PROVIDER_LABELS[provider]}
        </Button>
      ))}
      <div className="my-2 flex items-center gap-3 text-xs text-stone-400">
        <div className="h-px flex-1 bg-stone-200" />
        or
        <div className="h-px flex-1 bg-stone-200" />
      </div>
    </div>
  );
}
