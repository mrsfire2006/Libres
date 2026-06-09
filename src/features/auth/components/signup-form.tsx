"use client";

import { Error } from "@/libres.domain/common/error";
import { useState, useTransition } from "react";
import { BsArrowRight, BsEye, BsLock, BsEnvelope } from "react-icons/bs";
import { FiEyeOff } from "react-icons/fi";
import { signupAction } from "../actions/signup-action";
import Link from "next/link";
import { ROUTES } from "@/constants/constant";

interface DataType { email: string, username: string, password: string, confirmpassword: string }


export default function SignupForm() {
    const [error, setError] = useState<Error | undefined>(Error.None);
    const [showPassword, setShowPassword] = useState(false);
    const [isPending, startTransition] = useTransition();
    const [data, setData] = useState<DataType>({ email: "", username: "", password: "", confirmpassword: "" });
    const handleChange = (name: keyof DataType, value: any) => {
        setError(Error.None);
        setData({
            ...data,
            [name]: value
        });
    }
    return (
        <form
            action={(formData: FormData) => {
                setError(Error.None);

                startTransition(async () => {
                    const result = await signupAction(formData);

                    if (result?.isFailure && result?.error) {
                        setError(Error.Validation(result.error.message));
                    } else if (result?.isSuccess) {
                        window.location.href = "/";
                    }
                });
            }}
            className="space-y-5 bg-card p-6 rounded-2xl shadow-sm max-w-md w-full mx-auto"
        >
            <div>

                <h3 className="text-2xl">Sign Up</h3>
            </div>

            <div className="relative w-full">
                <input
                    type="text"
                    name="username"
                    value={data.username}
                    onChange={(e) => { setData({ ...data, username: e.target.value }) }}
                    placeholder=" "
                    className="peer w-full h-14 px-4 pt-4 border border-input focus:ring-primary/30 focus:border-primary rounded-xl bg-background text-sm text-foreground outline-none focus:ring-2 transition-all"
                    required
                />
                <label className="absolute left-4 top-4 text-sm text-muted-foreground transition-all peer-focus:top-2 peer-focus:text-xs peer-focus:text-primary peer-[:not(:placeholder-shown)]:top-2 peer-[:not(:placeholder-shown)]:text-xs pointer-events-none">
                    Full name
                </label>
            </div>

            {/* 2. حقل البريد الإلكتروني */}
            <div className="relative w-full">
                <BsEnvelope className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground pointer-events-none z-10" />
                <input
                    type="email"
                    name="email"
                    value={data.email}
                    onChange={(e) => handleChange(e.target.name as keyof DataType, e.target.value)}
                    placeholder=" "
                    className="peer w-full h-14 pl-10 pr-4 pt-4 border border-input focus:ring-primary/30 focus:border-primary rounded-xl bg-background text-sm text-foreground outline-none focus:ring-2 transition-all"
                    required
                />
                <label className="absolute left-10 top-4 text-sm text-muted-foreground transition-all peer-focus:top-2 peer-focus:text-xs peer-focus:text-primary peer-[:not(:placeholder-shown)]:top-2 peer-[:not(:placeholder-shown)]:text-xs pointer-events-none">
                    Email address
                </label>
            </div>

            <div className="relative w-full">
                <BsLock className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground pointer-events-none z-10" />
                <input
                    type={showPassword ? "text" : "password"}
                    name="password"
                    value={data.password}
                    onChange={(e) => handleChange(e.target.name as keyof DataType, e.target.value)}
                    placeholder=" "
                    className="peer w-full h-14 pl-10 pr-12 pt-4 border border-input focus:ring-primary/30 focus:border-primary rounded-xl bg-background text-sm text-foreground outline-none focus:ring-2 transition-all"
                    required
                />
                <label className="absolute left-10 top-4 text-sm text-muted-foreground transition-all peer-focus:top-2 peer-focus:text-xs peer-focus:text-primary peer-[:not(:placeholder-shown)]:top-2 peer-[:not(:placeholder-shown)]:text-xs pointer-events-none">
                    Password
                </label>
                <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 p-1 text-muted-foreground hover:text-foreground focus:outline-none z-10"
                    tabIndex={-1}
                >
                    {showPassword ? <FiEyeOff className="h-4 w-4" /> : <BsEye className="h-4 w-4" />}
                </button>
            </div>

            <div className="relative w-full">
                <BsLock className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground pointer-events-none z-10" />
                <input
                    type={showPassword ? "text" : "password"}
                    name="confirmpassword"
                    value={data.confirmpassword}
                    onChange={(e) => handleChange(e.target.name as keyof DataType, e.target.value)}
                    placeholder=" "
                    className="peer w-full h-14 pl-10 pr-12 pt-4 border border-input focus:ring-primary/30 focus:border-primary rounded-xl bg-background text-sm text-foreground outline-none focus:ring-2 transition-all"
                    required
                />
                <label className="absolute left-10 top-4 text-sm text-muted-foreground transition-all peer-focus:top-2 peer-focus:text-xs peer-focus:text-primary peer-[:not(:placeholder-shown)]:top-2 peer-[:not(:placeholder-shown)]:text-xs pointer-events-none">
                    Confirm password
                </label>
                <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 p-1 text-muted-foreground hover:text-foreground focus:outline-none z-10"
                    tabIndex={-1}
                >
                    {showPassword ? <FiEyeOff className="h-4 w-4" /> : <BsEye className="h-4 w-4" />}
                </button>
            </div>
            {error && error !== Error.None && (
                <div className="p-3 bg-destructive/10 text-destructive text-sm rounded-xl font-medium">
                    {error.message}
                </div>
            )}
            <div className="text-center text-sm text-muted-foreground pt-2">
                Already have an account?{" "}
                <Link
                    href={ROUTES.AUTHLOGIN}  
                    className="text-primary font-medium hover:underline transition-all"
                >
                    Sign in
                </Link>
            </div>
            <button
                type="submit"
                disabled={isPending}
                className="w-full h-12 bg-primary text-primary-foreground rounded-xl font-medium flex items-center justify-center gap-2 hover:opacity-90 active:scale-[0.98] transition-all disabled:opacity-50 disabled:pointer-events-none"
            >
                {isPending ? "Creating account..." : "Create account"}
                <BsArrowRight className="h-4 w-4" />
            </button>
        </form>
    );
}