import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Toaster } from "@/components/ui/sonner";
import { Textarea } from "@/components/ui/textarea";
import { useActor } from "@/hooks/useActor";
import { useMutation } from "@tanstack/react-query";
import {
  ArrowRight,
  BookOpen,
  Camera,
  Check,
  Instagram,
  Loader2,
  Menu,
  Play,
  Smartphone,
  Star,
  Video,
  X,
  Youtube,
  Zap,
} from "lucide-react";
import { AnimatePresence, motion, useScroll, useTransform } from "motion/react";
import { useEffect, useRef, useState } from "react";
import { SiTiktok } from "react-icons/si";
import { toast } from "sonner";

// ── Fade‑in animation variants ──────────────────────────────────────────────
const fadeUp = {
  hidden: { opacity: 0, y: 32 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" as const },
  },
};

const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12 } },
};

// ── Contact form mutation hook ───────────────────────────────────────────────
function useSubmitContactForm() {
  const { actor } = useActor();
  return useMutation({
    mutationFn: async ({
      name,
      brandName,
      email,
      message,
    }: {
      name: string;
      brandName: string;
      email: string;
      message: string;
    }) => {
      if (!actor) throw new Error("Not connected");
      await actor.submitContactForm(name, brandName, email, message);
    },
    onSuccess: () => {
      toast.success("Message sent! We'll be in touch within 24 hours.");
    },
    onError: () => {
      toast.error("Something went wrong. Please try again.");
    },
  });
}

// ── Navbar ───────────────────────────────────────────────────────────────────
function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const links = [
    { label: "Services", href: "#services" },
    { label: "Portfolio", href: "#portfolio" },
    { label: "Pricing", href: "#pricing" },
    { label: "Contact", href: "#contact" },
  ];

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled
            ? "bg-background/90 backdrop-blur-md border-b border-border shadow-card"
            : "bg-transparent"
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          {/* Logo */}
          <a href="#hero" className="flex items-center gap-2 group">
            <span className="text-brand-coral">
              <Zap className="w-5 h-5 fill-current" />
            </span>
            <span className="font-display font-black text-lg tracking-tight text-foreground uppercase">
              Shortiva <span className="text-brand-coral">Studio</span>
            </span>
          </a>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-8">
            {links.map((l) => (
              <a
                key={l.label}
                href={l.href}
                className="font-body text-sm font-medium text-muted-foreground hover:text-foreground transition-colors duration-200"
              >
                {l.label}
              </a>
            ))}
            <a href="#contact">
              <Button
                size="sm"
                className="bg-brand-coral hover:bg-brand-coral/90 text-[oklch(0.08_0.01_260)] font-bold font-body rounded-full px-5 transition-all duration-200 hover:shadow-glow-coral"
              >
                Book Now
              </Button>
            </a>
          </nav>

          {/* Mobile hamburger */}
          <button
            type="button"
            className="md:hidden text-foreground p-2"
            onClick={() => setMobileOpen((v) => !v)}
            aria-label="Toggle menu"
          >
            {mobileOpen ? (
              <X className="w-5 h-5" />
            ) : (
              <Menu className="w-5 h-5" />
            )}
          </button>
        </div>
      </header>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="fixed top-16 left-0 right-0 z-40 bg-background/95 backdrop-blur-md border-b border-border px-6 py-6 flex flex-col gap-5 md:hidden"
          >
            {links.map((l) => (
              <a
                key={l.label}
                href={l.href}
                className="font-body text-base font-medium text-foreground"
                onClick={() => setMobileOpen(false)}
              >
                {l.label}
              </a>
            ))}
            <Button
              className="w-full bg-brand-coral hover:bg-brand-coral/90 text-[oklch(0.08_0.01_260)] font-bold font-body rounded-full"
              onClick={() => {
                setMobileOpen(false);
                document
                  .getElementById("contact")
                  ?.scrollIntoView({ behavior: "smooth" });
              }}
            >
              Book Now
            </Button>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

// ── Hero ─────────────────────────────────────────────────────────────────────
function Hero() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "25%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  return (
    <section
      ref={ref}
      className="relative min-h-screen flex items-center overflow-hidden gradient-mesh"
      id="hero"
    >
      {/* Decorative orbs */}
      <div className="absolute top-1/4 -left-20 w-80 h-80 rounded-full bg-brand-coral/10 blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 -right-20 w-96 h-96 rounded-full bg-brand-lime/8 blur-3xl pointer-events-none" />

      <motion.div
        style={{ y, opacity }}
        className="relative z-10 max-w-7xl mx-auto px-6 pt-32 pb-20 w-full"
      >
        <motion.div
          variants={stagger}
          initial="hidden"
          animate="visible"
          className="max-w-4xl"
        >
          {/* Eyebrow */}
          <motion.div variants={fadeUp}>
            <Badge className="mb-6 bg-brand-coral/15 text-brand-coral border-brand-coral/30 font-body font-semibold tracking-widest uppercase text-xs px-4 py-1.5">
              UGC Content Studio
            </Badge>
          </motion.div>

          {/* Headline */}
          <motion.h1
            variants={fadeUp}
            className="font-display font-black text-5xl sm:text-6xl md:text-8xl leading-[0.92] tracking-tight text-foreground mb-6"
          >
            Content{" "}
            <span className="relative inline-block">
              <span className="text-brand-coral">That</span>
            </span>
            <br />
            <span className="text-foreground/90">Converts.</span>
          </motion.h1>

          {/* Sub */}
          <motion.p
            variants={fadeUp}
            className="font-body text-lg md:text-xl text-muted-foreground max-w-2xl mb-10 leading-relaxed"
          >
            We create authentic, scroll‑stopping UGC for brands that want to
            stand out. Real people. Real stories. Real results.
          </motion.p>

          {/* CTAs */}
          <motion.div
            variants={fadeUp}
            className="flex flex-wrap gap-4 items-center"
          >
            <a href="#portfolio">
              <Button
                size="lg"
                className="bg-brand-coral hover:bg-brand-coral/90 text-[oklch(0.08_0.01_260)] font-display font-black text-base rounded-full px-8 py-6 shadow-glow-coral transition-all duration-300 hover:scale-105 gap-2"
              >
                See Our Work <ArrowRight className="w-4 h-4" />
              </Button>
            </a>
            <a href="#contact">
              <Button
                variant="outline"
                size="lg"
                className="border-border text-foreground hover:bg-secondary font-display font-bold text-base rounded-full px-8 py-6 transition-all duration-300 hover:border-brand-coral/50 gap-2"
              >
                <Play className="w-4 h-4 text-brand-coral fill-current" />
                Book Now
              </Button>
            </a>
          </motion.div>

          {/* Social proof numbers */}
          <motion.div
            variants={fadeUp}
            className="mt-16 flex flex-wrap gap-8 md:gap-12"
          >
            {[
              { value: "50+", label: "Brands Served" },
              { value: "300+", label: "Videos Created" },
              { value: "12M+", label: "Views Generated" },
            ].map((stat) => (
              <div key={stat.label}>
                <p className="font-display font-black text-3xl text-foreground">
                  {stat.value}
                </p>
                <p className="font-body text-sm text-muted-foreground mt-0.5">
                  {stat.label}
                </p>
              </div>
            ))}
          </motion.div>
        </motion.div>
      </motion.div>

      {/* Bottom gradient fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent pointer-events-none" />
    </section>
  );
}

// ── Services ─────────────────────────────────────────────────────────────────
const SERVICES = [
  {
    icon: Video,
    title: "UGC Video Content",
    desc: "Authentic short-form videos designed for TikTok, Reels, and YouTube Shorts. Built to grab attention in the first 2 seconds.",
    color: "coral",
  },
  {
    icon: Camera,
    title: "Product Photography",
    desc: "Lifestyle and studio shots that make your product the hero. Clean, vibrant, and platform-ready.",
    color: "lime",
  },
  {
    icon: Smartphone,
    title: "Social Media Content",
    desc: "Full content calendars, story templates, and feed posts crafted for consistent brand presence.",
    color: "coral",
  },
  {
    icon: BookOpen,
    title: "Brand Storytelling",
    desc: "Long-form narrative content that connects your brand to your audience on an emotional level.",
    color: "lime",
  },
];

function Services() {
  return (
    <section
      id="services"
      className="py-24 md:py-32 bg-background relative overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          className="mb-16"
        >
          <motion.p
            variants={fadeUp}
            className="font-body font-semibold tracking-widest uppercase text-xs text-brand-coral mb-3"
          >
            What We Do
          </motion.p>
          <motion.h2
            variants={fadeUp}
            className="font-display font-black text-4xl md:text-6xl text-foreground"
          >
            Services Built
            <br />
            for Brands
          </motion.h2>
        </motion.div>

        {/* Grid */}
        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
          className="grid grid-cols-1 md:grid-cols-2 gap-5"
        >
          {SERVICES.map((s) => {
            const Icon = s.icon;
            const isLime = s.color === "lime";
            return (
              <motion.div
                key={s.title}
                variants={fadeUp}
                whileHover={{ y: -4, transition: { duration: 0.2 } }}
                className="relative group rounded-2xl p-8 bg-brand-surface border border-border hover:border-brand-coral/30 transition-all duration-300 shadow-card hover:shadow-card-hover overflow-hidden"
              >
                {/* BG accent */}
                <div
                  className={`absolute top-0 right-0 w-40 h-40 rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none ${
                    isLime ? "bg-brand-lime/10" : "bg-brand-coral/10"
                  }`}
                />

                <div
                  className={`inline-flex items-center justify-center w-12 h-12 rounded-xl mb-5 ${
                    isLime
                      ? "bg-brand-lime/15 text-brand-lime"
                      : "bg-brand-coral/15 text-brand-coral"
                  }`}
                >
                  <Icon className="w-5 h-5" />
                </div>

                <h3 className="font-display font-bold text-xl text-foreground mb-3">
                  {s.title}
                </h3>
                <p className="font-body text-muted-foreground leading-relaxed">
                  {s.desc}
                </p>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}

// ── Portfolio ─────────────────────────────────────────────────────────────────
const PORTFOLIO = [
  {
    title: "Skincare Brand Campaign",
    category: "UGC Video + Photography",
    img: "/assets/generated/portfolio-skincare.dim_600x400.jpg",
    tag: "Beauty",
  },
  {
    title: "Fitness App Launch",
    category: "Social Media Content",
    img: "/assets/generated/portfolio-fitness.dim_600x400.jpg",
    tag: "Health",
  },
  {
    title: "Food & Beverage Reel",
    category: "UGC Video Content",
    img: "/assets/generated/portfolio-food.dim_600x400.jpg",
    tag: "F&B",
  },
  {
    title: "Tech Gadget Review",
    category: "Product Photography",
    img: "/assets/generated/portfolio-tech.dim_600x400.jpg",
    tag: "Tech",
  },
  {
    title: "Lifestyle Shoot",
    category: "Brand Storytelling",
    img: "/assets/generated/portfolio-lifestyle.dim_600x400.jpg",
    tag: "Lifestyle",
  },
  {
    title: "Fashion Lookbook",
    category: "Social Media Content",
    img: "/assets/generated/portfolio-fashion.dim_600x400.jpg",
    tag: "Fashion",
  },
];

function Portfolio() {
  return (
    <section id="portfolio" className="py-24 md:py-32 bg-background relative">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          className="mb-16 flex flex-col md:flex-row md:items-end justify-between gap-6"
        >
          <div>
            <motion.p
              variants={fadeUp}
              className="font-body font-semibold tracking-widest uppercase text-xs text-brand-lime mb-3"
            >
              Our Work
            </motion.p>
            <motion.h2
              variants={fadeUp}
              className="font-display font-black text-4xl md:text-6xl text-foreground"
            >
              Results That
              <br />
              Speak Loud
            </motion.h2>
          </div>
          <motion.p
            variants={fadeUp}
            className="font-body text-muted-foreground max-w-xs md:max-w-sm leading-relaxed"
          >
            A selection of campaigns we've created for brands across beauty,
            tech, lifestyle, and more.
          </motion.p>
        </motion.div>

        {/* Grid */}
        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-40px" }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5"
        >
          {PORTFOLIO.map((item, i) => (
            <motion.div
              key={item.title}
              variants={fadeUp}
              custom={i}
              whileHover={{ scale: 1.02, transition: { duration: 0.2 } }}
              className="group relative rounded-2xl overflow-hidden aspect-[4/3] shadow-card cursor-pointer"
            >
              <img
                src={item.img}
                alt={item.title}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                loading="lazy"
              />

              {/* Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-60 group-hover:opacity-100 transition-opacity duration-300" />

              {/* Tag */}
              <div className="absolute top-4 left-4">
                <Badge className="bg-brand-coral/90 text-[oklch(0.08_0.01_260)] border-0 font-body font-semibold text-xs">
                  {item.tag}
                </Badge>
              </div>

              {/* Info */}
              <div className="absolute bottom-0 left-0 right-0 p-5 translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
                <p className="font-body text-xs text-white/60 mb-1 uppercase tracking-wider">
                  {item.category}
                </p>
                <h3 className="font-display font-bold text-lg text-white leading-tight">
                  {item.title}
                </h3>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

// ── Pricing ───────────────────────────────────────────────────────────────────
const PLANS = [
  {
    name: "Starter",
    price: "$299",
    desc: "Perfect for brands exploring UGC for the first time.",
    features: [
      "1 UGC video (60 sec max)",
      "2 revision rounds",
      "Platform-ready formats",
      "7-day delivery",
    ],
    highlight: false,
    cta: "Get Started",
  },
  {
    name: "Growth",
    price: "$799",
    desc: "Our most popular package for brands ready to scale.",
    features: [
      "3 UGC videos (up to 90 sec)",
      "10 product photos",
      "3 revision rounds",
      "Story + Reel formats",
      "5-day delivery",
      "Content strategy session",
    ],
    highlight: true,
    cta: "Most Popular",
  },
  {
    name: "Premium",
    price: "$1,499",
    desc: "Full campaign production for serious brand growth.",
    features: [
      "5 UGC videos (any length)",
      "25 product photos",
      "Full campaign strategy",
      "Unlimited revisions",
      "3-day delivery",
      "Dedicated account manager",
      "Performance report",
    ],
    highlight: false,
    cta: "Go Premium",
  },
];

function Pricing() {
  return (
    <section id="pricing" className="py-24 md:py-32 relative overflow-hidden">
      {/* BG accent */}
      <div className="absolute inset-0 bg-background" />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[400px] rounded-full bg-brand-coral/5 blur-3xl pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-6">
        {/* Header */}
        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          className="text-center mb-16"
        >
          <motion.p
            variants={fadeUp}
            className="font-body font-semibold tracking-widest uppercase text-xs text-brand-coral mb-3"
          >
            Pricing
          </motion.p>
          <motion.h2
            variants={fadeUp}
            className="font-display font-black text-4xl md:text-6xl text-foreground"
          >
            Simple, Transparent
            <br />
            Pricing
          </motion.h2>
          <motion.p
            variants={fadeUp}
            className="font-body text-muted-foreground mt-4 max-w-xl mx-auto"
          >
            No hidden fees. No surprises. Just great content at a fair price.
          </motion.p>
        </motion.div>

        {/* Cards */}
        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-40px" }}
          className="grid grid-cols-1 md:grid-cols-3 gap-5 items-start"
        >
          {PLANS.map((plan) => (
            <motion.div
              key={plan.name}
              variants={fadeUp}
              className={`relative rounded-2xl p-8 flex flex-col gap-6 shadow-card transition-all duration-300 ${
                plan.highlight
                  ? "bg-brand-coral text-[oklch(0.08_0.01_260)] shadow-glow-coral scale-105"
                  : "bg-brand-surface border border-border hover:border-border/80"
              }`}
            >
              {plan.highlight && (
                <div className="absolute -top-3.5 left-1/2 -translate-x-1/2">
                  <Badge className="bg-[oklch(0.08_0.01_260)] text-brand-coral border-0 font-body font-bold px-4">
                    ★ Best Value
                  </Badge>
                </div>
              )}

              <div>
                <p
                  className={`font-body font-semibold text-sm uppercase tracking-widest mb-1 ${
                    plan.highlight
                      ? "text-[oklch(0.08_0.01_260)]/70"
                      : "text-muted-foreground"
                  }`}
                >
                  {plan.name}
                </p>
                <p
                  className={`font-display font-black text-5xl ${
                    plan.highlight
                      ? "text-[oklch(0.08_0.01_260)]"
                      : "text-foreground"
                  }`}
                >
                  {plan.price}
                </p>
                <p
                  className={`font-body text-sm mt-2 ${
                    plan.highlight
                      ? "text-[oklch(0.08_0.01_260)]/70"
                      : "text-muted-foreground"
                  }`}
                >
                  {plan.desc}
                </p>
              </div>

              <ul className="flex flex-col gap-2.5 flex-1">
                {plan.features.map((f) => (
                  <li key={f} className="flex items-center gap-2.5">
                    <div
                      className={`flex-shrink-0 w-4 h-4 rounded-full flex items-center justify-center ${
                        plan.highlight
                          ? "bg-[oklch(0.08_0.01_260)]/20"
                          : "bg-brand-coral/15"
                      }`}
                    >
                      <Check
                        className={`w-2.5 h-2.5 ${
                          plan.highlight
                            ? "text-[oklch(0.08_0.01_260)]"
                            : "text-brand-coral"
                        }`}
                      />
                    </div>
                    <span
                      className={`font-body text-sm ${
                        plan.highlight
                          ? "text-[oklch(0.08_0.01_260)]"
                          : "text-foreground"
                      }`}
                    >
                      {f}
                    </span>
                  </li>
                ))}
              </ul>

              <a href="#contact">
                <Button
                  className={`w-full rounded-full font-display font-bold transition-all duration-200 ${
                    plan.highlight
                      ? "bg-[oklch(0.08_0.01_260)] text-brand-coral hover:bg-[oklch(0.12_0.01_260)]"
                      : "bg-brand-coral/15 text-brand-coral hover:bg-brand-coral hover:text-[oklch(0.08_0.01_260)] border border-brand-coral/30"
                  }`}
                >
                  {plan.cta}
                </Button>
              </a>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

// ── Testimonials ─────────────────────────────────────────────────────────────
const TESTIMONIALS = [
  {
    name: "Jordan Hayes",
    role: "Brand Manager, Lumia Cosmetics",
    quote:
      "Shortiva Studio completely transformed our social media presence. The UGC they created got 4x our normal engagement rate within the first week.",
    initials: "JH",
    stars: 5,
  },
  {
    name: "Priya Mehta",
    role: "Marketing Lead, FlexFit App",
    quote:
      "Working with this team was seamless from start to finish. They understood our brand voice instantly and delivered content that felt genuinely authentic.",
    initials: "PM",
    stars: 5,
  },
  {
    name: "Marco Rivera",
    role: "Founder, Brew & Co.",
    quote:
      "We've tried many UGC creators but none come close to the quality and consistency of Shortiva Studio. Worth every penny and then some.",
    initials: "MR",
    stars: 5,
  },
];

function Testimonials() {
  return (
    <section className="py-24 md:py-32 bg-background relative overflow-hidden">
      {/* bg decoration */}
      <div className="absolute bottom-0 right-0 w-96 h-96 rounded-full bg-brand-lime/5 blur-3xl pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-6">
        {/* Header */}
        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          className="text-center mb-16"
        >
          <motion.p
            variants={fadeUp}
            className="font-body font-semibold tracking-widest uppercase text-xs text-brand-lime mb-3"
          >
            Testimonials
          </motion.p>
          <motion.h2
            variants={fadeUp}
            className="font-display font-black text-4xl md:text-6xl text-foreground"
          >
            Brands Love
            <br />
            What We Make
          </motion.h2>
        </motion.div>

        {/* Cards */}
        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-40px" }}
          className="grid grid-cols-1 md:grid-cols-3 gap-5"
        >
          {TESTIMONIALS.map((t) => (
            <motion.div
              key={t.name}
              variants={fadeUp}
              whileHover={{ y: -4, transition: { duration: 0.2 } }}
              className="relative rounded-2xl p-7 bg-brand-surface border border-border shadow-card hover:border-brand-lime/30 transition-all duration-300"
            >
              {/* Stars */}
              <div className="flex gap-1 mb-5">
                {Array.from({ length: t.stars }, (_, i) => (
                  <Star
                    key={`star-${t.name}-${i}`}
                    className="w-4 h-4 fill-brand-coral text-brand-coral"
                  />
                ))}
              </div>

              {/* Quote */}
              <p className="font-body text-foreground/90 leading-relaxed mb-6 text-sm">
                "{t.quote}"
              </p>

              {/* Author */}
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-full bg-brand-coral/20 flex items-center justify-center text-brand-coral font-display font-bold text-xs flex-shrink-0">
                  {t.initials}
                </div>
                <div>
                  <p className="font-body font-semibold text-sm text-foreground">
                    {t.name}
                  </p>
                  <p className="font-body text-xs text-muted-foreground">
                    {t.role}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

// ── Contact ───────────────────────────────────────────────────────────────────
function Contact() {
  const [form, setForm] = useState({
    name: "",
    brandName: "",
    email: "",
    message: "",
  });
  const submitMutation = useSubmitContactForm();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    submitMutation.mutate(form, {
      onSuccess: () => {
        setForm({ name: "", brandName: "", email: "", message: "" });
      },
    });
  };

  const fieldClass =
    "bg-brand-surface border border-border focus:border-brand-coral/50 focus:ring-brand-coral/20 font-body text-foreground placeholder:text-muted-foreground rounded-xl transition-colors";

  return (
    <section
      id="contact"
      className="py-24 md:py-32 bg-background relative overflow-hidden"
    >
      {/* decorative gradient */}
      <div className="absolute top-1/2 -translate-y-1/2 left-0 w-80 h-80 rounded-full bg-brand-coral/8 blur-3xl pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          {/* Left */}
          <motion.div
            variants={stagger}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
          >
            <motion.p
              variants={fadeUp}
              className="font-body font-semibold tracking-widest uppercase text-xs text-brand-coral mb-3"
            >
              Get In Touch
            </motion.p>
            <motion.h2
              variants={fadeUp}
              className="font-display font-black text-4xl md:text-6xl text-foreground mb-6 leading-tight"
            >
              Ready to
              <br />
              Start Creating?
            </motion.h2>
            <motion.p
              variants={fadeUp}
              className="font-body text-muted-foreground leading-relaxed mb-10 max-w-md"
            >
              Tell us about your brand and campaign goals. We'll get back to you
              within 24 hours with a custom proposal.
            </motion.p>

            {/* Info */}
            <motion.div variants={stagger} className="flex flex-col gap-4">
              {[
                { label: "Response time", value: "Within 24 hours" },
                { label: "Languages", value: "English, Spanish" },
                {
                  label: "Platforms covered",
                  value: "TikTok, Instagram, YouTube",
                },
              ].map((info) => (
                <motion.div
                  key={info.label}
                  variants={fadeUp}
                  className="flex items-center gap-4"
                >
                  <div className="w-1.5 h-1.5 rounded-full bg-brand-coral flex-shrink-0" />
                  <span className="font-body text-sm text-muted-foreground">
                    <strong className="text-foreground">{info.label}:</strong>{" "}
                    {info.value}
                  </span>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>

          {/* Form */}
          <motion.div
            initial={{ opacity: 0, x: 32 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          >
            <form
              onSubmit={handleSubmit}
              className="rounded-2xl bg-brand-surface border border-border p-8 shadow-card flex flex-col gap-5"
            >
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div className="flex flex-col gap-2">
                  <label
                    htmlFor="name"
                    className="font-body text-xs font-semibold text-muted-foreground uppercase tracking-wider"
                  >
                    Your Name *
                  </label>
                  <Input
                    id="name"
                    required
                    placeholder="Alex Johnson"
                    value={form.name}
                    onChange={(e) =>
                      setForm((p) => ({ ...p, name: e.target.value }))
                    }
                    className={fieldClass}
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <label
                    htmlFor="brandName"
                    className="font-body text-xs font-semibold text-muted-foreground uppercase tracking-wider"
                  >
                    Brand Name *
                  </label>
                  <Input
                    id="brandName"
                    required
                    placeholder="Your Brand Co."
                    value={form.brandName}
                    onChange={(e) =>
                      setForm((p) => ({ ...p, brandName: e.target.value }))
                    }
                    className={fieldClass}
                  />
                </div>
              </div>

              <div className="flex flex-col gap-2">
                <label
                  htmlFor="email"
                  className="font-body text-xs font-semibold text-muted-foreground uppercase tracking-wider"
                >
                  Email *
                </label>
                <Input
                  id="email"
                  type="email"
                  required
                  placeholder="hello@yourbrand.com"
                  value={form.email}
                  onChange={(e) =>
                    setForm((p) => ({ ...p, email: e.target.value }))
                  }
                  className={fieldClass}
                />
              </div>

              <div className="flex flex-col gap-2">
                <label
                  htmlFor="message"
                  className="font-body text-xs font-semibold text-muted-foreground uppercase tracking-wider"
                >
                  Tell Us About Your Campaign *
                </label>
                <Textarea
                  id="message"
                  required
                  rows={5}
                  placeholder="What product/service do you want to promote? What platforms? Any specific style or tone in mind?"
                  value={form.message}
                  onChange={(e) =>
                    setForm((p) => ({ ...p, message: e.target.value }))
                  }
                  className={`${fieldClass} resize-none`}
                />
              </div>

              <Button
                type="submit"
                disabled={submitMutation.isPending}
                className="w-full bg-brand-coral hover:bg-brand-coral/90 text-[oklch(0.08_0.01_260)] font-display font-black text-base rounded-full py-6 transition-all duration-300 hover:shadow-glow-coral disabled:opacity-60 gap-2"
              >
                {submitMutation.isPending ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    Sending…
                  </>
                ) : (
                  <>
                    Send Message <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </Button>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

// ── Footer ────────────────────────────────────────────────────────────────────
function Footer() {
  const year = new Date().getFullYear();
  const hostname = window.location.hostname;

  return (
    <footer className="bg-brand-surface border-t border-border py-14">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-10 mb-10">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2 mb-2">
              <Zap className="w-5 h-5 text-brand-coral fill-current" />
              <span className="font-display font-black text-xl uppercase tracking-tight text-foreground">
                Shortiva <span className="text-brand-coral">Studio</span>
              </span>
            </div>
            <p className="font-body text-sm text-muted-foreground max-w-xs">
              Authentic UGC content that connects brands with real audiences.
            </p>
          </div>

          {/* Social */}
          <div className="flex items-center gap-4">
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
              className="w-10 h-10 rounded-full bg-background border border-border flex items-center justify-center text-muted-foreground hover:text-brand-coral hover:border-brand-coral/40 transition-all duration-200"
            >
              <Instagram className="w-4 h-4" />
            </a>
            <a
              href="https://tiktok.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="TikTok"
              className="w-10 h-10 rounded-full bg-background border border-border flex items-center justify-center text-muted-foreground hover:text-brand-coral hover:border-brand-coral/40 transition-all duration-200"
            >
              <SiTiktok className="w-4 h-4" />
            </a>
            <a
              href="https://youtube.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="YouTube"
              className="w-10 h-10 rounded-full bg-background border border-border flex items-center justify-center text-muted-foreground hover:text-brand-coral hover:border-brand-coral/40 transition-all duration-200"
            >
              <Youtube className="w-4 h-4" />
            </a>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-8 border-t border-border">
          <p className="font-body text-xs text-muted-foreground">
            © {year} Shortiva Studio. All rights reserved.
          </p>
          <p className="font-body text-xs text-muted-foreground">
            Built with ♥ using{" "}
            <a
              href={`https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(hostname)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-brand-coral hover:underline"
            >
              caffeine.ai
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}

// ── App ───────────────────────────────────────────────────────────────────────
export default function App() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Toaster position="top-center" richColors />
      <Navbar />
      <main>
        <Hero />
        <Services />
        <Portfolio />
        <Pricing />
        <Testimonials />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}
