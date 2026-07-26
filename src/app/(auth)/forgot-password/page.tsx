import Link from "next/link";
import { Card } from "@/components/ui/Card";
import { ForgotPasswordForm } from "@/components/auth/ForgotPasswordForm";

export default function ForgotPasswordPage() {
  return (
    <Card>
      <h1 className="mb-2 text-xl font-semibold text-stone-900">Reset your password</h1>
      <p className="mb-6 text-sm text-stone-500">
        Enter your email and we&apos;ll send you a link to reset your password.
      </p>
      <ForgotPasswordForm />
      <p className="mt-6 text-center text-sm text-stone-500">
        <Link href="/login" className="font-medium text-emerald-800 hover:underline">
          Back to log in
        </Link>
      </p>
    </Card>
  );
}
