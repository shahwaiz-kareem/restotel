"use client";

import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import {
  Save,
  Moon,
  Sun,
  Layers,
  Sparkles,
  Type,
  Palette,
  CheckCircle2,
  BedDouble,
  GalleryVerticalEnd,
  ForkKnifeCrossed,
  Film,
  UploadCloud,
  X,
  Image as ImageIcon,
  Loader2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { upsertSettings } from "@/actions/settings.actions";
import { toast } from "sonner";
import { useTheme } from "next-themes";

export default function GlobalSettingsForm({ settingsData }) {
  const [isSaving, setIsSaving] = useState(false);
  const [settings, setSettings] = useState(settingsData || {});
  const [saveSuccess, setSaveSuccess] = useState(false);
  const { setTheme } = useTheme();

  // Media Preview States
  const [videoPreviewUrl, setVideoPreviewUrl] = useState(
    settingsData?.videoUrl || ""
  );
  const [logoPreviewUrl, setLogoPreviewUrl] = useState(
    settingsData?.logoUrl || ""
  );
  const [faviconPreviewUrl, setFaviconPreviewUrl] = useState(
    settingsData?.faviconUrl || ""
  );

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm({
    defaultValues: {
      brandName: settingsData?.brandName || "",
      brandColor: settingsData?.brandColor || "#6366f1",
      heroTitle: settingsData?.heroTitle || "",
      heroSubtext: settingsData?.heroSubtext || "",
      enableRooms:
        settingsData?.enableRooms !== undefined
          ? settingsData.enableRooms
          : true,
      enableGallery:
        settingsData?.enableGallery !== undefined
          ? settingsData.enableGallery
          : true,
      enableMenu:
        settingsData?.enableMenu !== undefined ? settingsData.enableMenu : true,
      isDarkMode:
        settingsData?.isDarkMode !== undefined ? settingsData.isDarkMode : true,
      heroVideo: null,
      logo: null,
      favicon: null,
    },
  });

  const watchBrandColor = watch("brandColor");
  const watchIsDarkMode = watch("isDarkMode");
  const watchHeroVideo = watch("heroVideo");
  const watchLogo = watch("logo");
  const watchFavicon = watch("favicon");

  // DOM Synchronizations
  useEffect(() => {
    if (watchIsDarkMode) {
      setTheme("dark");
    } else {
      setTheme("light");
    }
  }, [watchIsDarkMode]);

  useEffect(() => {
    if (!watchBrandColor) return;
    const root = window.document.documentElement;
    root.style.setProperty("--primary", watchBrandColor);

    const hex = watchBrandColor.replace("#", "");
    if (hex.length === 6) {
      const r = parseInt(hex.substring(0, 2), 16);
      const g = parseInt(hex.substring(2, 4), 16);
      const b = parseInt(hex.substring(4, 6), 16);
      const brightness = (r * 299 + g * 587 + b * 114) / 1000;
      root.style.setProperty(
        "--primary-foreground",
        brightness > 125 ? "#09090b" : "#ffffff"
      );
    }
  }, [watchBrandColor]);

  // Handle Client-Side Previews
  useEffect(() => {
    if (watchHeroVideo?.[0]) {
      const url = URL.createObjectURL(watchHeroVideo[0]);
      setVideoPreviewUrl(url);
      return () => URL.revokeObjectURL(url);
    }
  }, [watchHeroVideo]);

  useEffect(() => {
    if (watchLogo?.[0]) {
      const url = URL.createObjectURL(watchLogo[0]);
      setLogoPreviewUrl(url);
      return () => URL.revokeObjectURL(url);
    }
  }, [watchLogo]);

  useEffect(() => {
    if (watchFavicon?.[0]) {
      const url = URL.createObjectURL(watchFavicon[0]);
      setFaviconPreviewUrl(url);
      return () => URL.revokeObjectURL(url);
    }
  }, [watchFavicon]);

  // Submit Handler
  const onSubmit = async (values) => {
    setIsSaving(true);
    setSaveSuccess(false);

    try {
      const dataPayload = new FormData();
      dataPayload.append("brandName", values.brandName);
      dataPayload.append("brandColor", values.brandColor);
      dataPayload.append("heroTitle", values.heroTitle);
      dataPayload.append("heroSubtext", values.heroSubtext);
      dataPayload.append("enableRooms", values.enableRooms);
      dataPayload.append("enableGallery", values.enableGallery);
      dataPayload.append("enableMenu", values.enableMenu);
      dataPayload.append("isDarkMode", values.isDarkMode);

      // Append files if new ones are selected
      if (values.heroVideo?.[0])
        dataPayload.append("heroVideo", values.heroVideo[0]);
      if (values.logo?.[0]) dataPayload.append("logo", values.logo[0]);
      if (values.favicon?.[0]) dataPayload.append("favicon", values.favicon[0]);

      // Provide existing document architecture to the action
      if (settingsData?.$id) {
        dataPayload.append("documentId", settingsData.$id);
        dataPayload.append("existingVideoId", settingsData?.videoId || "");
        dataPayload.append("existingLogoId", settingsData?.logoId || "");
        dataPayload.append("existingFaviconId", settingsData?.faviconId || "");
      }

      const result = await upsertSettings(dataPayload);

      if (result.success) {
        setSettings(result.data); // Update local state with fresh DB data
        toast.success("System configurations successfully saved!");
        setSaveSuccess(true);
      } else {
        throw new Error(result.error);
      }
    } catch (error) {
      toast.error(error?.message || "Failed to save settings");
    } finally {
      setTimeout(() => {
        setIsSaving(false);
        setTimeout(() => setSaveSuccess(false), 3000);
      }, 500);
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="max-w-4xl p-6 space-y-8 animate-in fade-in-50 duration-300"
    >
      {/* HEADER */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between border-b pb-6 gap-4">
        <div>
          <h1 className="text-3xl font-extrabold tracking-tight text-zinc-900 dark:text-zinc-50">
            System Settings
          </h1>
          <p className="text-sm text-muted-foreground mt-1">
            Global operational settings parameters, active features controls,
            and brand layouts configuration.
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
          {isSaving ? "Saving..." : saveSuccess ? "Saved!" : "Save Changes"}
        </Button>
      </div>

      {/* SECTION 1: IDENTITY & PALETTES */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="space-y-1">
          <div className="flex items-center gap-2 font-bold text-sm tracking-tight text-foreground uppercase opacity-80">
            <Palette className="h-4 w-4 text-primary" />
            Brand Customization
          </div>
          <p className="text-xs text-muted-foreground leading-relaxed">
            Configure system layout names, logos, and global primary color
            assets.
          </p>
        </div>

        <div className="md:col-span-2 space-y-5 rounded-2xl border bg-card p-6 shadow-sm">
          <div className="space-y-2">
            <label className="text-xs font-bold text-foreground/80 tracking-wide">
              Brand Name
            </label>
            <Input
              {...register("brandName", {
                required: "Identity title is required",
              })}
              className="rounded-xl bg-muted/20 border-muted/80"
              placeholder="Enter brand name string..."
            />
            {errors.brandName && (
              <p className="text-xs text-destructive font-medium">
                {errors.brandName.message}
              </p>
            )}
          </div>

          <div className="space-y-3">
            <label className="text-xs font-bold text-foreground/80 tracking-wide block">
              Primary Brand Palette
            </label>
            <div className="flex items-center gap-3 pt-1">
              <div className="relative h-10 w-10 shrink-0 overflow-hidden rounded-xl border border-muted/80 shadow-inner">
                <input
                  type="color"
                  value={watchBrandColor || "#6366f1"}
                  onChange={(e) => setValue("brandColor", e.target.value)}
                  className="absolute -inset-2 h-14 w-14 cursor-pointer border-0 p-0"
                />
              </div>
              <Input
                {...register("brandColor")}
                className="rounded-xl font-mono text-xs max-w-[140px] uppercase bg-muted/20 border-muted/80"
              />
            </div>
          </div>

          {/* LOGO & FAVICON UPLOADS */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4 border-t border-muted/60">
            <div className="space-y-2">
              <label className="text-xs font-bold text-foreground/80 tracking-wide flex items-center gap-1.5">
                <ImageIcon className="h-3.5 w-3.5 text-primary" /> Brand Logo
              </label>
              {!logoPreviewUrl ? (
                <div className="relative border-2 border-dashed rounded-xl border-muted/80 hover:border-primary/60 bg-muted/10 transition-colors flex flex-col items-center justify-center p-4 text-center cursor-pointer min-h-[100px]">
                  <input
                    type="file"
                    accept="image/*"
                    {...register("logo")}
                    className="absolute inset-0 opacity-0 cursor-pointer w-full h-full z-10"
                  />
                  <UploadCloud className="h-5 w-5 text-muted-foreground mb-1 stroke-[1.5]" />
                  <span className="text-[10px] text-muted-foreground">
                    Upload PNG/JPG
                  </span>
                </div>
              ) : (
                <div className="relative rounded-xl border bg-muted/30 overflow-hidden min-h-[100px] flex items-center justify-center p-2 group">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={logoPreviewUrl}
                    alt="Logo"
                    className="max-h-[80px] object-contain"
                  />
                  <button
                    type="button"
                    onClick={() => {
                      setValue("logo", null);
                      setLogoPreviewUrl("");
                    }}
                    className="absolute top-1 right-1 h-6 w-6 rounded-md bg-black/60 text-white flex items-center justify-center hover:bg-destructive shadow"
                  >
                    <X className="h-3 w-3" />
                  </button>
                </div>
              )}
            </div>

            <div className="space-y-2">
              <label className="text-xs font-bold text-foreground/80 tracking-wide flex items-center gap-1.5">
                <ImageIcon className="h-3.5 w-3.5 text-primary" /> Browser
                Favicon
              </label>
              {!faviconPreviewUrl ? (
                <div className="relative border-2 border-dashed rounded-xl border-muted/80 hover:border-primary/60 bg-muted/10 transition-colors flex flex-col items-center justify-center p-4 text-center cursor-pointer min-h-[100px]">
                  <input
                    type="file"
                    accept="image/x-icon,image/png"
                    {...register("favicon")}
                    className="absolute inset-0 opacity-0 cursor-pointer w-full h-full z-10"
                  />
                  <UploadCloud className="h-5 w-5 text-muted-foreground mb-1 stroke-[1.5]" />
                  <span className="text-[10px] text-muted-foreground">
                    Upload ICO/PNG
                  </span>
                </div>
              ) : (
                <div className="relative rounded-xl border bg-muted/30 overflow-hidden min-h-[100px] flex items-center justify-center p-2 group">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={faviconPreviewUrl}
                    alt="Favicon"
                    className="h-10 w-10 object-contain"
                  />
                  <button
                    type="button"
                    onClick={() => {
                      setValue("favicon", null);
                      setFaviconPreviewUrl("");
                    }}
                    className="absolute top-1 right-1 h-6 w-6 rounded-md bg-black/60 text-white flex items-center justify-center hover:bg-destructive shadow"
                  >
                    <X className="h-3 w-3" />
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      <hr className="border-muted/60" />

      {/* SECTION 2: HERO BANNER TYPOGRAPHY & VIDEO MEDIA */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="space-y-1">
          <div className="flex items-center gap-2 font-bold text-sm tracking-tight text-foreground uppercase opacity-80">
            <Type className="h-4 w-4 text-primary" />
            Hero Content & Media
          </div>
          <p className="text-xs text-muted-foreground leading-relaxed">
            Modify text strings and upload high-definition background
            cinemagraphs.
          </p>
        </div>

        <div className="md:col-span-2 space-y-5 rounded-2xl border bg-card p-6 shadow-sm">
          <div className="space-y-2">
            <label className="text-xs font-bold text-foreground/80 tracking-wide">
              Hero Headline
            </label>
            <Input
              {...register("heroTitle", {
                required: "Headline string is required",
              })}
              className="rounded-xl bg-muted/20 border-muted/80"
            />
          </div>

          <div className="space-y-2">
            <label className="text-xs font-bold text-foreground/80 tracking-wide">
              Hero Subtext
            </label>
            <Textarea
              {...register("heroSubtext")}
              rows={3}
              className="rounded-xl resize-none bg-muted/20 border-muted/80 text-sm"
            />
          </div>

          <div className="space-y-2.5 pt-2">
            <label className="text-xs font-bold text-foreground/80 tracking-wide flex items-center gap-1.5">
              <Film className="h-3.5 w-3.5 text-primary" /> Cinematic Background
              Asset
            </label>
            {!videoPreviewUrl ? (
              <div className="relative border-2 border-dashed rounded-2xl border-muted/80 hover:border-primary/60 bg-muted/10 transition-colors flex flex-col items-center justify-center p-6 text-center cursor-pointer min-h-[140px]">
                <input
                  type="file"
                  accept="video/*"
                  {...register("heroVideo")}
                  className="absolute inset-0 opacity-0 cursor-pointer w-full h-full z-10"
                />
                <UploadCloud className="h-7 w-7 text-muted-foreground mb-2 stroke-[1.5]" />
                <span className="text-xs font-semibold tracking-tight">
                  Upload background stream
                </span>
                <span className="text-[10px] text-muted-foreground mt-0.5">
                  MP4, WebM up to 50MB
                </span>
              </div>
            ) : (
              <div className="relative rounded-2xl border bg-neutral-950 overflow-hidden shadow-inner aspect-video max-h-[220px] mx-auto w-full group">
                <video
                  src={videoPreviewUrl}
                  autoPlay
                  loop
                  muted
                  playsInline
                  className="w-full h-full object-cover opacity-80"
                />
                <button
                  type="button"
                  onClick={() => {
                    setValue("heroVideo", null);
                    setVideoPreviewUrl("");
                  }}
                  className="absolute top-3 right-3 h-7 w-7 rounded-full bg-black/60 border border-white/10 hover:bg-destructive text-white flex items-center justify-center shadow"
                >
                  <X className="h-3.5 w-3.5" />
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      <hr className="border-muted/60" />

      {/* SECTION 3: PLATFORM CAPABILITIES */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="space-y-1">
          <div className="flex items-center gap-2 font-bold text-sm tracking-tight text-foreground uppercase opacity-80">
            <Layers className="h-4 w-4 text-primary" />
            Platform Capabilities
          </div>
          <p className="text-xs text-muted-foreground leading-relaxed">
            Toggle operational features.
          </p>
        </div>

        <div className="md:col-span-2 space-y-3">
          {[
            {
              id: "enableRooms",
              icon: BedDouble,
              title: "Accommodations Portfolio",
              desc: "Expose lodging suites.",
            },
            {
              id: "enableGallery",
              icon: GalleryVerticalEnd,
              title: "Visual Assets Gallery",
              desc: "Publish photography files.",
            },
            {
              id: "enableMenu",
              icon: ForkKnifeCrossed,
              title: "Culinary Menu",
              desc: "Display kitchen menus.",
            },
          ].map(({ id, icon: Icon, title, desc }) => (
            <div
              key={id}
              className="flex items-center justify-between p-4 rounded-2xl border bg-card shadow-sm hover:border-muted transition-colors"
            >
              <div className="flex items-center gap-3.5">
                <div className="h-10 w-10 rounded-xl bg-muted/40 border flex items-center justify-center text-muted-foreground">
                  <Icon className="h-5 w-5" />
                </div>
                <div>
                  <label className="text-sm font-bold tracking-tight text-foreground block">
                    {title}
                  </label>
                  <span className="text-xs text-muted-foreground mt-0.5">
                    {desc}
                  </span>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setValue(id, !watch(id))}
                className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out ${
                  watch(id)
                    ? "bg-primary"
                    : "bg-neutral-200 dark:bg-neutral-800"
                }`}
              >
                <span
                  className={`inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${
                    watch(id) ? "translate-x-5" : "translate-x-0"
                  }`}
                />
              </button>
            </div>
          ))}
        </div>
      </div>

      <hr className="border-muted/60" />

      {/* SECTION 4: SYSTEM THEME */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="space-y-1">
          <div className="flex items-center gap-2 font-bold text-sm tracking-tight text-foreground uppercase opacity-80">
            <Sparkles className="h-4 w-4 text-primary" />
            System Preferences
          </div>
        </div>

        <div className="md:col-span-2 rounded-2xl border bg-card p-6 shadow-sm flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <label className="text-sm font-bold tracking-tight text-foreground block">
              Interface Mode
            </label>
            <span className="text-xs text-muted-foreground mt-0.5">
              Toggle runtime layouts parameters.
            </span>
          </div>
          <div className="grid grid-cols-2 p-1 bg-muted rounded-xl gap-1 w-full sm:w-auto min-w-[200px]">
            <button
              type="button"
              onClick={() => setValue("isDarkMode", false)}
              className={`flex items-center justify-center gap-2 py-2 text-xs font-semibold rounded-lg transition-all ${
                !watchIsDarkMode
                  ? "bg-background shadow-sm"
                  : "text-muted-foreground"
              }`}
            >
              <Sun className="h-3.5 w-3.5" /> Light
            </button>
            <button
              type="button"
              onClick={() => setValue("isDarkMode", true)}
              className={`flex items-center justify-center gap-2 py-2 text-xs font-semibold rounded-lg transition-all ${
                watchIsDarkMode
                  ? "bg-zinc-900 text-white shadow-sm"
                  : "text-muted-foreground"
              }`}
            >
              <Moon className="h-3.5 w-3.5" /> Dark
            </button>
          </div>
        </div>
      </div>
    </form>
  );
}
