export default function Home() {
  return (
    <main className="min-h-screen bg-white text-slate-900">
      <nav className="sticky top-0 z-50 border-b border-slate-200 bg-white/80 backdrop-blur">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
          <div className="flex items-center gap-2">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-slate-900 text-white font-bold">CM</div>
            <span className="text-lg font-semibold tracking-tight">Collab Mesh</span>
          </div>
          <div className="hidden items-center gap-8 md:flex text-sm text-slate-600">
            <a href="#features" className="hover:text-slate-900">Features</a>
            <a href="#workflow" className="hover:text-slate-900">Workflow</a>
            <a href="#contact" className="hover:text-slate-900">Contact</a>
          </div>
          <a
            href="#contact"
            className="rounded-full bg-slate-900 px-5 py-2.5 text-sm font-medium text-white transition hover:bg-slate-700"
          >
            Get started
          </a>
        </div>
      </nav>

      <section className="mx-auto grid max-w-7xl items-center gap-14 px-6 py-20 md:grid-cols-2 md:py-28">
        <div>
          <span className="inline-flex rounded-full bg-slate-100 px-3 py-1 text-sm font-medium text-slate-700">
            Modern collaboration for fast-moving teams
          </span>
          <h1 className="mt-6 text-4xl font-semibold tracking-tight text-slate-950 sm:text-5xl lg:text-6xl">
            Build, share, and ship together in one clean workspace.
          </h1>
          <p className="mt-6 max-w-xl text-lg leading-8 text-slate-600">
            Collab Mesh helps teams coordinate projects, track tasks, and keep everyone aligned with a simple, elegant interface.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <a
              href="#contact"
              className="inline-flex items-center justify-center rounded-full bg-indigo-600 px-6 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-indigo-500"
            >
              Start now
            </a>
            <a
              href="#features"
              className="inline-flex items-center justify-center rounded-full border border-slate-300 px-6 py-3 text-sm font-semibold text-slate-700 transition hover:border-slate-400 hover:text-slate-950"
            >
              Explore features
            </a>
          </div>
        </div>

        <div className="rounded-3xl border border-slate-200 bg-slate-50 p-6 shadow-sm">
          <div className="rounded-2xl bg-white p-5 shadow-sm">
            <div className="flex items-center justify-between border-b border-slate-100 pb-4">
              <div>
                <p className="text-sm font-medium text-slate-500">Team project</p>
                <h2 className="text-xl font-semibold text-slate-900">Q2 Launch Sprint</h2>
              </div>
              <span className="rounded-full bg-emerald-100 px-3 py-1 text-sm font-medium text-emerald-700">On track</span>
            </div>
            <div className="mt-5 space-y-4">
              {[
                ["Design review", "Done"],
                ["API integration", "In progress"],
                ["Testing", "Pending"],
              ].map(([task, status]) => (
                <div key={task} className="flex items-center justify-between rounded-xl bg-slate-50 px-4 py-3">
                  <span className="font-medium text-slate-800">{task}</span>
                  <span className="text-sm text-slate-500">{status}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section id="features" className="bg-slate-50 px-6 py-20">
        <div className="mx-auto max-w-7xl">
          <h2 className="text-3xl font-semibold tracking-tight text-slate-950">Everything your team needs</h2>
          <div className="mt-10 grid gap-6 md:grid-cols-3">
            {[
              ["Real-time updates", "Keep everyone synced with live progress and shared visibility."],
              ["Simple task flow", "Organize work into clear stages without clutter or confusion."],
              ["Clean reporting", "See progress at a glance with an interface that stays easy to read."],
            ].map(([title, desc]) => (
              <div key={title} className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
                <h3 className="text-lg font-semibold text-slate-900">{title}</h3>
                <p className="mt-3 text-slate-600">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="workflow" className="mx-auto max-w-7xl px-6 py-20">
        <div className="grid gap-8 md:grid-cols-2 md:items-center">
          <div>
            <h2 className="text-3xl font-semibold tracking-tight text-slate-950">Designed for clarity</h2>
            <p className="mt-4 text-slate-600 leading-8">
              From planning to delivery, Collab Mesh keeps the interface calm and focused so your team can move faster with less friction.
            </p>
          </div>
          <div className="rounded-3xl bg-slate-900 p-8 text-white">
            <p className="text-sm uppercase tracking-[0.2em] text-slate-400">Workflow</p>
            <ol className="mt-6 space-y-4">
              <li><span className="font-semibold">01.</span> Plan the work</li>
              <li><span className="font-semibold">02.</span> Collaborate in real time</li>
              <li><span className="font-semibold">03.</span> Deliver with confidence</li>
            </ol>
          </div>
        </div>
      </section>

      <section id="contact" className="border-t border-slate-200 px-6 py-16">
        <div className="mx-auto flex max-w-7xl flex-col items-start justify-between gap-4 md:flex-row md:items-center">
          <div>
            <h2 className="text-2xl font-semibold text-slate-950">Ready to build your workspace?</h2>
            <p className="mt-2 text-slate-600">Launch a polished homepage for your project in minutes.</p>
          </div>
          <a href="#" className="rounded-full bg-slate-900 px-6 py-3 text-sm font-semibold text-white">Contact us</a>
        </div>
      </section>
    </main>
  )
}