import React from "react";
import { AccountForm } from "@/components/dashboard/account/AccountForm";
import ContactInfoForm from "@/components/dashboard/account/ContactInfoForm";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Shield, PhoneCall, ShieldAlert } from "lucide-react";
import { fetchContactInfo } from "@/utils/fetchers";

export const metadata = {
  title: "Account & Profile Settings | Dashboard",
  description:
    "Manage your brand communication directory and administrator security keys.",
};

export default async function SecuritySettingsPage() {
  const { contactInfo } = await fetchContactInfo();

  return (
    <main className="min-h-screen bg-background/50 py-6 animate-in fade-in-50 duration-300">
      <div className="max-w-4xl m px-4 sm:px-6 lg:px-8 space-y-6">
        {/* SHADCN TABS ROOT CONTROLLER */}
        <Tabs defaultValue="contact" className="w-full space-y-6">
          {/* NAVIGATION BAR TRIGGERS */}
          <div className="border-b pb-1">
            <TabsList className="bg-muted/60 p-1 rounded-xl h-11 border">
              <TabsTrigger
                value="contact"
                className="rounded-lg text-xs font-semibold px-4 gap-2 data-[state=active]:bg-background data-[state=active]:shadow-sm transition-all h-9"
              >
                <PhoneCall className="h-3.5 w-3.5 opacity-70" />
                Contact Directory
              </TabsTrigger>

              <TabsTrigger
                value="security"
                className="rounded-lg text-xs font-semibold px-4 gap-2 data-[state=active]:bg-background data-[state=active]:shadow-sm transition-all h-9"
              >
                <Shield className="h-3.5 w-3.5 opacity-70" />
                Security & Access
              </TabsTrigger>
            </TabsList>
          </div>

          {/* TAB PANEL 1: CONTACT REGISTRY DIRECTORY */}
          <TabsContent
            value="contact"
            className="mt-0 focus-visible:outline-none"
          >
            <ContactInfoForm contactInfo={contactInfo} />
          </TabsContent>

          {/* TAB PANEL 2: SECURITY MODIFICATION FORM */}
          <TabsContent
            value="security"
            className="mt-0 space-y-6 focus-visible:outline-none"
          >
            <div className="flex flex-col gap-8 items-start">
              {/* Left Bar Directive Context */}
              <div className="space-y-1">
                <div className="flex items-center gap-2 font-bold text-sm tracking-tight text-foreground uppercase opacity-80">
                  <ShieldAlert className="h-4 w-4 text-primary" />
                  Access Keys
                </div>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  Update root entry credentials. Changing this will invalidate
                  current sessions across admin devices.
                </p>
              </div>

              <AccountForm />
            </div>

            <hr className="border-muted/60" />
          </TabsContent>
        </Tabs>
      </div>
    </main>
  );
}
