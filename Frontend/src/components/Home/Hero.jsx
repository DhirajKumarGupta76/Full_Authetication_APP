import { getData } from "@/Context/UserContext";
import { ArrowRight, Sparkles, Play, CheckCircle2 } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Hero = () => {
    const {user}=getData()
     console.log("USER INSIDE HERO:", user);
  const navigate = useNavigate();

  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-green-50 via-white to-white">
      
      {/* Background decoration */}
      <div className="absolute -top-32 left-1/2 h-[500px] w-[500px] -translate-x-1/2 rounded-full bg-green-200/30 blur-3xl" />

      <div className="relative mx-auto max-w-7xl px-6 py-20 sm:py-24 lg:px-8 lg:py-32">
        <div className="mx-auto max-w-4xl text-center">
            <h1>Welcome {user?.username} </h1>

          {/* Badge */}
          <div className="mb-6 flex justify-center">
            <span className="inline-flex items-center gap-2 rounded-full border border-green-200 bg-white px-4 py-2 text-sm font-medium text-green-700 shadow-sm">
              <Sparkles className="h-4 w-4" />
              AI-powered note organization
            </span>
          </div>

          {/* Heading */}
          <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl lg:text-7xl">
            Your thoughts,
            <span className="block text-green-600">
              organized by AI.
            </span>
          </h1>

          {/* Description */}
          <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-gray-600 sm:text-xl">
            Capture ideas, organize your thoughts, and find what matters
            instantly. A modern workspace that grows with you.
          </p>

          {/* Buttons */}
          <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
            
            <button
              onClick={() => navigate("/create-todo")}
              className="group inline-flex h-12 items-center justify-center rounded-xl bg-green-600 px-7 font-semibold text-white shadow-lg shadow-green-600/20 transition hover:-translate-y-0.5 hover:bg-green-700"
            >
              Start Taking Notes
              <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
            </button>

            <button
              className="inline-flex h-12 items-center justify-center rounded-xl border border-gray-200 bg-white px-7 font-semibold text-gray-700 shadow-sm transition hover:bg-gray-50"
            >
              <Play className="mr-2 h-4 w-4 fill-current" />
              Watch Demo
            </button>

          </div>

          {/* Small trust points */}
          <div className="mt-8 flex flex-wrap justify-center gap-x-6 gap-y-3 text-sm text-gray-500">
            <span className="flex items-center gap-1.5">
              <CheckCircle2 className="h-4 w-4 text-green-600" />
              Free to get started
            </span>

            <span className="flex items-center gap-1.5">
              <CheckCircle2 className="h-4 w-4 text-green-600" />
              AI powered
            </span>

            <span className="flex items-center gap-1.5">
              <CheckCircle2 className="h-4 w-4 text-green-600" />
              Secure cloud storage
            </span>
          </div>

        </div>

        {/* Product Preview */}
        <div className="mx-auto mt-16 max-w-5xl">
          <div className="rounded-2xl border border-gray-200 bg-white p-2 shadow-2xl shadow-gray-200/60">
            
            <div className="rounded-xl bg-gray-50 p-4 sm:p-6">
              
              {/* Fake browser header */}
              <div className="mb-5 flex items-center gap-2">
                <div className="h-3 w-3 rounded-full bg-red-400" />
                <div className="h-3 w-3 rounded-full bg-yellow-400" />
                <div className="h-3 w-3 rounded-full bg-green-400" />
                
                <div className="ml-4 h-7 flex-1 rounded-md bg-white" />
              </div>

              {/* App preview */}
              <div className="grid min-h-[280px] grid-cols-1 overflow-hidden rounded-xl border border-gray-200 bg-white md:grid-cols-[220px_1fr]">

                <div className="hidden border-r border-gray-100 bg-gray-50 p-5 md:block">
                  <div className="mb-6 text-lg font-bold text-green-700">
                    NoteFlow
                  </div>

                  <div className="space-y-3">
                    <div className="rounded-lg bg-green-100 px-3 py-2 text-sm font-medium text-green-700">
                      All Notes
                    </div>
                    <div className="px-3 py-2 text-sm text-gray-500">
                      Important
                    </div>
                    <div className="px-3 py-2 text-sm text-gray-500">
                      Work
                    </div>
                    <div className="px-3 py-2 text-sm text-gray-500">
                      Ideas
                    </div>
                  </div>
                </div>

                <div className="p-6">
                  <div className="mb-6 flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-400">
                        My workspace
                      </p>
                      <h3 className="text-xl font-semibold text-gray-900">
                        Your Notes
                      </h3>
                    </div>

                    <button className="rounded-lg bg-green-600 px-4 py-2 text-sm font-medium text-white">
                      + New Note
                    </button>
                  </div>

                  <div className="grid gap-4 sm:grid-cols-2">
                    <div className="rounded-xl border border-gray-100 p-4">
                      <div className="mb-3 h-2 w-20 rounded bg-green-200" />
                      <h4 className="font-semibold">
                        Project Ideas
                      </h4>
                      <p className="mt-2 text-sm text-gray-500">
                        AI automatically organizes your thoughts...
                      </p>
                    </div>

                    <div className="rounded-xl border border-gray-100 p-4">
                      <div className="mb-3 h-2 w-16 rounded bg-green-200" />
                      <h4 className="font-semibold">
                        Meeting Notes
                      </h4>
                      <p className="mt-2 text-sm text-gray-500">
                        Important decisions and action items...
                      </p>
                    </div>
                  </div>
                </div>

              </div>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};

export default Hero;