import Image from "next/image";
import Link from "next/link";
import { FaFacebook, FaLinkedin, FaXTwitter } from "react-icons/fa6";

const navigation = [
  {
    title: "Pages",
    links: [
      { name: "Home", href: "/" },
      { name: "About", href: "/about" },
      { name: "Services", href: "/services" },
      { name: "Resources", href: "/resources" },
      { name: "Contact", href: "/contact" },
    ],
  },
  {
    title: "Resources",
    links: [
      { name: "Forms and Files", href: "/resources/forms-and-files" },
      { name: "Volunteer", href: "/resources/volunteer" },
      { name: "Donate", href: "/resources/donate" },
      { name: "Guides", href: "/resources/guides" },
    ],
  },
  {
    title: "Data Usage",
    links: [
      { name: "Terms of Service", href: "/your-data/terms-of-service" },
      { name: "Privacy Policy", href: "/your-data/privacy-policy" },
      { name: "Data Protection", href: "/your-data/data-protection" },
      { name: "Cookie Policy", href: "/your-data/cookie-policy" },
    ],
  },
];

const socialLinks = [
  { name: "Twitter", icon: FaXTwitter, href: "https://twitter.com" },
  { name: "Facebook", icon: FaFacebook, href: "https://facebook.com" },
  { name: "LinkedIn", icon: FaLinkedin, href: "https://linkedin.com" },
];

export const Footer = () => {
  return (
    <footer className="bg-background py-12 sm:py-16 md:py-24">
      <div className="container mx-auto max-w-7xl px-5 md:px-6">
        {/* Logo and newsletter section */}
        <div className="mb-10 flex flex-col items-start justify-between gap-10 border-b pb-10 sm:mb-16 sm:pb-12 md:flex-row">
          <div className="w-full max-w-full sm:max-w-sm">
            <Link href="/" aria-label="MCRC logo">
              <Image
                src="/images/logos/mcrc-logo.png"
                alt="MCRC logo"
                className="mb-6 h-16 w-auto dark:invert"
                width={100}
                height={100}
              />
            </Link>
            <p className="mb-8 text-base text-muted-foreground">
              MCRC is a non-profit organization that seeks to improve the lives of the community.
            </p>

            {/* Newsletter subscription */}
            <div className="flex w-full max-w-full flex-col gap-3 sm:max-w-md sm:flex-row">
              <input
                type="email"
                placeholder="Your email"
                className="flex h-12 flex-1 rounded-md border border-input bg-background px-4 py-2 text-base ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50 sm:h-10 sm:text-sm"
              />
              <button className="inline-flex h-12 items-center justify-center rounded-md bg-primary px-6 py-2 text-base font-medium whitespace-nowrap text-primary-foreground ring-offset-background transition-colors hover:bg-primary/90 focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:outline-none disabled:pointer-events-none disabled:opacity-50 sm:h-10 sm:px-4 sm:text-sm">
                Subscribe
              </button>
            </div>
          </div>

          {/* Navigation Section */}
          <div className="w-full border-t pt-8 sm:border-t-0 sm:pt-0">
            <nav className="grid w-full grid-cols-1 gap-x-12 gap-y-8 sm:grid-cols-2 md:w-auto md:grid-cols-3">
              {navigation.map((section) => (
                <div key={section.title} className="min-w-[140px]">
                  <h2 className="mb-4 text-lg font-semibold">
                    {section.title}
                  </h2>
                  <ul className="space-y-3.5">
                    {section.links.map((link) => (
                      <li key={link.name}>
                        <Link
                          href={link.href}
                          className="inline-block py-1 text-muted-foreground transition-colors duration-200 hover:text-foreground active:text-primary"
                        >
                          {link.name}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </nav>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="flex flex-col items-center justify-between gap-6 md:flex-row">
          <div className="order-1 mb-6 flex w-full items-center justify-center gap-6 sm:justify-start md:order-2 md:mb-0 md:w-auto">
            {socialLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                aria-label={`Visit our ${link.name} page`}
                className="rounded-full p-3 text-muted-foreground transition-all duration-200 hover:bg-accent hover:text-foreground active:bg-accent/70"
                rel="noopener noreferrer"
                target="_blank"
              >
                <link.icon className="h-6 w-6 sm:h-5 sm:w-5" />
              </Link>
            ))}
          </div>

          {/* Copyright - Below on mobile, left on desktop */}
          <p className="order-2 text-center text-sm text-muted-foreground sm:text-left md:order-1">
            © {new Date().getFullYear()} MCRC Howard County. All rights reserved.{" "}
            <Link
              href="/"
              className="text-foreground underline underline-offset-4 transition-colors hover:text-primary"
              target="_blank"
            >
              MCRC Howard County
            </Link>
          </p>
        </div>
      </div>
    </footer>
  );
};
