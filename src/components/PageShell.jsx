import React from "react";

export default function PageShell({ title, subtitle, rightSlot, children }) {
  return (
    <section className="max-container py-10 sm:py-14">
      <div className="glass-strong p-7 sm:p-10 relative overflow-hidden">
        {/* soft glow blobs */}
        <div className="absolute -top-24 -left-24 h-72 w-72 rounded-full bg-sky-400/15 blur-3xl" />
        <div className="absolute -bottom-24 -right-24 h-72 w-72 rounded-full bg-amber-300/15 blur-3xl" />
        <div className="absolute top-10 right-10 h-56 w-56 rounded-full bg-rose-400/10 blur-3xl" />

        <div className="relative flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <h1 className="text-3xl sm:text-5xl font-bold tracking-tight">
              <span className="text-white">{title}</span>
            </h1>
            {subtitle && (
              <p className="mt-2 text-white/75 max-w-2xl leading-relaxed">
                {subtitle}
              </p>
            )}
          </div>
          {rightSlot ? <div className="flex gap-3">{rightSlot}</div> : null}
        </div>
      </div>

      <div className="mt-8">{children}</div>
    </section>
  );
}