import { PenLine, Sparkles, Search } from "lucide-react";

const HowItWorks = () => {
  const steps = [
    {
      number: "01",
      icon: PenLine,
      title: "Capture",
      description:
        "Write down your thoughts, ideas, meetings and tasks.",
    },
    {
      number: "02",
      icon: Sparkles,
      title: "AI Organizes",
      description:
        "Our AI understands your notes and helps organize them.",
    },
    {
      number: "03",
      icon: Search,
      title: "Find Anything",
      description:
        "Search and retrieve exactly what you need instantly.",
    },
  ];

  return (
    <section className="bg-gray-50 py-24">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">

        <div className="text-center">
          <span className="text-sm font-semibold uppercase tracking-wider text-green-600">
            How It Works
          </span>

          <h2 className="mt-3 text-3xl font-bold text-gray-900 sm:text-4xl">
            From thought to organized idea
          </h2>
        </div>

        <div className="relative mt-16 grid gap-10 md:grid-cols-3">

          {steps.map((step) => {
            const Icon = step.icon;

            return (
              <div key={step.number} className="relative text-center">

                <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-green-600 text-white shadow-lg shadow-green-600/20">
                  <Icon className="h-7 w-7" />
                </div>

                <span className="mt-5 block text-xs font-bold tracking-widest text-green-600">
                  STEP {step.number}
                </span>

                <h3 className="mt-2 text-xl font-bold text-gray-900">
                  {step.title}
                </h3>

                <p className="mx-auto mt-3 max-w-sm text-gray-500">
                  {step.description}
                </p>

              </div>
            );
          })}

        </div>
      </div>
    </section>
  );
};

export default HowItWorks;