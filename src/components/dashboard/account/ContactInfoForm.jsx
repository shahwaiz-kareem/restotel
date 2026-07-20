"use client";

import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";

import {
  Save,
  CheckCircle2,
  Phone,
  Mail,
  MessageSquare,
  Building2,
  AlertCircle,
  Loader2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { upsertContactInfo } from "@/actions/contactInfo.actions";

export default function ContactInfoForm({ contactInfo }) {
  const [isSaving, setIsSaving] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);

  // 1. INITIALIZE REACT-HOOK-FORM ENGINE
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      phone: contactInfo?.phone || "",
      whatsapp: contactInfo?.whatsapp || "",
      email: contactInfo?.email || "",
      facebook: contactInfo?.facebook || "",
      instagram: contactInfo?.instagram || "",
      twitter: contactInfo?.twitter || "",
      linkedin: contactInfo?.linkedin || "",
      docId: contactInfo?.$id || "",
    },
  });

  const onSubmit = async (data) => {
    try {
      const formData = new FormData();
      formData.append("phone", data.phone);
      formData.append("whatsapp", data.whatsapp);
      formData.append("email", data.email);
      formData.append("facebook", data.facebook);
      formData.append("instagram", data.instagram);
      formData.append("twitter", data.twitter);
      formData.append("linkedin", data.linkedin);

      await upsertContactInfo(data.docId || null, formData);

      setIsSaving(true);
      setSaveSuccess(false);

      // 'data' payload arrives pre-validated and neatly bundled
    } catch (error) {}
    // Simulate API storage transmission latency
    setTimeout(() => {
      setIsSaving(false);
      setSaveSuccess(true);
      setTimeout(() => setSaveSuccess(false), 4000);
    }, 1000);
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="p-6 space-y-8 animate-in fade-in-50 duration-300"
    >
      {/* MODULE HEADER BAR */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between border-b pb-6 gap-4">
        <div>
          <h1 className="text-3xl font-extrabold tracking-tight tex-neutral-900 dark:text-neutral-50">
            Contact & Social Registry
          </h1>
          <p className="text-sm text-muted-foreground mt-1">
            Manage your brand's operational connectivity channels, hotlines, and
            public social networks.
          </p>
        </div>

        <Button
          type="submit"
          disabled={isSaving}
          className="rounded-xl shadow-md font-semibold text-xs tracking-wider uppercase gap-2 bg-primary text-primary-foreground transition-all duration-200 active:scale-95"
        >
          {isSaving ? (
            <span className="h-4 w-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
          ) : saveSuccess ? (
            <CheckCircle2 className="h-4 w-4 text-emerald-400 animate-bounce" />
          ) : (
            <Save className="h-4 w-4" />
          )}
          {isSaving
            ? "Syncing..."
            : saveSuccess
            ? "Saved Successfully!"
            : "Save"}
        </Button>
      </div>

      {/* SECTION 1: PRIMARY COMMUNICATIONS NETWORK */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="space-y-1">
          <div className="flex items-center gap-2 font-bold text-sm tracking-tight text-foreground uppercase opacity-80">
            <Building2 className="h-4 w-4 text-primary" />
            Core Comm Channels
          </div>
          <p className="text-xs text-muted-foreground leading-relaxed">
            Specify public contact endpoints where guests, customers, and
            operations staff reach support.
          </p>
        </div>

        <div className="md:col-span-2 space-y-5 rounded-2xl border bg-card p-6 shadow-sm">
          {/* Phone Field */}
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-foreground/80 tracking-wide">
              Phone Number
            </label>
            <div className="relative">
              <Phone className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground/70" />
              <Input
                type="tel"
                {...register("phone", {
                  required: "Hotline number is required",
                })}
                className={`pl-10 rounded-xl bg-muted/20 ${
                  errors.phone
                    ? "border-destructive focus-visible:ring-destructive"
                    : "border-muted/80"
                }`}
                placeholder="+1 (555) 000-0000"
              />
            </div>
            {errors.phone && (
              <span className="text-xs font-medium text-destructive flex items-center gap-1 mt-1">
                <AlertCircle className="h-3 w-3" /> {errors.phone.message}
              </span>
            )}
          </div>

          {/* WhatsApp Direct Line */}
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-foreground/80 tracking-wide">
              Whatsapp Number
            </label>
            <div className="relative">
              <MessageSquare className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground/70" />
              <Input
                type="tel"
                {...register("whatsapp", {
                  required: "WhatsApp messaging line is required",
                })}
                className={`pl-10 rounded-xl bg-muted/20 ${
                  errors.whatsapp
                    ? "border-destructive focus-visible:ring-destructive"
                    : "border-muted/80"
                }`}
                placeholder="+1 (555) 000-0000"
              />
            </div>
            {errors.whatsapp && (
              <span className="text-xs font-medium text-destructive flex items-center gap-1 mt-1">
                <AlertCircle className="h-3 w-3" /> {errors.whatsapp.message}
              </span>
            )}
          </div>

          {/* Support Email Entry */}
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-foreground/80 tracking-wide">
              Business Email
            </label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground/70" />
              <Input
                type="email"
                {...register("email", {
                  required: "Operational email is required",
                  pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                    message: "Invalid email lookup address structure",
                  },
                })}
                className={`pl-10 rounded-xl bg-muted/20 ${
                  errors.email
                    ? "border-destructive focus-visible:ring-destructive"
                    : "border-muted/80"
                }`}
                placeholder="support@yourbrand.com"
              />
            </div>
            {errors.email && (
              <span className="text-xs font-medium text-destructive flex items-center gap-1 mt-1">
                <AlertCircle className="h-3 w-3" /> {errors.email.message}
              </span>
            )}
          </div>
        </div>
      </div>

      <hr className="border-muted/60" />

      {/* SECTION 2: SOCIAL NETWORK LINKING INDEX */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="space-y-1">
          <div className="flex items-center gap-2 font-bold text-sm tracking-tight text-foreground uppercase opacity-80">
            <Instagram className="h-4 w-4 text-primary" />
            Social Ecosystem
          </div>
          <p className="text-xs text-muted-foreground leading-relaxed">
            Link dynamic public profiles to expose unified brand channels inside
            page footers and headers.
          </p>
        </div>

        <div className="md:col-span-2 space-y-4 rounded-2xl border bg-card p-6 shadow-sm">
          {/* Instagram Endpoint Router */}
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-foreground/80 tracking-wide">
              Instagram Profile URL
            </label>
            <div className="relative">
              <Instagram className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-pink-600 dark:text-pink-400" />
              <Input
                type="url"
                {...register("instagram", {
                  pattern: {
                    value: /^https?:\/\/.+/i,
                    message: "Invalid absolute URL link prefix",
                  },
                })}
                className="pl-10 rounded-xl bg-muted/20 border-muted/80 text-xs font-mono"
                placeholder="https://instagram.com/username"
              />
            </div>
            {errors.instagram && (
              <span className="text-xs text-destructive mt-1 block">
                {errors.instagram.message}
              </span>
            )}
          </div>

          {/* Facebook Handle Linker */}
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-foreground/80 tracking-wide">
              Facebook Page URL
            </label>
            <div className="relative">
              <Facebook className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-blue-600 dark:text-blue-400" />
              <Input
                type="url"
                {...register("facebook", {
                  pattern: {
                    value: /^https?:\/\/.+/i,
                    message: "Invalid absolute URL link prefix",
                  },
                })}
                className="pl-10 rounded-xl bg-muted/20 border-muted/80 text-xs font-mono"
                placeholder="https://facebook.com/pagename"
              />
            </div>
            {errors.facebook && (
              <span className="text-xs text-destructive mt-1 block">
                {errors.facebook.message}
              </span>
            )}
          </div>

          {/* Twitter / X Identity Router */}
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-foreground/80 tracking-wide">
              X / Twitter Handle URL
            </label>
            <div className="relative">
              <Twitter className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-neutral-900 dark:text-neutral-100" />
              <Input
                type="url"
                {...register("twitter", {
                  pattern: {
                    value: /^https?:\/\/.+/i,
                    message: "Invalid absolute URL link prefix",
                  },
                })}
                className="pl-10 rounded-xl bg-muted/20 border-muted/80 text-xs font-mono"
                placeholder="https://x.com/username"
              />
            </div>
            {errors.twitter && (
              <span className="text-xs text-destructive mt-1 block">
                {errors.twitter.message}
              </span>
            )}
          </div>

          {/* LinkedIn Identity Linker */}
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-foreground/80 tracking-wide">
              LinkedIn Corporate Profile URL
            </label>
            <div className="relative">
              <Linkedin className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-sky-700 dark:text-sky-400" />
              <Input
                type="url"
                {...register("linkedin", {
                  pattern: {
                    value: /^https?:\/\/.+/i,
                    message: "Invalid absolute URL link prefix",
                  },
                })}
                className="pl-10 rounded-xl bg-muted/20 border-muted/80 text-xs font-mono"
                placeholder="https://linkedin.com/company/brand"
              />
            </div>
            {errors.linkedin && (
              <span className="text-xs text-destructive mt-1 block">
                {errors.linkedin.message}
              </span>
            )}
          </div>
        </div>
      </div>
    </form>
  );
}

const Facebook = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
  </svg>
);

const Instagram = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
    <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
  </svg>
);

const Twitter = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z" />
  </svg>
);

const Linkedin = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
    <rect width="4" height="12" x="2" y="9" />
    <circle cx="4" cy="4" r="2" />
  </svg>
);
