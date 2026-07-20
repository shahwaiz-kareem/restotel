"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { loginAdmin } from "@/actions/account.actions";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function AdminLoginPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  async function handleSubmit(event) {
    event.preventDefault();
    setLoading(true);

    const formData = new FormData(event.currentTarget);
    const email = formData.get("email");
    const password = formData.get("password");

    const toastId = toast.loading("Authenticating admin...");

    const result = await loginAdmin(email, password);

    if (result.success) {
      toast.success("Welcome back.", { id: toastId });
      router.push("/admin/"); // Redirect to your protected admin area
    } else {
      toast.error(result.error, { id: toastId });
      setLoading(false);
    }
  }

  return (
    <div className="max-w-md w-full p-8 border rounded-2xl shadow-sm mx-auto mt-20">
      <h2 className="text-2xl font-bold mb-6 tracking-tight">Admin Gateway</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="text-sm font-medium mb-1 block">Admin Email</label>
          <Input
            name="email"
            type="email"
            placeholder="admin@domain.com"
            required
          />
        </div>
        <div>
          <label className="text-sm font-medium mb-1 block">Password</label>
          <Input
            name="password"
            type="password"
            placeholder="••••••••"
            required
          />
        </div>
        <Button type="submit" className="w-full" disabled={loading}>
          {loading ? "Verifying..." : "Access Dashboard"}
        </Button>
      </form>
    </div>
  );
}
