import { useEffect, useRef, useState } from 'react'
import Hls from 'hls.js'
import { ArrowRight, Menu, X } from 'lucide-react'

const STREAM_URL = 'https://stream.mux.com/tLkHO1qZoaaQOUeVWo8hEBeGQfySP02EPS02BmnNFyXys.m3u8'
const links = ['PROJECTS', 'BLOG', 'ABOUT', 'RESUME']

function VideoBackground() {
  const videoRef = useRef(null)

  useEffect(() => {
    const video = videoRef.current
    if (!video) return
    let hls

    if (Hls.isSupported()) {
      hls = new Hls({ enableWorker: false })
      hls.loadSource(STREAM_URL)
      hls.attachMedia(video)
      hls.on(Hls.Events.MANIFEST_PARSED, () => {
        video.play().catch(() => {})
      })
    } else if (video.canPlayType('application/vnd.apple.mpegurl')) {
      video.src = STREAM_URL
      video.addEventListener('loadedmetadata', () => video.play().catch(() => {}), { once: true })
    }

    return () => hls?.destroy()
  }, [])

  return (
    <video
      ref={videoRef}
      className="absolute inset-0 h-full w-full object-cover opacity-60 motion-reduce:hidden"
      autoPlay
      muted
      loop
      playsInline
      aria-hidden="true"
    />
  )
}

function Logo() {
  return (
    <a href="#" className="group flex items-center gap-3" aria-label="CodeNest home">
      <svg className="h-8 w-8" viewBox="0 0 32 32" fill="none" aria-hidden="true">
        <path d="M8.2 8.8 16 4.4l7.8 4.4v8.8L16 22l-7.8-4.4V8.8Z" stroke="white" strokeWidth="1.6" />
        <path d="m12.7 13.2 3.3-2 3.3 2v3.7L16 19l-3.3-2.1v-3.7Z" fill="#5ed29c" />
        <path d="M16 22v5.2" stroke="white" strokeWidth="1.6" />
      </svg>
      <span className="font-inter text-[17px] font-extrabold tracking-[-0.04em] text-white">CodeNest</span>
    </a>
  )
}

function Header() {
  const [open, setOpen] = useState(false)

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [open])

  return (
    <header className="absolute inset-x-0 top-0 z-50 border-b border-white/10">
      <div className="mx-auto flex h-20 max-w-[1440px] items-center justify-between px-6 md:px-10 lg:px-14">
        <Logo />
        <nav className="hidden items-center gap-9 md:flex" aria-label="Primary navigation">
          {links.map((link) => (
            <a key={link} href={`#${link.toLowerCase()}`} className="font-inter text-base text-white transition-colors hover:text-mint focus-visible:outline-none focus-visible:text-mint">
              {link}
            </a>
          ))}
        </nav>
        <button
          className="grid h-11 w-11 place-items-center text-white md:hidden"
          onClick={() => setOpen(true)}
          aria-label="Open navigation"
          aria-expanded={open}
        >
          <Menu size={25} />
        </button>
      </div>

      <div className={`fixed inset-0 z-[60] flex flex-col bg-ink transition-transform duration-500 md:hidden ${open ? 'translate-x-0' : 'translate-x-full'}`} aria-hidden={!open}>
        <div className="flex h-20 items-center justify-between border-b border-white/10 px-6">
          <Logo />
          <button className="grid h-11 w-11 place-items-center text-white" onClick={() => setOpen(false)} aria-label="Close navigation">
            <X size={25} />
          </button>
        </div>
        <nav className="flex flex-1 flex-col justify-center gap-4 px-6" aria-label="Mobile navigation">
          {links.map((link, index) => (
            <a key={link} href={`#${link.toLowerCase()}`} onClick={() => setOpen(false)} className="border-b border-white/10 py-4 font-inter text-4xl font-extrabold tracking-tight text-white transition-colors hover:text-mint">
              <span className="mr-4 align-middle text-[10px] font-bold text-mint">0{index + 1}</span>{link}
            </a>
          ))}
        </nav>
      </div>
    </header>
  )
}

function GlassCard() {
  return (
    <aside className="liquid-glass h-[200px] w-[200px] translate-y-[-50px] p-5 text-white" aria-label="Industry instruction highlight">
      <div className="flex h-full flex-col justify-between">
        <span className="font-inter text-sm tracking-[0.14em] text-white/65">[ 2025 ]</span>
        <div>
          <h2 className="font-inter text-[18px] font-medium leading-[1.08] tracking-[-0.03em]">
            Taught by <span className="font-instrument text-[21px] italic font-normal">Industry</span> Professionals
          </h2>
          <p className="mt-3 font-inter text-[11px] leading-[1.45] text-white/55">
            Learn the workflows, tools, and standards used by modern product teams.
          </p>
        </div>
      </div>
    </aside>
  )
}

export default function App() {
  return (
    <main className="relative min-h-screen min-w-0 overflow-hidden bg-ink text-white">
      <VideoBackground />
      <div className="absolute inset-0 bg-[linear-gradient(90deg,#070b0a_0%,rgba(7,11,10,0.82)_35%,rgba(7,11,10,0)_78%)]" />
      <div className="absolute inset-0 bg-[linear-gradient(0deg,#070b0a_0%,rgba(7,11,10,0.72)_14%,rgba(7,11,10,0)_55%)]" />

      <svg className="pointer-events-none absolute left-1/2 top-[9%] h-[270px] w-[900px] max-w-[120vw] -translate-x-1/2 opacity-70" viewBox="0 0 900 270" fill="none" aria-hidden="true">
        <defs><filter id="ellipseGlow" x="-20%" y="-80%" width="140%" height="260%"><feGaussianBlur stdDeviation="25" /></filter></defs>
        <ellipse cx="450" cy="110" rx="300" ry="46" fill="url(#glowFill)" filter="url(#ellipseGlow)" />
        <defs><linearGradient id="glowFill" x1="170" y1="110" x2="730" y2="110"><stop stopColor="#063E36" stopOpacity="0"/><stop offset=".45" stopColor="#30D8BD" stopOpacity=".48"/><stop offset="1" stopColor="#0B4C3D" stopOpacity="0"/></linearGradient></defs>
      </svg>

      <div className="pointer-events-none absolute inset-0 hidden md:block" aria-hidden="true">
        {[25, 50, 75].map((position) => <span key={position} className="absolute inset-y-0 w-px bg-white/10" style={{ left: `${position}%` }} />)}
      </div>

      <Header />

      <section className="relative z-20 mx-auto flex min-h-screen max-w-[1440px] items-end px-6 pb-12 pt-[300px] sm:pb-16 md:px-10 md:pb-20 md:pt-[340px] lg:px-14 lg:pb-16" aria-labelledby="hero-title">
        <div className="w-full max-w-[920px]">
          <GlassCard />
          <div className="-mt-[22px]">
            <p className="font-jakarta text-[11px] font-bold uppercase tracking-[0.22em] text-mint">Career-Ready Curriculum</p>
            <h1 id="hero-title" className="mt-4 max-w-[900px] font-inter text-[40px] font-extrabold uppercase leading-[0.92] tracking-[-0.055em] text-white sm:text-[52px] md:text-[64px] lg:text-[72px]">
              Launch Your<br className="hidden sm:block" /> Coding Career<span className="text-mint">.</span>
            </h1>
            <div className="mt-7 flex flex-col gap-7 sm:flex-row sm:items-end sm:justify-between">
              <p className="max-w-lg font-inter text-sm leading-6 text-white/70">
                Master in-demand coding skills through hands-on projects, expert mentorship, and a curriculum designed to get you hired.
              </p>
              <a href="#get-started" className="group inline-flex min-h-12 w-fit items-center gap-3 rounded-full bg-mint px-6 py-3 font-inter text-xs font-extrabold uppercase tracking-[0.12em] text-ink transition-transform hover:-translate-y-0.5 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-mint">
                Get Started <ArrowRight size={17} strokeWidth={2.4} className="transition-transform group-hover:translate-x-1" />
              </a>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}
