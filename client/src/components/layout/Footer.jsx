import { Link } from "react-router-dom";
import { motion, useReducedMotion } from "framer-motion";
import { Github, Linkedin, Instagram, ArrowUpRight } from "lucide-react";

import { NAV_LINKS } from "../../lib/constants.js";
import { useSettings } from "../../context/SettingsContext.jsx";
import Wordmark from "../ui/Wordmark.jsx";

const FOOTER_LINKS = ["Work", "Services", "About", "Contact"];

export default function Footer() {
  const reduce = useReducedMotion();
  const { settings } = useSettings();
  const site = settings?.site;
  const socials = site?.socials || {};

  const socialLinks = [
    { icon: Github, href: socials.github || "https://github.com", label: "GitHub" },
    { icon: Linkedin, href: socials.linkedin || "https://linkedin.com", label: "LinkedIn" },
    { icon: Instagram, href: socials.instagram || "https://instagram.com", label: "Instagram" },
  ];

  const links = NAV_LINKS.filter((l) => FOOTER_LINKS.includes(l.label));

  return (
    <footer className="border-t border-line bg-ink-50">
      <div className="container-page py-14 sm:py-16">
        <motion.div
          initial={reduce ? false : { opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.5 }}
          className="grid gap-10 md:grid-cols-[1.4fr_1fr_1fr]"
        >
          <div>
            <Link to="/" aria-label="koru. home">
              <Wordmark textSize="text-2xl" />
            </Link>
            <p className="mt-4 max-w-sm text-sm leading-relaxed text-sage">
              {site?.footerTagline || "An independent digital studio crafting distinctive websites."}
            </p>
            <div className="mt-6 flex gap-2">
              {socialLinks.map(({ icon: Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="flex h-10 w-10 items-center justify-center rounded-xl border border-line bg-white/[0.02] text-sage transition-all hover:border-accent/40 hover:text-accent"
                >
                  <Icon size={18} />
                </a>
              ))}
            </div>
          </div>

          <nav aria-label="Footer">
            <h3 className="text-sm font-semibold uppercase tracking-wider text-muted">Studio</h3>
            <ul className="mt-4 space-y-2.5">
              {links.map((link) => (
                <li key={link.to}>
                  <Link
                    to={link.to}
                    className="group inline-flex items-center gap-1 text-sm text-sage transition-colors hover:text-cream"
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
          </nav>

          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-muted">Services</h3>
            <ul className="mt-4 space-y-2.5 text-sm text-sage">
              <li>Website design &amp; development</li>
              <li>Landing pages</li>
              <li>Website redesigns</li>
              <li>Responsive development</li>
              <li>Website maintenance</li>
            </ul>
          </div>
        </motion.div>

        <div className="mt-12 flex flex-col gap-3 border-t border-line pt-6 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-sm text-muted">
            © {new Date().getFullYear()} Koru. All rights reserved.
          </p>
          <p className="text-xs text-muted">Independent digital studio.</p>
        </div>
      </div>
    </footer>
  );
}
