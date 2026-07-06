
import { useState } from "react";
import { ArrowRight, Eye, EyeOff, Lock, Mail } from "lucide-react";
import type { LoginRequest } from "../type";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../auth-hook";
import { HOMEROUTES } from "@/features/home/paths";
import { AUTHROUTES } from "../paths";


export function LoginForm() {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState<LoginRequest>({ email: "", password: "" });

  const [error, setError] = useState<string>("");
  const { mutateAsync: login } = useAuth().loginMutation;

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (formData.email.trim() === '' || formData.password.trim() === '') {
      setError("Email and Password are Required");
      return;
    }
    const result = await login(formData);

    if (result?.isFailure) {
      setError(result.errorMessage!);
    }
    else {
      navigate(HOMEROUTES.INDEX)
    }

  }


  return (
    <form onSubmit={handleSubmit} className="space-y-5 bg-card p-6 rounded-2xl shadow-sm max-w-md w-lg mx-auto">
      <div>

        <h3 className="text-2xl">Login</h3>
      </div>
      <div className="relative w-full">

        <Mail className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground pointer-events-none" />
        <input
          type="email"
          value={formData?.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          name="email"

          placeholder=""
          className="peer w-full h-14 pl-10 pr-12 pt-4 border border-input focus:ring-primary/30 focus:border-primary rounded-xl bg-background text-sm text-foreground outline-none focus:ring-2 transition-all"
          required
        />
        <label className="absolute left-10 top-4 text-sm text-muted-foreground transition-all peer-focus:top-2 peer-focus:text-xs peer-focus:text-primary peer-not-placeholder-shown:top-2 peer-not-placeholder-shown:text-xs pointer-events-none">
          Email
        </label>
      </div>

      <div className="relative w-full">
        <Lock className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground pointer-events-none" />
        <input
          type={showPassword ? "text" : "password"}
          name="password"
          value={formData?.password}
          onChange={(e) => setFormData({ ...formData, password: e.target.value })}

          placeholder=" "
          className="peer w-full h-14 pl-10 pr-12 pt-4 border border-input focus:ring-primary/30 focus:border-primary rounded-xl bg-background text-sm text-foreground outline-none focus:ring-2 transition-all"
          required
        />
        <label className="absolute left-10 top-4 text-sm text-muted-foreground transition-all peer-focus:top-2 peer-focus:text-xs peer-focus:text-primary peer-not-placeholder-shown:top-2 peer-not-placeholder-shown:text-xs pointer-events-none">
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
        // disabled={isPending}
        type="submit"
        className="w-full h-12 bg-primary text-primary-foreground rounded-xl font-medium flex items-center justify-center gap-2 hover:opacity-90 transition-opacity"
      >
        Sign in < ArrowRight className="h-4 w-4" />
        {/* {isPending ? "loading" : (<>Sign in < ArrowRight className="h-4 w-4" /></>)} */}

      </button>

      <div className="text-center text-sm text-muted-foreground pt-2">
        Don&apos;t have an account?{" "}
        <Link
          to={`${AUTHROUTES.REGISTER}`}
          className="text-primary font-medium hover:underline transition-all"
        >
          Create an account
        </Link>
      </div>
      {error && (
        <div className="text-destructive p-3 bg-destructive/10 rounded-xl text-sm">
          {error}
        </div>
      )}
    </form>
  );
}