
import React, { useState } from "react";
import {
  BookOpen,
  Menu,
  X,
  ArrowRight,
  LogIn,
  User,
  CreditCard,
  Users,
  Sparkles,
  Settings,
  LogOut,
  ChevronDown,
} from "lucide-react";

import { Link, useNavigate } from "react-router-dom";
import { getData } from "@/Context/UserContext";
import axios from "axios";
import { toast } from "sonner";

const API_URL = "http://localhost:8000";

const Avatar = ({ user, size = "h-9 w-9" }) => {
  const [imageError, setImageError] = useState(false);

  const initials = (user?.username || user?.email || "User")
    .trim()
    .split(/\s+/)
    .map((part) => part[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  return (
    <div
      className={`${size} flex shrink-0 items-center justify-center overflow-hidden rounded-full border border-green-200 bg-green-100 font-semibold text-green-700`}
    >
      {user?.avatar && !imageError ? (
        <img
          src={user.avatar}
          alt={`${user?.username || "User"} avatar`}
          className="h-full w-full object-cover"
          onError={() => setImageError(true)}
        />
      ) : (
        initials
      )}
    </div>
  );
};

const Navbar = () => {
  const [mobileMenu, setMobileMenu] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [loggingOut, setLoggingOut] = useState(false);

  const { user, setUser } = getData();
  const navigate = useNavigate();

  const closeMenus = () => {
    setMobileMenu(false);
    setDropdownOpen(false);
  };

  // const logoutHandler = async () => {
  //   if (loggingOut) return;

  //   setLoggingOut(true);

  //   try {
  //     const accessToken = localStorage.getItem("accessToken");

  //     if (accessToken) {
  //       const res = await axios.post(
  //         `${API_URL}/user/logout`,
  //         {},
  //         {
  //           headers: {
  //             Authorization: `Bearer ${accessToken}`,
  //           },
  //         }
  //       );

  //       if (!res.data.success) {
  //         toast.error(res.data.message || "Logout failed");
  //         return;
  //       }

  //       toast.success(res.data.message || "Logged out successfully");
  //     }

  //     setUser(null);

  //     // Remove only authentication-related storage.
  //     localStorage.removeItem("accessToken");
  //     localStorage.removeItem("refreshToken");

  //     closeMenus();
  //     navigate("/login", { replace: true });
  //   } catch (error) {
  //     console.error(
  //       "Logout error:",
  //       error.response?.data || error.message
  //     );

  //     // A rejected request does not necessarily mean the token
  //     // is still valid. Keep the current session unless you
  //     // intentionally support local-only logout.
  //     toast.error(error.response?.data?.message || "Logout failed");
  //   } finally {
  //     setLoggingOut(false);
  //   }
  // };

  const logoutHandler = async () => {
  if (loggingOut) return;

  setLoggingOut(true);

  try {
    const accessToken = localStorage.getItem("accessToken");

    if (accessToken) {
      await axios.post(
        `${API_URL}/user/logout`,
        {},
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
    }
  } catch (error) {
    console.error("Logout error:", error.response?.data || error.message);
  } finally {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");

    setUser(null);
    closeMenus();

    // Redirect to your public landing page
    navigate("/", { replace: true });

    setLoggingOut(false);
  }
};

  const navLinkClass =
    "text-sm font-medium text-gray-700 transition hover:text-green-600";

  const mobileLinkClass =
    "rounded-xl px-4 py-3 text-sm font-medium text-gray-700 transition hover:bg-green-50 hover:text-green-600";

  const closeDropdown = () => setDropdownOpen(false);

  const renderUserInfo = () => (
    <div className="flex min-w-0 items-center gap-3 px-3 py-3">
      <Avatar user={user} size="h-10 w-10" />

      <div className="min-w-0">
        <p className="truncate font-semibold text-gray-900">
          {user?.username || "User"}
        </p>
        <p className="truncate text-xs text-gray-500">
          {user?.email || ""}
        </p>
      </div>
    </div>
  );

  const renderAccountLinks = (mobile = false) => {
    const linkClass = mobile
      ? "flex items-center gap-3 rounded-xl px-4 py-3 text-sm text-gray-700 hover:bg-gray-50"
      : "flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm text-gray-700 hover:bg-gray-50";

    const handleClick = mobile ? closeMenus : closeDropdown;

    return (
      <>
        <Link to="/profile" onClick={handleClick} className={linkClass}>
          <User className="h-4 w-4 text-gray-500" />
          <span>Profile</span>
        </Link>

        <Link to="/billing" onClick={handleClick} className={linkClass}>
          <CreditCard className="h-4 w-4 text-gray-500" />
          <span>Billing</span>
        </Link>

        <Link to="/team" onClick={handleClick} className={linkClass}>
          <Users className="h-4 w-4 text-gray-500" />
          <span>Team</span>
        </Link>

        <Link
          to="/subscription"
          onClick={handleClick}
          className={linkClass}
        >
          <Sparkles className="h-4 w-4 text-green-600" />
          <span>Subscription</span>
        </Link>

        <Link
          to="/settings"
          onClick={handleClick}
          className={linkClass}
        >
          <Settings className="h-4 w-4 text-gray-500" />
          <span>Settings</span>
        </Link>
      </>
    );
  };

  const renderLogoutButton = (mobile = false) => (
    <button
      type="button"
      disabled={loggingOut}
      onClick={logoutHandler}
      className={`flex w-full items-center gap-3 rounded-xl px-4 py-3 text-sm text-red-600 transition hover:bg-red-50 disabled:cursor-not-allowed disabled:opacity-60 ${
        mobile ? "" : "rounded-lg px-3 py-2.5"
      }`}
    >
      <LogOut className="h-4 w-4" />
      <span>{loggingOut ? "Logging out..." : "Log out"}</span>
    </button>
  );

  return (
    <header className="sticky top-0 z-50 border-b border-gray-100 bg-white/90 backdrop-blur-md">
      <nav className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link
            to="/"
            onClick={closeMenus}
            className="group flex items-center gap-2"
          >
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-green-600 text-white shadow-md shadow-green-600/20 transition group-hover:scale-105">
              <BookOpen className="h-5 w-5" />
            </div>

            <span className="text-xl font-bold tracking-tight text-gray-900">
              <span className="text-green-600">Notes</span> App
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden items-center gap-8 md:flex">
            <Link to="/" className={navLinkClass}>
              Home
            </Link>

            <a href="#features" className={navLinkClass}>
              Features
            </a>

            <a href="#how-it-works" className={navLinkClass}>
              How It Works
            </a>

            <a href="#contact" className={navLinkClass}>
              Contact
            </a>
          </div>

          {/* Desktop Actions */}
          <div className="hidden items-center gap-3 md:flex">
            {user ? (
              <div className="relative">
                <button
                  type="button"
                  aria-expanded={dropdownOpen}
                  aria-label="Open user menu"
                  onClick={() => setDropdownOpen((prev) => !prev)}
                  className="flex items-center gap-2 rounded-xl border border-gray-200 bg-white px-2 py-1.5 outline-none transition hover:border-green-200 hover:bg-green-50"
                >
                  <Avatar user={user} />

                  <div className="hidden text-left lg:block">
                    <p className="max-w-36 truncate text-sm font-semibold text-gray-900">
                      {user.username || "User"}
                    </p>
                    <p className="text-xs text-gray-500">Free Plan</p>
                  </div>

                  <ChevronDown
                    className={`h-4 w-4 text-gray-400 transition-transform ${
                      dropdownOpen ? "rotate-180" : ""
                    }`}
                  />
                </button>

                {dropdownOpen && (
                  <div className="absolute right-0 top-14 z-50 w-64 rounded-xl border border-gray-100 bg-white p-2 shadow-xl">
                    {renderUserInfo()}

                    <div className="my-1 h-px bg-gray-100" />

                    <p className="px-3 py-2 text-xs font-medium uppercase tracking-wider text-gray-400">
                      Account
                    </p>

                    {renderAccountLinks()}

                    <div className="my-1 h-px bg-gray-100" />

                    <p className="px-3 py-2 text-xs font-medium uppercase tracking-wider text-gray-400">
                      Plan
                    </p>

                    <Link
                      to="/subscription"
                      onClick={closeDropdown}
                      className="flex items-center gap-3 rounded-lg px-3 py-2.5 hover:bg-green-50"
                    >
                      <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-green-50">
                        <Sparkles className="h-4 w-4 text-green-600" />
                      </div>

                      <div className="flex flex-1 flex-col">
                        <span className="text-sm font-medium">
                          Subscription
                        </span>
                        <span className="text-xs text-gray-400">
                          Upgrade your plan
                        </span>
                      </div>

                      <span className="rounded-full bg-green-100 px-2 py-0.5 text-[10px] font-semibold text-green-700">
                        FREE
                      </span>
                    </Link>

                    <div className="my-1 h-px bg-gray-100" />

                    {renderLogoutButton()}
                  </div>
                )}
              </div>
            ) : (
              <>
                <Link
                  to="/login"
                  className="inline-flex items-center rounded-xl px-4 py-2 text-sm font-semibold text-gray-700 transition hover:bg-gray-50 hover:text-green-600"
                >
                  <LogIn className="mr-2 h-4 w-4" />
                  Sign In
                </Link>

                {/* Match this path with your App.jsx route. */}
                <Link
                  to="/signup"
                  className="group inline-flex items-center rounded-xl bg-green-600 px-5 py-2.5 text-sm font-semibold text-white shadow-md shadow-green-600/20 transition hover:bg-green-700"
                >
                  Get Started
                  <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Link>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            type="button"
            aria-label={mobileMenu ? "Close menu" : "Open menu"}
            aria-expanded={mobileMenu}
            onClick={() => setMobileMenu((prev) => !prev)}
            className="flex h-10 w-10 items-center justify-center rounded-lg text-gray-700 transition hover:bg-gray-100 md:hidden"
          >
            {mobileMenu ? (
              <X className="h-6 w-6" />
            ) : (
              <Menu className="h-6 w-6" />
            )}
          </button>
        </div>

        {/* Mobile Menu */}
        {mobileMenu && (
          <div className="border-t border-gray-100 py-5 md:hidden">
            <div className="flex flex-col gap-2">
              <Link
                to="/"
                onClick={closeMenus}
                className={mobileLinkClass}
              >
                Home
              </Link>

              <a
                href="#features"
                onClick={closeMenus}
                className={mobileLinkClass}
              >
                Features
              </a>

              <a
                href="#how-it-works"
                onClick={closeMenus}
                className={mobileLinkClass}
              >
                How It Works
              </a>

              <a
                href="#contact"
                onClick={closeMenus}
                className={mobileLinkClass}
              >
                Contact
              </a>

              {user ? (
                <div className="mt-3 border-t border-gray-100 pt-4">
                  {renderUserInfo()}
                  <p className="px-4 pb-2 text-xs text-gray-500">
                    Free Plan
                  </p>

                  {renderAccountLinks(true)}

                  {renderLogoutButton(true)}
                </div>
              ) : (
                <div className="mt-3 flex flex-col gap-2 border-t border-gray-100 pt-4">
                  <Link
                    to="/login"
                    onClick={closeMenus}
                    className={mobileLinkClass}
                  >
                    <LogIn className="mr-2 inline h-4 w-4" />
                    Sign In
                  </Link>

                  <Link
                    to="/signup"
                    onClick={closeMenus}
                    className="mx-2 flex items-center justify-center rounded-xl bg-green-600 px-4 py-3 text-sm font-semibold text-white hover:bg-green-700"
                  >
                    Get Started
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </div>
              )}
            </div>
          </div>
        )}
      </nav>
    </header>
  );
};

export default Navbar;
