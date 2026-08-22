import { Link } from "react-router-dom";
import { Github, Linkedin, Instagram, ArrowUpRight } from "lucide-react";

import { NAV_LINKS } from "../../lib/constants.js";
import { useSettings } from "../../context/SettingsContext.jsx";

export default function Footer() {
  const { settings } = useSettings();
  const site = settings?.site;
  const socials = site?.socials || {};

  const socialLinks = [
    { icon: Github, href: socials.github || "https://github.com", label: "GitHub" },
    { icon: Linkedin, href: socials.linkedin || "https://linkedin.com", label: "LinkedIn" },
    { icon: Instagram, href: socials.instagram || "https://instagram.com", label: "Instagram" },
  ];

  return (
    <footer className="border-t border-white/[0.06] bg-ink-50">
      <div className="container-page py-14 sm:py-16">
        <div className="grid gap-10 md:grid-cols-[1.4fr_1fr_1fr]">
          <div>
            <Link to="/" className="text-xl font-extrabold tracking-tight text-white">
              {site?.name || "KORU"}
            </Link>
            <p className="mt-3 max-w-sm text-sm leading-relaxed text-zinc-400">
              {site?.footerTagline || "Digital experiences built for ambitious businesses."}
            </p>
            <div className="mt-6 flex gap-2">
              {socialLinks.map(({ icon: Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 bg-white/[0.03] text-zinc-400 transition-all hover:border-accent/40 hover:text-accent"
                >
                  <Icon size={18} />
                </a>
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-zinc-500">Navigate</h3>
            <ul className="mt-4 space-y-2.5">
              {NAV_LINKS.map((link) => (
                <li key={link.to}>
                  <Link
                    to={link.to}
                    className="group inline-flex items-center gap-1 text-sm text-zinc-400 transition-colors hover:text-white"
                  >
                    {link.label}
                    <ArrowUpRight
                      size={13}
                      className="opacity-0 transition-all group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:opacity-100"
                    />
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-zinc-500">Services</h3>
            <ul className="mt-4 space-y-2.5 text-sm text-zinc-400">
              <li>Business Websites</li>
              <li>Landing Pages</li>
              <li>E-commerce</li>
              <li>Custom Web Apps</li>
              <li>Redesigns</li>
            </ul>
          </div>
        </div>

        <div className="mt-12 flex flex-col gap-3 border-t border-white/[0.06] pt-6 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-sm text-zinc-500">
            © 2026 {site?.name || "KORU"}. All rights reserved.
          </p>
          <p className="text-xs text-zinc-600">Built with care in India.</p>
        </div>
      </div>
    </footer>
  );
}