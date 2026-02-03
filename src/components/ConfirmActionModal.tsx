import { type LucideIcon } from "lucide-react";
import { type ReactNode } from "react";
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Button } from "./ui/button";

interface ConfirmButtonProps {
  label: string;
  icon?: LucideIcon;
  onConfirm: () => void | Promise<void>;
  variant?:
    | "default"
    | "destructive"
    | "outline"
    | "secondary"
    | "ghost"
    | "link";
}

interface CancelButtonProps {
  label: string;
  onCancel: () => void | Promise<void>;
  variant?:
    | "default"
    | "destructive"
    | "outline"
    | "secondary"
    | "ghost"
    | "link";
}

interface ConfirmActionModalProps {
  isOpen: boolean;
  isLoading?: boolean;
  title: string | ReactNode;
  description: string | ReactNode;
  confirmButton: ConfirmButtonProps;
  cancelButton: CancelButtonProps;
  maxWidth?: string;
}

export const ConfirmActionModal: React.FC<ConfirmActionModalProps> = ({
  isOpen,
  isLoading = false,
  title,
  description,
  confirmButton,
  cancelButton,
  maxWidth = "sm:max-w-lg",
}) => {
  const Icon = confirmButton.icon as LucideIcon;

  const { label: confirmLabel, icon, onConfirm } = confirmButton;

  const { label: cancelLabel, onCancel } = cancelButton;

  return (
    <AlertDialog open={isOpen}>
      <AlertDialogContent
        className={`${maxWidth} bg-slate-900 border-white/10 text-white`}
      >
        <AlertDialogHeader>
          <AlertDialogTitle className="leading-tight text-white">
            {title}
          </AlertDialogTitle>

          <AlertDialogDescription className="text-slate-400">
            {description}
          </AlertDialogDescription>
        </AlertDialogHeader>

        <AlertDialogFooter
          className={`w-full flex flex-col space-y-2 sm:grid grid-cols-2 gap-2`}
        >
          <Button
            variant="outline"
            onClick={onCancel}
            disabled={isLoading}
            className="m-0 bg-transparent"
          >
            {cancelLabel}
          </Button>

          <Button variant="destructive" onClick={onConfirm}>
            {icon && <Icon className="size-4 mr-2" />}
            {confirmLabel}
          </Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};
