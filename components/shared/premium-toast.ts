import { toast } from "sonner";

// type ToastType = "success" | "error" | "info" | "warning";

interface PremiumToastOptions {
  title: string;
  description?: string;
}

export const premiumToast = {
  success: (data: PremiumToastOptions) =>
    toast.success(data.title, {
      description: data.description,
      style: {
        background: "var(--card)",
        color: "var(--foreground)",
        border: "1px solid var(--border)",
        borderLeft: "4px solid var(--primary)",
        borderRadius: "12px",
        padding: "12px",
      },
    }),

  error: (data: PremiumToastOptions) =>
    toast.error(data.title, {
      description: data.description,
      style: {
        background: "var(--card)",
        color: "var(--foreground)",
        border: "1px solid var(--border)",
        borderLeft: "4px solid #dc2626",
        borderRadius: "12px",
        padding: "12px",
      },
    }),

  info: (data: PremiumToastOptions) =>
    toast(data.title, {
      description: data.description,
      style: {
        background: "var(--card)",
        color: "var(--foreground)",
        border: "1px solid var(--border)",
        borderLeft: "4px solid var(--primary)",
        borderRadius: "12px",
        padding: "12px",
      },
    }),

  warning: (data: PremiumToastOptions) =>
    toast(data.title, {
      description: data.description,
      style: {
        background: "var(--card)",
        color: "var(--foreground)",
        border: "1px solid var(--border)",
        borderLeft: "4px solid #f59e0b",
        borderRadius: "12px",
        padding: "12px",
      },
    }),
};
