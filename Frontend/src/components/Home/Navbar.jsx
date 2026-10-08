import { useState } from "react";
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

import { Link } from "react-router-dom";
import { getData } from "@/Context/UserContext";
import axios from "axios";
import { toast } from "sonner";

const Navbar = () => {
  const [mobileMenu, setMobileMenu] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  

  // Temporary user
  // Later replace this with Firebase/auth user
  // const user = true;

const {user,setUser}=getData()
console.log(user)
const accessToken=localStorage.getItem("accessToken")

  const closeMobileMenu = () => {
    setMobileMenu(false);
  };
  //for Logout
 const logoutHandler = async () => {
  try {
    const res = await axios.post(
      "http://localhost:8000/user/logout",
      {},
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );

    console.log("Logout response:", res.data);

    if (res.data.success) {
      setUser(null);
      localStorage.clear();
      toast.success(res.data.message);
    }
  } catch (error) {
    console.log("Logout error:", error.response?.data || error.message);
    toast.error(error.response?.data?.message || "Logout failed");
  }
};


  return (
    <header className="sticky top-0 z-50 border-b border-gray-100 bg-white/90 backdrop-blur-md">
      <nav className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">

          {/* ================= LOGO ================= */}

          <Link
            to="/"
            className="group flex items-center gap-2"
          >
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-green-600 text-white shadow-md shadow-green-600/20 transition group-hover:scale-105">
              <BookOpen className="h-5 w-5" />
            </div>

            <span className="text-xl font-bold tracking-tight text-gray-900">
              <span className="text-green-600">Notes</span>
              App
            </span>
          </Link>

          {/* ================= DESKTOP NAVIGATION ================= */}

          <div className="hidden items-center gap-8 md:flex">
            <Link
              to="/"
              className="text-sm font-medium text-gray-700 transition hover:text-green-600"
            >
              Home
            </Link>

            <a
              href="#features"
              className="text-sm font-medium text-gray-700 transition hover:text-green-600"
            >
              Features
            </a>

            <a
              href="#how-it-works"
              className="text-sm font-medium text-gray-700 transition hover:text-green-600"
            >
              How It Works
            </a>

            <a
              href="#contact"
              className="text-sm font-medium text-gray-700 transition hover:text-green-600"
            >
              Contact
            </a>
          </div>

          {/* ================= DESKTOP RIGHT SIDE ================= */}

          <div className="hidden items-center gap-3 md:flex">
            {user ? (
              <div className="relative">

                {/* User Button */}

                <button
                  type="button"
                  onClick={() => setDropdownOpen(!dropdownOpen)}
                  className="flex items-center gap-2 rounded-xl border border-gray-200 bg-white px-2 py-1.5 outline-none transition hover:border-green-200 hover:bg-green-50"
                >
                  <div className="flex h-9 w-9 items-center justify-center rounded-full bg-green-100 font-semibold text-green-700">
                    DK
                  </div>

                  <div className="hidden text-left lg:block">
                    <p className="text-sm font-semibold text-gray-900">
                      Dhiraj
                    </p>

                    <p className="text-xs text-gray-500">
                      Free Plan
                    </p>
                  </div>

                  <ChevronDown
                    className={`h-4 w-4 text-gray-400 transition-transform ${
                      dropdownOpen ? "rotate-180" : ""
                    }`}
                  />
                </button>

                {/* Dropdown */}

                {dropdownOpen && (
                  <div className="absolute right-0 top-14 z-50 w-64 rounded-xl border border-gray-100 bg-white p-2 shadow-xl">

                    {/* User Info */}

                    <div className="px-3 py-3">
                      <div className="flex items-center gap-3">
                        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-green-100 font-semibold text-green-700">
                          DK
                        </div>

                        <div className="min-w-0">
                          <p className="truncate font-semibold text-gray-900">
                            Dhiraj Kumar
                          </p>

                          <p className="truncate text-xs text-gray-500">
                            dhiraj@example.com
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="my-1 h-px bg-gray-100" />

                    {/* Account */}

                    <p className="px-3 py-2 text-xs font-medium uppercase tracking-wider text-gray-400">
                      Account
                    </p>

                    <Link
                      to="/profile"
                      onClick={() => setDropdownOpen(false)}
                      className="flex items-center gap-3 rounded-lg px-3 py-2.5 hover:bg-gray-50"
                    >
                      <User className="h-4 w-4 text-gray-500" />

                      <div className="flex flex-col">
                        <span className="font-medium">Profile</span>
                        <span className="text-xs text-gray-400">
                          Manage your profile
                        </span>
                      </div>
                    </Link>

                    <Link
                      to="/billing"
                      onClick={() => setDropdownOpen(false)}
                      className="flex items-center gap-3 rounded-lg px-3 py-2.5 hover:bg-gray-50"
                    >
                      <CreditCard className="h-4 w-4 text-gray-500" />

                      <div className="flex flex-col">
                        <span className="font-medium">Billing</span>
                        <span className="text-xs text-gray-400">
                          Payments & invoices
                        </span>
                      </div>
                    </Link>

                    <Link
                      to="/team"
                      onClick={() => setDropdownOpen(false)}
                      className="flex items-center gap-3 rounded-lg px-3 py-2.5 hover:bg-gray-50"
                    >
                      <Users className="h-4 w-4 text-gray-500" />

                      <div className="flex flex-col">
                        <span className="font-medium">Team</span>
                        <span className="text-xs text-gray-400">
                          Manage your team
                        </span>
                      </div>
                    </Link>

                    <div className="my-1 h-px bg-gray-100" />

                    {/* Plan */}

                    <p className="px-3 py-2 text-xs font-medium uppercase tracking-wider text-gray-400">
                      Plan
                    </p>

                    <Link
                      to="/subscription"
                      onClick={() => setDropdownOpen(false)}
                      className="flex items-center gap-3 rounded-lg px-3 py-2.5 hover:bg-green-50"
                    >
                      <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-green-50">
                        <Sparkles className="h-4 w-4 text-green-600" />
                      </div>

                      <div className="flex flex-1 flex-col">
                        <span className="font-medium">
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

                    {/* Settings */}

                    <Link
                      to="/settings"
                      onClick={() => setDropdownOpen(false)}
                      className="flex items-center gap-3 rounded-lg px-3 py-2.5 hover:bg-gray-50"
                    >
                      <Settings className="h-4 w-4 text-gray-500" />

                      <span className="font-medium">
                        Settings
                      </span>
                    </Link>

                    {/* Logout */}

                    <button
                      type="button"
                      className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-red-600 hover:bg-red-50"
                      onClick={() => {
                      closeMobileMenu();
                      logoutHandler();
                      console.log("Logout clicked");
                    }}
                    >
                      <LogOut className="h-4 w-4" />

                      <span className="font-medium">
                        Log out
                      </span>
                    </button>
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

                <Link
                  to="/register"
                  className="group inline-flex items-center rounded-xl bg-green-600 px-5 py-2.5 text-sm font-semibold text-white shadow-md shadow-green-600/20 transition hover:bg-green-700"
                >
                  Get Started

                  <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Link>
              </>
            )}
          </div>

          {/* ================= MOBILE BUTTON ================= */}

          <button
            type="button"
            onClick={() => setMobileMenu(!mobileMenu)}
            className="flex h-10 w-10 items-center justify-center rounded-lg text-gray-700 transition hover:bg-gray-100 md:hidden"
          >
            {mobileMenu ? (
              <X className="h-6 w-6" />
            ) : (
              <Menu className="h-6 w-6" />
            )}
          </button>
        </div>

        {/* ================= MOBILE MENU ================= */}

        {mobileMenu && (
          <div className="border-t border-gray-100 py-5 md:hidden">
            <div className="flex flex-col gap-2">

              <Link
                to="/"
                onClick={closeMobileMenu}
                className="rounded-xl px-4 py-3 text-sm font-medium text-gray-700 hover:bg-green-50 hover:text-green-600"
              >
                Home
              </Link>

              <a
                href="#features"
                onClick={closeMobileMenu}
                className="rounded-xl px-4 py-3 text-sm font-medium text-gray-700 hover:bg-green-50 hover:text-green-600"
              >
                Features
              </a>

              <a
                href="#how-it-works"
                onClick={closeMobileMenu}
                className="rounded-xl px-4 py-3 text-sm font-medium text-gray-700 hover:bg-green-50 hover:text-green-600"
              >
                How It Works
              </a>

              <a
                href="#contact"
                onClick={closeMobileMenu}
                className="rounded-xl px-4 py-3 text-sm font-medium text-gray-700 hover:bg-green-50 hover:text-green-600"
              >
                Contact
              </a>

              {/* Mobile User */}

              {user && (
                <div className="mt-3 border-t border-gray-100 pt-4">

                  <div className="mb-3 flex items-center gap-3 px-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-green-100 font-semibold text-green-700">
                      DK
                    </div>

                    <div>
                      <p className="font-semibold text-gray-900">
                        Dhiraj Kumar
                      </p>

                      <p className="text-xs text-gray-500">
                        Free Plan
                      </p>
                    </div>
                  </div>

                  <Link
                    to="/profile"
                    onClick={closeMobileMenu}
                    className="flex items-center gap-3 rounded-xl px-4 py-3 text-sm text-gray-700 hover:bg-gray-50"
                  >
                    <User className="h-4 w-4" />
                    Profile
                  </Link>

                  <Link
                    to="/billing"
                    onClick={closeMobileMenu}
                    className="flex items-center gap-3 rounded-xl px-4 py-3 text-sm text-gray-700 hover:bg-gray-50"
                  >
                    <CreditCard className="h-4 w-4" />
                    Billing
                  </Link>

                  <Link
                    to="/team"
                    onClick={closeMobileMenu}
                    className="flex items-center gap-3 rounded-xl px-4 py-3 text-sm text-gray-700 hover:bg-gray-50"
                  >
                    <Users className="h-4 w-4" />
                    Team
                  </Link>

                  <Link
                    to="/subscription"
                    onClick={closeMobileMenu}
                    className="flex items-center gap-3 rounded-xl px-4 py-3 text-sm text-gray-700 hover:bg-gray-50"
                  >
                    <Sparkles className="h-4 w-4 text-green-600" />
                    Subscription
                  </Link>

                  <Link
                    to="/settings"
                    onClick={closeMobileMenu}
                    className="flex items-center gap-3 rounded-xl px-4 py-3 text-sm text-gray-700 hover:bg-gray-50"
                  >
                    <Settings className="h-4 w-4" />
                    Settings
                  </Link>

                  <button
                    type="button"
                    onClick={() => {
                      closeMobileMenu();
                      logoutHandler();
                      console.log("Logout clicked");
                    }}
                    className="flex w-full items-center gap-3 rounded-xl px-4 py-3 text-sm text-red-600 hover:bg-red-50"
                  >
                    <LogOut className="h-4 w-4" />
                    Log out
                  </button>
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