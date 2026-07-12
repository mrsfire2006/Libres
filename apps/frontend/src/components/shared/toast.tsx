// utils/toast.ts
import { toast } from "sonner";

interface ShowToastOptions {
    message: string;
    actionLabel?: string;
    onAction?: () => void;
}

export function ShowToast({ message, actionLabel, onAction }: ShowToastOptions) {

    
    toast(message, {
        action: actionLabel && onAction
            ? {
                label: actionLabel,
                onClick: onAction,
            }
            : undefined,
    });
}