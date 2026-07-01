
import { useState } from "react";
import { BsArrowRight, BsEye, BsLock, BsEnvelope } from "react-icons/bs";
import { FiEyeOff } from "react-icons/fi";
import type { RegisterRequest } from "../type";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../auth-hook";
import { UserRoles } from "@/features/user/type";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { HOMEROUTES } from "@/features/home/paths";
import { AUTHROUTES } from "../paths";




export function SignupForm() {
    const navigate = useNavigate();
    const { mutateAsync: register } = useAuth().registerMutation;
    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState<string>("")
    const [formData, setData] = useState<RegisterRequest>({ email: "", username: "", password: "", phoneNumber: null, roles: UserRoles.Reader });
    const [confirmpassword, setConfirmPassword] = useState<string>("")
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [isAuthor, setIsAuthor] = useState(false);
    const handleChange = (name: keyof RegisterRequest, value: any) => {
        setError("")
        setData({
            ...formData,
            [name]: value
        });

    }
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setIsLoading(true);
        if (formData.email.trim() === '' || formData.password.trim() === '') {
            setError("Email and Password are Required");
            setIsLoading(false);
            return;
        }
        if (formData.password !== confirmpassword) {
            setError("Password not match");
            setIsLoading(false);
            return;
        }
        try {
            if (isAuthor) {
                formData.roles = UserRoles.Author;
            }
            const result = await register(formData);


            if (result?.isFailure) {
                setError(result.error?.message || "Registration failed");
            } else {
                navigate(HOMEROUTES.INDEX);
            }
        } catch (err: any) {
            setError(err?.message || "An unexpected error occurred");
        } finally {
            setIsLoading(false);
        }
    }
    return (
        <form
            onSubmit={handleSubmit}
            className="space-y-5 bg-card p-6 rounded-2xl shadow-sm max-w-md w-full mx-auto"
        >
            <div>

                <h3 className="text-2xl">Sign Up</h3>
            </div>

            <div className="relative w-full">
                <input
                    type="text"
                    name="username"
                    value={formData.username}
                    onChange={(e) => { handleChange(e.target.name as keyof RegisterRequest, e.target.value) }}
                    placeholder=" "
                    className="peer w-full h-14 px-4 pt-4 border border-input focus:ring-primary/30 focus:border-primary rounded-xl bg-background text-sm text-foreground outline-none focus:ring-2 transition-all"
                    required
                />
                <label className="absolute left-4 top-4 text-sm text-muted-foreground transition-all peer-focus:top-2 peer-focus:text-xs peer-focus:text-primary peer-not-placeholder-shown:top-2 peer-not-placeholder-shown:text-xs pointer-events-none">
                    Full name
                </label>
            </div>

            {/* 2. حقل البريد الإلكتروني */}
            <div className="relative w-full">
                <BsEnvelope className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground pointer-events-none z-10" />
                <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={(e) => handleChange(e.target.name as keyof RegisterRequest, e.target.value)}
                    placeholder=" "
                    className="peer w-full h-14 pl-10 pr-4 pt-4 border border-input focus:ring-primary/30 focus:border-primary rounded-xl bg-background text-sm text-foreground outline-none focus:ring-2 transition-all"
                    required
                />
                <label className="absolute left-10 top-4 text-sm text-muted-foreground transition-all peer-focus:top-2 peer-focus:text-xs peer-focus:text-primary peer-not-placeholder-shown:top-2 peer-not-placeholder-shown:text-xs pointer-events-none">
                    Email address
                </label>
            </div>

            <div className="relative w-full">
                <BsLock className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground pointer-events-none z-10" />
                <input
                    type={showPassword ? "text" : "password"}
                    name="password"
                    value={formData.password}
                    onChange={(e) => handleChange(e.target.name as keyof RegisterRequest, e.target.value)}
                    placeholder=" "
                    className="peer w-full h-14 pl-10 pr-12 pt-4 border border-input focus:ring-primary/30 focus:border-primary rounded-xl bg-background text-sm text-foreground outline-none focus:ring-2 transition-all"
                    required
                />
                <label className="absolute left-10 top-4 text-sm text-muted-foreground transition-all peer-focus:top-2 peer-focus:text-xs peer-focus:text-primary peer-not-placeholder-shown:top-2 peer-not-placeholder-shown:text-xs pointer-events-none">
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
                    value={confirmpassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    placeholder=" "
                    className="peer w-full h-14 pl-10 pr-12 pt-4 border border-input focus:ring-primary/30 focus:border-primary rounded-xl bg-background text-sm text-foreground outline-none focus:ring-2 transition-all"
                    required
                />
                <label className="absolute left-10 top-4 text-sm text-muted-foreground transition-all peer-focus:top-2 peer-focus:text-xs peer-focus:text-primary peer-not-placeholder-shown:top-2 peer-not-placeholder-shown:text-xs pointer-events-none">
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
            <div className="flex items-center space-x-2">

                <Checkbox id="term-Author" onCheckedChange={() => setIsAuthor(!isAuthor)} />
                <Label htmlFor="term-Author" className="cursor-pointer select-none">
                    Author
                </Label>
            </div>
            {(error) && (
                <div className="p-3 bg-destructive/10 text-destructive text-sm rounded-xl font-medium">
                    {error || "Something went wrong"}
                </div>
            )}
            <div className="text-center text-sm text-muted-foreground pt-2">
                Already have an account?{" "}
                <Link
                    to={`${AUTHROUTES.LOGIN}`}
                    className="text-primary font-medium hover:underline transition-all"
                >
                    Sign in
                </Link>
            </div>
            <button
                type="submit"
                disabled={isLoading}
                className="w-full h-12 bg-primary text-primary-foreground rounded-xl font-medium flex items-center justify-center gap-2 hover:opacity-90 active:scale-[0.98] transition-all disabled:opacity-50 disabled:pointer-events-none"
            >
                {isLoading ? "Creating account..." : "Create account"}
                <BsArrowRight className="h-4 w-4" />
            </button>
        </form>
    );
}