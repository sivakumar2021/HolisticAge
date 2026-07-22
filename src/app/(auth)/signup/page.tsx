import Link from "next/link";
import { Card } from "@/components/ui/Card";
import { OAuthButtons } from "@/components/auth/OAuthButtons";
import { SignupForm } from "@/components/auth/SignupForm";
import { ENABLED_OAUTH_PROVIDERS } from "@/lib/auth-providers";

export default function SignupPage() {
  return (
    <Card>
      <h1 className="mb-6 text-xl font-semibold text-stone-900">Create your account</h1>
      <OAuthButtons enabled={ENABLED_OAUTH_PROVIDERS} />
      <SignupForm />
      <p className="mt-6 text-center text-sm text-stone-500">
        Already have an account?{" "}
        <Link href="/login" className="font-medium text-emerald-800 hover:underline">
          Log in
        </Link>
      </p>
    </Card>
  );
}
