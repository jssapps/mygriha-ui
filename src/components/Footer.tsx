import Image from "next/image";
import Link from "next/link";
import { CONTACT_EMAIL, CONTACT_PHONE_DISPLAY, SITE_NAME } from "@/lib/constants";

export default function Footer() {
  return (
    <footer className="mt-auto border-t border-sand-100">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-14 sm:px-6 md:grid-cols-3">
        <div>
          <Link href="/" aria-label={`${SITE_NAME} home`} className="inline-block">
            <Image src="/brand/mygriha-logo.svg" alt={SITE_NAME} width={223} height={72} className="h-[72px] w-auto" />
          </Link>
          <p className="mt-3 max-w-xs text-sm leading-relaxed text-sand-900/60">
            A private advisory for a curated set of newly launched apartment
            projects along Bangalore&apos;s Electronic City corridor — every
            project vetted and documented before it appears here.
          </p>
        </div>

        <div>
          <p className="text-xs font-semibold uppercase tracking-wider text-sand-900/40">Explore</p>
          <ul className="mt-4 space-y-2.5 text-sm text-sand-900/70">
            <li>
              <Link href="/projects" className="transition-colors hover:text-sky-700">
                Featured Projects
              </Link>
            </li>
            <li>
              <Link href="/blog" className="transition-colors hover:text-sky-700">
                Insights
              </Link>
            </li>
            <li>
              <Link href="/about" className="transition-colors hover:text-sky-700">
                About Us
              </Link>
            </li>
            <li>
              <Link href="/contact" className="transition-colors hover:text-sky-700">
                Contact
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <p className="text-xs font-semibold uppercase tracking-wider text-sand-900/40">Get in touch</p>
          <ul className="mt-4 space-y-2.5 text-sm text-sand-900/70">
            <li>{CONTACT_PHONE_DISPLAY}</li>
            <li>{CONTACT_EMAIL}</li>
          </ul>
          <p className="mt-4 text-xs font-semibold uppercase tracking-wider text-sand-900/40">Legal</p>
          <ul className="mt-2.5 space-y-2 text-sm text-sand-900/70">
            <li>
              <Link href="/privacy-policy" className="transition-colors hover:text-sky-700">
                Privacy Policy
              </Link>
            </li>
            <li>
              <Link href="/terms" className="transition-colors hover:text-sky-700">
                Terms &amp; Conditions
              </Link>
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-sand-100 px-4 py-5 text-center text-xs text-sand-900/40 sm:px-6">
        © {new Date().getFullYear()} {SITE_NAME}. All project details are shared
        for information only and are subject to builder confirmation. Not a
        RERA-registered real estate agent listing platform.
      </div>
    </footer>
  );
}
