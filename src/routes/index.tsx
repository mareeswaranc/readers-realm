import { createFileRoute } from "@tanstack/react-router";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useEffect, useMemo, useRef, useState, type ReactNode } from "react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import hero from "@/assets/hero.jpg";
import { collection, realms, type Entry, type Realm, type Status } from "@/data/collection";
import { computeStats } from "@/lib/stats";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Reader's Realm — My World of Stories" },
      {
        name: "description",
        content:
          "Reader's Realm — a dark fantasy library of the books, manhwa, web novels and anime I've read and watched.",
      },
      { property: "og:title", content: "Reader's Realm" },
      {
        property: "og:description",
        content: "Every story leaves a mark. Every world becomes a part of me.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

const statuses: (Status | "All")[] = ["All", "Completed", "Reading", "Watching", "Plan to Read"];
const sortModes = [
  ["curated", "Curated"],
  ["rating", "★ Rating"],
  ["az", "A–Z"],
] as const;
type SortMode = (typeof sortModes)[number][0];

// Respect the OS "reduce motion" setting for JS-driven effects (parallax, tilt, counters)
const prefersReducedMotion = () =>
  typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

const chartTooltip = {
  cursor: { fill: "color-mix(in oklab, var(--mystic) 12%, transparent)" },
  contentStyle: {
    background: "var(--popover)",
    border: "1px solid var(--border)",
    borderRadius: "0.75rem",
    color: "var(--foreground)",
    fontSize: 12,
  },
  labelStyle: { color: "var(--gold)" },
} as const;

function Particles({ count }: { count: number }) {
  const [ps, setPs] = useState<{ l: number; d: number; s: number; delay: number; c: string }[]>([]);
  useEffect(() => {
    if (prefersReducedMotion()) return;
    const cs = ["var(--mystic)", "var(--arcane)", "var(--gold)"];
    setPs(
      Array.from({ length: count }, () => ({
        l: Math.random() * 100,
        d: 10 + Math.random() * 18,
        s: 2 + Math.random() * 4,
        delay: -Math.random() * 25,
        c: cs[Math.floor(Math.random() * 3)]!,
      })),
    );
  }, [count]);
  return (
    <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden arcane-only">
      {ps.map((p, i) => (
        <span
          key={i}
          className="absolute bottom-[-10px] rounded-full"
          style={{
            left: `${p.l}%`,
            width: p.s,
            height: p.s,
            background: p.c,
            boxShadow: `0 0 ${p.s * 4}px ${p.c}`,
            animation: `float-up ${p.d}s linear ${p.delay}s infinite`,
          }}
        />
      ))}
    </div>
  );
}

function useReveal() {
  useEffect(() => {
    // Respect users who ask for less motion: show everything immediately.
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      document.querySelectorAll(".reveal").forEach((el) => el.classList.add("in"));
      return;
    }

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          entry.target.classList.add("in");
          io.unobserve(entry.target);
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -5% 0px" },
    );

    // Reveal anything already rendered. The observer stays alive so elements
    // added later (filtering/sorting) get picked up by the MutationObserver.
    const observe = () => {
      document.querySelectorAll(".reveal:not(.in)").forEach((el) => io.observe(el));
    };
    observe();

    const mo = new MutationObserver(observe);
    mo.observe(document.body, { childList: true, subtree: true });

    // Safety net: if IntersectionObserver never fires (unsupported, prerendered
    // static page, print, etc.) make sure nothing is left invisible forever.
    const failsafe = window.setTimeout(() => {
      document.querySelectorAll(".reveal").forEach((el) => {
        const r = el.getBoundingClientRect();
        if (r.top < window.innerHeight * 1.2) el.classList.add("in");
      });
    }, 1500);

    return () => {
      io.disconnect();
      mo.disconnect();
      window.clearTimeout(failsafe);
    };
  }, []);
}

function Cover({ e, className = "" }: { e: Entry; className?: string }) {
  // Fall back to the generated arcane cover if the image fails to load or is too small/blurry
  const [ok, setOk] = useState(true);
  if (e.cover && ok)
    return (
      <img
        src={e.cover}
        alt={e.title}
        loading="lazy"
        onError={() => setOk(false)}
        onLoad={(ev) => {
          if (ev.currentTarget.naturalWidth < 250) setOk(false);
        }}
        className={`h-full w-full object-cover ${className}`}
      />
    );
  const glyph = realms.find((r) => r.id === e.realm)?.glyph;
  return (
    <div
      className={`relative flex h-full w-full flex-col items-center justify-center overflow-hidden bg-gradient-to-br from-navy via-background to-mystic/40 p-4 text-center ${className}`}
    >
      <div className="absolute h-40 w-40 rounded-full border border-gold/30 animate-spin-slow" />
      <div className="absolute h-28 w-28 rounded-full bg-mystic/30 blur-2xl animate-pulse-glow" />
      <span className="relative font-display text-5xl text-gold text-glow">{glyph}</span>
      <span className="relative mt-3 font-display text-sm leading-tight text-foreground">
        {e.title}
      </span>
    </div>
  );
}

function Card({ e, onOpen }: { e: Entry; onOpen: () => void }) {
  const ref = useRef<HTMLButtonElement>(null);
  const move = (ev: React.MouseEvent) => {
    if (prefersReducedMotion()) return;
    const r = ref.current!.getBoundingClientRect();
    const x = (ev.clientX - r.left) / r.width - 0.5,
      y = (ev.clientY - r.top) / r.height - 0.5;
    ref.current!.style.transform = `perspective(800px) rotateY(${x * 14}deg) rotateX(${-y * 14}deg) translateY(-8px)`;
  };
  return (
    <button
      ref={ref}
      onClick={onOpen}
      onMouseMove={move}
      onMouseLeave={() => (ref.current!.style.transform = "")}
      className="group relative overflow-hidden rounded-xl border border-border bg-card text-left transition-[transform,box-shadow] duration-200 hover:border-mystic hover:shadow-[0_0_40px_-6px_var(--mystic)]"
    >
      <div className="aspect-[3/4]">
        <Cover e={e} className="transition-transform duration-500 group-hover:scale-105" />
      </div>
      <div className="p-4">
        <div className="flex items-center justify-between text-xs uppercase tracking-widest text-arcane">
          <span>{e.type}</span>
          {e.rating > 0 && <span className="text-gold">★ {e.rating}</span>}
        </div>
        <h3 className="mt-1 truncate text-base text-foreground">{e.title}</h3>
        <span className="mt-2 inline-block rounded-full border border-gold/40 px-2 py-0.5 text-[11px] text-gold">
          {e.status}
        </span>
      </div>
    </button>
  );
}

function Index() {
  const [quiet, setQuiet] = useState(false);
  const [realm, setRealm] = useState<Realm | "all">("all");
  const [status, setStatus] = useState<Status | "All">("All");
  const [genre, setGenre] = useState("All");
  const [sort, setSort] = useState<SortMode>("curated");
  const [q, setQ] = useState("");
  const [open, setOpen] = useState<Entry | null>(null);
  const [m, setM] = useState({ x: 0, y: 0 });
  const [active, setActive] = useState("");
  useReveal();
  const stats = useMemo(() => computeStats(collection), []);
  // Only show realms and statuses that actually have entries
  const realmList = realms.filter((r) => collection.some((e) => e.realm === r.id));
  const statusList = statuses.filter((s) => s === "All" || collection.some((e) => e.status === s));
  const genreList = useMemo(() => [...new Set(collection.flatMap((e) => e.genres))].sort(), []);
  const reading = collection.filter((e) => e.status === "Reading");
  const highlights = collection.filter((e) => e.highlight);
  const list = useMemo(() => {
    const out = collection.filter(
      (e) =>
        (realm === "all" || e.realm === realm) &&
        (status === "All" || e.status === status) &&
        (genre === "All" || e.genres.includes(genre)) &&
        (e.title + e.creator + e.genres.join()).toLowerCase().includes(q.toLowerCase()),
    );
    if (sort === "rating") out.sort((a, b) => b.rating - a.rating);
    if (sort === "az") out.sort((a, b) => a.title.localeCompare(b.title));
    return out;
  }, [realm, status, genre, q, sort]);
  const pick = (r: Realm) => {
    setRealm(r);
    document.getElementById("archive")?.scrollIntoView({ behavior: "smooth" });
  };
  const realmData = realmList
    .map((r) => ({
      name: r.name.replace(/^The /, ""),
      count: collection.filter((e) => e.realm === r.id).length,
    }))
    .reverse(); // first realm on top (y-axis grows upward)
  const statusData = statusList
    .filter((s) => s !== "All")
    .map((s) => ({ name: s, count: collection.filter((e) => e.status === s).length }));
  // Modal prev/next: navigate the filtered grid, or the full collection as fallback
  const navSource = open ? (list.some((x) => x.id === open.id) ? list : collection) : [];
  const navIdx = open ? navSource.findIndex((x) => x.id === open.id) : -1;

  // Sticky nav: track which section is in view
  const sections: [string, string][] = [
    ...(reading.length ? ([["reading", "Open Chapters"]] as [string, string][]) : []),
    ["realms", "Realms"],
    ["stats", "Chronicle"],
    ["archive", "Archive"],
    ["highlights", "Highlights"],
  ];
  useEffect(() => {
    const io = new IntersectionObserver(
      (es) => {
        const vis = es
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (vis) setActive(vis.target.id);
      },
      { rootMargin: "-30% 0px -50% 0px", threshold: [0, 0.25, 0.5] },
    );
    sections.forEach(([id]) => {
      const el = document.getElementById(id);
      if (el) io.observe(el);
    });
    return () => io.disconnect();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [reading.length]);

  return (
    <div
      className={`relative min-h-screen overflow-x-hidden bg-background text-foreground ${quiet ? "quiet" : ""}`}
      onMouseMove={(e) => {
        if (prefersReducedMotion()) return;
        setM({ x: e.clientX / window.innerWidth - 0.5, y: e.clientY / window.innerHeight - 0.5 });
      }}
    >
      <Particles count={prefersReducedMotion() ? 0 : 45} />

      {/* Sticky navigation */}
      <nav className="glass fixed inset-x-0 top-0 z-30 border-b border-border/60">
        <div className="mx-auto flex h-14 max-w-7xl items-center justify-between gap-4 px-4 sm:px-6">
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="flex shrink-0 items-center gap-2 whitespace-nowrap font-display text-sm tracking-[0.25em] text-gold transition hover:text-foreground"
          >
            <span className="arcane-only">ᚱ</span>READER'S REALM
          </button>
          <div className="hidden items-center gap-5 text-[11px] uppercase tracking-widest md:flex">
            {sections.map(([id, label]) => (
              <a
                key={id}
                href={`#${id}`}
                aria-current={active === id ? "true" : undefined}
                className={`shrink-0 border-b py-1 transition ${active === id ? "border-gold text-gold" : "border-transparent text-muted-foreground hover:text-foreground"}`}
              >
                {label}
              </a>
            ))}
          </div>
          <button
            onClick={() => setQuiet(!quiet)}
            aria-label="Toggle ambient effects"
            className="shrink-0 rounded-full border border-gold/50 px-3 py-1.5 font-display text-[10px] tracking-widest text-gold transition hover:border-gold sm:text-xs"
          >
            {quiet ? "☾ Quiet" : "✦ Arcane"}
          </button>
        </div>
      </nav>

      {/* Hero */}
      <section className="relative flex h-screen items-center justify-center overflow-hidden">
        <img
          src={hero}
          alt=""
          width={1920}
          height={1088}
          className="absolute inset-[-4%] h-[108%] w-[108%] object-cover opacity-55 transition-transform duration-300"
          style={{ transform: `translate(${m.x * -30}px, ${m.y * -30}px)` }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-background/60 via-background/55 to-background" />
        {/* Centre scrim: darkens the artwork directly behind the hero copy so text stays readable */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,color-mix(in_oklab,var(--background)_88%,transparent)_0%,color-mix(in_oklab,var(--background)_45%,transparent)_45%,transparent_75%)]" />
        <div
          className="arcane-only absolute left-1/2 top-1/2 h-[600px] w-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-gold/20 animate-spin-slow"
          style={{ translate: `${m.x * 20}px ${m.y * 20}px` }}
        >
          {"ᚠᚢᚦᚨᚱᚲᚷᚹᚺᚾᛁᛃ".split("").map((r, i) => (
            <span
              key={i}
              className="absolute left-1/2 top-1/2 font-display text-gold/60"
              style={{ transform: `rotate(${i * 30}deg) translateY(-300px)` }}
            >
              {r}
            </span>
          ))}
        </div>
        <div className="arcane-only absolute left-1/2 top-1/2 h-96 w-96 -translate-x-1/2 -translate-y-1/2 rounded-full bg-mystic/25 blur-3xl animate-pulse-glow" />
        <div
          className="relative z-10 max-w-4xl px-6 text-center"
          style={{ transform: `translate(${m.x * 12}px, ${m.y * 12}px)` }}
        >
          <p className="animate-fade-up font-display text-sm font-semibold tracking-[0.5em] text-gold drop-shadow-[0_2px_8px_rgba(0,0,0,0.9)]">
            READER'S REALM
          </p>
          <h1
            className="animate-fade-up mt-6 text-4xl font-extrabold leading-tight text-foreground drop-shadow-[0_4px_24px_rgba(0,0,0,0.95)] md:text-7xl"
            style={{ animationDelay: ".2s" }}
          >
            Welcome to My World of Stories
          </h1>
          <p
            className="animate-fade-up mx-auto mt-6 max-w-xl text-lg text-foreground/90 drop-shadow-[0_2px_10px_rgba(0,0,0,0.95)]"
            style={{ animationDelay: ".5s" }}
          >
            Every story leaves a mark. Every world becomes a part of me.
          </p>
          <div
            className="animate-fade-up mt-10 flex flex-wrap justify-center gap-4"
            style={{ animationDelay: ".8s" }}
          >
            <a
              href="#realms"
              className="rounded-full border border-gold/40 bg-gradient-to-r from-mystic to-arcane px-7 py-3 font-display text-sm font-semibold tracking-widest text-white shadow-[0_0_30px_var(--mystic),0_4px_20px_rgba(0,0,0,0.6)] drop-shadow transition hover:scale-105 hover:shadow-[0_0_45px_var(--mystic),0_4px_20px_rgba(0,0,0,0.6)]"
            >
              Explore My Collection
            </a>
            <a
              href="#archive"
              className="rounded-full border border-gold bg-background/85 px-7 py-3 font-display text-sm font-semibold tracking-widest text-gold shadow-[0_4px_20px_rgba(0,0,0,0.6)] backdrop-blur-md transition hover:scale-105 hover:bg-background hover:shadow-[0_0_30px_-4px_var(--gold),0_4px_20px_rgba(0,0,0,0.6)]"
            >
              Enter the Archive
            </a>
          </div>
        </div>
      </section>

      {/* Open Chapters — currently reading */}
      {reading.length > 0 && (
        <section
          id="reading"
          className="relative z-10 mx-auto max-w-7xl scroll-mt-20 px-6 pb-6 pt-24"
        >
          <Heading kicker="The pages left open" title="Open Chapters" />
          <div className="mt-12 flex snap-x gap-5 overflow-x-auto pb-4">
            {reading.map((e) => (
              <button
                key={e.id}
                onClick={() => setOpen(e)}
                className="reveal glass group flex w-80 shrink-0 snap-center gap-4 rounded-2xl border border-border p-4 text-left transition hover:-translate-y-1 hover:border-arcane"
              >
                <div className="h-36 w-24 shrink-0 overflow-hidden rounded-lg">
                  <Cover
                    e={e}
                    className="transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
                <div className="flex min-w-0 flex-col">
                  <p className="text-[11px] uppercase tracking-widest text-arcane">{e.type}</p>
                  <h3 className="mt-1 truncate text-base text-foreground">{e.title}</h3>
                  <span className="mt-2 inline-flex w-fit items-center gap-1.5 rounded-full border border-arcane/50 px-2 py-0.5 text-[11px] text-arcane">
                    <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-arcane" />
                    Reading
                  </span>
                  <p className="mt-2 line-clamp-2 text-xs leading-relaxed text-muted-foreground">
                    {e.notes}
                  </p>
                </div>
              </button>
            ))}
          </div>
        </section>
      )}

      {/* Realms */}
      <section id="realms" className="relative z-10 mx-auto max-w-7xl scroll-mt-20 px-6 py-24">
        <Heading kicker="Five doors, five worlds" title="Explore the Realms" />
        <div className="mt-16 flex flex-wrap justify-center gap-6">
          {realmList.map((r) => {
            const tales = collection.filter((e) => e.realm === r.id);
            const mosaic = tales
              .filter((e) => e.cover)
              .sort((a, b) => b.rating - a.rating)
              .slice(0, 4)
              .map((e) => e.cover!);
            return (
              <RealmDoor
                key={r.id}
                realm={r}
                mosaic={mosaic}
                count={tales.length}
                onEnter={() => pick(r.id)}
              />
            );
          })}
        </div>
      </section>

      {/* Stats */}
      <section id="stats" className="relative z-10 mx-auto max-w-6xl scroll-mt-20 px-6 py-16">
        <div className="reveal grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-5">
          {[
            ["Tales Recorded", stats.total],
            ["Completed", stats.completed],
            ["In Progress", stats.inProgress],
            ["Avg. Rating", stats.avgRating > 0 ? stats.avgRating.toFixed(1) : "—"],
            ["Favorite Genre", stats.favoriteGenre],
          ].map(([l, v]) => (
            <div key={l as string} className="glass glow-border rounded-xl p-6 text-center">
              <div className="font-display text-3xl text-gold text-glow md:text-4xl">
                {typeof v === "number" ? <Counter to={v} /> : v}
              </div>
              <div className="mt-2 text-xs uppercase tracking-widest text-muted-foreground">
                {l}
              </div>
            </div>
          ))}
        </div>
        <div className="reveal mt-6 grid gap-6 md:grid-cols-2">
          <ChartCard title="Realm Breakdown">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                layout="vertical"
                data={realmData}
                margin={{ top: 4, right: 16, bottom: 0, left: 8 }}
                barCategoryGap={12}
              >
                <CartesianGrid
                  horizontal={false}
                  stroke="color-mix(in oklab, var(--border) 60%, transparent)"
                />
                <XAxis type="number" hide domain={[0, "dataMax"]} />
                <YAxis
                  type="category"
                  dataKey="name"
                  width={116}
                  axisLine={false}
                  tickLine={false}
                  tick={{ fill: "var(--muted-foreground)", fontSize: 12 }}
                />
                <Tooltip {...chartTooltip} />
                <Bar dataKey="count" radius={[0, 8, 8, 0]} name="Tales">
                  {realmData.map((_, i) => (
                    <Cell key={i} fill={i % 2 ? "var(--arcane)" : "var(--mystic)"} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </ChartCard>
          <ChartCard title="Journey So Far">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={statusData}
                margin={{ top: 4, right: 8, bottom: 0, left: 8 }}
                barCategoryGap={24}
              >
                <CartesianGrid
                  vertical={false}
                  stroke="color-mix(in oklab, var(--border) 60%, transparent)"
                />
                <XAxis
                  dataKey="name"
                  axisLine={false}
                  tickLine={false}
                  tick={{ fill: "var(--muted-foreground)", fontSize: 12 }}
                />
                <YAxis hide />
                <Tooltip {...chartTooltip} />
                <Bar dataKey="count" radius={[8, 8, 0, 0]} maxBarSize={72} name="Tales">
                  {statusData.map((_, i) => (
                    <Cell key={i} fill={i % 2 ? "var(--gold)" : "var(--arcane)"} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </ChartCard>
        </div>
      </section>

      {/* Archive */}
      <section id="archive" className="relative z-10 mx-auto max-w-7xl scroll-mt-20 px-6 py-24">
        <Heading kicker="The collection" title="The Archive" />
        <div className="mt-10 flex flex-col gap-4">
          <input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Search the archive…"
            className="glass mx-auto w-full max-w-md rounded-full border border-border px-5 py-3 text-foreground outline-none placeholder:text-muted-foreground focus:border-mystic focus:shadow-[0_0_20px_-4px_var(--mystic)]"
          />
          <Tabs
            items={
              [["all", "All Realms"], ...realmList.map((r) => [r.id, r.name])] as [string, string][]
            }
            value={realm}
            onChange={(v) => setRealm(v as Realm | "all")}
          />
          <Tabs
            items={statusList.map((s) => [s, s]) as [string, string][]}
            value={status}
            onChange={(v) => setStatus(v as Status | "All")}
            small
          />
          <div className="flex flex-col items-center gap-3">
            <div className="flex max-w-full flex-nowrap gap-2 overflow-x-auto pb-1 sm:flex-wrap sm:justify-center sm:pb-0">
              {["All", ...genreList].map((g) => (
                <button
                  key={g}
                  onClick={() => setGenre(g)}
                  className={`shrink-0 rounded-full border px-3 py-1 text-xs transition ${genre === g ? "border-arcane bg-arcane/15 text-foreground shadow-[0_0_12px_-4px_var(--arcane)]" : "border-border text-muted-foreground hover:text-foreground"}`}
                >
                  {g === "All" ? "All Genres" : g}
                </button>
              ))}
            </div>
            <div className="flex items-center gap-2 text-xs">
              <span className="text-muted-foreground">Order:</span>
              {sortModes.map(([v, l]) => (
                <button
                  key={v}
                  onClick={() => setSort(v)}
                  className={`rounded-full border px-3 py-1 transition ${sort === v ? "border-gold bg-gold/15 text-gold" : "border-border text-muted-foreground hover:text-foreground"}`}
                >
                  {l}
                </button>
              ))}
            </div>
          </div>
        </div>
        <div className="mt-12 grid grid-cols-2 gap-6 md:grid-cols-3 lg:grid-cols-4">
          {list.map((e) => (
            <Card key={e.id} e={e} onOpen={() => setOpen(e)} />
          ))}
        </div>
        {list.length === 0 && (
          <p className="mt-12 text-center text-muted-foreground">
            No tales found in this corner of the realm.
          </p>
        )}
      </section>

      {/* Highlights */}
      <section id="highlights" className="relative z-10 scroll-mt-20 py-24">
        <div className="px-6">
          <Heading kicker="Marks on the soul" title="Stories That Stayed With Me" />
        </div>
        <div className="mt-14 flex snap-x gap-6 overflow-x-auto px-6 pb-6 md:px-[8vw]">
          {highlights.map((e) => (
            <button
              key={e.id}
              onClick={() => setOpen(e)}
              className="reveal glass glow-border flex w-[22rem] shrink-0 snap-center gap-4 rounded-2xl p-5 text-left transition hover:-translate-y-1"
            >
              <div className="h-40 w-28 shrink-0 overflow-hidden rounded-lg">
                <Cover e={e} />
              </div>
              <div>
                <p className="text-xs uppercase tracking-widest text-arcane">{e.type}</p>
                <h3 className="mt-1 text-lg">{e.title}</h3>
                <p className="mt-3 font-display text-sm italic leading-relaxed text-gold">
                  “{e.highlight}”
                </p>
              </div>
            </button>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="relative z-10 overflow-hidden bg-gradient-to-b from-background to-navy/0 pb-16 pt-40 text-center">
        <Stars />
        <p className="relative mx-auto max-w-xl px-6 font-display text-xl text-foreground text-glow md:text-2xl">
          The realm never ends. There is always another world to discover.
        </p>
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          aria-label="Scroll to top"
          className="relative mx-auto mt-10 flex h-16 w-16 items-center justify-center rounded-full border border-gold/50 font-display text-2xl text-gold transition hover:-translate-y-1 hover:shadow-[0_0_30px_var(--gold)]"
        >
          ᛏ
        </button>
        <p className="relative mt-8 text-xs tracking-widest text-muted-foreground">
          © READER'S REALM
        </p>
      </footer>

      {open && (
        <Modal
          e={open}
          onClose={() => setOpen(null)}
          onPrev={navIdx > 0 ? () => setOpen(navSource[navIdx - 1]!) : undefined}
          onNext={
            navIdx >= 0 && navIdx < navSource.length - 1
              ? () => setOpen(navSource[navIdx + 1]!)
              : undefined
          }
          position={navIdx >= 0 ? `${navIdx + 1} / ${navSource.length}` : undefined}
        />
      )}
    </div>
  );
}

type RealmMeta = (typeof realms)[number];

function RealmDoor({
  realm,
  mosaic,
  count,
  onEnter,
}: {
  realm: RealmMeta;
  mosaic: string[];
  count: number;
  onEnter: () => void;
}) {
  return (
    <button
      onClick={onEnter}
      className="reveal group relative isolate flex min-h-[17rem] w-full flex-col justify-end overflow-hidden rounded-2xl border border-border text-left transition duration-500 hover:-translate-y-1.5 hover:border-gold/60 hover:shadow-[0_0_60px_-14px_var(--gold)] sm:w-[calc(50%-0.75rem)] lg:w-[calc(33.333%-1rem)] xl:w-[calc(20%-1.2rem)]"
    >
      {/* Cover mosaic backdrop */}
      <div className="absolute inset-0 -z-10 grid grid-cols-2 bg-navy">
        {mosaic.map((src, i) => (
          <span key={i} className="overflow-hidden">
            <img
              src={src}
              alt=""
              aria-hidden
              loading="lazy"
              className="h-full w-full scale-110 object-cover opacity-55 transition duration-700 group-hover:scale-125 group-hover:opacity-70"
            />
          </span>
        ))}
      </div>
      {/* Vignette + colour cast keep the card readable */}
      <div className="absolute inset-0 -z-10 bg-gradient-to-t from-background via-background/70 to-transparent" />
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_20%_25%,color-mix(in_oklab,var(--mystic)_45%,transparent),transparent_60%)] opacity-70 transition duration-700 group-hover:opacity-95" />

      <div className="relative flex items-center gap-3 p-5">
        <span className="relative flex h-14 w-14 shrink-0 items-center justify-center">
          <span className="absolute inset-0 rounded-full border border-gold/40 transition duration-1000 group-hover:rotate-180" />
          <span className="absolute inset-1.5 rounded-full bg-mystic/25 blur-md transition group-hover:bg-arcane/40" />
          <span className="relative font-display text-2xl text-gold text-glow">{realm.glyph}</span>
        </span>
        <span className="min-w-0">
          <span className="block truncate font-display text-lg text-foreground">{realm.name}</span>
          <span className="mt-0.5 block truncate text-xs text-muted-foreground">{realm.desc}</span>
          <span className="mt-1.5 flex items-center gap-2 text-[11px]">
            <span className="text-arcane">{count} tales</span>
            <span className="flex items-center gap-1 font-display tracking-widest text-gold opacity-0 transition group-hover:opacity-100">
              Enter →
            </span>
          </span>
        </span>
      </div>
    </button>
  );
}

function ChartCard({ title, children }: { title: string; children: ReactNode }) {
  return (
    <div className="glass glow-border rounded-xl p-5">
      <h3 className="font-display text-xs uppercase tracking-[0.3em] text-gold">{title}</h3>
      <div className="mt-5 h-56 w-full">{children}</div>
    </div>
  );
}

function Heading({ kicker, title }: { kicker: string; title: string }) {
  return (
    <div className="reveal text-center">
      <p className="font-display text-xs tracking-[0.4em] text-arcane uppercase">{kicker}</p>
      <h2 className="mt-3 text-3xl text-gradient md:text-5xl">{title}</h2>
      <div className="mx-auto mt-5 h-px w-40 bg-gradient-to-r from-transparent via-gold to-transparent" />
    </div>
  );
}

function Tabs({
  items,
  value,
  onChange,
  small,
}: {
  items: [string, string][];
  value: string;
  onChange: (v: string) => void;
  small?: boolean;
}) {
  return (
    <div className="flex flex-wrap justify-center gap-2">
      {items.map(([v, l]) => (
        <button
          key={v}
          onClick={() => onChange(v)}
          className={`rounded-full border px-4 ${small ? "py-1 text-xs" : "py-2 text-sm"} transition ${value === v ? "border-mystic bg-mystic/20 text-foreground shadow-[0_0_16px_-4px_var(--mystic)]" : "border-border text-muted-foreground hover:text-foreground"}`}
        >
          {l}
        </button>
      ))}
    </div>
  );
}

function Counter({ to }: { to: number }) {
  const [n, setN] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  useEffect(() => {
    if (prefersReducedMotion()) {
      setN(to);
      return;
    }
    const io = new IntersectionObserver((es) => {
      const e = es[0]!;
      if (!e.isIntersecting) return;
      let i = 0;
      const t = setInterval(() => {
        i++;
        setN(Math.round((to * i) / 30));
        if (i >= 30) clearInterval(t);
      }, 40);
      io.disconnect();
    });
    if (ref.current) io.observe(ref.current);
    return () => io.disconnect();
  }, [to]);
  return <span ref={ref}>{n}</span>;
}

function Stars() {
  const [s, setS] = useState<[number, number, number][]>([]);
  useEffect(
    () =>
      setS(
        Array.from(
          { length: 80 },
          () =>
            [Math.random() * 100, Math.random() * 100, Math.random() * 4] as [
              number,
              number,
              number,
            ],
        ),
      ),
    [],
  );
  return (
    <div className="absolute inset-0">
      {s.map(([x, y, d], i) => (
        <span
          key={i}
          className="absolute h-0.5 w-0.5 rounded-full bg-foreground"
          style={{
            left: `${x}%`,
            top: `${y}%`,
            animation: `twinkle ${2 + d}s ease-in-out ${d}s infinite`,
          }}
        />
      ))}
    </div>
  );
}

function Modal({
  e,
  onClose,
  onPrev,
  onNext,
  position,
}: {
  e: Entry;
  onClose: () => void;
  onPrev?: (() => void) | undefined;
  onNext?: (() => void) | undefined;
  position?: string | undefined;
}) {
  useEffect(() => {
    const k = (ev: KeyboardEvent) => {
      if (ev.key === "Escape") onClose();
      if (ev.key === "ArrowLeft") onPrev?.();
      if (ev.key === "ArrowRight") onNext?.();
    };
    addEventListener("keydown", k);
    return () => removeEventListener("keydown", k);
  }, [onClose, onPrev, onNext]);
  const navBtn =
    "glass absolute top-1/2 z-20 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-gold/50 text-gold transition hover:border-gold hover:shadow-[0_0_20px_-2px_var(--gold)] disabled:pointer-events-none disabled:opacity-30";
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-background/80 p-4 backdrop-blur-md"
      onClick={onClose}
    >
      <div
        onClick={(ev) => ev.stopPropagation()}
        className="animate-fade-up glow-border relative grid max-h-[90vh] w-full max-w-3xl overflow-y-auto rounded-2xl bg-popover md:grid-cols-[260px_1fr]"
      >
        <div className="aspect-[3/4] md:aspect-auto">
          <Cover e={e} />
        </div>
        <div className="p-7">
          <button
            onClick={onClose}
            aria-label="Close"
            className="absolute right-4 top-3 text-2xl text-muted-foreground hover:text-foreground"
          >
            ×
          </button>
          {position && (
            <span className="absolute right-12 top-4 text-xs tracking-widest text-muted-foreground">
              {position}
            </span>
          )}
          <button
            onClick={onPrev}
            disabled={!onPrev}
            aria-label="Previous tale"
            className={`${navBtn} left-2`}
          >
            <ChevronLeft size={20} />
          </button>
          <button
            onClick={onNext}
            disabled={!onNext}
            aria-label="Next tale"
            className={`${navBtn} right-2`}
          >
            <ChevronRight size={20} />
          </button>
          <p className="text-xs uppercase tracking-widest text-arcane">
            {e.type} · {e.creator}
          </p>
          <h3 className="mt-2 text-3xl text-gradient">{e.title}</h3>
          <div className="mt-4 flex flex-wrap gap-2 text-xs">
            <span className="rounded-full border border-gold/50 px-3 py-1 text-gold">
              {e.status}
            </span>
            {e.rating > 0 && (
              <span className="rounded-full border border-gold/50 px-3 py-1 text-gold">
                ★ {e.rating}/10
              </span>
            )}
            {e.genres.map((g) => (
              <span
                key={g}
                className="rounded-full border border-border px-3 py-1 text-muted-foreground"
              >
                {g}
              </span>
            ))}
          </div>
          <h4 className="mt-6 text-sm tracking-widest text-gold">SYNOPSIS</h4>
          <p className="mt-2 leading-relaxed text-muted-foreground">{e.synopsis}</p>
          <h4 className="mt-6 text-sm tracking-widest text-gold">MY NOTES</h4>
          <p className="mt-2 italic leading-relaxed text-foreground">{e.notes}</p>
        </div>
      </div>
    </div>
  );
}
