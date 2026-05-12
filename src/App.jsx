// src/App.jsx

export default function App() {
  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100">
      
      {/* NAVBAR */}
      <header className="border-b border-zinc-800 bg-zinc-900/80 backdrop-blur sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="h-16 flex items-center justify-between">
            
            {/* LOGO / TITLE */}
            <div className="text-2xl font-bold tracking-wide">
              RoysRant
            </div>

            {/* NAV LINKS */}
            <nav className="hidden md:flex items-center gap-8 text-sm">
              <a href="#" className="hover:text-red-400 transition">
                Home
              </a>

              <a href="#" className="hover:text-red-400 transition">
                Articles
              </a>

              <a href="#" className="hover:text-red-400 transition">
                Videos
              </a>

              <a href="#" className="hover:text-red-400 transition">
                Contact
              </a>
            </nav>

            {/* MOBILE BUTTON */}
            <button className="md:hidden text-sm border border-zinc-700 px-3 py-1 rounded-lg">
              Menu
            </button>
          </div>
        </div>
      </header>

      {/* HERO */}
      <section className="px-4 py-24">
        <div className="max-w-7xl mx-auto">
          
          <div className="max-w-3xl">
            <p className="text-red-400 uppercase tracking-[0.25em] text-sm mb-4">
              Welcome
            </p>

            <h1 className="text-5xl md:text-7xl font-black leading-tight">
              RoysRant
            </h1>

            <p className="mt-6 text-zinc-400 text-lg leading-relaxed">
              Thoughts, opinions, updates, and whatever else ends up here.
            </p>

            <div className="mt-10 flex flex-wrap gap-4">
              <button className="bg-red-500 hover:bg-red-600 transition px-6 py-3 rounded-xl font-semibold">
                Latest Posts
              </button>

              <button className="border border-zinc-700 hover:border-zinc-500 transition px-6 py-3 rounded-xl font-semibold">
                About
              </button>
            </div>
          </div>

        </div>
      </section>

      {/* CONTENT GRID */}
      <section className="px-4 pb-24">
        <div className="max-w-7xl mx-auto grid gap-6 md:grid-cols-2 lg:grid-cols-3">

          <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6">
            <h2 className="text-xl font-bold mb-3">
              Article One
            </h2>

            <p className="text-zinc-400">
              Placeholder content for future posts or updates.
            </p>
          </div>

          <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6">
            <h2 className="text-xl font-bold mb-3">
              Article Two
            </h2>

            <p className="text-zinc-400">
              Add whatever sections you want here later.
            </p>
          </div>

          <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6">
            <h2 className="text-xl font-bold mb-3">
              Article Three
            </h2>

            <p className="text-zinc-400">
              This layout is already mobile responsive.
            </p>
          </div>

        </div>
      </section>

      {/* FOOTER */}
      <footer className="border-t border-zinc-800 py-8 px-4">
        <div className="max-w-7xl mx-auto text-zinc-500 text-sm">
          © 2026 RoysRant
        </div>
      </footer>

    </div>
  );
}

/*
Hold this for me:

https://flowbite-react.com/docs/components/navbar?utm_source=chatgpt.com

https://tailwindcss.com/docs/installation/using-vite



*/