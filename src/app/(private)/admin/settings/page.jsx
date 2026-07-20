import React from "react";
import GlobalSettingsForm from "@/components/dashboard/settings/SettingsForm";
import { fetchSettings } from "@/utils/fetchers";

export const metadata = {
  title: "Admin Settings | Dashboard",
  description:
    "Configure global system parameters and corporate branding identity.",
};

export default async function SettingsPage() {
  const { settings } = await fetchSettings();

  return (
    <main className="min-h-screen bg-background/50 py-6">
      {/* CORE INTERACTIVE FORM COMPONENT FRAME */}
      <GlobalSettingsForm settingsData={settings} />
    </main>
  );
}
