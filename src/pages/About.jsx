import {
  VerticalTimeline,
  VerticalTimelineElement,
} from "react-vertical-timeline-component";

import { CTA } from "../components";
import { experiences, skills } from "../constants";

import "react-vertical-timeline-component/style.min.css";

const About = () => {
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
            Data Science • Web Development • Blockchain
          </div>

          <h1 className="mt-5 text-3xl font-semibold tracking-tight text-white sm:text-4xl lg:text-5xl">
            Hello, I&apos;m{" "}
            <span className="bg-gradient-to-r from-sky-300 via-cyan-200 to-amber-200 bg-clip-text text-transparent">
              Dinushka
            </span>{" "}
              
          </h1>

          <div className="mt-5 max-w-3xl space-y-3 text-sm leading-7 text-white/70 sm:text-base">
            <p>
              I&apos;m a Computer Science (Hons) undergraduate at the University
              of Kelaniya, specializing in Data Science through hands-on
              learning, practical problem solving, and real project building.
            </p>
            <p>
              I enjoy creating modern digital products that combine strong
              technical foundations with clean design — from intelligent data
              systems to full-stack web applications and blockchain solutions.
            </p>
          </div>
        </div>

        {/* overview cards */}
        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
          <div className="rounded-[28px] border border-white/10 bg-white/10 p-5 shadow-[0_20px_60px_rgba(0,0,0,.28)] backdrop-blur-xl">
            <p className="text-xs uppercase tracking-[0.2em] text-white/45">
              Education
            </p>
            <h3 className="mt-3 text-lg font-semibold text-white">
              Computer Science (Hons)
            </h3>
            <p className="mt-2 text-sm leading-6 text-white/70">
              Building strong foundations in software engineering, analytics,
              problem solving, and practical system design.
            </p>
          </div>

          <div className="rounded-[28px] border border-white/10 bg-white/10 p-5 shadow-[0_20px_60px_rgba(0,0,0,.28)] backdrop-blur-xl">
            <p className="text-xs uppercase tracking-[0.2em] text-white/45">
              Focus Area
            </p>
            <h3 className="mt-3 text-lg font-semibold text-white">
              Data Science & Intelligent Systems
            </h3>
            <p className="mt-2 text-sm leading-6 text-white/70">
              Interested in extracting value from data, building predictive
              systems, and designing solutions that create business impact.
            </p>
          </div>

          <div className="rounded-[28px] border border-white/10 bg-white/10 p-5 shadow-[0_20px_60px_rgba(0,0,0,.28)] backdrop-blur-xl sm:col-span-2 xl:col-span-1">
            <p className="text-xs uppercase tracking-[0.2em] text-white/45">
              Strength
            </p>
            <h3 className="mt-3 text-lg font-semibold text-white">
              Project-Based Learning
            </h3>
            <p className="mt-2 text-sm leading-6 text-white/70">
              I learn best by building — turning ideas into working products
              while improving collaboration, architecture, and delivery skills.
            </p>
          </div>
        </div>

        {/* skills */}
        <div className="py-14">
          <div className="mb-8">
            <h3 className="text-2xl font-semibold text-white sm:text-3xl">
              My Skills
            </h3>
            <p className="mt-3 max-w-2xl text-sm leading-7 text-white/65 sm:text-base">
              A toolkit shaped by frontend development, backend systems,
              databases, version control, and modern JavaScript technologies.
            </p>
          </div>

<div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-5">
  {skills.map((skill) => (
    <div
      key={skill.name}
      className="group rounded-[20px] border border-white/10 bg-white/10 p-3 text-center shadow-[0_16px_40px_rgba(0,0,0,.22)] backdrop-blur-xl transition duration-300 hover:-translate-y-1.5 hover:bg-white/[0.12]"
    >
      <div className="mx-auto flex h-14 w-14 items-center justify-center">
        <div className="block-container h-12 w-12">
          <div className="btn-back rounded-xl" />
          <div className="btn-front flex items-center justify-center rounded-xl">
            <img
              src={skill.imageUrl}
              alt={skill.name}
              className="h-1/2 w-1/2 object-contain"
            />
          </div>
        </div>
      </div>

      <h4 className="mt-3 text-xs font-semibold text-white sm:text-sm">
        {skill.name}
      </h4>
      <p className="mt-1 text-[11px] text-white/50">{skill.type}</p>
    </div>
  ))}
</div>
        </div>

        {/* experience */}
        <div className="py-8">
          <div className="mb-8">
            <h3 className="text-2xl font-semibold text-white sm:text-3xl">
              Experience Journey
            </h3>
            <div className="mt-4 max-w-3xl space-y-3 text-sm leading-7 text-white/65 sm:text-base">
              <p>
                My professional growth is rooted in project-based development,
                where I have taken responsibility for both individual and
                collaborative work.
              </p>
              <p>
                By treating each build like a professional engagement, I have
                strengthened my skills in version control, system thinking,
                agile problem solving, and clear team communication.
              </p>
            </div>
          </div>

          <div className="rounded-[30px] border border-white/10 bg-white/[0.06] p-3 shadow-[0_20px_60px_rgba(0,0,0,.25)] backdrop-blur-xl sm:p-5">
            <VerticalTimeline lineColor="rgba(255,255,255,0.15)">
              {experiences.map((experience, index) => (
                <VerticalTimelineElement
                  key={`${experience.title}-${index}`}
                  date={experience.date}
                  iconStyle={{
                    background: experience.iconBg,
                    boxShadow: "0 0 0 6px rgba(255,255,255,0.08)",
                  }}
                  icon={
                    <div className="flex h-full w-full items-center justify-center">
                      <img
                        src={experience.icon}
                        alt={experience.title}
                        className="h-[60%] w-[60%] object-contain"
                      />
                    </div>
                  }
                  contentStyle={{
                    background: "rgba(255,255,255,0.10)",
                    color: "#ffffff",
                    border: "1px solid rgba(255,255,255,0.10)",
                    borderBottom: "6px solid",
                    borderBottomColor: experience.iconBg,
                    borderRadius: "22px",
                    boxShadow: "0 20px 50px rgba(0,0,0,0.25)",
                    backdropFilter: "blur(10px)",
                  }}
                  contentArrowStyle={{
                    borderRight: "10px solid rgba(255,255,255,0.10)",
                  }}
                >
                  <div>
                    <h3 className="text-xl font-semibold text-white">
                      {experience.title}
                    </h3>
                    
                  </div>

                  <ul className="my-5 ml-5 list-disc space-y-2">
                    {experience.points.map((point, pointIndex) => (
                      <li
                        key={`experience-point-${pointIndex}`}
                        className="pl-1 text-sm leading-6 text-white/75"
                      >
                        {point}
                      </li>
                    ))}
                  </ul>
                </VerticalTimelineElement>
              ))}
            </VerticalTimeline>
          </div>
        </div>

        <hr className="mt-10 border-white/10" />
        <CTA />
      </div>
    </section>
  );
};

export default About;