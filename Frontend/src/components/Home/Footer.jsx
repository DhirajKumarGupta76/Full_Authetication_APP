import { Mail, ArrowRight } from "lucide-react";
import {
  FaGithub,
  FaLinkedinIn,
  FaInstagram,
} from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-gray-200 bg-white">

      {/* ================= NEWSLETTER / CTA ================= */}
      <div className="border-b border-gray-100 bg-gray-50">
        <div className="mx-auto max-w-7xl px-6 py-14 lg:px-8">

          <div className="flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between">

            {/* Text */}
            <div className="max-w-xl">
              <div className="flex items-center gap-2 text-green-600">
                <Mail className="h-5 w-5" />

                <span className="text-sm font-semibold uppercase tracking-wider">
                  Stay Updated
                </span>
              </div>

              <h2 className="mt-3 text-2xl font-bold text-gray-900 sm:text-3xl">
                Get productivity tips in your inbox.
              </h2>

              <p className="mt-3 text-gray-600">
                Get useful tips, product updates, and ideas to help
                you organize your thoughts better.
              </p>
            </div>

            {/* Newsletter */}
            <div className="w-full max-w-md">

              <form
                onSubmit={(e) => e.preventDefault()}
                className="flex flex-col gap-3 sm:flex-row"
              >

                <input
                  type="email"
                  placeholder="Enter your email"
                  className="h-12 flex-1 rounded-xl border border-gray-200 bg-white px-4 text-sm outline-none transition focus:border-green-500 focus:ring-2 focus:ring-green-100"
                />

                <button
                  type="submit"
                  className="group inline-flex h-12 items-center justify-center rounded-xl bg-green-600 px-5 font-semibold text-white transition hover:bg-green-700"
                >
                  Subscribe

                  <ArrowRight
                    className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1"
                  />
                </button>

              </form>

              <p className="mt-2 text-xs text-gray-400">
                No spam. Unsubscribe anytime.
              </p>

            </div>

          </div>

        </div>
      </div>


      {/* ================= MAIN FOOTER ================= */}
      <div className="mx-auto max-w-7xl px-6 py-14 lg:px-8">

        <div className="grid gap-12 sm:grid-cols-2 lg:grid-cols-4">

          {/* ================= BRAND ================= */}
          <div className="sm:col-span-2 lg:col-span-1">

            <a
              href="/"
              className="inline-flex items-center gap-2"
            >

              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-green-600 text-lg font-bold text-white shadow-lg shadow-green-600/20">
                N
              </div>

              <span className="text-xl font-bold text-gray-900">
                Note<span className="text-green-600">Flow</span>
              </span>

            </a>

            <p className="mt-5 max-w-sm text-sm leading-6 text-gray-500">
              A smarter way to capture, organize, and rediscover
              your thoughts with the power of AI.
            </p>


            {/* Social Icons */}
            <div className="mt-6 flex items-center gap-3">

              {/* GitHub */}
              <a
                href="https://github.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub"
                className="flex h-10 w-10 items-center justify-center rounded-xl border border-gray-200 text-gray-500 transition duration-200 hover:border-green-200 hover:bg-green-50 hover:text-green-600"
              >
                <FaGithub className="h-5 w-5" />
              </a>


              {/* LinkedIn */}
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
                className="flex h-10 w-10 items-center justify-center rounded-xl border border-gray-200 text-gray-500 transition duration-200 hover:border-green-200 hover:bg-green-50 hover:text-green-600"
              >
                <FaLinkedinIn className="h-5 w-5" />
              </a>


              {/* X */}
              <a
                href="https://x.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="X"
                className="flex h-10 w-10 items-center justify-center rounded-xl border border-gray-200 text-gray-500 transition duration-200 hover:border-green-200 hover:bg-green-50 hover:text-green-600"
              >
                <FaXTwitter className="h-5 w-5" />
              </a>


              {/* Instagram */}
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="flex h-10 w-10 items-center justify-center rounded-xl border border-gray-200 text-gray-500 transition duration-200 hover:border-green-200 hover:bg-green-50 hover:text-green-600"
              >
                <FaInstagram className="h-5 w-5" />
              </a>

            </div>

          </div>


          {/* ================= PRODUCT ================= */}
          <div>

            <h3 className="text-sm font-semibold text-gray-900">
              Product
            </h3>

            <ul className="mt-5 space-y-3 text-sm">

              <li>
                <a
                  href="#features"
                  className="text-gray-500 transition hover:text-green-600"
                >
                  Features
                </a>
              </li>

              <li>
                <a
                  href="#how-it-works"
                  className="text-gray-500 transition hover:text-green-600"
                >
                  How it works
                </a>
              </li>

              <li>
                <a
                  href="#"
                  className="text-gray-500 transition hover:text-green-600"
                >
                  Pricing
                </a>
              </li>

              <li>
                <a
                  href="#"
                  className="text-gray-500 transition hover:text-green-600"
                >
                  Security
                </a>
              </li>

              <li>
                <a
                  href="#"
                  className="text-gray-500 transition hover:text-green-600"
                >
                  Changelog
                </a>
              </li>

            </ul>

          </div>


          {/* ================= COMPANY ================= */}
          <div>

            <h3 className="text-sm font-semibold text-gray-900">
              Company
            </h3>

            <ul className="mt-5 space-y-3 text-sm">

              <li>
                <a
                  href="#"
                  className="text-gray-500 transition hover:text-green-600"
                >
                  About us
                </a>
              </li>

              <li>
                <a
                  href="#contact"
                  className="text-gray-500 transition hover:text-green-600"
                >
                  Contact
                </a>
              </li>

              <li>
                <a
                  href="#"
                  className="text-gray-500 transition hover:text-green-600"
                >
                  Careers
                </a>
              </li>

              <li>
                <a
                  href="#"
                  className="text-gray-500 transition hover:text-green-600"
                >
                  Blog
                </a>
              </li>

              <li>
                <a
                  href="#"
                  className="text-gray-500 transition hover:text-green-600"
                >
                  Partners
                </a>
              </li>

            </ul>

          </div>


          {/* ================= RESOURCES ================= */}
          <div>

            <h3 className="text-sm font-semibold text-gray-900">
              Resources
            </h3>

            <ul className="mt-5 space-y-3 text-sm">

              <li>
                <a
                  href="#"
                  className="text-gray-500 transition hover:text-green-600"
                >
                  Help Center
                </a>
              </li>

              <li>
                <a
                  href="#"
                  className="text-gray-500 transition hover:text-green-600"
                >
                  Documentation
                </a>
              </li>

              <li>
                <a
                  href="#"
                  className="text-gray-500 transition hover:text-green-600"
                >
                  Community
                </a>
              </li>

              <li>
                <a
                  href="#"
                  className="text-gray-500 transition hover:text-green-600"
                >
                  Tutorials
                </a>
              </li>

              <li>
                <a
                  href="mailto:support@noteflow.com"
                  className="text-gray-500 transition hover:text-green-600"
                >
                  Support
                </a>
              </li>

            </ul>

          </div>

        </div>


        {/* ================= BOTTOM ================= */}
        <div className="mt-14 border-t border-gray-100 pt-8">

          <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">

            {/* Copyright */}
            <p className="text-sm text-gray-500">
              © {currentYear} NoteFlow. All rights reserved.
            </p>


            {/* Legal */}
            <div className="flex flex-wrap gap-5 text-sm">

              <a
                href="#"
                className="text-gray-500 transition hover:text-green-600"
              >
                Privacy Policy
              </a>

              <a
                href="#"
                className="text-gray-500 transition hover:text-green-600"
              >
                Terms of Service
              </a>

              <a
                href="#"
                className="text-gray-500 transition hover:text-green-600"
              >
                Cookie Policy
              </a>

            </div>

          </div>

        </div>

      </div>

    </footer>
  );
};

export default Footer;