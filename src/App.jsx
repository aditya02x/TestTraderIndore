import { useState, useEffect, useRef } from "react";
import { motion, useInView, useScroll, useTransform, AnimatePresence } from "framer-motion";
import {
  TrendingUp, BarChart2, Globe, Bitcoin, Shield, Brain,
  Users, Star, ChevronDown, ChevronRight, ArrowRight,
  CheckCircle, Clock, Phone, Mail, MapPin, Menu, X,
  Award, BookOpen, Zap, Target, MessageCircle, Play,
  DollarSign, LineChart, Activity, PieChart, Layers,
  Calendar, Headphones, Medal, Briefcase, GraduationCap
} from "lucide-react";

// ─── Utility ──────────────────────────────────────────────────────────────────
const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: (i = 0) => ({ opacity: 1, y: 0, transition: { duration: 0.6, delay: i * 0.1, ease: [0.25, 0.1, 0.25, 1] } })
};

const stagger = { visible: { transition: { staggerChildren: 0.1 } } };

function AnimatedSection({ children, className = "" }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  return (
    <motion.div ref={ref} initial="hidden" animate={inView ? "visible" : "hidden"} variants={stagger} className={className}>
      {children}
    </motion.div>
  );
}

function FadeUp({ children, delay = 0, className = "" }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  return (
    <motion.div ref={ref} initial="hidden" animate={inView ? "visible" : "hidden"} custom={delay} variants={fadeUp} className={className}>
      {children}
    </motion.div>
  );
}

// ─── Counter ──────────────────────────────────────────────────────────────────
function Counter({ to, suffix = "", duration = 2 }) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });
  useEffect(() => {
    if (!inView) return;
    let start = 0;
    const step = to / (duration * 60);
    const timer = setInterval(() => {
      start += step;
      if (start >= to) { setCount(to); clearInterval(timer); }
      else setCount(Math.floor(start));
    }, 1000 / 60);
    return () => clearInterval(timer);
  }, [inView, to, duration]);
  return <span ref={ref}>{count.toLocaleString()}{suffix}</span>;
}

// ─── Navbar ───────────────────────────────────────────────────────────────────
function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const links = ["Home", "Courses", "About", "Testimonials", "Contact"];

  return (
    <motion.nav
      initial={{ y: -80 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? "bg-white/95 backdrop-blur-xl shadow-[0_2px_40px_rgba(0,0,0,0.08)]" : "bg-transparent"}`}
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-10 flex items-center justify-between h-20">
        {/* Logo */}
        <div className="flex items-center gap-2.5">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center shadow-lg">
            <TrendingUp size={18} className="text-white" strokeWidth={2.5} />
          </div>
          <div>
            <span className="font-bold text-lg text-slate-900 tracking-tight">xyzTraders</span>
            <span className="block text-[9px] font-semibold tracking-[0.15em] text-emerald-600 uppercase -mt-0.5">Trading Academy</span>
          </div>
        </div>

        {/* Desktop Links */}
        <div className="hidden lg:flex items-center gap-8">
          {links.map(l => (
            <a key={l} href={`#${l.toLowerCase()}`} className="text-sm font-medium text-slate-600 hover:text-emerald-600 transition-colors">{l}</a>
          ))}
        </div>

        <div className="hidden lg:flex items-center gap-3">
          <a href="#contact" className="px-5 py-2.5 text-sm font-semibold text-emerald-700 border-2 border-emerald-200 rounded-xl hover:border-emerald-400 hover:bg-emerald-50 transition-all">
            Free Consultation
          </a>
          <a href="#courses" className="px-5 py-2.5 text-sm font-semibold text-white bg-gradient-to-r from-emerald-500 to-teal-600 rounded-xl hover:shadow-lg hover:shadow-emerald-200 hover:-translate-y-0.5 transition-all">
            Enroll Now
          </a>
        </div>

        <button className="lg:hidden p-2 text-slate-700" onClick={() => setMenuOpen(!menuOpen)}>
          {menuOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      <AnimatePresence>
        {menuOpen && (
          <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} exit={{ opacity: 0, height: 0 }} className="lg:hidden bg-white border-t border-slate-100 px-6 py-4">
            {links.map(l => (
              <a key={l} href={`#${l.toLowerCase()}`} onClick={() => setMenuOpen(false)} className="block py-3 text-sm font-medium text-slate-700 border-b border-slate-50">{l}</a>
            ))}
            <a href="#contact" onClick={() => setMenuOpen(false)} className="mt-4 block text-center py-3 text-sm font-semibold text-white bg-gradient-to-r from-emerald-500 to-teal-600 rounded-xl">Enroll Now →</a>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}

// ─── Hero ─────────────────────────────────────────────────────────────────────
function Hero() {
  const stats = [
    { value: 5000, suffix: "+", label: "Students Trained" },
    { value: 8, suffix: "+", label: "Years Experience" },
    { value: 92, suffix: "%", label: "Satisfaction Rate" },
    { value: 24, suffix: "/7", label: "Community Support" },
  ];

  const chartData = [32, 45, 38, 60, 52, 71, 65, 80, 74, 90, 85, 95];

  return (
    <section id="home" className="relative min-h-screen bg-gradient-to-br from-slate-50 via-white to-emerald-50/40 overflow-hidden pt-20">
      {/* Background grid */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(16,185,129,0.04)_1px,transparent_1px),linear-gradient(90deg,rgba(16,185,129,0.04)_1px,transparent_1px)] bg-[size:60px_60px]" />
      {/* Orbs */}
      <div className="absolute top-32 right-20 w-[500px] h-[500px] bg-gradient-to-br from-emerald-100/60 to-teal-100/40 rounded-full blur-3xl" />
      <div className="absolute -bottom-20 left-0 w-[400px] h-[400px] bg-gradient-to-tr from-blue-50 to-emerald-50 rounded-full blur-3xl" />

      <div className="relative max-w-7xl mx-auto px-6 lg:px-10 pt-20 pb-16">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left */}
          <div>
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
              className="inline-flex items-center gap-2 bg-emerald-50 border border-emerald-200 text-emerald-700 text-xs font-semibold px-4 py-2 rounded-full mb-6">
              <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse" />
              India's Premier Trading Education Platform
            </motion.div>

            <motion.h1 initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3, duration: 0.7 }}
              className="text-5xl lg:text-6xl font-black text-slate-900 leading-[1.08] tracking-tight mb-6">
              Become a <span className="bg-gradient-to-r from-emerald-500 to-teal-600 bg-clip-text text-transparent">Confident</span> & Independent Trader
            </motion.h1>

            <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.45 }}
              className="text-lg text-slate-500 leading-relaxed mb-10 max-w-lg">
              Master the Stock Market, Forex, and Crypto Markets with expert mentorship, proven strategies, and real market insights — the disciplined way.
            </motion.p>

            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.55 }} className="flex flex-wrap gap-4 mb-14">
              <a href="#contact" className="px-7 py-4 bg-gradient-to-r from-emerald-500 to-teal-600 text-white font-bold rounded-2xl shadow-xl shadow-emerald-200 hover:shadow-emerald-300 hover:-translate-y-1 transition-all text-sm">
                Book Free Consultation
              </a>
            </motion.div>

            {/* Stats */}
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.7 }} className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              {stats.map((s, i) => (
                <div key={i} className="bg-white rounded-2xl p-4 border border-slate-100 shadow-sm">
                  <div className="text-2xl font-black text-slate-900"><Counter to={s.value} suffix={s.suffix} /></div>
                  <div className="text-xs text-slate-500 font-medium mt-0.5">{s.label}</div>
                </div>
              ))}
            </motion.div>
          </div>

          {/* Right: Dashboard Mockup */}
          <motion.div initial={{ opacity: 0, x: 40 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.5, duration: 0.8 }} className="relative">
            <div className="relative bg-white rounded-3xl border border-slate-100 shadow-2xl shadow-slate-200/80 p-6 overflow-hidden">
              {/* Mini cards */}
              <div className="grid grid-cols-3 gap-3">
                {[
                  { label: "NIFTY 50", val: "22,480", change: "+0.84%", up: true },
                  { label: "EUR/USD", val: "1.0842", change: "+0.32%", up: true },
                  { label: "BTC/INR", val: "₹61.2L", change: "-1.2%", up: false },
                ].map((item, i) => (
                  <div key={i} className="bg-slate-50 rounded-xl p-3">
                    <div className="text-[10px] text-slate-400 font-semibold">{item.label}</div>
                    <div className="text-sm font-bold text-slate-800 mt-0.5">{item.val}</div>
                    <div className={`text-[11px] font-semibold mt-0.5 ${item.up ? "text-emerald-500" : "text-red-400"}`}>{item.change}</div>
                  </div>
                ))}
              </div>

              {/* Live badge */}
              <div className="absolute top-4 right-4 flex items-center gap-1.5 bg-emerald-500 text-white text-[10px] font-bold px-3 py-1.5 rounded-full">
                <span className="w-1.5 h-1.5 bg-white rounded-full animate-ping" />
                LIVE
              </div>
            </div>

            {/* Floating cards */}
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1.1 }}
              className="absolute -left-8 top-1/2 -translate-y-1/2 bg-white rounded-2xl shadow-xl border border-slate-100 p-4 hidden lg:block">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-blue-50 rounded-xl flex items-center justify-center">
                  <GraduationCap size={18} className="text-blue-500" />
                </div>
                <div>
                  <div className="text-xs font-bold text-slate-800">New Enrollment</div>
                  <div className="text-[11px] text-slate-400">New student • 2m ago</div>
                </div>
              </div>
            </motion.div>

            <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1.3 }}
              className="absolute -bottom-5 right-6 bg-white rounded-2xl shadow-xl border border-slate-100 p-4 hidden lg:block">
              <div className="flex items-center gap-2">
                <div className="flex">
                  {[1,2,3,4,5].map(i => <Star key={i} size={12} className="text-amber-400 fill-amber-400" />)}
                </div>
                <span className="text-xs font-bold text-slate-700">4.9 Rating</span>
              </div>
              <div className="text-[11px] text-slate-400 mt-0.5">From 5000+ students</div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

// ─── Trust Bar ────────────────────────────────────────────────────────────────
function TrustBar() {
  const items = [
    { icon: <BarChart2 size={18} />, label: "NSE Market Knowledge" },
    { icon: <Globe size={18} />, label: "Forex Education" },
    { icon: <Bitcoin size={18} />, label: "Crypto Education" },
    { icon: <LineChart size={18} />, label: "Technical Analysis" },
    { icon: <Shield size={18} />, label: "Risk Management" },
    { icon: <Brain size={18} />, label: "Trading Psychology" },
  ];

  return (
    <section className="bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 py-6">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-wrap justify-center gap-8 lg:gap-0 lg:justify-between items-center">
          {items.map((item, i) => (
            <div key={i} className="flex items-center gap-2.5 text-slate-300">
              <span className="text-emerald-400">{item.icon}</span>
              <span className="text-sm font-semibold tracking-wide">{item.label}</span>
              {i < items.length - 1 && <span className="hidden lg:block w-px h-4 bg-slate-600 ml-6" />}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── About ────────────────────────────────────────────────────────────────────
function About() {
  const pillars = [
    { icon: <Target size={16} />, text: "Disciplined Trading" },
    { icon: <Shield size={16} />, text: "Risk Management" },
    { icon: <Brain size={16} />, text: "Market Psychology" },
    { icon: <TrendingUp size={16} />, text: "Long-term Consistency" },
  ];

  return (
    <section id="about" className="py-28 bg-white">
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        <div className="grid lg:grid-cols-2 gap-20 items-center">
          {/* Left Image Area */}
          <FadeUp>
            <div className="relative">
              <div className="aspect-[4/3] rounded-3xl bg-gradient-to-br from-emerald-50 to-teal-50 border border-emerald-100 overflow-hidden flex items-center justify-center">
                <div className="relative w-full h-full flex items-center justify-center">
                  {/* Abstract trading visual */}
                  <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/5 to-teal-600/10" />
                  <div className="grid grid-cols-3 gap-4 p-10 w-full">
                    {[
                      { icon: <BarChart2 size={28} className="text-emerald-600" />, label: "Chart Analysis", val: "Daily Practice" },
                      { icon: <Shield size={28} className="text-teal-600" />, label: "Risk Control", val: "Max 2% Rule" },
                      { icon: <Brain size={28} className="text-blue-600" />, label: "Psychology", val: "Emotional Discipline" },
                      { icon: <LineChart size={28} className="text-emerald-600" />, label: "Strategy", val: "Tested Systems" },
                      { icon: <Users size={28} className="text-teal-600" />, label: "Community", val: "5000+ Traders" },
                      { icon: <Medal size={28} className="text-amber-500" />, label: "Certified", val: "Expert Mentors" },
                    ].map((card, i) => (
                      <div key={i} className="bg-white rounded-2xl p-4 shadow-sm border border-white text-center">
                        <div className="flex justify-center mb-2">{card.icon}</div>
                        <div className="text-[11px] font-bold text-slate-700">{card.label}</div>
                        <div className="text-[10px] text-slate-400 mt-0.5">{card.val}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Badge */}
              <div className="absolute -bottom-6 -right-6 bg-emerald-500 text-white rounded-2xl p-5 shadow-xl shadow-emerald-200">
                <div className="text-3xl font-black">8+</div>
                <div className="text-xs font-semibold opacity-90">Years of<br/>Excellence</div>
              </div>
            </div>
          </FadeUp>

          {/* Right Content */}
          <AnimatedSection>
            <motion.div variants={fadeUp}>
              <span className="text-xs font-bold tracking-[0.2em] text-emerald-600 uppercase">About The Academy</span>
              <h2 className="text-4xl lg:text-5xl font-black text-slate-900 leading-tight mt-3 mb-6">
                Learn Trading<br /><span className="text-emerald-500">The Right Way</span>
              </h2>
              <p className="text-slate-500 text-lg leading-relaxed mb-6">
                ProfitEdge Trading Academy was built on one core belief: sustainable trading success comes from education, discipline, and sound risk management — not luck or shortcuts.
              </p>
              <p className="text-slate-500 leading-relaxed mb-8">
                Our structured curriculum covers every aspect of trading — from market fundamentals to advanced technical analysis and trading psychology. We focus on building real-world skills that help traders navigate markets with confidence.
              </p>
            </motion.div>

            <motion.div variants={fadeUp} className="flex flex-wrap gap-3 mb-8">
              {pillars.map((p, i) => (
                <span key={i} className="flex items-center gap-2 bg-emerald-50 text-emerald-700 border border-emerald-100 text-sm font-semibold px-4 py-2.5 rounded-xl">
                  {p.icon} {p.text}
                </span>
              ))}
            </motion.div>

            <motion.div variants={fadeUp}>
              <a href="#courses" className="inline-flex items-center gap-2 px-7 py-4 bg-slate-900 text-white font-bold rounded-2xl hover:bg-slate-800 hover:-translate-y-0.5 transition-all text-sm">
                Explore Our Programs <ArrowRight size={16} />
              </a>
            </motion.div>
          </AnimatedSection>
        </div>
      </div>
    </section>
  );
}

// ─── Courses ──────────────────────────────────────────────────────────────────
function Courses() {
  const courses = [
    {
      icon: <BarChart2 size={24} className="text-emerald-600" />,
      bg: "bg-emerald-50",
      title: "Stock Market Mastery",
      desc: "Complete foundation in Indian equity markets — from basics to advanced trading setups. Learn NSE/BSE trading, sector analysis, and building a systematic stock selection process.",
      tag: "Most Popular"
    },
    {
      icon: <Globe size={24} className="text-blue-600" />,
      bg: "bg-blue-50",
      title: "Forex Trading Program",
      desc: "Navigate global currency markets with confidence. Covers major & minor pairs, economic indicators, currency correlations, and professional forex trading strategies.",
      tag: "Advanced"
    },
    {
      icon: <Bitcoin size={24} className="text-orange-500" />,
      bg: "bg-orange-50",
      title: "Crypto Trading Program",
      desc: "Master digital asset markets with structured education on crypto fundamentals, DeFi concepts, on-chain analysis, and disciplined crypto portfolio management.",
      tag: "High Demand"
    },
    {
      icon: <LineChart size={24} className="text-violet-600" />,
      bg: "bg-violet-50",
      title: "Price Action Masterclass",
      desc: "Pure price action trading without indicator clutter. Learn candlestick patterns, support/resistance, chart patterns, and building high-probability trade setups.",
      tag: "Core Skill"
    },
    {
      icon: <Shield size={24} className="text-teal-600" />,
      bg: "bg-teal-50",
      title: "Risk Management Training",
      desc: "The most critical skill in trading. Learn position sizing, drawdown management, portfolio allocation, stop-loss strategies, and building a personalized risk framework.",
      tag: "Essential"
    },
    {
      icon: <Headphones size={24} className="text-rose-500" />,
      bg: "bg-rose-50",
      title: "1-on-1 Mentorship Program",
      desc: "Personalized guidance from an experienced trader. Review your trades, refine your strategy, address psychological challenges, and accelerate your trading growth.",
      tag: "Premium"
    },
  ];

  return (
    <section id="courses" className="py-28 bg-slate-50">
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        <AnimatedSection className="text-center mb-16">
          <motion.div variants={fadeUp}>
            <span className="text-xs font-bold tracking-[0.2em] text-emerald-600 uppercase">Our Programs</span>
            <h2 className="text-4xl lg:text-5xl font-black text-slate-900 mt-3 mb-4">Structured Courses for<br />Every Stage of Your Journey</h2>
            <p className="text-slate-500 text-lg max-w-2xl mx-auto">From beginner fundamentals to advanced strategies — our curriculum is designed for real-world markets.</p>
          </motion.div>
        </AnimatedSection>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {courses.map((c, i) => (
            <FadeUp key={i} delay={i * 0.05}>
              <div className="bg-white rounded-3xl p-8 border border-slate-100 hover:border-emerald-200 hover:shadow-xl hover:shadow-emerald-50 hover:-translate-y-1 transition-all duration-300 group h-full flex flex-col">
                <div className="flex items-start justify-between mb-5">
                  <div className={`w-12 h-12 ${c.bg} rounded-2xl flex items-center justify-center`}>
                    {c.icon}
                  </div>
                  <span className="text-[11px] font-bold text-emerald-700 bg-emerald-50 border border-emerald-100 px-3 py-1.5 rounded-full">
                    {c.tag}
                  </span>
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-3">{c.title}</h3>
                <p className="text-slate-500 text-sm leading-relaxed mb-6 flex-1">{c.desc}</p>
                <button className="flex items-center gap-2 text-sm font-bold text-emerald-600 group-hover:text-emerald-700 transition-colors">
                  Learn More <ChevronRight size={16} className="group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
            </FadeUp>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── Why Choose Us ────────────────────────────────────────────────────────────
function WhyUs() {
  const features = [
    { icon: <Award size={22} className="text-emerald-600" />, bg: "bg-emerald-50", title: "Expert Mentors", desc: "Learn from seasoned traders with 8+ years of live market experience across equities, forex, and crypto." },
    { icon: <Activity size={22} className="text-blue-600" />, bg: "bg-blue-50", title: "Live Market Sessions", desc: "Real-time market analysis sessions where you learn by watching actual trade setups unfold." },
    { icon: <BookOpen size={22} className="text-violet-600" />, bg: "bg-violet-50", title: "Practical Learning", desc: "Hands-on curriculum with paper trading, real-time exercises, and strategy back-testing modules." },
    { icon: <Target size={22} className="text-rose-500" />, bg: "bg-rose-50", title: "Personalized Guidance", desc: "One-on-one doubt sessions and personalized feedback to ensure every student progresses at their pace." },
    { icon: <Brain size={22} className="text-amber-500" />, bg: "bg-amber-50", title: "Trading Psychology", desc: "Dedicated modules on emotional discipline, loss management, and maintaining consistency under pressure." },
    { icon: <Users size={22} className="text-teal-600" />, bg: "bg-teal-50", title: "Community Support", desc: "Join an active community of 5000+ traders sharing market ideas, setups, and daily insights." },
  ];

  return (
    <section className="py-28 bg-white">
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        <AnimatedSection className="text-center mb-16">
          <motion.div variants={fadeUp}>
            <span className="text-xs font-bold tracking-[0.2em] text-emerald-600 uppercase">Why ProfitEdge</span>
            <h2 className="text-4xl lg:text-5xl font-black text-slate-900 mt-3 mb-4">Education Built for<br />Real Market Success</h2>
            <p className="text-slate-500 text-lg max-w-xl mx-auto">We go beyond theory — every lesson is rooted in practical market experience.</p>
          </motion.div>
        </AnimatedSection>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((f, i) => (
            <FadeUp key={i} delay={i * 0.07}>
              <div className="flex gap-5 p-7 rounded-3xl border border-slate-100 hover:border-emerald-100 hover:bg-emerald-50/20 transition-all group">
                <div className={`w-11 h-11 ${f.bg} rounded-xl flex items-center justify-center shrink-0`}>
                  {f.icon}
                </div>
                <div>
                  <h3 className="font-bold text-slate-900 mb-2">{f.title}</h3>
                  <p className="text-slate-500 text-sm leading-relaxed">{f.desc}</p>
                </div>
              </div>
            </FadeUp>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── Roadmap ──────────────────────────────────────────────────────────────────
function Roadmap() {
  const steps = [
    { num: "01", title: "Learn Market Fundamentals", desc: "Understand how financial markets work, key terminology, market participants, and the psychology behind price movements.", icon: <BookOpen size={20} /> },
    { num: "02", title: "Master Technical Analysis", desc: "Study candlestick patterns, chart formations, indicators, and develop the ability to read markets through pure price data.", icon: <BarChart2 size={20} /> },
    { num: "03", title: "Build Your Trading Strategy", desc: "Develop a personalized, rule-based trading system with clear entry, exit, and management criteria that suits your style.", icon: <Target size={20} /> },
    { num: "04", title: "Practice Risk Management", desc: "Apply professional risk management: position sizing, stop placement, reward-to-risk ratios, and portfolio management.", icon: <Shield size={20} /> },
    { num: "05", title: "Become an Independent Trader", desc: "Graduate as a disciplined, self-reliant trader with a tested strategy, strong mindset, and the skills for consistent profitability.", icon: <TrendingUp size={20} /> },
  ];

  return (
    <section className="py-28 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 overflow-hidden relative">
      <div className="absolute inset-0 bg-[linear-gradient(rgba(16,185,129,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(16,185,129,0.03)_1px,transparent_1px)] bg-[size:60px_60px]" />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl" />

      <div className="relative max-w-7xl mx-auto px-6 lg:px-10">
        <AnimatedSection className="text-center mb-16">
          <motion.div variants={fadeUp}>
            <span className="text-xs font-bold tracking-[0.2em] text-emerald-400 uppercase">Your Journey</span>
            <h2 className="text-4xl lg:text-5xl font-black text-white mt-3 mb-4">Your Path to Trading<br />Independence</h2>
            <p className="text-slate-400 text-lg max-w-xl mx-auto">A structured, step-by-step roadmap from beginner to professional trader.</p>
          </motion.div>
        </AnimatedSection>

        <div className="relative">
          {/* Connecting line */}
          <div className="absolute left-[50%] top-8 bottom-8 w-px bg-gradient-to-b from-emerald-500 via-teal-500 to-emerald-500/20 hidden lg:block" />

          <div className="space-y-6">
            {steps.map((step, i) => (
              <FadeUp key={i} delay={i * 0.1}>
                <div className={`lg:flex items-center gap-8 ${i % 2 === 0 ? "lg:flex-row" : "lg:flex-row-reverse"}`}>
                  <div className={`flex-1 ${i % 2 === 0 ? "lg:text-right" : ""}`}>
                    <div className={`bg-white/5 backdrop-blur rounded-2xl p-7 border border-white/10 hover:border-emerald-500/30 transition-colors ${i % 2 === 0 ? "lg:mr-12" : "lg:ml-12"}`}>
                      <div className="flex items-center gap-3 mb-3 ${i % 2 === 0 ? 'lg:justify-end' : ''}">
                        <span className="text-emerald-400 font-black text-lg">{step.num}</span>
                        <h3 className="text-white font-bold text-lg">{step.title}</h3>
                      </div>
                      <p className="text-slate-400 text-sm leading-relaxed">{step.desc}</p>
                    </div>
                  </div>

                  {/* Center node */}
                  <div className="hidden lg:flex w-14 h-14 bg-emerald-500 rounded-2xl items-center justify-center text-white shrink-0 shadow-xl shadow-emerald-900/50 z-10">
                    {step.icon}
                  </div>

                  <div className="flex-1 hidden lg:block" />
                </div>
              </FadeUp>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── Testimonials ─────────────────────────────────────────────────────────────
function Testimonials() {
  const testimonials = [
    { name: "Arjun Mehta", role: "Software Engineer, Bangalore", rating: 5, text: "I had zero knowledge of markets when I joined ProfitEdge. Within 6 months, I developed a swing trading strategy that I now run alongside my job. The risk management module changed my entire perspective on trading.", avatar: "AM" },
    { name: "Priya Sharma", role: "MBA Student, Delhi", rating: 5, text: "The Price Action Masterclass was eye-opening. I had tried other courses that were indicator-heavy and confusing. ProfitEdge taught me to read charts with clarity. The live sessions are the real differentiator.", avatar: "PS" },
    { name: "Vikram Nair", role: "Business Owner, Kochi", rating: 5, text: "As a business owner with limited time, the 1-on-1 mentorship was exactly what I needed. My mentor understood my goals and helped me build a practical trading system I can execute in 1 hour per day.", avatar: "VN" },
    { name: "Sneha Agarwal", role: "Working Professional, Mumbai", rating: 5, text: "The trading psychology module is worth the entire course fee. I used to revenge-trade and blow my capital regularly. Now I have clear rules, a trading journal, and genuine consistency in my approach.", avatar: "SA" },
    { name: "Rahul Verma", role: "Fresh Graduate, Patna", rating: 5, text: "Started from absolute basics — didn't even know the difference between NSE and BSE. Today I'm paper trading profitably for 3 consecutive months. The community support makes the learning journey much less lonely.", avatar: "RV" },
    { name: "Anita Desai", role: "Bank Manager, Pune", rating: 5, text: "The Forex program gave me a completely new perspective. The structured approach to currency markets and the focus on discipline over gambling helped me become a far more rational decision-maker overall.", avatar: "AD" },
  ];

  return (
    <section id="testimonials" className="py-28 bg-slate-50">
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        <AnimatedSection className="text-center mb-16">
          <motion.div variants={fadeUp}>
            <span className="text-xs font-bold tracking-[0.2em] text-emerald-600 uppercase">Student Stories</span>
            <h2 className="text-4xl lg:text-5xl font-black text-slate-900 mt-3 mb-4">Real Students,<br />Real Transformations</h2>
            <p className="text-slate-500 text-lg max-w-xl mx-auto">Thousands of traders have built their foundation at ProfitEdge. Here's what they say.</p>
          </motion.div>
        </AnimatedSection>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {testimonials.map((t, i) => (
            <FadeUp key={i} delay={i * 0.07}>
              <div className="bg-white rounded-3xl p-8 border border-slate-100 hover:shadow-lg hover:shadow-slate-100 transition-all h-full flex flex-col">
                <div className="flex mb-4">
                  {Array(t.rating).fill(0).map((_, j) => (
                    <Star key={j} size={14} className="text-amber-400 fill-amber-400" />
                  ))}
                </div>
                <p className="text-slate-600 text-sm leading-relaxed flex-1 mb-6">"{t.text}"</p>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-400 to-teal-500 flex items-center justify-center text-white text-xs font-bold shrink-0">
                    {t.avatar}
                  </div>
                  <div>
                    <div className="text-sm font-bold text-slate-900">{t.name}</div>
                    <div className="text-xs text-slate-400">{t.role}</div>
                  </div>
                </div>
              </div>
            </FadeUp>
          ))}
        </div>
      </div>
    </section>
  );
}


// ─── FAQ ──────────────────────────────────────────────────────────────────────
function FAQ() {
  const [open, setOpen] = useState(null);

  const faqs = [
    { q: "Do I need prior trading experience to join?", a: "No prior experience is required. Our beginner courses are designed from the ground up, starting with market fundamentals and gradually progressing to advanced strategies. We welcome complete beginners." },
    { q: "Can I learn Forex trading even as an Indian student?", a: "Yes. Our Forex Trading Program covers international currency markets comprehensively. While direct retail forex trading in India has regulatory nuances, the knowledge is fully applicable for global markets and future opportunities." },
    { q: "Is cryptocurrency trading covered in your programs?", a: "Yes, we offer a dedicated Crypto Trading Program that covers blockchain fundamentals, crypto market analysis, portfolio management, and risk strategies specific to digital assets." },
    { q: "How long does it take to complete a course?", a: "Course durations vary by program. Foundational courses typically run 4–6 weeks. Advanced programs like our full Stock Market Mastery or 1-on-1 Mentorship can span 3–6 months depending on pace and depth." },
    { q: "What kind of support do I get after the course?", a: "All students get lifetime access to our community group, recorded sessions, and regular market update content. We also offer alumni support sessions where you can ask questions to mentors." },
    { q: "Do you provide mentorship or just recorded videos?", a: "ProfitEdge is mentor-led, not just a video library. Every program includes live sessions, mentor interaction, and doubt-resolution classes. Our 1-on-1 Mentorship Program offers personalized guidance." },
    { q: "Will I get guaranteed returns or profit guarantees?", a: "No. Trading involves risk and no ethical institution can guarantee returns. Our focus is on building the skills, discipline, and risk management ability that gives traders a long-term statistical edge in the markets." },
    { q: "How do I enroll or get started?", a: "You can book a free consultation via our contact form or call us directly. Our team will understand your goals, recommend the right program, and guide you through the enrollment process." },
  ];

  return (
    <section className="py-28 bg-slate-50">
      <div className="max-w-4xl mx-auto px-6 lg:px-10">
        <AnimatedSection className="text-center mb-16">
          <motion.div variants={fadeUp}>
            <span className="text-xs font-bold tracking-[0.2em] text-emerald-600 uppercase">FAQ</span>
            <h2 className="text-4xl lg:text-5xl font-black text-slate-900 mt-3 mb-4">Frequently Asked<br />Questions</h2>
            <p className="text-slate-500 text-lg">Everything you need to know before joining ProfitEdge.</p>
          </motion.div>
        </AnimatedSection>

        <div className="space-y-3">
          {faqs.map((faq, i) => (
            <FadeUp key={i} delay={i * 0.04}>
              <div className={`bg-white rounded-2xl border overflow-hidden transition-all ${open === i ? "border-emerald-200 shadow-sm shadow-emerald-50" : "border-slate-100"}`}>
                <button onClick={() => setOpen(open === i ? null : i)} className="w-full flex items-center justify-between p-6 text-left">
                  <span className="font-semibold text-slate-900 text-sm pr-4">{faq.q}</span>
                  <span className={`shrink-0 w-7 h-7 rounded-lg flex items-center justify-center transition-all ${open === i ? "bg-emerald-500 text-white" : "bg-slate-100 text-slate-500"}`}>
                    <ChevronDown size={15} className={`transition-transform ${open === i ? "rotate-180" : ""}`} />
                  </span>
                </button>
                <AnimatePresence>
                  {open === i && (
                    <motion.div initial={{ height: 0 }} animate={{ height: "auto" }} exit={{ height: 0 }} className="overflow-hidden">
                      <p className="px-6 pb-6 text-slate-500 text-sm leading-relaxed">{faq.a}</p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </FadeUp>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── Location ─────────────────────────────────────────────────────────────────
function Location() {
  return (
    <section className="py-28 bg-white">
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        <AnimatedSection className="text-center mb-16">
          <motion.div variants={fadeUp}>
            <span className="text-xs font-bold tracking-[0.2em] text-emerald-600 uppercase">Our Location</span>
            <h2 className="text-4xl lg:text-5xl font-black text-slate-900 mt-3">Visit Our Training Center</h2>
          </motion.div>
        </AnimatedSection>

        <div className="grid lg:grid-cols-2 gap-10 items-start">
          {/* Map Placeholder */}
          <FadeUp>
            <div className="aspect-video rounded-3xl overflow-hidden border border-slate-100 shadow-lg relative bg-gradient-to-br from-emerald-50 to-teal-50">
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <div className="w-16 h-16 bg-emerald-500 rounded-2xl flex items-center justify-center mb-4 shadow-lg shadow-emerald-200">
                  <MapPin size={28} className="text-white" />
                </div>
                <div className="text-xl font-black text-slate-800 mb-1">Your City</div>
                <div className="text-slate-500 text-sm font-medium">India</div>
                <a href="https://maps.google.com" target="_blank" rel="noopener noreferrer"
                  className="mt-5 px-5 py-2.5 bg-emerald-500 text-white text-sm font-bold rounded-xl hover:bg-emerald-600 transition-colors flex items-center gap-2">
                  <MapPin size={14} /> Open in Google Maps
                </a>
              </div>
              {/* Decorative grid */}
              <div className="absolute inset-0 bg-[linear-gradient(rgba(16,185,129,0.07)_1px,transparent_1px),linear-gradient(90deg,rgba(16,185,129,0.07)_1px,transparent_1px)] bg-[size:30px_30px]" />
            </div>
          </FadeUp>

          {/* Info Cards */}
          <div className="space-y-5">
            {[
              { icon: <MapPin size={20} className="text-emerald-600" />, label: "Address", value: "Trading Academy\nCity, State – XXXXXX, India" },
              { icon: <Phone size={20} className="text-blue-600" />, label: "Phone", value: "+91 XXXXX XXXXX\n+91 XXXXX XXXXX" },
              { icon: <Mail size={20} className="text-violet-600" />, label: "Email", value: "info@youracademy.in\nsupport@youracademy.in" },
              { icon: <Clock size={20} className="text-amber-500" />, label: "Business Hours", value: "Monday – Saturday: 9:00 AM – 7:00 PM\nSunday: Closed" },
            ].map((item, i) => (
              <FadeUp key={i} delay={i * 0.08}>
                <div className="flex gap-4 p-6 bg-slate-50 rounded-2xl border border-slate-100">
                  <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center border border-slate-100 shrink-0 shadow-sm">
                    {item.icon}
                  </div>
                  <div>
                    <div className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">{item.label}</div>
                    <div className="text-sm text-slate-700 font-medium whitespace-pre-line">{item.value}</div>
                  </div>
                </div>
              </FadeUp>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── Contact ──────────────────────────────────────────────────────────────────
function Contact() {
  const [form, setForm] = useState({ name: "", phone: "", email: "", experience: "", message: "" });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 4000);
    setForm({ name: "", phone: "", email: "", experience: "", message: "" });
  };

  return (
    <section id="contact" className="py-28 bg-slate-50">
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        <div className="grid lg:grid-cols-2 gap-16 items-start">
          {/* Left */}
          <AnimatedSection>
            <motion.div variants={fadeUp}>
              <span className="text-xs font-bold tracking-[0.2em] text-emerald-600 uppercase">Get In Touch</span>
              <h2 className="text-4xl lg:text-5xl font-black text-slate-900 mt-3 mb-6">Send Us a<br />Message</h2>
              <p className="text-slate-500 text-lg leading-relaxed mb-8">
                Speak with one of our education advisors to understand which program fits your goals, experience level, and schedule — no commitment required.
              </p>
            </motion.div>

            <motion.div variants={fadeUp} className="space-y-5">
              {[
                { icon: <CheckCircle size={18} className="text-emerald-500" />, text: "Understand your trading goals" },
                { icon: <CheckCircle size={18} className="text-emerald-500" />, text: "Get a personalized course recommendation" },
                { icon: <CheckCircle size={18} className="text-emerald-500" />, text: "Learn about our mentorship structure" },
                { icon: <CheckCircle size={18} className="text-emerald-500" />, text: "No spam, no hard selling" },
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-3 text-slate-700 text-sm font-medium">
                  {item.icon} {item.text}
                </div>
              ))}
            </motion.div>
          </AnimatedSection>

          {/* Form */}
          <FadeUp delay={0.2}>
            <div className="bg-white rounded-3xl border border-slate-100 shadow-xl shadow-slate-100/80 p-8">
              {submitted ? (
                <div className="text-center py-12">
                  <div className="w-16 h-16 bg-emerald-50 rounded-full flex items-center justify-center mx-auto mb-4">
                    <CheckCircle size={32} className="text-emerald-500" />
                  </div>
                  <h3 className="text-xl font-bold text-slate-900 mb-2">Thank you!</h3>
                  <p className="text-slate-500 text-sm">We'll reach out within 24 hours to schedule your free consultation.</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  <h3 className="text-xl font-bold text-slate-900 mb-6">Contact Us</h3>
                  <div className="grid md:grid-cols-2 gap-5">
                    <div>
                      <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Full Name *</label>
                      <input required value={form.name} onChange={e => setForm({...form, name: e.target.value})}
                        className="w-full px-4 py-3.5 rounded-xl border border-slate-200 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-emerald-400 focus:ring-2 focus:ring-emerald-50 transition-all"
                        placeholder="Your name" />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Phone Number *</label>
                      <input required value={form.phone} onChange={e => setForm({...form, phone: e.target.value})}
                        className="w-full px-4 py-3.5 rounded-xl border border-slate-200 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-emerald-400 focus:ring-2 focus:ring-emerald-50 transition-all"
                        placeholder="+91 XXXXX XXXXX" />
                    </div>
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Email Address *</label>
                    <input required type="email" value={form.email} onChange={e => setForm({...form, email: e.target.value})}
                      className="w-full px-4 py-3.5 rounded-xl border border-slate-200 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-emerald-400 focus:ring-2 focus:ring-emerald-50 transition-all"
                      placeholder="your@email.com" />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Trading Experience</label>
                    <select value={form.experience} onChange={e => setForm({...form, experience: e.target.value})}
                      className="w-full px-4 py-3.5 rounded-xl border border-slate-200 text-sm text-slate-700 focus:outline-none focus:border-emerald-400 focus:ring-2 focus:ring-emerald-50 transition-all bg-white">
                      <option value="">Select your experience level</option>
                      <option>Complete Beginner</option>
                      <option>Less than 1 Year</option>
                      <option>1–3 Years</option>
                      <option>3+ Years</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Message</label>
                    <textarea value={form.message} onChange={e => setForm({...form, message: e.target.value})}
                      rows={3} className="w-full px-4 py-3.5 rounded-xl border border-slate-200 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-emerald-400 focus:ring-2 focus:ring-emerald-50 transition-all resize-none"
                      placeholder="Any specific goals or questions?" />
                  </div>
                  <button type="submit"
                    className="w-full py-4 bg-gradient-to-r from-emerald-500 to-teal-600 text-white font-bold rounded-xl text-sm hover:shadow-xl hover:shadow-emerald-200 hover:-translate-y-0.5 transition-all">
                    Send Message →
                  </button>
                  <p className="text-center text-xs text-slate-400">No commitments. We'll reach out within 24 hours.</p>
                </form>
              )}
            </div>
          </FadeUp>
        </div>
      </div>
    </section>
  );
}

// ─── Footer ───────────────────────────────────────────────────────────────────
function Footer() {
  const courses = ["Stock Market Mastery", "Forex Trading Program", "Crypto Trading Program", "Price Action Masterclass", "Risk Management Training", "1-on-1 Mentorship"];
  const links = ["Home", "About", "Courses", "Testimonials", "FAQ", "Contact"];

  return (
    <footer className="bg-slate-900 text-slate-400 pt-20 pb-8">
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          {/* Brand */}
          <div className="lg:col-span-1">
            <div className="flex items-center gap-2.5 mb-5">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center">
                <TrendingUp size={18} className="text-white" strokeWidth={2.5} />
              </div>
              <div>
                <span className="font-bold text-white text-base tracking-tight">ProfitEdge</span>
                <span className="block text-[9px] font-semibold tracking-[0.15em] text-emerald-400 uppercase -mt-0.5">Trading Academy</span>
              </div>
            </div>
            <p className="text-sm leading-relaxed mb-5">
              Empowering aspiring traders to become confident, independent, and consistently profitable through disciplined education and real market experience.
            </p>
            <div className="flex gap-3">
              {["in", "yt", "ig", "tw"].map(s => (
                <div key={s} className="w-9 h-9 bg-slate-800 rounded-lg flex items-center justify-center hover:bg-emerald-500/20 hover:text-emerald-400 transition-colors cursor-pointer text-xs font-bold">
                  {s}
                </div>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-white font-bold text-sm mb-5 uppercase tracking-wider">Quick Links</h4>
            <ul className="space-y-3">
              {links.map(l => (
                <li key={l}><a href={`#${l.toLowerCase()}`} className="text-sm hover:text-emerald-400 transition-colors">{l}</a></li>
              ))}
            </ul>
          </div>

          {/* Courses */}
          <div>
            <h4 className="text-white font-bold text-sm mb-5 uppercase tracking-wider">Our Courses</h4>
            <ul className="space-y-3">
              {courses.map(c => (
                <li key={c}><a href="#courses" className="text-sm hover:text-emerald-400 transition-colors">{c}</a></li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-white font-bold text-sm mb-5 uppercase tracking-wider">Contact</h4>
            <div className="space-y-4">
              <div className="flex gap-3 text-sm"><MapPin size={15} className="text-emerald-400 shrink-0 mt-0.5" /> Your City, State, India</div>
              <div className="flex gap-3 text-sm"><Phone size={15} className="text-emerald-400 shrink-0 mt-0.5" /> +91 XXXXX XXXXX</div>
              <div className="flex gap-3 text-sm"><Mail size={15} className="text-emerald-400 shrink-0 mt-0.5" /> info@youracademy.in</div>
              <div className="flex gap-3 text-sm"><Clock size={15} className="text-emerald-400 shrink-0 mt-0.5" /> Mon–Sat: 9AM – 7PM</div>
            </div>
          </div>
        </div>

        <div className="border-t border-slate-800 pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <span>© 2024 ProfitEdge Trading Academy. All rights reserved.</span>
          <div className="flex gap-4">
            <a href="#" className="hover:text-emerald-400 transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-emerald-400 transition-colors">Terms of Service</a>
            <a href="#" className="hover:text-emerald-400 transition-colors">Disclaimer</a>
          </div>
          <p className="text-slate-600 text-center md:text-right max-w-xs">
            Trading involves risk. Past performance is not indicative of future results. Invest responsibly.
          </p>
        </div>
      </div>
    </footer>
  );
}

// ─── App ──────────────────────────────────────────────────────────────────────
export default function App() {
  return (
    <div className="font-sans antialiased text-slate-900">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;500;600;700;800;900&family=DM+Sans:wght@300;400;500;600;700&display=swap');
        body { font-family: 'DM Sans', sans-serif; }
        h1, h2, h3, h4 { font-family: 'Syne', sans-serif; }
        html { scroll-behavior: smooth; }
      `}</style>
      <Navbar />
      <Hero />
      <TrustBar />
      <About />
      <Courses />
      <WhyUs />
      <Roadmap />
      <Testimonials />

      <Location />
      <Contact />
      <Footer />
    </div>
  );
}
