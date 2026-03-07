import { Link } from "react-router-dom";

import { CTA } from "../components";
import { projects } from "../constants";
import { arrow } from "../assets/icons";

const Projects = () => {
  return (
    <section className="relative overflow-hidden px-4 py-10 sm:px-6 lg:px-8">
      {/* background */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-b from-[#030712] via-[#041b33] to-[#063a66]" />
        <div className="absolute inset-0 opacity-70 bg-[radial-gradient(circle_at_15%_18%,rgba(125,211,252,.16),transparent_38%),radial-gradient(circle_at_82%_15%,rgba(246,196,83,.14),transparent_36%),radial-gradient(circle_at_60%_85%,rgba(255,59,92,.10),transparent_45%)]" />
        <div className="absolute inset-0 opacity-[0.06] bg-[linear-gradient(rgba(255,255,255,.65)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.65)_1px,transparent_1px)] bg-[size:26px_26px]" />
        <div className="absolute left-1/2 top-0 h-56 w-[75%] -translate-x-1/2 rounded-full bg-sky-300/10 blur-3xl" />
      </div>

      <div className="mx-auto max-w-6xl">
        {/* hero */}
        <div className="mb-10 sm:mb-12">
          <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/10 px-4 py-2 text-xs text-white/80 backdrop-blur-xl">
            <span className="h-2 w-2 rounded-full bg-sky-300" />
            Selected builds and real project work
          </div>

          <h1 className="mt-5 text-3xl font-semibold tracking-tight text-white sm:text-4xl lg:text-5xl">
            My{" "}
            <span className="bg-gradient-to-r from-sky-300 via-cyan-200 to-amber-200 bg-clip-text text-transparent">
              Projects
            </span>
          </h1>

          <p className="mt-4 max-w-3xl text-sm leading-7 text-white/70 sm:text-base">
            These are the projects I am most proud of — from data-driven systems
            to full-stack products and blockchain applications. Each project
            reflects problem-solving, design thinking, and practical
            implementation.
          </p>
        </div>

        {/* projects grid */}
        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {projects.map((project, index) => (
            <article
              key={project.name}
              className="group relative overflow-hidden rounded-[28px] border border-white/10 bg-white/10 p-5 shadow-[0_20px_60px_rgba(0,0,0,.32)] backdrop-blur-xl transition duration-300 hover:-translate-y-2 hover:shadow-[0_28px_70px_rgba(0,0,0,.4)]"
            >
              {/* subtle glow */}
              <div className="pointer-events-none absolute inset-0 opacity-0 transition duration-300 group-hover:opacity-100 bg-[radial-gradient(circle_at_top_right,rgba(125,211,252,.14),transparent_35%),radial-gradient(circle_at_bottom_left,rgba(246,196,83,.10),transparent_35%)]" />

              {/* top row */}
              <div className="relative z-10 flex items-start justify-between gap-4">
                <div className="block-container h-14 w-14 shrink-0">
                  <div className={`btn-back rounded-2xl ${project.theme}`} />
                  <div className="btn-front flex items-center justify-center rounded-2xl">
                    <img
                      src={project.iconUrl}
                      alt={project.name}
                      className="h-1/2 w-1/2 object-contain"
                    />
                  </div>
                </div>

                <div className="rounded-full border border-white/10 bg-black/10 px-3 py-1 text-xs text-white/55">
                  Project {String(index + 1).padStart(2, "0")}
                </div>
              </div>

              {/* content */}
              <div className="relative z-10 mt-6 flex flex-col">
                <h3 className="text-xl font-semibold leading-snug text-white sm:text-2xl">
                  {project.name}
                </h3>

                <p className="mt-3 min-h-[96px] text-sm leading-7 text-white/68">
                  {project.description}
                </p>

                <div className="mt-5 flex flex-wrap gap-2">
                  <span className="rounded-full border border-sky-200/15 bg-sky-300/10 px-3 py-1 text-xs text-sky-200">
                    Practical Build
                  </span>
                  <span className="rounded-full border border-amber-200/15 bg-amber-300/10 px-3 py-1 text-xs text-amber-200">
                    Portfolio Ready
                  </span>
                </div>

                <div className="mt-6 flex items-center justify-between">
                  <Link
                    to={project.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/10 px-4 py-2 text-sm font-semibold text-white transition hover:bg-white/15"
                  >
                    View Project
                    <img
                      src={arrow}
                      alt="arrow"
                      className="h-4 w-4 object-contain"
                    />
                  </Link>

                  <span className="text-xs text-white/40">
                    Open-source / external link
                  </span>
                </div>
              </div>
            </article>
          ))}
        </div>

        <hr className="mt-14 border-white/10" />
        <CTA />
      </div>
    </section>
  );
};

export default Projects;