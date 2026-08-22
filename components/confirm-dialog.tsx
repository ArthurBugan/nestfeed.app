import { Trash2 } from "lucide-react";
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

interface ConfirmDialogProps {
	open: boolean;
	onOpenChange: (open: boolean) => void;
	title: string;
	description: string;
	onConfirm: () => void;
	cancelText?: string;
	confirmText?: string;
	variant?: "default" | "destructive";
}

export function ConfirmDialog({
	open,
	onOpenChange,
	title,
	description,
	onConfirm,
	cancelText = "Cancel",
	confirmText = "Delete",
	variant = "destructive",
}: ConfirmDialogProps) {
	return (
		<AlertDialog open={open} onOpenChange={onOpenChange}>
			<AlertDialogContent>
				<AlertDialogHeader>
					<div className="flex items-center gap-3">
						<div
							className={`flex h-10 w-10 items-center justify-center rounded-full ${
								variant === "destructive"
									? "bg-red-500/10"
									: "bg-destructive/10"
							}`}
						>
							<Trash2
								className={`h-5 w-5 ${
									variant === "destructive"
										? "text-red-500"
										: "text-destructive"
								}`}
							/>
						</div>
						<AlertDialogTitle className="text-base">{title}</AlertDialogTitle>
					</div>
					<AlertDialogDescription className="pt-2">
						{description}
					</AlertDialogDescription>
				</AlertDialogHeader>
				<AlertDialogFooter>
					<AlertDialogCancel>{cancelText}</AlertDialogCancel>
					<AlertDialogAction
						onClick={(e) => {
							e.preventDefault();
							onConfirm();
						}}
						className={
							variant === "destructive" ? "bg-red-500 hover:bg-red-600" : ""
						}
					>
						{confirmText}
					</AlertDialogAction>
				</AlertDialogFooter>
			</AlertDialogContent>
		</AlertDialog>
	);
}
