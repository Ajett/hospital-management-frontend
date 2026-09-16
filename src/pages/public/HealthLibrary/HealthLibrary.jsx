import { useMemo, useState } from "react";

const categories = [
  "All",
  "Heart Health",
  "Prevention",
  "Nutrition",
  "Women's Health",
  "Children's Health",
  "Everyday Health",
];

const articles = [
  {
    id: 1,
    category: "Heart Health",
    readTime: "5 min read",
    title: "Simple habits for a healthier heart",
    excerpt:
      "Small everyday changes can support cardiovascular health and improve overall wellbeing.",
    body:
      "A healthy heart starts with simple and consistent habits. Staying physically active, choosing balanced meals, managing stress, getting enough sleep and avoiding tobacco can all support cardiovascular health. Regular health checkups can also help identify risk factors early.",
  },
  {
    id: 2,
    category: "Prevention",
    readTime: "4 min read",
    title: "Why regular health checkups matter",
    excerpt:
      "Preventive healthcare can help identify potential health concerns before they become serious.",
    body:
      "Regular health checkups give you an opportunity to discuss your health with a healthcare professional and identify potential concerns early. Depending on your age, health history and risk factors, your doctor can recommend appropriate screenings and preventive measures.",
  },
  {
    id: 3,
    category: "Nutrition",
    readTime: "6 min read",
    title: "Building a balanced everyday diet",
    excerpt:
      "Learn simple ways to include nutritious foods and maintain a balanced eating pattern.",
    body:
      "A balanced diet generally includes a variety of vegetables, fruits, whole grains, protein sources and appropriate amounts of healthy fats. Drinking enough water and maintaining sensible portion sizes can also support everyday wellbeing.",
  },
  {
    id: 4,
    category: "Women's Health",
    readTime: "5 min read",
    title: "Important aspects of women's health",
    excerpt:
      "Understanding preventive care and regular checkups can help women stay proactive about their health.",
    body:
      "Women's healthcare needs can change throughout different stages of life. Regular medical consultations, preventive screenings, healthy lifestyle choices and discussing concerns early with a healthcare professional can all contribute to better health outcomes.",
  },
  {
    id: 5,
    category: "Children's Health",
    readTime: "5 min read",
    title: "Supporting healthy growth in children",
    excerpt:
      "Nutrition, activity, sleep and preventive care all play important roles in childhood wellbeing.",
    body:
      "Children benefit from nutritious meals, regular physical activity, sufficient sleep and appropriate preventive healthcare. Parents and caregivers should also discuss developmental or health concerns with a qualified healthcare professional when needed.",
  },
  {
    id: 6,
    category: "Everyday Health",
    readTime: "4 min read",
    title: "Everyday habits that support wellbeing",
    excerpt:
      "Simple routines can make a meaningful difference to your physical and mental wellbeing.",
    body:
      "Healthy everyday routines include staying active, eating balanced meals, maintaining good sleep habits, managing stress and staying connected with others. Consistency is often more important than making dramatic short-term changes.",
  },
];

export default function HealthLibrary() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [search, setSearch] = useState("");
  const [selectedArticle, setSelectedArticle] = useState(null);

  const filteredArticles = useMemo(() => {
    const query = search.trim().toLowerCase();

    return articles.filter((article) => {
      const categoryMatch =
        activeCategory === "All" ||
        article.category === activeCategory;

      const searchMatch =
        !query ||
        article.title.toLowerCase().includes(query) ||
        article.excerpt.toLowerCase().includes(query) ||
        article.category.toLowerCase().includes(query);

      return categoryMatch && searchMatch;
    });
  }, [activeCategory, search]);

  return (
    <div className="min-h-screen bg-[#f7fafb] text-[#102333]">

      {/* HERO */}
      <section className="bg-[#004f40]">
        <div className="mx-auto max-w-7xl px-6 py-14 lg:px-8 lg:py-16">
          <div className="max-w-3xl">
            <div className="mb-4 inline-flex items-center rounded-full border border-white/20 bg-white/10 px-4 py-2 text-xs font-semibold tracking-[0.18em] text-[#dff3ee]">
              HEALTH LIBRARY
            </div>

            <h1 className="text-4xl font-bold tracking-tight text-white sm:text-5xl">
              Trusted information for
              <span className="block text-[#9fe0d0]">
                better health decisions.
              </span>
            </h1>

            <p className="mt-5 max-w-2xl text-base leading-7 text-white/75 sm:text-lg">
              Explore simple healthcare information and practical wellness
              guidance from our health library.
            </p>

            {/* SEARCH */}
            <div className="mt-7 max-w-2xl">
              <div className="flex items-center rounded-xl bg-white p-2 shadow-lg">
                <span className="px-3 text-lg text-[#73818d]">⌕</span>

                <input
                  type="text"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Search health articles..."
                  className="min-w-0 flex-1 border-0 bg-transparent px-2 py-3 text-sm text-[#102333] outline-none placeholder:text-[#9aa6ae]"
                />

                {search && (
                  <button
                    type="button"
                    onClick={() => setSearch("")}
                    className="mr-2 rounded-lg px-3 py-2 text-sm font-semibold text-[#006b55] hover:bg-[#e8f6f2]"
                  >
                    Clear
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CONTENT */}
      <main className="mx-auto max-w-7xl px-6 py-12 lg:px-8 lg:py-16">

        {/* CATEGORIES */}
        <div className="mb-8">
          <p className="text-sm font-bold uppercase tracking-[0.16em] text-[#006b55]">
            Explore Topics
          </p>

          <h2 className="mt-2 text-3xl font-bold tracking-tight">
            Health information library
          </h2>

          <div className="mt-6 flex gap-2 overflow-x-auto pb-2">
            {categories.map((category) => {
              const active = activeCategory === category;

              return (
                <button
                  key={category}
                  type="button"
                  onClick={() => setActiveCategory(category)}
                  className={`whitespace-nowrap rounded-full px-4 py-2.5 text-sm font-semibold transition ${
                    active
                      ? "bg-[#006b55] text-white"
                      : "border border-[#e3ecea] bg-white text-[#455565] hover:border-[#b9ddd4] hover:text-[#006b55]"
                  }`}
                >
                  {category}
                </button>
              );
            })}
          </div>
        </div>

        {/* RESULT INFO */}
        <div className="mb-5 flex items-center justify-between">
          <p className="text-sm text-[#73818d]">
            {filteredArticles.length}{" "}
            {filteredArticles.length === 1 ? "article" : "articles"} found
          </p>

          {(search || activeCategory !== "All") && (
            <button
              type="button"
              onClick={() => {
                setSearch("");
                setActiveCategory("All");
              }}
              className="text-sm font-semibold text-[#006b55] hover:text-[#004f40]"
            >
              Reset filters
            </button>
          )}
        </div>

        {/* ARTICLES */}
        {filteredArticles.length > 0 ? (
          <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {filteredArticles.map((article) => (
              <article
                key={article.id}
                className="group flex min-h-[285px] flex-col rounded-2xl border border-[#e3ecea] bg-white p-6 shadow-[0_4px_14px_rgba(16,35,51,0.06)] transition duration-200 hover:-translate-y-1 hover:border-[#b9ddd4] hover:shadow-[0_14px_30px_rgba(16,35,51,0.10)]"
              >
                <div className="flex items-center justify-between gap-3">
                  <span className="rounded-full bg-[#e8f6f2] px-3 py-1.5 text-xs font-bold text-[#006b55]">
                    {article.category}
                  </span>

                  <span className="text-xs text-[#8a969f]">
                    {article.readTime}
                  </span>
                </div>

                <h3 className="mt-5 text-xl font-bold leading-7">
                  {article.title}
                </h3>

                <p className="mt-3 flex-1 text-sm leading-6 text-[#73818d]">
                  {article.excerpt}
                </p>

                <button
                  type="button"
                  onClick={() => setSelectedArticle(article)}
                  className="mt-6 flex w-fit items-center text-sm font-bold text-[#006b55]"
                >
                  Read Article
                  <span className="ml-2 transition-transform group-hover:translate-x-1">
                    →
                  </span>
                </button>
              </article>
            ))}
          </div>
        ) : (
          <div className="rounded-2xl border border-dashed border-[#cbdad7] bg-white px-6 py-14 text-center">
            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-[#e8f6f2] text-2xl text-[#006b55]">
              ⌕
            </div>

            <h3 className="mt-5 text-xl font-bold">
              No articles found
            </h3>

            <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-[#73818d]">
              Try another search term or choose a different health category.
            </p>

            <button
              type="button"
              onClick={() => {
                setSearch("");
                setActiveCategory("All");
              }}
              className="mt-5 rounded-lg bg-[#006b55] px-5 py-3 text-sm font-semibold text-white hover:bg-[#004f40]"
            >
              View All Articles
            </button>
          </div>
        )}

        {/* DISCLAIMER */}
        <section className="mt-14 rounded-2xl border border-[#e3ecea] bg-white p-6 sm:p-7">
          <div className="flex gap-4">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#e8f6f2] font-bold text-[#006b55]">
              i
            </div>

            <div>
              <h3 className="font-bold">
                Important health information
              </h3>

              <p className="mt-2 text-sm leading-6 text-[#73818d]">
                The information provided in this health library is for
                educational purposes only. It should not replace professional
                medical advice, diagnosis or treatment. Please consult a
                qualified healthcare professional for concerns about your
                health.
              </p>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="mt-14 rounded-3xl bg-[#006b55] px-7 py-9 shadow-[0_18px_45px_rgba(16,35,51,0.14)] sm:px-10">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.18em] text-[#bde8dd]">
                Need Professional Advice?
              </p>

              <h2 className="mt-2 text-2xl font-bold text-white">
                Speak with a healthcare professional.
              </h2>

              <p className="mt-2 max-w-2xl text-sm leading-6 text-white/75">
                Find a doctor and discuss your health concerns with the right
                specialist.
              </p>
            </div>

            <a
              href="/find-doctor"
              className="medicare-white-link inline-flex w-fit items-center rounded-lg bg-white px-6 py-3 text-sm font-bold !text-[#006b55] transition hover:bg-[#e8f6f2]"
            >
              Find a Doctor
              <span className="ml-2 !text-[#006b55]">→</span>
            </a>
          </div>
        </section>
      </main>

      {/* ARTICLE MODAL */}
      {selectedArticle && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-[#102333]/60 px-4 py-6 backdrop-blur-sm"
          onClick={() => setSelectedArticle(null)}
        >
          <div
            className="max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-3xl bg-white shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="border-b border-[#e3ecea] px-6 py-5 sm:px-8">
              <div className="flex items-start justify-between gap-5">
                <div>
                  <span className="rounded-full bg-[#e8f6f2] px-3 py-1.5 text-xs font-bold text-[#006b55]">
                    {selectedArticle.category}
                  </span>

                  <h2 className="mt-4 text-2xl font-bold leading-8">
                    {selectedArticle.title}
                  </h2>

                  <p className="mt-2 text-sm text-[#73818d]">
                    {selectedArticle.readTime}
                  </p>
                </div>

                <button
                  type="button"
                  onClick={() => setSelectedArticle(null)}
                  className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#f7fafb] text-lg text-[#455565] hover:bg-[#e8f6f2] hover:text-[#006b55]"
                  aria-label="Close"
                >
                  ×
                </button>
              </div>
            </div>

            <div className="px-6 py-7 sm:px-8 sm:py-8">
              <p className="text-base leading-8 text-[#455565]">
                {selectedArticle.body}
              </p>

              <div className="mt-7 rounded-xl bg-[#e8f6f2] p-4 text-sm leading-6 text-[#455565]">
                <strong className="text-[#102333]">
                  Please remember:
                </strong>{" "}
                This article is for general educational purposes and does not
                replace individual medical advice.
              </div>
            </div>

            <div className="border-t border-[#e3ecea] px-6 py-4 text-right sm:px-8">
              <button
                type="button"
                onClick={() => setSelectedArticle(null)}
                className="rounded-lg bg-[#006b55] px-5 py-2.5 text-sm font-semibold text-white hover:bg-[#004f40]"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}