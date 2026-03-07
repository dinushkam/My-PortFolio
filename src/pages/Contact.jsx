import emailjs from "@emailjs/browser";
import { Canvas } from "@react-three/fiber";
import { Suspense, useMemo, useRef, useState } from "react";

import { Fox } from "../models";
import useAlert from "../hooks/useAlert";
import { Alert, Loader } from "../components";

const Contact = () => {
  const formRef = useRef(null);
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const { alert, showAlert, hideAlert } = useAlert();
  const [loading, setLoading] = useState(false);
  const [currentAnimation, setCurrentAnimation] = useState("idle");

  const handleChange = ({ target: { name, value } }) => {
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleFocus = () => setCurrentAnimation("walk");
  const handleBlur = () => setCurrentAnimation("idle");

  const isFormValid = useMemo(() => {
    return (
      form.name.trim().length > 3 &&
      form.email.trim().length > 3 &&
      form.message.trim().length > 3
    );
  }, [form]);

const handleSubmit = (e) => {
  e.preventDefault();

  if (!isFormValid) {
    showAlert({
      show: true,
      text: "Please fill in all fields correctly.",
      type: "danger",
    });
    return;
  }

  setLoading(true);
  setCurrentAnimation("hit");

  emailjs
    .send(
      import.meta.env.VITE_APP_EMAILJS_SERVICE_ID,
      import.meta.env.VITE_APP_EMAILJS_TEMPLATE_ID,
      {
  title: "Portfolio Contact",
  name: form.name,
  email: form.email,
  message: form.message,
},
      import.meta.env.VITE_APP_EMAILJS_PUBLIC_KEY
    )
    .then(
      () => {
        setLoading(false);
        showAlert({
          show: true,
          text: "Message sent successfully - I'll get back to you soon!",
          type: "success",
        });

        setTimeout(() => {
          hideAlert(false);
          setCurrentAnimation("idle");
          setForm({ name: "", email: "", message: "" });
        }, 3000);
      },
      (error) => {
        setLoading(false);
        console.error(error);
        setCurrentAnimation("idle");

        showAlert({
          show: true,
          text: "Message failed to send. Please try again.",
          type: "danger",
        });
      }
    );
};

  return (
    <section className="relative overflow-hidden px-4 py-10 sm:px-6 lg:px-8">
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-b from-[#030712] via-[#041b33] to-[#063a66]" />
        <div className="absolute inset-0 opacity-70 bg-[radial-gradient(circle_at_15%_20%,rgba(125,211,252,.16),transparent_38%),radial-gradient(circle_at_80%_18%,rgba(246,196,83,.14),transparent_36%),radial-gradient(circle_at_60%_85%,rgba(255,59,92,.10),transparent_45%)]" />
        <div className="absolute inset-0 opacity-[0.06] bg-[linear-gradient(rgba(255,255,255,.65)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.65)_1px,transparent_1px)] bg-[size:26px_26px]" />
        <div className="absolute -top-12 left-1/2 h-52 w-[75%] -translate-x-1/2 rounded-full bg-sky-300/10 blur-3xl" />
      </div>

      <div className="mx-auto max-w-6xl">
        <div className="mb-8 sm:mb-10">
          <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/10 px-4 py-2 text-xs text-white/80 backdrop-blur-xl">
            <span className="h-2 w-2 rounded-full bg-emerald-300" />
            Available for freelance, internships, and collaborations
          </div>

          <h1 className="mt-5 text-3xl font-semibold tracking-tight text-white sm:text-4xl lg:text-5xl">
            Let’s build something meaningful together
          </h1>

          <p className="mt-4 max-w-3xl text-sm leading-7 text-white/70 sm:text-base">
            Whether it is a data science project, a web application, a blockchain
            idea, or a portfolio collaboration, send me a message and I will get
            back to you as soon as possible.
          </p>
        </div>

        <div className="relative grid gap-8 lg:grid-cols-[1.1fr_.9fr]">
          <div className="relative z-20 space-y-6">
            <div className="grid gap-4 sm:grid-cols-3">
              <div className="rounded-3xl border border-white/10 bg-white/10 p-4 backdrop-blur-xl shadow-[0_18px_50px_rgba(0,0,0,.25)]">
                <p className="text-xs uppercase tracking-[0.2em] text-white/45">
                  Email
                </p>
                <p className="mt-2 text-sm font-medium text-white break-all">
                  dinushkamalshan32@gmail.com
                </p>
              </div>

              <div className="rounded-3xl border border-white/10 bg-white/10 p-4 backdrop-blur-xl shadow-[0_18px_50px_rgba(0,0,0,.25)]">
                <p className="text-xs uppercase tracking-[0.2em] text-white/45">
                  Response
                </p>
                <p className="mt-2 text-sm font-medium text-white">
                  Usually within 24 hours
                </p>
              </div>

              <div className="rounded-3xl border border-white/10 bg-white/10 p-4 backdrop-blur-xl shadow-[0_18px_50px_rgba(0,0,0,.25)]">
                <p className="text-xs uppercase tracking-[0.2em] text-white/45">
                  Focus
                </p>
                <p className="mt-2 text-sm font-medium text-white">
                  Data, Web, Blockchain
                </p>
              </div>
            </div>

            <div className="rounded-[28px] border border-white/10 bg-white/10 p-5 shadow-[0_20px_60px_rgba(0,0,0,.32)] backdrop-blur-xl sm:p-7">
              <div className="mb-6">
                <h2 className="text-xl font-semibold text-white sm:text-2xl">
                  Send a message
                </h2>
                <p className="mt-2 text-sm text-white/65">
                  Tell me a bit about your project, timeline, or idea.
                </p>
              </div>

              <form
                ref={formRef}
                onSubmit={handleSubmit}
                className="flex w-full flex-col gap-5"
              >
                <div className="grid gap-4 sm:grid-cols-2">
                  <label className="flex flex-col gap-2 text-sm text-white/80">
                    <span className="font-medium">Name</span>
                    <input
                      type="text"
                      name="name"
                      className="rounded-2xl border border-white/10 bg-[#071120]/80 px-4 py-3 text-white outline-none transition placeholder:text-white/30 focus:border-sky-300/40 focus:bg-[#0a1629]"
                      placeholder="Your name"
                      required
                      value={form.name}
                      onChange={handleChange}
                      onFocus={handleFocus}
                      onBlur={handleBlur}
                    />
                  </label>

                  <label className="flex flex-col gap-2 text-sm text-white/80">
                    <span className="font-medium">Email</span>
                    <input
                      type="email"
                      name="email"
                      className="rounded-2xl border border-white/10 bg-[#071120]/80 px-4 py-3 text-white outline-none transition placeholder:text-white/30 focus:border-sky-300/40 focus:bg-[#0a1629]"
                      placeholder="you@example.com"
                      required
                      value={form.email}
                      onChange={handleChange}
                      onFocus={handleFocus}
                      onBlur={handleBlur}
                    />
                  </label>
                </div>

                <label className="flex flex-col gap-2 text-sm text-white/80">
                  <span className="font-medium">Message</span>
                  <textarea
                    name="message"
                    rows="6"
                    className="rounded-2xl border border-white/10 bg-[#071120]/80 px-4 py-3 text-white outline-none transition placeholder:text-white/30 focus:border-sky-300/40 focus:bg-[#0a1629]"
                    placeholder="Tell me about your idea, project, or opportunity..."
                    value={form.message}
                    onChange={handleChange}
                    onFocus={handleFocus}
                    onBlur={handleBlur}
                    required
                  />
                </label>

                <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                  <button
  type="submit"
  disabled={loading}
  className="inline-flex items-center justify-center gap-3 rounded-2xl border border-amber-200/15 bg-gradient-to-r from-amber-300/90 to-orange-400/90 px-5 py-3 text-sm font-semibold text-slate-950 transition hover:scale-[1.01] disabled:cursor-not-allowed disabled:opacity-60"
  onFocus={handleFocus}
  onBlur={handleBlur}
>
                    {loading ? "Sending..." : "Send Message"}
                    <span className="h-2 w-2 rounded-full bg-slate-900/70" />
                  </button>

                  <p className="text-xs text-white/50">
                    Clear communication. Practical solutions. Fast response.
                  </p>
                </div>

                {alert.show && (
                  <div className="mt-1 w-full">
                    <Alert {...alert} />
                  </div>
                )}
              </form>
            </div>
          </div>

          <div className="relative z-10 rounded-[28px] border border-white/10 bg-white/10 p-5 shadow-[0_20px_60px_rgba(0,0,0,.32)] backdrop-blur-xl sm:p-6">
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-xs uppercase tracking-[0.2em] text-white/45">
                  Interactive assistant
                </p>
                <h2 className="mt-2 text-xl font-semibold text-white">
                  Meet Fox
                </h2>
                <p className="mt-2 max-w-md text-sm leading-6 text-white/65">
                  Fox reacts while you type and makes the contact section feel
                  more alive and personal.
                </p>
              </div>

              <div className="rounded-full border border-emerald-300/15 bg-emerald-300/10 px-3 py-1 text-xs text-emerald-200">
                Live
              </div>
            </div>

            <div className="mt-5 overflow-hidden rounded-[24px] border border-white/10 bg-[linear-gradient(180deg,rgba(8,17,31,.95),rgba(4,12,24,.92))] pointer-events-none">
              <div className="flex items-center justify-between border-b border-white/10 px-4 py-3">
                <div className="flex items-center gap-2">
                  <span className="h-2.5 w-2.5 rounded-full bg-rose-300/80" />
                  <span className="h-2.5 w-2.5 rounded-full bg-amber-300/80" />
                  <span className="h-2.5 w-2.5 rounded-full bg-emerald-300/80" />
                </div>
                <p className="text-xs text-white/45">3D contact companion</p>
              </div>

              <div className="relative h-[320px] overflow-hidden sm:h-[380px] lg:h-[460px]">
                <Canvas
                  className="absolute inset-0"
                  camera={{
                    position: [0, 0, 5],
                    fov: 60,
                    near: 0.1,
                    far: 1000,
                  }}
                >
                  <directionalLight position={[0, 0, 1]} intensity={2.5} />
                  <ambientLight intensity={1} />
                  <pointLight position={[5, 10, 0]} intensity={2} />
                  <spotLight
                    position={[10, 10, 10]}
                    angle={0.15}
                    penumbra={1}
                    intensity={2}
                  />

                  <Suspense fallback={<Loader />}>
                    <Fox
                      currentAnimation={currentAnimation}
                      position={[0.5, 0.35, 0]}
                      rotation={[12.629, -0.6, 0]}
                      scale={[0.5, 0.5, 0.5]}
                    />
                  </Suspense>
                </Canvas>
              </div>
            </div>

            <div className="mt-5 grid gap-3 sm:grid-cols-2">
              <div className="rounded-2xl border border-white/10 bg-black/10 p-4">
                <p className="text-xs text-white/45">Best for</p>
                <p className="mt-2 text-sm text-white/80">
                  Freelance work, internships, collaborations, and project discussions
                </p>
              </div>

              <div className="rounded-2xl border border-white/10 bg-black/10 p-4">
                <p className="text-xs text-white/45">Preferred message</p>
                <p className="mt-2 text-sm text-white/80">
                  Include your goal, timeline, and what kind of help you need
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;