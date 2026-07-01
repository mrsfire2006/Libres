import { useRef, useState } from "react";
import { Camera } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";

interface ProfileAvatarProps {
    username: string;
    image?: string | null;
}

export function ProfileAvatar({ username, image }: ProfileAvatarProps) {
    const [open, setOpen] = useState(false);
    const [preview, setPreview] = useState<string | null>(null);
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const fileInputRef = useRef<HTMLInputElement>(null);
    // const { updateAvatarMutation } = useUserMutations();

    const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;
        setSelectedFile(file);
        setPreview(URL.createObjectURL(file));
    };

    const handleSave = async () => {
        if (!selectedFile) return;
        // await updateAvatarMutation.mutateAsync(selectedFile);
        setOpen(false);
        setPreview(null);
        setSelectedFile(null);
    };

    const handleOpenChange = (next: boolean) => {
        if (!next) {
            setPreview(null);
            setSelectedFile(null);
        }
        setOpen(next);
    };

    const currentImage = preview ?? image;

    return (
        <Dialog open={open} onOpenChange={handleOpenChange}>
            <DialogTrigger asChild>
                <button
                    type="button"
                    className="group relative w-24 h-24 rounded-full bg-accent flex items-center justify-center text-3xl font-bold overflow-hidden border shrink-0"
                    aria-label="تغيير الصورة الشخصية"
                >
                    {currentImage ? (
                        <img src={currentImage} alt={username} className="w-full h-full object-cover" />
                    ) : (
                        <span>{username.charAt(0).toUpperCase()}</span>
                    )}
                    <span className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                        <Camera className="w-6 h-6 text-white" />
                    </span>
                </button>
            </DialogTrigger>

            <DialogContent>
                <DialogHeader>
                    <DialogTitle>تغيير الصورة الشخصية</DialogTitle>
                </DialogHeader>

                <div className="flex flex-col items-center gap-4 py-4">
                    <div className="w-32 h-32 rounded-full bg-accent flex items-center justify-center text-4xl font-bold overflow-hidden border">
                        {currentImage ? (
                            <img src={currentImage} alt={username} className="w-full h-full object-cover" />
                        ) : (
                            <span>{username.charAt(0).toUpperCase()}</span>
                        )}
                    </div>

                    <input
                        ref={fileInputRef}
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={handleFileSelect}
                    />
                    <Button type="button" variant="outline" onClick={() => fileInputRef.current?.click()}>
                        اختيار صورة
                    </Button>

                    {/* {updateAvatarMutation.isError && (
                        <p className="text-sm text-destructive">تعذر رفع الصورة، حاول مرة أخرى.</p>
                    )} */}
                </div>

                <DialogFooter>
                    <Button
                        type="button"
                        onClick={handleSave}
                        // disabled={!selectedFile || updateAvatarMutation.isPending}
                    >
                        {/* {updateAvatarMutation.isPending ? (
                            <Loader2 className="w-4 h-4 animate-spin" />
                        ) : (
                            "حفظ الصورة"
                        )} */}
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}