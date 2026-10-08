import {
  Brain,
  Search,
  Cloud,
  ShieldCheck,
  Tags,
  Zap,
} from "lucide-react";

const Features = () => {
  const features = [
    {
      icon: Brain,
      title: "AI Organization",
      description:
        "Let AI automatically categorize and organize your notes.",
    },
    {
      icon: Search,
      title: "Instant Search",
      description:
        "Find any thought, idea, or important information in seconds.",
    },
    {
      icon: Cloud,
      title: "Cloud Sync",
      description:
        "Access your notes from anywhere, on any device.",
    },
    {
      icon: ShieldCheck,
      title: "Secure & Private",
      description:
        "Your thoughts stay protected with secure cloud storage.",
    },
    {
      icon: Tags,
      title: "Smart Tags",
      description:
        "Automatically organize your content with intelligent tags.",
    },
    {
      icon: Zap,
      title: "Lightning Fast",
      description:
        "Create and access your notes without unnecessary complexity.",
    },
  ];

  return (
    <section className="bg-white py-24">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">

        <div className="mx-auto max-w-2xl text-center">
          <span className="text-sm font-semibold uppercase tracking-wider text-green-600">
            Powerful Features
          </span>

          <h2 className="mt-3 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            Everything you need to
            <span className="text-green-600"> think better</span>
          </h2>

          <p className="mt-4 text-gray-600">
            A simple workspace with powerful AI features designed
            around the way you actually think.
          </p>
        </div>

        <div className="mt-16 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {features.map((feature) => {
            const Icon = feature.icon;

            return (
              <div
                key={feature.title}
                className="group rounded-2xl border border-gray-100 bg-white p-7 shadow-sm transition duration-300 hover:-translate-y-1 hover:border-green-100 hover:shadow-xl"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-green-50 text-green-600 transition group-hover:bg-green-600 group-hover:text-white">
                  <Icon className="h-6 w-6" />
                </div>

                <h3 className="mt-6 text-lg font-semibold text-gray-900">
                  {feature.title}
                </h3>

                <p className="mt-3 leading-6 text-gray-500">
                  {feature.description}
                </p>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};

export default Features;