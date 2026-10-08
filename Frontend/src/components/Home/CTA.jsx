import { ArrowRight, Sparkles } from "lucide-react";
import { useNavigate } from "react-router-dom";

const CTA = () => {
  const navigate = useNavigate();

  return (
    <section className="px-6 py-20">
      <div className="mx-auto max-w-6xl overflow-hidden rounded-3xl bg-green-600 px-6 py-16 text-center text-white shadow-xl sm:px-12">

        <Sparkles className="mx-auto h-8 w-8" />

        <h2 className="mx-auto mt-5 max-w-2xl text-3xl font-bold sm:text-4xl">
          Your next great idea starts with a note.
        </h2>

        <p className="mx-auto mt-4 max-w-xl text-green-50">
          Stop losing your best ideas. Start capturing,
          organizing and finding them today.
        </p>

        <button
          onClick={() => navigate("/create-todo")}
          className="group mt-8 inline-flex items-center rounded-xl bg-white px-7 py-3 font-semibold text-green-700 shadow-lg transition hover:-translate-y-0.5"
        >
          Get Started Free
          <ArrowRight className="ml-2 h-5 w-5 transition group-hover:translate-x-1" />
        </button>

      </div>
    </section>
  );
};

export default CTA;