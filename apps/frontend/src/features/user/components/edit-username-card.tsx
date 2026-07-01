import { useState } from "react";
import { Pencil, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
 
interface EditUsernameCardProps {
    username: string;
}

export function EditUsernameCard({ username }: EditUsernameCardProps) {
    const [isEditing, setIsEditing] = useState(false);
    const [value, setValue] = useState(username);
    // const { updateUsernameMutation } = useUserMutations();

    const startEdit = () => {
        setValue(username);
        setIsEditing(true);
    };

    const cancelEdit = () => {
        setIsEditing(false);
        setValue(username);
        // updateUsernameMutation.reset();
    };

    const handleSave = async () => {
        const trimmed = value.trim();
        if (!trimmed || trimmed === username) {
            setIsEditing(false);
            return;
        }
        // await updateUsernameMutation.mutateAsync({ username: trimmed });
        setIsEditing(false);
    };

    return (
        <div className="bg-card border rounded-xl p-5">
            <div className="flex items-center justify-between mb-3">
                <Label className="text-sm font-medium text-muted-foreground">اسم المستخدم</Label>
                {!isEditing && (
                    <Button variant="ghost" size="sm" onClick={startEdit} className="h-7 px-2">
                        <Pencil className="w-3.5 h-3.5" />
                    </Button>
                )}
            </div>

            {isEditing ? (
                <div className="flex flex-col gap-2">
                    <div className="flex items-center gap-2">
                        <Input
                            value={value}
                            onChange={(e) => setValue(e.target.value)}
                            autoFocus
                            // disabled={updateUsernameMutation.isPending}
                        />
                        <Button
                            size="icon"
                            className="shrink-0"
                            onClick={handleSave}
                            // disabled={updateUsernameMutation.isPending}
                        >
                            {/* {updateUsernameMutation.isPending ? (
                                <Loader2 className="w-4 h-4 animate-spin" />
                            ) : (
                                <Check className="w-4 h-4" />
                            )} */}
                        </Button>
                        <Button
                            size="icon"
                            variant="outline"
                            className="shrink-0"
                            onClick={cancelEdit}
                            // disabled={updateUsernameMutation.isPending}
                        >
                            <X className="w-4 h-4" />
                        </Button>
                    </div>
                    {/* {updateUsernameMutation.isError && (
                        <p className="text-sm text-destructive">تعذر تحديث الاسم، حاول مرة أخرى.</p>
                    )} */}
                </div>
            ) : (
                <p className="text-lg font-semibold text-foreground">{username}</p>
            )}
        </div>
    );
}