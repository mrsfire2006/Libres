import { useState } from "react";
import { Eye, EyeOff, KeyRound, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import type { UpdatePasswordCommand } from "../type";
import { useUpdatePassword } from "../user.hook";

type MessageState = "none" | "error" | 'success'
type Message = {
    state: MessageState,
    message: string
}
export function ChangePasswordCard() {
    const [passwordCommand, setPasswordCommand] = useState<UpdatePasswordCommand>({ currentPassword: "", newPassword: "" });
    const [confirmPassword, setConfirmPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);

    const [message, setMessage] = useState<Message>({
        message: "",
        state: "none"
    });

    const { mutateAsync: UpdatePassword, isPending } = useUpdatePassword();

    const mismatch = passwordCommand.newPassword !== confirmPassword;

    const canSubmit =
        passwordCommand.newPassword === confirmPassword &&
        !isPending;

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!canSubmit) return;

        setMessage({
            message: "",
            state: "none"
        });
        try {
            const result = await UpdatePassword(passwordCommand);
            console.log(result)
            if (result.isFailure) {
                setMessage({ message: result.errorMessage!, state: "error" });
            }
            else if (result.isSuccess) {
                setMessage({ message: result.value!, state: "success" });
            }
        } catch {
            setMessage({
                message: "حدث خطأ غير متوقع، يرجى المحاولة لاحقاً.",
                state: "error"
            });
        }

    };

    return (
        <div className="bg-card border rounded-xl p-5">
            <div className="flex items-center gap-2 mb-4">
                <KeyRound className="w-4 h-4 text-muted-foreground" />
                <h3 className="text-sm font-medium text-muted-foreground">تغيير كلمة المرور</h3>
            </div>

            <form onSubmit={handleSubmit} className="flex flex-col gap-3">
                <div className="space-y-1.5">
                    <Label htmlFor="current-password">كلمة المرور الحالية</Label>
                    <div className="relative">
                        <Input
                            id="current-password"
                            type={showPassword ? "text" : "password"}
                            value={passwordCommand.currentPassword}
                            onChange={(e) => setPasswordCommand({ ...passwordCommand, currentPassword: e.target.value })}
                            autoComplete="current-password"
                            className="pr-10" // مساحة للأيقونة على اليمين
                        />
                        <button
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            className="absolute inset-y-0 right-3 flex items-center text-muted-foreground hover:text-foreground transition-colors"
                            tabIndex={-1}
                        >
                            {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                        </button>
                    </div>
                </div>

                <div className="space-y-1.5">
                    <Label htmlFor="new-password">كلمة المرور الجديدة</Label>
                    <div className="relative">
                        <Input
                            id="new-password"
                            type={showPassword ? "text" : "password"}
                            value={passwordCommand.newPassword}
                            onChange={(e) => setPasswordCommand({ ...passwordCommand, newPassword: e.target.value })}
                            autoComplete="new-password"
                            className="pr-10"
                        />
                        <button
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            className="absolute inset-y-0 right-3 flex items-center text-muted-foreground hover:text-foreground transition-colors"
                            tabIndex={-1}

                        >
                            {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                        </button>
                    </div>
                </div>

                <div className="space-y-1.5">
                    <Label htmlFor="confirm-password">تأكيد كلمة المرور</Label>
                    <div className="relative">
                        <Input
                            id="confirm-password"
                            type={showPassword ? "text" : "password"}
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            autoComplete="new-password"
                            className="pr-10" // مساحة للأيقونة على اليمين
                        />
                        <button
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            className="absolute inset-y-0 right-3 flex items-center text-muted-foreground hover:text-foreground transition-colors"
                            tabIndex={-1}

                        >
                            {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                        </button>
                    </div>
                    {mismatch && (
                        <p className="text-xs text-destructive mt-1">كلمتا المرور غير متطابقتين.</p>
                    )}
                </div>

                {message && message.state == "error" && (
                    <p className="text-sm text-destructive">{message.message}</p>
                )}
                {message && message.state == "success" && (
                    <p className="text-sm text-emerald-600 dark:text-emerald-400">{message.message}</p>
                )}

                <Button type="submit" disabled={!canSubmit} className="self-start mt-1">
                    {isPending ? (
                        <Loader2 className="w-4 h-4 animate-spin" />
                    ) : (
                        "حفظ كلمة المرور"
                    )}
                </Button>
            </form>
        </div>
    );
}