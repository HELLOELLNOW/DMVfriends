import { useState, useEffect, useRef } from "react";

// ── DESIGN TOKENS ──────────────────────────────────────────────
// Colors: warm off-white bg, deep ink, terracotta accent, gold, sage
// Fonts: Playfair Display (headings) + Plus Jakarta Sans (body)
// Loaded via @import in style tag below

const FONT_URL =
  "https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,600;0,700;0,900;1,400;1,600&family=Plus+Jakarta+Sans:wght@300;400;500;600;700&display=swap";

// ── HOOK: Intersection Observer ─────────────────────────────────
function useReveal(threshold = 0.15) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setVisible(true); obs.disconnect(); } },
      { threshold }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold]);
  return [ref, visible];
}

// ── REVEAL WRAPPER ──────────────────────────────────────────────
function Reveal({ children, delay = 0, className = "" }) {
  const [ref, visible] = useReveal();
  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(24px)",
        transition: `opacity 0.7s ease ${delay}ms, transform 0.7s ease ${delay}ms`,
      }}
    >
      {children}
    </div>
  );
}

// ── NAV ─────────────────────────────────────────────────────────
function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", fn);
    return () => window.removeEventListener("scroll", fn);
  }, []);

  return (
    <nav
      style={{
        position: "fixed", top: 0, left: 0, right: 0, zIndex: 100,
        background: scrolled ? "rgba(250,248,244,0.93)" : "transparent",
        backdropFilter: scrolled ? "blur(12px)" : "none",
        borderBottom: scrolled ? "1px solid rgba(26,23,20,0.08)" : "none",
        transition: "all 0.3s ease",
        padding: "0 1.5rem",
        height: "64px",
        display: "flex", alignItems: "center", justifyContent: "space-between",
      }}
    >
      {/* Brand */}
      <a href="#" style={{ display: "flex", alignItems: "center", gap: "10px", textDecoration: "none" }}>
        <div style={{
          width: 36, height: 36,
          background: "#C4502A",
          borderRadius: 10,
          display: "flex", alignItems: "center", justifyContent: "center",
          fontFamily: "'Playfair Display', serif",
          fontStyle: "italic", fontSize: "1.1rem", color: "#fff", fontWeight: 700,
        }}>D</div>
        <span style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 700, fontSize: "0.95rem", color: "#1A1714", letterSpacing: "-0.01em" }}>
          DMV Friends
        </span>
      </a>

      {/* Desktop links */}
      <div style={{ display: "flex", alignItems: "center", gap: "4px" }} className="desktop-nav">
        {["Why Join", "Events", "Stories", "How It Works"].map(l => (
          <a key={l} href="#"
            style={{ padding: "8px 14px", fontSize: "0.85rem", fontWeight: 500, color: "#3d3830", textDecoration: "none", borderRadius: 8, fontFamily: "'Plus Jakarta Sans', sans-serif" }}
            onMouseEnter={e => e.target.style.background = "#F0EDE8"}
            onMouseLeave={e => e.target.style.background = "transparent"}
          >{l}</a>
        ))}
      </div>

      {/* CTA */}
      <a href="https://dmvfriends.com"
        style={{
          background: "#C4502A", color: "#fff",
          padding: "10px 22px", borderRadius: 10,
          fontFamily: "'Plus Jakarta Sans', sans-serif",
          fontSize: "0.875rem", fontWeight: 700,
          textDecoration: "none", letterSpacing: "-0.01em",
          boxShadow: "0 2px 12px rgba(196,80,42,0.35)",
          transition: "all 0.2s",
        }}
        onMouseEnter={e => { e.target.style.background = "#A83E20"; e.target.style.transform = "translateY(-1px)"; }}
        onMouseLeave={e => { e.target.style.background = "#C4502A"; e.target.style.transform = "translateY(0)"; }}
      >
        Join Free →
      </a>
    </nav>
  );
}

// ── HERO ────────────────────────────────────────────────────────
function Hero() {
  const [loaded, setLoaded] = useState(false);
  useEffect(() => { setTimeout(() => setLoaded(true), 100); }, []);

  const fade = (delay) => ({
    opacity: loaded ? 1 : 0,
    transform: loaded ? "translateY(0)" : "translateY(20px)",
    transition: `opacity 0.8s ease ${delay}ms, transform 0.8s ease ${delay}ms`,
  });

  return (
    <section style={{
      minHeight: "100vh",
      background: "#FAF8F4",
      display: "grid",
      gridTemplateColumns: "1fr 1fr",
      paddingTop: 64,
      position: "relative",
      overflow: "hidden",
    }}>
      {/* Left */}
      <div style={{ display: "flex", flexDirection: "column", justifyContent: "center", padding: "4rem 3rem 4rem 5rem", position: "relative", zIndex: 2 }}>

        {/* Eyebrow */}
        <div style={{ ...fade(100), display: "flex", alignItems: "center", gap: 10, marginBottom: "1.75rem" }}>
          <div style={{ display: "flex", gap: 4 }}>
            {["DC", "MD", "VA"].map(s => (
              <span key={s} style={{
                background: "#1A1714", color: "#FAF8F4",
                fontSize: "0.68rem", fontWeight: 700,
                padding: "4px 9px", borderRadius: 6,
                fontFamily: "'Plus Jakarta Sans', sans-serif",
                letterSpacing: "0.06em",
              }}>{s}</span>
            ))}
          </div>
          <span style={{ fontSize: "0.78rem", color: "#7A7268", fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 500 }}>
            · 21+ Community · Free to Join
          </span>
        </div>

        {/* Headline */}
        <h1 style={{
          ...fade(200),
          fontFamily: "'Playfair Display', serif",
          fontSize: "clamp(2.6rem, 4.5vw, 4rem)",
          lineHeight: 1.1,
          letterSpacing: "-0.025em",
          color: "#1A1714",
          marginBottom: "1.5rem",
          fontWeight: 900,
        }}>
          DC is big.<br/>
          Your circle<br/>
          doesn't have to<br/>
          feel <em style={{ color: "#C4502A", fontStyle: "italic" }}>small.</em>
        </h1>

        {/* Sub */}
        <p style={{
          ...fade(300),
          fontFamily: "'Plus Jakarta Sans', sans-serif",
          fontSize: "1.05rem",
          lineHeight: 1.75,
          color: "#5C5650",
          maxWidth: 420,
          marginBottom: "2.5rem",
          fontWeight: 300,
        }}>
          DMV Friends connects young professionals, newcomers, and locals across DC, Maryland, and Virginia — through real events, real people, and a community that actually shows up.
        </p>

        {/* CTAs */}
        <div style={{ ...fade(400), display: "flex", gap: 12, flexWrap: "wrap", marginBottom: "3rem" }}>
          <a href="https://dmvfriends.com" style={{
            background: "#C4502A", color: "#fff",
            padding: "14px 28px", borderRadius: 12,
            fontFamily: "'Plus Jakarta Sans', sans-serif",
            fontSize: "1rem", fontWeight: 700,
            textDecoration: "none", letterSpacing: "-0.01em",
            boxShadow: "0 4px 20px rgba(196,80,42,0.35)",
            transition: "all 0.2s",
          }}
            onMouseEnter={e => { e.target.style.transform = "translateY(-2px)"; e.target.style.boxShadow = "0 8px 28px rgba(196,80,42,0.4)"; }}
            onMouseLeave={e => { e.target.style.transform = "translateY(0)"; e.target.style.boxShadow = "0 4px 20px rgba(196,80,42,0.35)"; }}
          >
            Find Your People — Free
          </a>
          <a href="#how" style={{
            background: "transparent", color: "#1A1714",
            padding: "14px 24px", borderRadius: 12,
            fontFamily: "'Plus Jakarta Sans', sans-serif",
            fontSize: "1rem", fontWeight: 600,
            textDecoration: "none", letterSpacing: "-0.01em",
            border: "1.5px solid rgba(26,23,20,0.15)",
            transition: "all 0.2s",
          }}
            onMouseEnter={e => { e.target.style.borderColor = "#1A1714"; }}
            onMouseLeave={e => { e.target.style.borderColor = "rgba(26,23,20,0.15)"; }}
          >
            See How It Works
          </a>
        </div>

        {/* Social proof */}
        <div style={{ ...fade(500), display: "flex", alignItems: "center", gap: 16 }}>
          <div style={{ display: "flex" }}>
            {[
              { bg: "#DBEAFE", c: "#1D4ED8", l: "A" },
              { bg: "#FCE7F3", c: "#BE185D", l: "M" },
              { bg: "#D1FAE5", c: "#065F46", l: "J" },
              { bg: "#FEF3C7", c: "#92400E", l: "K" },
              { bg: "#EDE9FE", c: "#6D28D9", l: "T" },
            ].map((av, i) => (
              <div key={i} style={{
                width: 38, height: 38, borderRadius: "50%",
                background: av.bg, color: av.c,
                border: "2.5px solid #FAF8F4",
                marginLeft: i === 0 ? 0 : -10,
                display: "flex", alignItems: "center", justifyContent: "center",
                fontSize: "0.78rem", fontWeight: 800,
                fontFamily: "'Plus Jakarta Sans', sans-serif",
              }}>{av.l}</div>
            ))}
          </div>
          <div style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
            <div style={{ fontSize: "0.85rem", fontWeight: 700, color: "#1A1714" }}>500+ members already inside</div>
            <div style={{ fontSize: "0.78rem", color: "#7A7268" }}>Across DC, Maryland & Virginia</div>
          </div>
        </div>
      </div>

      {/* Right — image mosaic */}
      <div style={{ position: "relative", overflow: "hidden" }}>
        <div style={{ position: "absolute", inset: 0, display: "grid", gridTemplateColumns: "1fr 1fr", gridTemplateRows: "1fr 1fr", gap: 4 }}>
          <img src="https://images.unsplash.com/photo-1617791160505-6f00504e3519?w=700&q=85&fit=crop" alt="DC skyline"
            style={{ width: "100%", height: "100%", objectFit: "cover", gridRow: "1/3" }} />
          <img src="https://images.unsplash.com/photo-1555952517-2e8e729e0b44?w=400&q=85&fit=crop" alt="Friends"
            style={{ width: "100%", height: "100%", objectFit: "cover" }} />
          <img src="https://images.unsplash.com/photo-1501466044931-62695aada8e9?w=400&q=85&fit=crop" alt="DMV events"
            style={{ width: "100%", height: "100%", objectFit: "cover" }} />
        </div>
        {/* Gradient overlay */}
        <div style={{
          position: "absolute", inset: 0,
          background: "linear-gradient(to right, #FAF8F4 0%, transparent 18%), linear-gradient(to top, #FAF8F4 0%, transparent 20%)",
        }} />
        {/* Floating event card */}
        <div style={{
          position: "absolute", bottom: "2rem", right: "1.5rem",
          background: "rgba(255,255,255,0.92)", backdropFilter: "blur(16px)",
          border: "1px solid rgba(255,255,255,0.6)",
          borderRadius: 16, padding: "1.1rem 1.25rem",
          boxShadow: "0 8px 32px rgba(0,0,0,0.12)",
          maxWidth: 240,
          ...fade(800),
        }}>
          <div style={{ fontSize: "0.7rem", fontWeight: 700, color: "#C4502A", letterSpacing: "0.06em", textTransform: "uppercase", marginBottom: 4, fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
            🎉 This Saturday
          </div>
          <div style={{ fontSize: "0.92rem", fontWeight: 700, color: "#1A1714", marginBottom: 4, fontFamily: "'Playfair Display', serif" }}>
            Georgetown Rooftop Mixer
          </div>
          <div style={{ fontSize: "0.78rem", color: "#7A7268", fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
            📍 Georgetown · 7PM · 43 going
          </div>
        </div>
      </div>
    </section>
  );
}

// ── MARQUEE ─────────────────────────────────────────────────────
function Marquee() {
  const items = ["Adams Morgan", "Dupont Circle", "H Street NE", "Silver Spring", "Bethesda", "Arlington", "Alexandria", "Georgetown", "U Street", "Tysons", "Rockville", "Capitol Hill", "Navy Yard", "Shaw", "NoMa", "Reston"];
  const doubled = [...items, ...items];
  return (
    <div style={{ background: "#1A1714", padding: "1rem 0", overflow: "hidden", display: "flex" }}>
      <div style={{ display: "flex", gap: "2rem", animation: "marquee 30s linear infinite", whiteSpace: "nowrap" }}>
        {doubled.map((item, i) => (
          <span key={i} style={{ fontFamily: "'Playfair Display', serif", fontStyle: "italic", fontSize: "1rem", color: i % 3 === 0 ? "#E8A832" : "rgba(255,255,255,0.5)", flexShrink: 0 }}>
            {item} <span style={{ color: "rgba(255,255,255,0.2)", marginLeft: "2rem" }}>·</span>
          </span>
        ))}
      </div>
      <style>{`@keyframes marquee { from{transform:translateX(0)} to{transform:translateX(-50%)} }`}</style>
    </div>
  );
}

// ── WHY SECTION ─────────────────────────────────────────────────
function Why() {
  const cards = [
    { icon: "🤝", title: "Real people, not profiles", body: "Every member is a verified real person in the DMV. We moderate actively so the quality stays high and the vibe stays right.", color: "#C4502A" },
    { icon: "📅", title: "Events worth leaving the couch for", body: "Rooftop parties, brunches, hikes, networking nights — curated events across DC, MD, and VA that people actually show up to.", color: "#4A6B5B" },
    { icon: "🏙️", title: "Built for DMV, not everywhere", body: "This isn't a generic social app. Every feature, every event, every conversation is rooted in the culture of our region.", color: "#E8A832" },
    { icon: "🔒", title: "Safe, moderated, 21+", body: "Age-verified members, active moderation, and a zero-tolerance policy for disrespect. You're in good company here.", color: "#1A1714" },
    { icon: "💬", title: "Community that actually talks", body: "A live feed where members share what's happening, ask for recs, and connect before they even meet IRL.", color: "#C4502A" },
    { icon: "📱", title: "App experience, no download needed", body: "Add to your home screen on any phone for a full native-app feel. Works on iPhone and Android, instantly.", color: "#4A6B5B" },
  ];

  return (
    <section style={{ background: "#fff", padding: "6rem 2rem" }}>
      <div style={{ maxWidth: 1100, margin: "0 auto" }}>
        <Reveal>
          <div style={{ textAlign: "center", marginBottom: "4rem" }}>
            <div style={{ display: "inline-block", fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: "0.72rem", fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", color: "#C4502A", marginBottom: "1rem" }}>
              Why DMV Friends
            </div>
            <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(2rem,3.5vw,2.8rem)", lineHeight: 1.15, letterSpacing: "-0.02em", color: "#1A1714", marginBottom: "1rem" }}>
              Built for the way you<br/><em style={{ fontStyle: "italic", color: "#C4502A" }}>actually</em> want to connect
            </h2>
            <p style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: "1.05rem", color: "#5C5650", lineHeight: 1.7, maxWidth: 520, margin: "0 auto", fontWeight: 300 }}>
              No swiping. No algorithms deciding who you meet. Just a genuine space built around the DMV and the people who love it.
            </p>
          </div>
        </Reveal>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: "1.25rem" }}>
          {cards.map((card, i) => (
            <Reveal key={i} delay={i * 80}>
              <div style={{
                background: "#FAF8F4", border: "1px solid rgba(26,23,20,0.07)",
                borderRadius: 18, padding: "2rem",
                transition: "all 0.25s", cursor: "default",
                position: "relative", overflow: "hidden",
              }}
                onMouseEnter={e => { e.currentTarget.style.transform = "translateY(-4px)"; e.currentTarget.style.boxShadow = "0 12px 40px rgba(0,0,0,0.1)"; e.currentTarget.style.borderColor = card.color + "40"; }}
                onMouseLeave={e => { e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.boxShadow = "none"; e.currentTarget.style.borderColor = "rgba(26,23,20,0.07)"; }}
              >
                <div style={{ width: 48, height: 48, background: card.color + "15", borderRadius: 12, display: "flex", alignItems: "center", justifyContent: "center", fontSize: "1.4rem", marginBottom: "1.25rem" }}>
                  {card.icon}
                </div>
                <div style={{ fontFamily: "'Playfair Display', serif", fontSize: "1.1rem", fontWeight: 700, color: "#1A1714", marginBottom: "0.6rem" }}>
                  {card.title}
                </div>
                <div style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: "0.875rem", color: "#5C5650", lineHeight: 1.65 }}>
                  {card.body}
                </div>
                <div style={{ position: "absolute", bottom: -20, right: -10, fontSize: "5rem", opacity: 0.04 }}>{card.icon}</div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

// ── SOCIAL PROOF ────────────────────────────────────────────────
function SocialProof() {
  const stats = [
    { num: "500+", label: "Active Members", sub: "and growing every week" },
    { num: "3", label: "States Covered", sub: "DC · Maryland · Virginia" },
    { num: "50+", label: "Events/Month", sub: "across the region" },
    { num: "21+", label: "Only Community", sub: "adults-only, always" },
  ];
  return (
    <section style={{ background: "#1A1714", padding: "4rem 2rem" }}>
      <div style={{ maxWidth: 1100, margin: "0 auto", display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "2rem", textAlign: "center" }}>
        {stats.map((s, i) => (
          <Reveal key={i} delay={i * 100}>
            <div>
              <div style={{ fontFamily: "'Playfair Display', serif", fontSize: "3rem", fontWeight: 900, color: "#FAF8F4", lineHeight: 1, marginBottom: 6 }}>
                {s.num.includes("+") ? <>{s.num.replace("+", "")}<span style={{ color: "#E8A832" }}>+</span></> : s.num}
              </div>
              <div style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 700, fontSize: "0.9rem", color: "#FAF8F4", marginBottom: 4 }}>{s.label}</div>
              <div style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: "0.78rem", color: "rgba(255,255,255,0.4)" }}>{s.sub}</div>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

// ── HOW IT WORKS ────────────────────────────────────────────────
function HowItWorks() {
  const steps = [
    { n: "01", title: "Create your free account", body: "Sign up in under 60 seconds — name, email, your part of the DMV. No credit card, no catch, no algorithm setup." },
    { n: "02", title: "Explore your community", body: "Browse the member feed, discover events happening near you, and see who's already in the community. You'll feel at home fast." },
    { n: "03", title: "Show up. Meet people. Repeat.", body: "RSVP to events, post on the feed, connect with members. The more you show up, the bigger your DMV circle gets." },
  ];
  return (
    <section id="how" style={{ background: "#FAF8F4", padding: "6rem 2rem" }}>
      <div style={{ maxWidth: 1100, margin: "0 auto", display: "grid", gridTemplateColumns: "1fr 1fr", gap: "5rem", alignItems: "center" }}>
        <div>
          <Reveal>
            <div style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: "0.72rem", fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", color: "#C4502A", marginBottom: "1rem" }}>
              How It Works
            </div>
            <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(2rem,3.5vw,2.8rem)", lineHeight: 1.15, letterSpacing: "-0.02em", color: "#1A1714", marginBottom: "1rem" }}>
              From sign up to<br/><em style={{ fontStyle: "italic" }}>showing up</em> in minutes
            </h2>
            <p style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: "1rem", color: "#5C5650", lineHeight: 1.7, marginBottom: "3rem", fontWeight: 300 }}>
              No complicated setup. No lengthy questionnaires. Three steps and you're part of something real.
            </p>
          </Reveal>
          <div style={{ display: "flex", flexDirection: "column", gap: "2rem" }}>
            {steps.map((step, i) => (
              <Reveal key={i} delay={i * 120}>
                <div style={{ display: "flex", gap: "1.25rem", alignItems: "flex-start" }}>
                  <div style={{
                    width: 48, height: 48, flexShrink: 0,
                    background: "#1A1714", color: "#FAF8F4",
                    borderRadius: 12, display: "flex", alignItems: "center", justifyContent: "center",
                    fontFamily: "'Playfair Display', serif", fontWeight: 700, fontSize: "0.85rem",
                  }}>{step.n}</div>
                  <div>
                    <div style={{ fontFamily: "'Playfair Display', serif", fontWeight: 700, fontSize: "1.05rem", color: "#1A1714", marginBottom: 6 }}>{step.title}</div>
                    <div style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: "0.875rem", color: "#5C5650", lineHeight: 1.65 }}>{step.body}</div>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
          <Reveal delay={400}>
            <a href="https://dmvfriends.com" style={{
              display: "inline-flex", alignItems: "center",
              background: "#C4502A", color: "#fff",
              padding: "14px 28px", borderRadius: 12,
              fontFamily: "'Plus Jakarta Sans', sans-serif",
              fontSize: "0.95rem", fontWeight: 700,
              textDecoration: "none", marginTop: "2.5rem",
              boxShadow: "0 4px 20px rgba(196,80,42,0.3)",
              transition: "all 0.2s",
            }}
              onMouseEnter={e => { e.currentTarget.style.transform = "translateY(-2px)"; }}
              onMouseLeave={e => { e.currentTarget.style.transform = "translateY(0)"; }}
            >
              Create My Free Account →
            </a>
          </Reveal>
        </div>

        {/* Visual */}
        <Reveal delay={200}>
          <div style={{ borderRadius: 20, overflow: "hidden", height: 500, position: "relative", background: "#1A1714" }}>
            <img src="https://images.unsplash.com/photo-1501466044931-62695aada8e9?w=700&q=85&fit=crop" alt="DMV community"
              style={{ width: "100%", height: "100%", objectFit: "cover", opacity: 0.65 }} />
            <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, #1A1714 0%, transparent 50%)" }} />
            {/* Mini feed preview */}
            <div style={{ position: "absolute", bottom: "1.5rem", left: "1.5rem", right: "1.5rem" }}>
              <div style={{ background: "rgba(255,255,255,0.1)", backdropFilter: "blur(12px)", border: "1px solid rgba(255,255,255,0.15)", borderRadius: 12, padding: "1rem", marginBottom: 8 }}>
                <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 6 }}>
                  <div style={{ width: 28, height: 28, borderRadius: "50%", background: "#C4502A", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "0.72rem", fontWeight: 700, color: "#fff", fontFamily: "sans-serif" }}>A</div>
                  <div style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: "0.78rem", fontWeight: 600, color: "#fff" }}>Aisha T. · Adams Morgan</div>
                </div>
                <div style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: "0.82rem", color: "rgba(255,255,255,0.8)" }}>Anyone going to the rooftop thing Saturday? 🙋‍♀️</div>
                <div style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: "0.7rem", color: "rgba(255,255,255,0.4)", marginTop: 4 }}>❤️ 14 · 💬 6 replies · 2m ago</div>
              </div>
              <div style={{ background: "rgba(255,255,255,0.07)", backdropFilter: "blur(12px)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: 12, padding: "1rem" }}>
                <div style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: "0.7rem", fontWeight: 700, color: "#E8A832", textTransform: "uppercase", letterSpacing: "0.06em", marginBottom: 4 }}>📅 Next Event</div>
                <div style={{ fontFamily: "'Playfair Display', serif", fontSize: "0.92rem", fontWeight: 700, color: "#fff" }}>Georgetown Rooftop Happy Hour</div>
                <div style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: "0.75rem", color: "rgba(255,255,255,0.5)", marginTop: 3 }}>Sat · 7PM · 43 going</div>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

// ── EVENTS PREVIEW ──────────────────────────────────────────────
function EventsPreview() {
  const events = [
    { cat: "🍹 Social", date: "Fri, Jun 20 · 7PM", name: "Georgetown Rooftop Happy Hour", loc: "Georgetown, DC", going: 43, img: "https://images.unsplash.com/photo-1555952517-2e8e729e0b44?w=500&q=80&fit=crop" },
    { cat: "🍳 Brunch", date: "Sun, Jun 22 · 11AM", name: "DMV Sunday Brunch Collective", loc: "U Street, DC", going: 28, img: "https://images.unsplash.com/photo-1617791160505-6f00504e3519?w=500&q=80&fit=crop" },
    { cat: "💼 Networking", date: "Wed, Jun 25 · 6:30PM", name: "Young Professionals Mixer — Bethesda", loc: "Bethesda, MD", going: 55, img: "https://images.unsplash.com/photo-1501466044931-62695aada8e9?w=500&q=80&fit=crop" },
  ];
  return (
    <section style={{ background: "#fff", padding: "6rem 2rem" }}>
      <div style={{ maxWidth: 1100, margin: "0 auto" }}>
        <Reveal>
          <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", marginBottom: "3rem", flexWrap: "wrap", gap: "1rem" }}>
            <div>
              <div style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: "0.72rem", fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", color: "#C4502A", marginBottom: "0.75rem" }}>Local Events</div>
              <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(2rem,3vw,2.5rem)", lineHeight: 1.15, letterSpacing: "-0.02em", color: "#1A1714" }}>
                What's happening<br/><em style={{ fontStyle: "italic" }}>this week</em>
              </h2>
            </div>
            <a href="https://dmvfriends.com" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: "0.875rem", fontWeight: 600, color: "#C4502A", textDecoration: "none", borderBottom: "1.5px solid #C4502A", paddingBottom: 2 }}>
              See all events →
            </a>
          </div>
        </Reveal>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: "1.25rem" }}>
          {events.map((ev, i) => (
            <Reveal key={i} delay={i * 100}>
              <div style={{ border: "1px solid rgba(26,23,20,0.08)", borderRadius: 18, overflow: "hidden", transition: "all 0.25s", cursor: "pointer" }}
                onMouseEnter={e => { e.currentTarget.style.transform = "translateY(-4px)"; e.currentTarget.style.boxShadow = "0 12px 40px rgba(0,0,0,0.1)"; }}
                onMouseLeave={e => { e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.boxShadow = "none"; }}
              >
                <div style={{ height: 190, overflow: "hidden", position: "relative" }}>
                  <img src={ev.img} alt={ev.name} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                  <div style={{ position: "absolute", top: 12, left: 12, background: "rgba(0,0,0,0.55)", backdropFilter: "blur(8px)", color: "#fff", fontSize: "0.72rem", fontWeight: 700, padding: "4px 10px", borderRadius: 99, fontFamily: "'Plus Jakarta Sans', sans-serif", letterSpacing: "0.03em" }}>
                    {ev.cat}
                  </div>
                </div>
                <div style={{ padding: "1.25rem" }}>
                  <div style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: "0.72rem", fontWeight: 700, color: "#C4502A", textTransform: "uppercase", letterSpacing: "0.06em", marginBottom: 6 }}>{ev.date}</div>
                  <div style={{ fontFamily: "'Playfair Display', serif", fontSize: "1.05rem", fontWeight: 700, color: "#1A1714", marginBottom: 6, lineHeight: 1.3 }}>{ev.name}</div>
                  <div style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: "0.8rem", color: "#7A7268", marginBottom: "1rem" }}>📍 {ev.loc}</div>
                  <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                    <span style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: "0.8rem", color: "#5C5650" }}><strong style={{ color: "#1A1714" }}>{ev.going}</strong> going</span>
                    <button style={{
                      background: "#C4502A", color: "#fff",
                      border: "none", borderRadius: 8,
                      padding: "8px 16px", fontSize: "0.8rem", fontWeight: 700,
                      cursor: "pointer", fontFamily: "'Plus Jakarta Sans', sans-serif",
                      transition: "all 0.2s",
                    }}
                      onClick={e => { e.currentTarget.textContent = "✓ Going!"; e.currentTarget.style.background = "#4A6B5B"; }}
                    >
                      RSVP Free
                    </button>
                  </div>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

// ── TESTIMONIALS ────────────────────────────────────────────────
function Testimonials() {
  const testimonials = [
    { quote: "I moved from Atlanta knowing nobody. Two weeks in, I had brunch plans, a hiking group, and actually felt like I lived in DC. This community is the real deal.", name: "Aisha T.", role: "Marketing Manager · Adams Morgan, DC", bg: "#DBEAFE", c: "#1D4ED8", l: "A" },
    { quote: "I was skeptical — another app promising community. But DMV Friends actually delivered. Six events in, I've made genuine friends. Not connections. Friends.", name: "Marcus L.", role: "Software Engineer · Arlington, VA", featured: true, bg: "#FCE7F3", c: "#BE185D", l: "M" },
    { quote: "As someone who moved here from Nigeria, I was nervous about finding community. DMV Friends welcomed me immediately. The events always have the best energy.", name: "Kemi O.", role: "Healthcare Professional · Silver Spring, MD", bg: "#D1FAE5", c: "#065F46", l: "K" },
    { quote: "Remote work made me feel invisible in DC. This community gave me a reason to leave my apartment. Best decision I made since moving here.", name: "Jordan P.", role: "UX Designer · Capitol Hill, DC", bg: "#FEF3C7", c: "#92400E", l: "J" },
  ];
  return (
    <section style={{ background: "#FAF8F4", padding: "6rem 2rem" }}>
      <div style={{ maxWidth: 1100, margin: "0 auto" }}>
        <Reveal>
          <div style={{ textAlign: "center", marginBottom: "3.5rem" }}>
            <div style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: "0.72rem", fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", color: "#C4502A", marginBottom: "1rem" }}>Real Stories</div>
            <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(2rem,3.5vw,2.8rem)", lineHeight: 1.15, letterSpacing: "-0.02em", color: "#1A1714" }}>
              From people who<br/><em style={{ fontStyle: "italic" }}>showed up</em>
            </h2>
          </div>
        </Reveal>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: "1.1rem" }}>
          {testimonials.map((t, i) => (
            <Reveal key={i} delay={i * 80}>
              <div style={{
                background: t.featured ? "#1A1714" : "#fff",
                border: `1px solid ${t.featured ? "transparent" : "rgba(26,23,20,0.08)"}`,
                borderRadius: 18, padding: "1.75rem",
                display: "flex", flexDirection: "column",
              }}>
                <div style={{ fontFamily: "'Playfair Display', serif", fontSize: "3.5rem", lineHeight: 0.8, color: t.featured ? "rgba(255,255,255,0.08)" : "#F0EDE8", marginBottom: "1rem" }}>"</div>
                <div style={{ display: "flex", gap: 2, marginBottom: "0.875rem" }}>
                  {[...Array(5)].map((_, j) => <span key={j} style={{ color: "#E8A832", fontSize: "0.75rem" }}>★</span>)}
                </div>
                <p style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: "0.9rem", lineHeight: 1.7, color: t.featured ? "rgba(255,255,255,0.75)" : "#5C5650", fontStyle: "italic", flex: 1, marginBottom: "1.5rem" }}>
                  "{t.quote}"
                </p>
                <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                  <div style={{ width: 40, height: 40, borderRadius: "50%", background: t.featured ? "rgba(255,255,255,0.1)" : t.bg, color: t.featured ? "#fff" : t.c, display: "flex", alignItems: "center", justifyContent: "center", fontSize: "0.85rem", fontWeight: 800, fontFamily: "'Plus Jakarta Sans', sans-serif" }}>{t.l}</div>
                  <div>
                    <div style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 700, fontSize: "0.875rem", color: t.featured ? "#fff" : "#1A1714" }}>{t.name}</div>
                    <div style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: "0.75rem", color: t.featured ? "rgba(255,255,255,0.4)" : "#7A7268" }}>{t.role}</div>
                  </div>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

// ── TRUST ───────────────────────────────────────────────────────
function Trust() {
  const badges = [
    { icon: "✅", title: "21+ Age Verified", desc: "Every member confirms their age at signup. Adults-only community, enforced always." },
    { icon: "🛡️", title: "Actively Moderated", desc: "Real admins review the community daily and remove anyone who breaks the rules." },
    { icon: "🚫", title: "Zero Tolerance Policy", desc: "Harassment, hate speech, and disrespect result in an immediate permanent ban." },
    { icon: "🔐", title: "Your Data Is Safe", desc: "We never sell or share your personal information. Privacy is a founding principle." },
  ];
  return (
    <section style={{ background: "#fff", padding: "6rem 2rem" }}>
      <div style={{ maxWidth: 1100, margin: "0 auto", display: "grid", gridTemplateColumns: "1fr 1fr", gap: "5rem", alignItems: "center" }}>
        <div>
          <Reveal>
            <div style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: "0.72rem", fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", color: "#C4502A", marginBottom: "1rem" }}>Safety & Trust</div>
            <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(2rem,3.5vw,2.6rem)", lineHeight: 1.15, letterSpacing: "-0.02em", color: "#1A1714", marginBottom: "1rem" }}>
              A community you can<br/><em style={{ fontStyle: "italic" }}>actually</em> feel safe in
            </h2>
            <p style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: "1rem", color: "#5C5650", lineHeight: 1.7, marginBottom: "2rem", fontWeight: 300, maxWidth: 420 }}>
              We take the safety and quality of this community seriously. DMV Friends is built around human wellbeing — not growth metrics or engagement hacks.
            </p>
            <a href="https://dmvfriends.com" style={{
              display: "inline-flex", alignItems: "center",
              background: "#1A1714", color: "#FAF8F4",
              padding: "14px 28px", borderRadius: 12,
              fontFamily: "'Plus Jakarta Sans', sans-serif",
              fontSize: "0.95rem", fontWeight: 700,
              textDecoration: "none", transition: "all 0.2s",
            }}
              onMouseEnter={e => { e.currentTarget.style.background = "#2E2924"; e.currentTarget.style.transform = "translateY(-1px)"; }}
              onMouseLeave={e => { e.currentTarget.style.background = "#1A1714"; e.currentTarget.style.transform = "translateY(0)"; }}
            >
              Join a Safe Community →
            </a>
          </Reveal>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
          {badges.map((b, i) => (
            <Reveal key={i} delay={i * 80}>
              <div style={{ background: "#FAF8F4", border: "1px solid rgba(26,23,20,0.07)", borderRadius: 14, padding: "1.25rem" }}>
                <div style={{ fontSize: "1.5rem", marginBottom: "0.75rem" }}>{b.icon}</div>
                <div style={{ fontFamily: "'Playfair Display', serif", fontWeight: 700, fontSize: "0.95rem", color: "#1A1714", marginBottom: 6 }}>{b.title}</div>
                <div style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: "0.8rem", color: "#5C5650", lineHeight: 1.6 }}>{b.desc}</div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

// ── CTA BANNER ──────────────────────────────────────────────────
function CTABanner() {
  return (
    <section style={{ background: "#C4502A", padding: "6rem 2rem", position: "relative", overflow: "hidden" }}>
      <div style={{ position: "absolute", inset: 0, background: "radial-gradient(ellipse 70% 70% at 50% 50%, rgba(255,255,255,0.06) 0%, transparent 70%)" }} />
      <div style={{ maxWidth: 680, margin: "0 auto", textAlign: "center", position: "relative", zIndex: 1 }}>
        <Reveal>
          <div style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: "0.72rem", fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", color: "rgba(255,255,255,0.6)", marginBottom: "1.5rem" }}>
            Ready? Your circle is waiting.
          </div>
          <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(2.2rem,4vw,3.2rem)", lineHeight: 1.1, letterSpacing: "-0.025em", color: "#fff", marginBottom: "1.25rem", fontWeight: 900 }}>
            Stop waiting for the<br/><em style={{ fontStyle: "italic", color: "rgba(255,255,255,0.7)" }}>right time.</em>
          </h2>
          <p style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: "1.05rem", color: "rgba(255,255,255,0.75)", lineHeight: 1.7, marginBottom: "2.5rem", fontWeight: 300 }}>
            Sign up free, show up to one event, and see what happens. The worst case? You meet some genuinely interesting people in your city. The best case? You find your people.
          </p>
          <div style={{ display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap", marginBottom: "1.25rem" }}>
            <a href="https://dmvfriends.com" style={{
              background: "#fff", color: "#C4502A",
              padding: "16px 32px", borderRadius: 12,
              fontFamily: "'Plus Jakarta Sans', sans-serif",
              fontSize: "1rem", fontWeight: 800,
              textDecoration: "none", transition: "all 0.2s",
              boxShadow: "0 4px 20px rgba(0,0,0,0.15)",
            }}
              onMouseEnter={e => { e.currentTarget.style.transform = "translateY(-2px)"; e.currentTarget.style.boxShadow = "0 8px 30px rgba(0,0,0,0.2)"; }}
              onMouseLeave={e => { e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.boxShadow = "0 4px 20px rgba(0,0,0,0.15)"; }}
            >
              Join Free — No Credit Card
            </a>
            <a href="https://dmvfriends.com" style={{
              background: "rgba(255,255,255,0.12)", color: "#fff",
              padding: "16px 24px", borderRadius: 12,
              fontFamily: "'Plus Jakarta Sans', sans-serif",
              fontSize: "1rem", fontWeight: 600,
              textDecoration: "none",
              border: "1.5px solid rgba(255,255,255,0.25)",
              transition: "all 0.2s",
            }}
              onMouseEnter={e => { e.currentTarget.style.background = "rgba(255,255,255,0.18)"; }}
              onMouseLeave={e => { e.currentTarget.style.background = "rgba(255,255,255,0.12)"; }}
            >
              Browse Events First
            </a>
          </div>
          <div style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: "0.78rem", color: "rgba(255,255,255,0.4)" }}>
            Free to join · 21+ only · DC · Maryland · Virginia
          </div>
        </Reveal>
      </div>
    </section>
  );
}

// ── FOOTER ──────────────────────────────────────────────────────
function Footer() {
  const cols = [
    { title: "Community", links: ["Join Free", "Browse Events", "Meet Members", "Community Feed"] },
    { title: "The Region", links: ["Washington DC", "Maryland", "Northern Virginia", "DMV Events"] },
    { title: "Company", links: ["About Us", "Community Guidelines", "Privacy Policy", "Contact"] },
  ];
  return (
    <footer style={{ background: "#1A1714", padding: "4rem 2rem 2rem", color: "rgba(255,255,255,0.5)" }}>
      <div style={{ maxWidth: 1100, margin: "0 auto" }}>
        <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr 1fr 1fr", gap: "3rem", marginBottom: "3rem", flexWrap: "wrap" }}>
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: "1rem" }}>
              <div style={{ width: 32, height: 32, background: "#C4502A", borderRadius: 8, display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "'Playfair Display', serif", fontStyle: "italic", color: "#fff", fontSize: "1rem", fontWeight: 700 }}>D</div>
              <div style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 700, fontSize: "0.95rem", color: "#FAF8F4" }}>DMV Friends</div>
            </div>
            <p style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: "0.85rem", lineHeight: 1.7, maxWidth: 240 }}>
              The community for young professionals and social seekers across DC, Maryland, and Virginia. Real people. Real events. Real connections.
            </p>
          </div>
          {cols.map((col, i) => (
            <div key={i}>
              <div style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 700, fontSize: "0.78rem", color: "#FAF8F4", textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: "1rem" }}>{col.title}</div>
              <div style={{ display: "flex", flexDirection: "column", gap: "0.6rem" }}>
                {col.links.map(l => (
                  <a key={l} href="https://dmvfriends.com"
                    style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: "0.875rem", color: "rgba(255,255,255,0.45)", textDecoration: "none", transition: "color 0.18s" }}
                    onMouseEnter={e => e.target.style.color = "#FAF8F4"}
                    onMouseLeave={e => e.target.style.color = "rgba(255,255,255,0.45)"}
                  >{l}</a>
                ))}
              </div>
            </div>
          ))}
        </div>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", paddingTop: "2rem", borderTop: "1px solid rgba(255,255,255,0.07)", flexWrap: "wrap", gap: "1rem" }}>
          <div style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: "0.82rem" }}>© 2026 DMV Friends. Made with ❤️ for the DMV community.</div>
          <div style={{ display: "flex", gap: "1.5rem" }}>
            {["Privacy Policy", "Terms of Service", "Community Guidelines"].map(l => (
              <a key={l} href="#" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: "0.82rem", color: "rgba(255,255,255,0.35)", textDecoration: "none" }}
                onMouseEnter={e => e.target.style.color = "#FAF8F4"}
                onMouseLeave={e => e.target.style.color = "rgba(255,255,255,0.35)"}
              >{l}</a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}

// ── APP ─────────────────────────────────────────────────────────
export default function App() {
  useEffect(() => {
    // Inject fonts
    if (!document.getElementById("dmv-fonts")) {
      const link = document.createElement("link");
      link.id = "dmv-fonts";
      link.rel = "stylesheet";
      link.href = FONT_URL;
      document.head.appendChild(link);
    }
    // Mobile nav styles
    const style = document.createElement("style");
    style.textContent = `
      * { box-sizing: border-box; }
      body { margin: 0; background: #FAF8F4; }
      @media (max-width: 768px) {
        .desktop-nav { display: none !important; }
        section > div { grid-template-columns: 1fr !important; }
      }
      @media (max-width: 900px) {
        section[style*="grid-template-columns: 1fr 1fr"] { grid-template-columns: 1fr !important; }
      }
      ::selection { background: #C4502A; color: #fff; }
    `;
    document.head.appendChild(style);
  }, []);

  return (
    <div style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
      <Nav />
      <Hero />
      <Marquee />
      <Why />
      <SocialProof />
      <HowItWorks />
      <EventsPreview />
      <Testimonials />
      <Trust />
      <CTABanner />
      <Footer />
    </div>
  );
}
