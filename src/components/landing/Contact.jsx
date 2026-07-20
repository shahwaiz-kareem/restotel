export default function ContactSection({ data }) {
  const { phone, whatsapp, email, facebook, instagram, twitter } = data || {};

  // Custom Inline SVGs
  const icons = {
    phone: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth="1.5"
        stroke="currentColor"
        className="w-5 h-5"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 0 0 2.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.387a12.035 12.035 0 0 1-7.108-7.108c-.145-.44.02-1.27.387-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 0 0-1.091-.852H4.5A2.25 2.25 0 0 0 2.25 4.5v2.25Z"
        />
      </svg>
    ),
    whatsapp: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="currentColor"
        viewBox="0 0 24 24"
        className="w-5 h-5"
      >
        <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.003 5.324 5.328 0 11.896 0c3.181.001 6.171 1.242 8.423 3.496 2.253 2.253 3.491 5.244 3.49 8.425-.003 6.577-5.329 11.902-11.897 11.902-1.996-.001-3.956-.5-5.689-1.448L0 24zm5.835-3.266c1.651.979 3.26 1.498 4.905 1.499 5.462 0 9.906-4.444 9.909-9.911.002-2.65-1.03-5.14-2.899-7.01C15.94 3.442 13.454 2.41 10.898 2.41c-5.467 0-9.913 4.446-9.915 9.913-.001 1.761.479 3.394 1.439 4.912l-.973 3.557 3.643-.956zm14.113-7.516c-.302-.15-1.784-.881-2.059-.982-.275-.1-.475-.15-.675.15-.2.299-.775.981-.95 1.18-.175.2-.35.226-.651.075-1.365-.683-2.38-1.192-3.321-2.806-.25-.429.25-.398.714-1.32.076-.15.038-.282-.019-.382-.056-.1-.475-1.144-.651-1.567-.171-.414-.344-.358-.475-.365-.121-.006-.261-.007-.401-.007s-.367.052-.56.26c-.193.207-.736.719-.736 1.754s.752 2.036.858 2.179c.105.143 1.48 2.259 3.585 3.168.5.216.891.346 1.197.443.503.16 1.059.138 1.459.078.446-.067 1.384-.565 1.579-1.11.196-.546.196-1.017.138-1.11-.059-.094-.216-.144-.518-.295z" />
      </svg>
    ),
    email: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth="1.5"
        stroke="currentColor"
        className="w-5 h-5"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25m19.5 0v.243a2.25 2.25 0 0 1-1.07 1.916l-7.5 4.615a2.25 2.25 0 0 1-2.36 0L3.32 8.91a2.25 2.25 0 0 1-1.07-1.916V6.75"
        />
      </svg>
    ),
    facebook: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="currentColor"
        viewBox="0 0 24 24"
        className="w-5 h-5"
      >
        <path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" />
      </svg>
    ),
    instagram: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth="1.5"
        stroke="currentColor"
        className="w-5 h-5"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M6.827 6.175A2.31 2.31 0 0 1 8.686 5.5h6.628c.646 0 1.27.257 1.73.717a2.31 2.31 0 0 1 .67 1.73v6.628c0 .646-.257 1.27-.717 1.73a2.31 2.31 0 0 1-1.73.67H8.686a2.31 2.31 0 0 1-1.73-.67 2.31 2.31 0 0 1-.67-1.73V7.947c0-.646.257-1.27.717-1.73Z"
        />
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M16.5 7.5h.008v.008H16.5V7.5Z"
        />
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
        />
      </svg>
    ),
    twitter: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="currentColor"
        viewBox="0 0 24 24"
        className="w-5 h-5"
      >
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
      </svg>
    ),
  };

  // Safe checks to confirm whether there's at least one piece of data to display
  const hasContactInfo = phone || whatsapp || email;
  const hasSocials = facebook || instagram || twitter;

  if (!hasContactInfo && !hasSocials) return null;

  return (
    <section className="w-full max-w-7xl mx-auto px-4 sm:px-6 py-12 select-none">
      <div className="flex justify-between items-end mb-12">
        <h2 className="text-4xl font-heading text-center mx-auto font-bold">
          Contact Us
        </h2>
        {/* Controls map here automatically via controlsVariant="top" */}
      </div>

      <div className="w-full rounded-[2.5rem] border  bg-primary p-8 md:p-16 relative overflow-hidden shadow-2xl">
        {/* Architectural Ambient Blur Glow */}
        <div className="absolute -right-10 -bottom-10 w-96 h-96 rounded-full blur-[140px] opacity-10 pointer-events-none bg-primary" />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 relative z-10">
          {/* Left Text Block */}
          <div className="lg:col-span-5 flex flex-col justify-between space-y-6">
            <div className="space-y-4">
              <span className="text-xs font-semibold tracking-widest uppercase opacity-60 text-white flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full" />
                Connect With Us
              </span>
              <h2 className="text-4xl md:text-5xl font-heading font-bold text-white tracking-tight leading-tight">
                Get in touch.
              </h2>
              <p className="text-sm md:text-base text-neutral-200 font-sans font-light leading-relaxed max-w-sm">
                Reach out through any preferred platform. Our concierge team is
                standing by.
              </p>
            </div>
          </div>

          {/* Right Data Grid Channels */}
          <div className="lg:col-span-7 flex flex-col justify-center gap-8">
            {/* Direct Channels Column */}
            {hasContactInfo && (
              <div className="space-y-3">
                <p className="text-[10px] font-bold uppercase tracking-widest text-neutral-300 mb-2 px-1">
                  Direct Channels
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {phone && (
                    <a
                      href={`tel:${phone}`}
                      className="group flex items-center gap-4 p-4 rounded-2xl bg-white/[0.02] border border-white/[0.04] hover:bg-white/[0.05] hover:border-white/[0.1] transition-all duration-300"
                    >
                      <div className="p-3 rounded-xl bg-white/[0.03] text-neutral-200 group-hover:text-white transition-colors hover-primary">
                        {icons.phone}
                      </div>
                      <div className="truncate">
                        <span className="text-[10px] uppercase font-semibold text-neutral-300 tracking-wider block">
                          Phone
                        </span>
                        <span className="text-sm font-medium text-white tracking-tight">
                          {phone}
                        </span>
                      </div>
                    </a>
                  )}

                  {whatsapp && (
                    <a
                      href={`https://wa.me/${whatsapp.replace(/[^0-9]/g, "")}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group flex items-center gap-4 p-4 rounded-2xl bg-white/[0.02] border border-white/[0.04] hover:bg-white/[0.05] hover:border-white/[0.1] transition-all duration-300"
                    >
                      <div className="p-3 rounded-xl bg-white/[0.03] text-neutral-200 group-hover:text-emerald-400 transition-colors">
                        {icons.whatsapp}
                      </div>
                      <div className="truncate">
                        <span className="text-[10px] uppercase font-semibold text-neutral-300 tracking-wider block">
                          WhatsApp
                        </span>
                        <span className="text-sm font-medium text-white tracking-tight">
                          Message Us
                        </span>
                      </div>
                    </a>
                  )}

                  {email && (
                    <a
                      href={`mailto:${email}`}
                      className="group flex items-center gap-4 p-4 rounded-2xl bg-white/[0.02] border border-white/[0.04] hover:bg-white/[0.05] hover:border-white/[0.1] transition-all duration-300 sm:col-span-2"
                    >
                      <div className="p-3 rounded-xl bg-white/[0.03] text-neutral-200 group-hover:text-white transition-colors">
                        {icons.email}
                      </div>
                      <div className="truncate">
                        <span className="text-[10px] uppercase font-semibold text-neutral-300 tracking-wider block">
                          Email Address
                        </span>
                        <span className="text-sm font-medium text-white tracking-tight">
                          {email}
                        </span>
                      </div>
                    </a>
                  )}
                </div>
              </div>
            )}

            {/* Social Grid Channels */}
            {hasSocials && (
              <div className="space-y-3">
                <p className="text-[10px] font-bold uppercase tracking-widest text-neutral-300 mb-2 px-1">
                  Social Ecosystem
                </p>
                <div className="grid grid-cols-3 gap-3">
                  {facebook && (
                    <a
                      href={facebook}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group flex flex-col items-center justify-center p-5 rounded-2xl bg-white/[0.01] border border-white/[0.03] hover:bg-white/[0.04] hover:border-white/[0.08] transition-all duration-300 text-center gap-2"
                    >
                      <div className="text-neutral-300 group-hover:text-blue-500 transition-colors transform group-hover:scale-105 duration-300">
                        {icons.facebook}
                      </div>
                      <span className="text-[11px] font-medium text-neutral-200 group-hover:text-white transition-colors">
                        Facebook
                      </span>
                    </a>
                  )}

                  {instagram && (
                    <a
                      href={instagram}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group flex flex-col items-center justify-center p-5 rounded-2xl bg-white/[0.01] border border-white/[0.03] hover:bg-white/[0.04] hover:border-white/[0.08] transition-all duration-300 text-center gap-2"
                    >
                      <div className="text-neutral-300 group-hover:text-pink-400 transition-colors transform group-hover:scale-105 duration-300">
                        {icons.instagram}
                      </div>
                      <span className="text-[11px] font-medium text-neutral-200 group-hover:text-white transition-colors">
                        Instagram
                      </span>
                    </a>
                  )}

                  {twitter && (
                    <a
                      href={twitter}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group flex flex-col items-center justify-center p-5 rounded-2xl bg-white/[0.01] border border-white/[0.03] hover:bg-white/[0.04] hover:border-white/[0.08] transition-all duration-300 text-center gap-2"
                    >
                      <div className="text-neutral-300 group-hover:text-white transition-colors transform group-hover:scale-105 duration-300">
                        {icons.twitter}
                      </div>
                      <span className="text-[11px] font-medium text-neutral-200 group-hover:text-white transition-colors">
                        Twitter / X
                      </span>
                    </a>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
