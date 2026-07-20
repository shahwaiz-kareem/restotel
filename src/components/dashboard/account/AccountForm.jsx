"use client";

import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { toast } from "sonner";
import { KeyRound, ShieldAlert } from "lucide-react";

// Shadcn UI Imports
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

// Server Action Import
import { updateAdminPassword } from "@/actions/account.actions";

// Zod Security Schema Definition
const formSchema = z
  .object({
    currentPassword: z.string().min(1, {
      message: "Current password is required to authorize changes.",
    }),
    newPassword: z.string().min(8, {
      message: "New password must be at least 8 characters long.",
    }),
    confirmPassword: z.string().min(1, {
      message: "Please re-enter your new password to confirm.",
    }),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: "The confirmed password does not match your new password.",
    path: ["confirmPassword"], // Targets the exact error message path to the UI field
  })
  .refine((data) => data.currentPassword !== data.newPassword, {
    message: "Your new password cannot be identical to your current password.",
    path: ["newPassword"],
  });

export function AccountForm({ onSuccess }) {
  // Initialize React Hook Form
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    },
  });

  // Handle Protected Form Submission
  async function onSubmit(values) {
    const toastId = toast.loading(
      "Verifying credentials and updating password..."
    );

    try {
      const result = await updateAdminPassword(
        values.currentPassword,
        values.newPassword
      );

      if (result.success) {
        toast.success("Security credentials updated successfully!", {
          id: toastId,
        });

        // Wipe fields clean post-success for privacy/security compliance
        form.reset({
          currentPassword: "",
          newPassword: "",
          confirmPassword: "",
        });

        if (onSuccess) onSuccess();
      } else {
        throw new Error(result.error);
      }
    } catch (error) {
      console.error("Account Submission Failure:", error);
      toast.error(
        error.message || "Authentication mismatch. Check your old password.",
        {
          id: toastId,
        }
      );
    }
  }

  return (
    <div className=" p-6  rounded-2xl border shadow-sm">
      <div className="mb-6 flex items-start gap-4">
        <div className="p-2.5  rounded-xl ">
          <KeyRound className="h-5 w-5" />
        </div>
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Update Password</h2>
          <p className="text-muted-foreground text-sm">
            Ensure your admin credentials use a strong, unique value to secure
            management domains.
          </p>
        </div>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
          {/* CURRENT PASSWORD */}
          <FormField
            control={form.control}
            name="currentPassword"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Current Password</FormLabel>
                <FormControl>
                  <Input
                    type="password"
                    placeholder="••••••••"
                    autoComplete="current-password"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <hr className="border-muted/60 my-2" />

          {/* NEW PASSWORD */}
          <FormField
            control={form.control}
            name="newPassword"
            render={({ field }) => (
              <FormItem>
                <FormLabel>New Password</FormLabel>
                <FormControl>
                  <Input
                    type="password"
                    placeholder="Enter a secure new password"
                    autoComplete="new-password"
                    {...field}
                  />
                </FormControl>
                <FormDescription className="text-xs">
                  Must be at least 8 characters long and differ from your old
                  one.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* CONFIRM NEW PASSWORD */}
          <FormField
            control={form.control}
            name="confirmPassword"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Confirm New Password</FormLabel>
                <FormControl>
                  <Input
                    type="password"
                    placeholder="Re-enter your new password"
                    autoComplete="new-password"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* ACTION BUTTON */}
          <Button
            type="submit"
            className="w-full h-11 text-base font-medium rounded-xl shadow-md transition-all active:scale-[0.99]"
          >
            Save Security Update
          </Button>
        </form>
      </Form>
    </div>
  );
}
