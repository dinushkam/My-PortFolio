import { CTA } from "../components";
import { Certificates as certificatesData } from "../constants";

function tagClass(tag) {
  if (tag === "Gold") return "bg-amber-300/15 text-amber-200 border-amber-200/20";
  if (tag === "Red") return "bg-rose-400/15 text-rose-200 border-rose-200/20";
  return "bg-sky-300/15 text-sky-200 border-sky-200/20";
}

function frameTilt(index) {
  const tilts = [
    "-rotate-[1.5deg]",
    "rotate-[1deg]",
    "-rotate-[0.5deg]",
    "rotate-[1.8deg]",
    "-rotate-[1deg]",
    "rotate-[0.6deg]",
  ];
  return tilts[index % tilts.length];
}

function WallCard({ c, index }) {
  return (
    <article
      className={`group relative rounded-[28px] border border-white/10 bg-white/10 p-4 sm:p-5 backdrop-blur-xl shadow-[0_18px_50px_rgba(0,0,0,.35)] transition-all duration-300 hover:-translate-y-2 hover:rotate-0 hover:shadow-[0_30px_70px_rgba(0,0,0,.45)] ${frameTilt(
        index
      )}`}
    >
      {/* pin */}
      <div className="absolute left-1/2 top-3 z-20 h-3 w-3 -translate-x-1/2 rounded-full bg-gradient-to-br from-amber-200 to-amber-500 shadow-[0_0_0_4px_rgba(255,255,255,.08),0_6px_16px_rgba(0,0,0,.35)]" />

      {/* frame */}
      <div className="relative overflow-hidden rounded-[22px] border border-white/10 bg-[#08111f]/80 p-3 sm:p-4">
        <div className="absolute inset-0 bg-[linear-gradient(135deg,rgba(255,255,255,.08),transparent_35%,transparent_70%,rgba(255,255,255,.04))]" />

        {/* preview image */}
        <div className="relative overflow-hidden rounded-[18px] border border-white/10 bg-white/5">
          <img
            src={c.pdfUrl}
            alt={c.title}
            className="h-44 w-full object-cover sm:h-52 md:h-56 transition-transform duration-500 group-hover:scale-[1.03]"
          />
          <div className="absolute inset-0 bg-[linear-gradient(to_top,rgba(2,6,23,.40),transparent_50%,rgba(255,255,255,.06))]" />
        </div>

        {/* content */}
        <div className="relative mt-4">
          <div className="flex items-start justify-between gap-3">
            <span
              className={`inline-flex items-center gap-2 rounded-full border px-3 py-1 text-xs ${tagClass(
                c.tag
              )}`}
            >
              <span className="h-1.5 w-1.5 rounded-full bg-current opacity-70" />
              {c.tag}
            </span>
            <span className="text-xs text-white/60">{c.year}</span>
          </div>

          <h3 className="mt-4 text-base font-semibold leading-snug text-white sm:text-lg">
            {c.title}
          </h3>

          <p className="mt-2 text-sm text-white/75">{c.org}</p>

          <p className="mt-2 text-xs text-white/45">
            ID: {c.id?.trim() ? c.id : "Not listed"}
          </p>

          <div className="mt-5 flex flex-wrap gap-3">
            <a
              className="btn-gold"
              href={c.pdfUrl}
              target="_blank"
              rel="noreferrer"
            >
              View
            </a>

            <a className="btn-red" href={c.pdfUrl} download>
              Download
            </a>
          </div>
        </div>
      </div>
    </article>
  );
}

export default function Certificates() {
  return (
    <section className="relative overflow-hidden px-4 py-10 sm:px-6 sm:py-12 lg:px-8">
      {/* same portfolio theme background */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-b from-[#030712] via-[#041b33] to-[#063a66]" />
        <div className="absolute inset-0 opacity-70 bg-[radial-gradient(circle_at_20%_15%,rgba(125,211,252,.16),transparent_40%),radial-gradient(circle_at_80%_20%,rgba(246,196,83,.14),transparent_38%),radial-gradient(circle_at_60%_90%,rgba(255,59,92,.10),transparent_45%)]" />

        {/* wall texture */}
        <div className="absolute inset-0 opacity-[0.08] bg-[linear-gradient(rgba(255,255,255,.7)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.7)_1px,transparent_1px)] bg-[size:26px_26px]" />

        {/* glow */}
        <div className="absolute left-1/2 top-0 h-64 w-[70%] -translate-x-1/2 rounded-full bg-amber-300/10 blur-3xl" />
      </div>

      <div className="mx-auto max-w-6xl">
        <div className="mb-10 text-center sm:mb-12">
          <h1 className="head-text text-white">Certificate Wall</h1>
          <p className="mx-auto mt-3 max-w-2xl leading-relaxed text-white/70">
            A realistic wall of achievements presented with the same visual style
            as the rest of the portfolio.
          </p>
        </div>

        {/* wall grid */}
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-3">
          {certificatesData.map((c, idx) => (
            <WallCard key={`${c.id}-${idx}`} c={c} index={idx} />
          ))}
        </div>

        <hr className="mt-14 border-white/10" />
        <CTA />
      </div>
    </section>
  );
}