"use client";

import { useState } from "react";
import { ArrowRight, Eye, EyeOff, Lock, Mail } from "lucide-react";
import { loginAction } from "../actions/login-action";
import { Error } from "@/libres.domain/common/error";
import Link from "next/link";
import { ROUTES } from "@/constants/constant";

export function LoginForm() {
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState<Error | undefined>(Error.None);
  const [data, setData] = useState<{ email: string, password: string }>({ email: "", password: "" });


  return (
    <form action={async (formData: FormData) => {
      setError(Error.None);
      const result = await loginAction(formData);

      if (result?.isFailure && result?.error) {
        setError(Error.Validation(result.error.message));
      } else if (result?.isSuccess) {
        window.location.href = "/";
      }
    }} className="space-y-5 bg-card p-6 rounded-2xl shadow-sm max-w-md w-lg mx-auto">
      <div>

        <h3 className="text-2xl">Login</h3>
      </div>
      <div className="relative w-full">

        <Mail className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground pointer-events-none" />
        <input
          type="email"
          value={data?.email}
          onChange={(e) => setData({ ...data, email: e.target.value })}
          name="email"

          placeholder=""
          className="peer w-full h-14 pl-10 pr-12 pt-4 border border-input focus:ring-primary/30 focus:border-primary rounded-xl bg-background text-sm text-foreground outline-none focus:ring-2 transition-all"
          required
        />
        <label className="absolute left-10 top-4 text-sm text-muted-foreground transition-all peer-focus:top-2 peer-focus:text-xs peer-focus:text-primary peer-[:not(:placeholder-shown)]:top-2 peer-[:not(:placeholder-shown)]:text-xs pointer-events-none">
          Email
        </label>
      </div>

      <div className="relative w-full">
        <Lock className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground pointer-events-none" />
        <input
          type={showPassword ? "text" : "password"}
          name="password"
          value={data?.password}
          onChange={(e) => setData({ ...data, password: e.target.value })}

          placeholder=" "
          className="peer w-full h-14 pl-10 pr-12 pt-4 border border-input focus:ring-primary/30 focus:border-primary rounded-xl bg-background text-sm text-foreground outline-none focus:ring-2 transition-all"
          required
        />
        <label className="absolute left-10 top-4 text-sm text-muted-foreground transition-all peer-focus:top-2 peer-focus:text-xs peer-focus:text-primary peer-[:not(:placeholder-shown)]:top-2 peer-[:not(:placeholder-shown)]:text-xs pointer-events-none">
          Password
        </label>

        <button
          type="button"
          onClick={() => setShowPassword((p) => !p)}
          tabIndex={-1}
          className="absolute right-3 top-1/2 -translate-y-1/2 p-1 text-muted-foreground hover:text-foreground transition-colors"
        >
          {showPassword ? (
            <EyeOff className="h-4 w-4" />
          ) : (
            <Eye className="h-4 w-4" />
          )}
        </button>
      </div>

      <div className="text-right">
        <button
          type="button"
          className="text-sm text-primary hover:underline"
        >
          Forgot password?
        </button>
      </div>

      <button
        type="submit"
        className="w-full h-12 bg-primary text-primary-foreground rounded-xl font-medium flex items-center justify-center gap-2 hover:opacity-90 transition-opacity"
      >
        Sign in
        <ArrowRight className="h-4 w-4" />
      </button>

      <div className="text-center text-sm text-muted-foreground pt-2">
        Don&apos;t have an account?{" "}
        <Link
          href={ROUTES.AUTHREGISTER}
          className="text-primary font-medium hover:underline transition-all"
        >
          Create an account
        </Link>
      </div>
      {error && error !== Error.None && (
        <div className="text-destructive p-3 bg-destructive/10 rounded-xl text-sm">
          {error.message}
        </div>
      )}
    </form>
  );
}