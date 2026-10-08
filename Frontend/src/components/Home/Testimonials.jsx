import { Star } from "lucide-react";

const Testimonials = () => {
  const testimonials = [
    {
      name: "Aarav Sharma",
      role: "Product Designer",
      text: "This completely changed how I organize my project ideas. Everything is finally in one place.",
    },
    {
      name: "Priya Patel",
      role: "Student",
      text: "The AI organization makes studying and managing my notes much easier.",
    },
    {
      name: "Rahul Verma",
      role: "Software Developer",
      text: "Simple interface, fast search and a really clean writing experience.",
    },
  ];

  return (
    <section className="bg-white py-24">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">

        <div className="text-center">
          <span className="text-sm font-semibold uppercase tracking-wider text-green-600">
            Loved by Users
          </span>

          <h2 className="mt-3 text-3xl font-bold text-gray-900 sm:text-4xl">
            People are thinking better
          </h2>
        </div>

        <div className="mt-14 grid gap-6 md:grid-cols-3">
          {testimonials.map((item) => (
            <div
              key={item.name}
              className="rounded-2xl border border-gray-100 bg-gray-50 p-7"
            >
              <div className="flex gap-1">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star
                    key={star}
                    className="h-4 w-4 fill-current text-yellow-400"
                  />
                ))}
              </div>

              <p className="mt-5 leading-7 text-gray-600">
                "{item.text}"
              </p>

              <div className="mt-6">
                <p className="font-semibold text-gray-900">
                  {item.name}
                </p>
                <p className="text-sm text-gray-500">
                  {item.role}
                </p>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default Testimonials;