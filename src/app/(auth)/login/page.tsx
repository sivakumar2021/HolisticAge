import Link from "next/link";
import { Card } from "@/components/ui/Card";
import { OAuthButtons } from "@/components/auth/OAuthButtons";
import { LoginForm } from "@/components/auth/LoginForm";
import { ENABLED_OAUTH_PROVIDERS } from "@/lib/auth-providers";

export default function LoginPage() {
  return (
    <Card>
      <h1 className="mb-6 text-xl font-semibold text-stone-900">Log in</h1>
      <OAuthButtons enabled={ENABLED_OAUTH_PROVIDERS} />
      <LoginForm />
      <p className="mt-4 text-center text-sm">
        <Link href="/forgot-password" className="font-medium text-emerald-800 hover:underline">
          Forgot password?
        </Link>
      </p>
      <p className="mt-2 text-center text-sm text-stone-500">
        No account yet?{" "}
        <Link href="/signup" className="font-medium text-emerald-800 hover:underline">
          Sign up
        </Link>
      </p>
    </Card>
  );
}
