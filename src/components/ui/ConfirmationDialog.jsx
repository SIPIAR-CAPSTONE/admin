import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

export default function ConfirmationDialog({
  isOpen,
  title,
  description,
  cancelLabel = "Cancel",
  confirmLabel = "Confirm",
  onConfirm = () => {},
  onCancel = () => {},
  variant = "default",
}) {
  const buttonVariant = {
    default:
      "bg-blue-500 dark:bg-blue-600 dark:text-white hover:dark:bg-blue-700",
    destructive:
      "bg-red-500 text-white hover:bg-red-600 dark:bg-red-600 dark:text-white hover:dark:bg-red-700",
  };

  const handleConfirm = () => {
    onConfirm();
    onCancel(); //after confirm hide the dialog
  };

  return (
    <AlertDialog open={isOpen}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>{title}</AlertDialogTitle>
          <AlertDialogDescription>{description}</AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel onClick={onCancel}>
            {cancelLabel}
          </AlertDialogCancel>
          <AlertDialogAction
            onClick={handleConfirm}
            className={buttonVariant[variant]}
          >
            {confirmLabel}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
