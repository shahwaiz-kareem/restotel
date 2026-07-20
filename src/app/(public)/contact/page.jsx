import ContactSection from "@/components/landing/Contact";
import { fetchContactInfo } from "@/utils/fetchers";
import { cacheLife } from "next/cache";

const page = async () => {
  "use cache";
  cacheLife("max");

  let contactInfo = {};
  try {
    const contactInfoReq = await fetchContactInfo();
    contactInfo = contactInfoReq?.contactInfo;
  } catch (error) {
    console.error("Failed to load contact for contact page.");
  }
  return (
    <div className="pt-8">
      <ContactSection data={contactInfo} />
    </div>
  );
};

export default page;
