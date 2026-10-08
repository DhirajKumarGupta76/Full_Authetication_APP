const Stats = () => {
  const stats = [
    {
      number: "10K+",
      label: "Notes Created",
    },
    {
      number: "5K+",
      label: "Active Users",
    },
    {
      number: "99.9%",
      label: "Uptime",
    },
    {
      number: "24/7",
      label: "Cloud Access",
    },
  ];

  return (
    <section className="border-y border-gray-100 bg-white">
      <div className="mx-auto grid max-w-6xl grid-cols-2 md:grid-cols-4">
        {stats.map((stat) => (
          <div
            key={stat.label}
            className="border-gray-100 px-6 py-10 text-center md:border-r last:border-r-0"
          >
            <h3 className="text-3xl font-bold text-gray-900">
              {stat.number}
            </h3>

            <p className="mt-2 text-sm text-gray-500">
              {stat.label}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Stats;