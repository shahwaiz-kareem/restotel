import { Leaf } from "lucide-react";

export default function CTA() {
  return (
    <section className="w-full py-28 md:py-36 px-6 text-center bg-primary/5 relative">
      {/* Decorative Top Line */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-px h-16 bg-primary/10" />

      <div className="max-w-3xl mx-auto flex flex-col items-center space-y-12">
        {/* Eco Philosophy Section */}
        <div className="flex flex-col items-center space-y-6">
          <div className="p-3 rounded-full bg-primary/5">
            <Leaf className="w-6 h-6 text-primary" strokeWidth={1.2} />
          </div>

          <span className="text-xs md:text-sm tracking-[0.3em] font-semibold text-primary uppercase">
            Rooted in Responsibility
          </span>

          <p className="text-lg md:text-xl text-primary/80 leading-relaxed font-light max-w-xl italic">
            &ldquo;Not a single tree was sacrificed in the creation of our
            retreat. We prioritize sustainable coexistence with the natural
            world that makes this sanctuary so extraordinary.&rdquo;
          </p>
        </div>

        {/* Elegant Transition Divider */}
        <div className="w-12 h-[1px] bg-primary/20" />

        {/* Emotional Booking Hook */}
        <div className="flex flex-col space-y-4">
          <span className="text-sm md:text-base font-serif italic text-primary/60">
            Begin Your Story
          </span>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-serif text-primary tracking-tight leading-none uppercase">
            Begin Your Escape
          </h2>
          <p className="text-sm md:text-base text-primary/70 max-w-md mx-auto pt-2">
            Reach out to us on WhatsApp to inquire about personalized stays,
            custom treks, and tailored luxury in the mountains.
          </p>
        </div>

        {/* Premium High-Impact Booking Button */}
        <div className="flex flex-col items-center space-y-4 w-full">
          <a
            href="https://wa.me/923554790062" // Direct link using contact from footer
            target="_blank"
            rel="noopener noreferrer"
            className="group relative flex items-center justify-center space-x-3 bg-primary text-primary-foreground hover:bg-primary/90 px-8 py-4 rounded-full text-sm font-semibold tracking-wider uppercase transition-all duration-300 shadow-md hover:shadow-lg active:scale-[0.98]"
          >
            {/* Minimal WhatsApp Icon representation matching Lucide style */}
            <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
              <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.06 5.348 5.397.01 12.008.01c3.202.001 6.212 1.246 8.477 3.514 2.266 2.268 3.507 5.28 3.505 8.484-.004 6.657-5.34 11.997-11.953 11.997-2.005-.001-3.973-.501-5.734-1.453L0 24zm6.59-4.846c1.6.95 3.188 1.449 4.825 1.451 5.436 0 9.86-4.37 9.864-9.799.002-2.63-1.023-5.101-2.885-6.965C16.428 1.977 13.96 1.95 12.01 1.95c-5.438 0-9.863 4.373-9.867 9.803-.001 1.73.457 3.419 1.323 4.921l-.991 3.616 3.71-.973zm11.133-7.56c-.307-.154-1.817-.895-2.097-.998-.28-.103-.483-.154-.686.154-.203.308-.787.998-.964 1.203-.178.206-.355.231-.662.077-.307-.154-1.3-.479-2.476-1.524-.914-.814-1.53-1.82-1.71-2.129-.178-.308-.019-.475.135-.629.138-.139.307-.359.462-.538.154-.18.206-.308.308-.514.103-.205.051-.385-.026-.538-.077-.154-.686-1.65-.939-2.26-.247-.591-.498-.511-.686-.521-.178-.009-.382-.01-.585-.01-.203 0-.534.077-.814.385-.28.308-1.068 1.043-1.068 2.544 0 1.501 1.093 2.951 1.246 3.156.154.205 2.152 3.285 5.213 4.607.728.314 1.296.502 1.74.643.73.232 1.396.199 1.922.121.587-.087 1.817-.743 2.071-1.462.254-.718.254-1.334.178-1.462-.076-.129-.28-.205-.587-.359z" />
            </svg>
            <span>Chat With Us on WhatsApp</span>
          </a>
          <span className="text-xs text-primary/50 tracking-wider">
            Or call us directly at +92 311 114 6868
          </span>
        </div>
      </div>
    </section>
  );
}
