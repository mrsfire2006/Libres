import { useState } from "react";
import { KeyRound } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
 
export function ChangePasswordCard() {
    const [currentPassword, setCurrentPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [successMessage, setSuccessMessage] = useState(false);
    // const { changePasswordMutation } = useUserMutations();

    const mismatch = confirmPassword.length > 0 && newPassword !== confirmPassword;
    const canSubmit =
        currentPassword.length > 0 &&
        newPassword.length >= 8 &&
        newPassword === confirmPassword 
        // &&
        // !changePasswordMutation.isPending;

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!canSubmit) return;

        setSuccessMessage(false);
        try {
            // await changePasswordMutation.mutateAsync({ currentPassword, newPassword });
            setCurrentPassword("");
            setNewPassword("");
            setConfirmPassword("");
            setSuccessMessage(true);
        } catch {
            // الخطأ متعروض تحت عن طريق changePasswordMutation.isError
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
                    <Input
                        id="current-password"
                        type="password"
                        value={currentPassword}
                        onChange={(e) => setCurrentPassword(e.target.value)}
                        autoComplete="current-password"
                    />
                </div>

                <div className="space-y-1.5">
                    <Label htmlFor="new-password">كلمة المرور الجديدة</Label>
                    <Input
                        id="new-password"
                        type="password"
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                        autoComplete="new-password"
                    />
                    {newPassword.length > 0 && newPassword.length < 8 && (
                        <p className="text-xs text-muted-foreground">لازم تكون 8 حروف على الأقل.</p>
                    )}
                </div>

                <div className="space-y-1.5">
                    <Label htmlFor="confirm-password">تأكيد كلمة المرور</Label>
                    <Input
                        id="confirm-password"
                        type="password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        autoComplete="new-password"
                    />
                    {mismatch && (
                        <p className="text-xs text-destructive">كلمتا المرور غير متطابقتين.</p>
                    )}
                </div>

                {/* {changePasswordMutation.isError && (
                    <p className="text-sm text-destructive">تعذر تغيير كلمة المرور، تأكد من كلمة المرور الحالية.</p>
                )} */}
                {successMessage && (
                    <p className="text-sm text-emerald-600 dark:text-emerald-400">تم تغيير كلمة المرور بنجاح.</p>
                )}

                <Button type="submit" disabled={!canSubmit} className="self-start mt-1">
                    {/* {changePasswordMutation.isPending ? (
                        <Loader2 className="w-4 h-4 animate-spin" />
                    ) : (
                        "حفظ كلمة المرور"
                    )} */}
                </Button>
            </form>
        </div>
    );
}