// components/edit-profile-card.tsx
import { useState } from "react";
import { Camera, Loader2, Pencil, X, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useEditUserProfileCommand } from "../user.hook";
import type { EditProfileCommand } from "../type";

interface EditProfileCardProps {
    username: string;
    image: string | null;
}

const fileToBase64 = (file: File): Promise<string> =>
    new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = () => resolve(reader.result as string);
        reader.onerror = reject;
        reader.readAsDataURL(file);
    });

export function EditProfileCard({ username, image }: EditProfileCardProps) {
    const { mutateAsync: editProfile, isPending } = useEditUserProfileCommand();
    const [error, setError] = useState<string>("")
    const [isEditing, setIsEditing] = useState(false);
    const [command, setCommand] = useState<EditProfileCommand>({ username, image });

    const hasChanges = command.username.trim() !== username || command.image !== image;

    const startEdit = () => {
        setError("")
        setCommand({ username, image });
        setIsEditing(true);
    };

    const cancelEdit = () => {
        setError("")

        setCommand({ username, image });
        setIsEditing(false);
    };

    const handleFileSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;
        const base64 = await fileToBase64(file);
        setCommand((prev) => ({ ...prev, image: base64 }));
    };

    const handleSave = async () => {
        const trimmed = command.username.trim();
        if (!trimmed || !hasChanges) {
            setIsEditing(false);
            return;
        }
        setError("")
        try {
            const result = await editProfile(command);
            if (result.isFailure) {
                setError(result.error?.message!);
            }
        } catch {
        }
        finally {

            setIsEditing(false);
        }
    };

    return (
        <div className="bg-card border rounded-xl p-5">
            <div className="flex items-center justify-between mb-4">
                <Label className="text-sm font-medium text-muted-foreground">البيانات الشخصية</Label>
                {!isEditing && (
                    <Button variant="ghost" size="sm" onClick={startEdit} className="h-7 px-2">
                        <Pencil className="w-3.5 h-3.5" />
                    </Button>
                )}
            </div>

            {isEditing ? (
                <div className="flex flex-col gap-4">
                    {/* الصورة */}
                    <div className="flex items-center gap-4">
                        <label className="group relative w-16 h-16 rounded-full bg-accent flex items-center justify-center text-lg font-bold overflow-hidden border shrink-0 cursor-pointer">
                            {command.image ? (
                                <img src={command.image} alt={command.username} className="w-full h-full object-cover" />
                            ) : (
                                <div className="w-full h-full rounded-full bg-blue-100 dark:bg-blue-900 flex items-center justify-center text-blue-700 dark:text-blue-300 font-medium">
                                    {command.username?.slice(0, 2).toUpperCase()}
                                </div>
                            )}
                            <span className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                                <Camera className="w-5 h-5 text-white" />
                            </span>
                            <input
                                type="file"
                                accept="image/*"
                                className="hidden"
                                onChange={handleFileSelect}
                                disabled={isPending}
                            />
                        </label>
                        <p className="text-xs text-muted-foreground">اضغط على الصورة لتغييرها</p>
                    </div>

                    {/* اسم المستخدم */}
                    <div className="space-y-1.5">
                        <Label htmlFor="username">اسم المستخدم</Label>
                        <Input
                            id="username"
                            value={command.username}
                            onChange={(e) => setCommand((prev) => ({ ...prev, username: e.target.value }))}
                            disabled={isPending}
                            autoFocus
                        />
                    </div>



                    <div className="flex items-center gap-2">
                        <Button onClick={handleSave} disabled={isPending || !hasChanges} size="sm">
                            {isPending ? <Loader2 className="w-4 h-4 animate-spin" /> : <Check className="w-4 h-4 me-1" />}
                            {!isPending && "Save"}
                        </Button>
                        <Button variant="outline" size="sm" onClick={cancelEdit} disabled={isPending}>
                            <X className="w-4 h-4 me-1" />
                            Cancel
                        </Button>
                    </div>
                </div>
            ) : (
                <div className="flex items-center gap-4">
                    <div className="w-16 h-16 rounded-full bg-accent flex items-center justify-center text-lg font-bold overflow-hidden border shrink-0">
                        {image ? (
                            <img src={image} alt={username} className="w-full h-full object-cover" />
                        ) : (
                            <div className="w-full h-full rounded-full bg-blue-100 dark:bg-blue-900 flex items-center justify-center text-blue-700 dark:text-blue-300 font-medium">
                                {username?.slice(0, 2).toUpperCase()}
                            </div>
                        )}
                    </div>
                    <p className="text-lg font-semibold text-foreground">{username}</p>
                </div>
            )}
            {error && (
                <p className="pt-3 text-sm text-destructive">{error}</p>
            )}
        </div>
    );
}