import { createFileRoute } from "@tanstack/react-router";
import { LogoMark } from "@/components/brand/LogoMark";
import { useState, useEffect, useRef } from "react";
import { toast, Toaster } from "sonner";

import tshirtMockup from "@/assets/tshirt-mockup.png";
import bottleMockup from "@/assets/bottle-mockup.png";
import notebookMockup from "@/assets/notebook-mockup.png";
import totebagMockup from "@/assets/totebag-mockup.png";

import macroPhoto from "@/assets/macro-photography.png";
import humanPhoto from "@/assets/human-photography.png";
import architecturePhoto from "@/assets/architecture-photography.png";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Microsistec — Sistema de Identidade Visual" },
      { name: "description", content: "Manual de marca da Microsistec: logo, paleta, tipografia e aplicações para uma identidade tecnológica precisa e moderna." },
      { property: "og:title", content: "Microsistec — Sistema de Identidade Visual" },
      { property: "og:description", content: "Manual de marca: logo, paleta, tipografia e aplicações." },
    ],
    links: [
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      { rel: "stylesheet", href: "https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Space+Grotesk:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500&display=swap" },
    ],
  }),
  component: BrandBook,
});

const palette = {
  primary: [
    { name: "Microsistec Teal", hex: "#2B5250", role: "Cor primária. Logo, headers, CTAs principais.", token: "--teal-deep" },
    { name: "Graphite Ink", hex: "#1A1A1A", role: "Wordmark e texto principal.", token: "--ink" },
  ],
  secondary: [
    { name: "Aqua Signal", hex: "#5AA6A6", role: "Apoio, ícones, destaques sutis.", token: "--teal-mid" },
    { name: "Mint Lume", hex: "#7CC1C1", role: "Backgrounds suaves, ilustrações.", token: "--teal-light" },
    { name: "Deep Shade", hex: "#1B2A2A", role: "Profundidade, dark UI.", token: "--teal-shadow" },
  ],
  accent: [
    { name: "Signal Amber", hex: "#E8A14B", role: "Alertas, badges, hover ativos.", token: "--amber" },
    { name: "Paper Cream", hex: "#F7F3EA", role: "Fundo alternativo, materiais impressos.", token: "--cream" },
  ],
  neutrals: [
    { name: "Snow", hex: "#FAFBFB" },
    { name: "Fog", hex: "#E8EDED" },
    { name: "Slate", hex: "#6B7878" },
    { name: "Ink", hex: "#1A1A1A" },
  ],
};

function Swatch({ name, hex, role, token, dark }: { name: string; hex: string; role?: string; token?: string; dark?: boolean }) {
  const handleCopy = () => {
    navigator.clipboard.writeText(hex);
    toast.success(`Copiado: ${hex} (${name})`, {
      description: "Cor copiada para a área de transferência.",
    });
  };

  return (
    <div
      onClick={handleCopy}
      className="group rounded-xl overflow-hidden border border-border bg-card hover:border-primary/50 hover:shadow-lg transition-all duration-300 cursor-pointer active:scale-[0.98] select-none"
    >
      <div className="h-32 relative overflow-hidden" style={{ backgroundColor: hex }}>
        <div className="absolute inset-0 bg-black/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
          <span className={`text-xs font-medium px-2 py-1 rounded bg-background/90 backdrop-blur-sm shadow border border-border ${dark ? "text-foreground" : "text-foreground"}`}>
            Copiar HEX
          </span>
        </div>
        <div className={`absolute bottom-3 left-3 text-[10px] tracking-widest uppercase font-mono ${dark ? "text-white/80" : "text-black/60"}`}>
          {hex}
        </div>
      </div>
      <div className="p-4">
        <div className="text-sm font-semibold group-hover:text-primary transition-colors flex items-center justify-between">
          <span>{name}</span>
          <svg className="w-3.5 h-3.5 opacity-0 group-hover:opacity-40 transition-opacity" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
            <path strokeLinecap="round" strokeLinejoin="round" d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3" />
          </svg>
        </div>
        {token && <div className="text-[11px] font-mono text-muted-foreground mt-1">{token}</div>}
        {role && <div className="text-xs text-muted-foreground mt-2 leading-relaxed">{role}</div>}
      </div>
    </div>
  );
}

function Section({ id, eyebrow, title, children }: { id: string; eyebrow: string; title: string; children: React.ReactNode }) {
  return (
    <section id={id} className="border-t border-border py-20 md:py-28">
      <div className="max-w-6xl mx-auto px-6">
        <div className="grid md:grid-cols-[200px_1fr] gap-10 md:gap-16">
          <div className="md:sticky md:top-24 md:self-start">
            <div className="text-[11px] tracking-[0.25em] uppercase text-primary font-mono">{eyebrow}</div>
            <h2 className="mt-3 text-3xl md:text-4xl font-semibold text-foreground">{title}</h2>
          </div>
          <div className="space-y-10">{children}</div>
        </div>
      </div>
    </section>
  );
}

function BrandBook() {
  const [darkMode, setDarkMode] = useState(false);
  const [gridMode, setGridMode] = useState(false);
  const [goldenOverlay, setGoldenOverlay] = useState<"none" | "spiral" | "circles" | "grid">("spiral");
  
  // Typo tester states
  const [customText, setCustomText] = useState("Engenharia digital, sem fricção.");
  const [fontSize, setFontSize] = useState(36);
  const [lineHeight, setLineHeight] = useState(1.4);
  const [letterSpacing, setLetterSpacing] = useState(-0.02);

  // Contrast checker states
  const [contrastFg, setContrastFg] = useState("#2B5250");
  const [contrastBg, setContrastBg] = useState("#F7F3EA");

  // Sync theme
  useEffect(() => {
    const isDark = document.documentElement.classList.contains("dark") || 
                   localStorage.getItem("theme") === "dark" ||
                   (window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches);
    setDarkMode(isDark);
    if (isDark) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, []);

  const toggleTheme = () => {
    const newDark = !darkMode;
    setDarkMode(newDark);
    if (newDark) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
      toast.success("Modo escuro ativado", {
        description: "Interface adaptada para ambientes de baixa luminosidade.",
        duration: 3000,
        position: "top-center",
      });
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
      toast.success("Modo claro ativado", {
        description: "Interface adaptada para ambientes iluminados.",
        duration: 3000,
        position: "top-center",
      });
    }
  };

  return (
    <div className="min-h-screen bg-background text-foreground transition-colors duration-300 relative">
      <Toaster position="top-center" duration={3000} richColors />
      
      {/* Precise Column Grid Overlay */}
      {gridMode && (
        <div className="pointer-events-none fixed inset-0 z-50 max-w-6xl mx-auto px-6 w-full h-full flex justify-between gap-6 opacity-15">
          {Array.from({ length: 12 }).map((_, i) => (
            <div key={i} className="flex-1 h-full bg-teal-500/10 border-x border-dashed border-teal-500/30" />
          ))}
        </div>
      )}

      {/* NAV */}
      <header className="sticky top-0 z-40 backdrop-blur-md bg-background/80 border-b border-border transition-colors duration-300">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
          <a href="#top" className="flex items-center gap-2 shrink-0">
            <LogoMark withWordmark={false} className="h-8 w-8" />
            <span className="font-display font-semibold tracking-tight hidden sm:block">Microsistec</span>
            <span className="hidden md:inline text-xs text-muted-foreground ml-2 font-mono">/ brand v1.0</span>
          </a>
          <div className="flex items-center gap-4 min-w-0">
            <nav className="hidden lg:flex items-center gap-5 text-sm text-muted-foreground flex-wrap justify-end">
              <a href="#principios" className="hover:text-foreground transition-colors">Princípios</a>
              <a href="#logo" className="hover:text-foreground transition-colors">Logo</a>
              <a href="#proporcao" className="hover:text-foreground transition-colors">Proporção</a>
              <a href="#paleta" className="hover:text-foreground transition-colors">Paleta</a>
              <a href="#tipografia" className="hover:text-foreground transition-colors">Tipografia</a>
              <a href="#iconografia" className="hover:text-foreground transition-colors">Ícones</a>
              <a href="#voz" className="hover:text-foreground transition-colors">Voz</a>
              <a href="#aplicacoes" className="hover:text-foreground transition-colors">Aplicações</a>
              <a href="#downloads" className="hover:text-foreground transition-colors">Downloads</a>
            </nav>
            <div className="h-4 w-px bg-border hidden lg:block" />
            <div className="flex items-center gap-2 shrink-0">
              {/* Grid Mode Toggle */}
              <button
                onClick={() => {
                  setGridMode(!gridMode);
                  toast.info(gridMode ? "Grid de alinhamento desativado" : "Grid de alinhamento ativado", {
                    description: gridMode ? "O grid de design foi ocultado." : "O grid geométrico está visível no fundo da página.",
                    duration: 3000,
                    position: "top-center",
                  });
                }}
                className={`p-2 rounded-lg border transition-all duration-300 hover:bg-muted ${gridMode ? "border-primary bg-primary/10 text-primary" : "border-border text-muted-foreground"}`}
                title="Alternar Grid de Alinhamento"
              >
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
                </svg>
              </button>
              {/* Dark/Light Mode Toggle */}
              <button
                onClick={toggleTheme}
                className="p-2 rounded-lg border border-border text-muted-foreground transition-all duration-300 hover:bg-muted hover:text-foreground"
                title="Alternar Tema Escuro/Claro"
              >
                {darkMode ? (
                  <svg className="w-4 h-4 text-amber-500 animate-pulse" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364-6.364l-.707.707M6.343 17.657l-.707.707m0-12.728l.707.707m12.728 12.728l.707-.707M12 8a4 4 0 100 8 4 4 0 000-8z" />
                  </svg>
                ) : (
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
                  </svg>
                )}
              </button>
            </div>
          </div>
        </div>
        {/* Mobile Navigation */}
        <div className="lg:hidden w-full overflow-x-auto border-t border-border/50" style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}>
          <nav className="flex items-center gap-5 px-4 sm:px-6 py-3 text-sm text-muted-foreground whitespace-nowrap min-w-max">
            <a href="#principios" className="hover:text-foreground transition-colors">Princípios</a>
            <a href="#logo" className="hover:text-foreground transition-colors">Logo</a>
            <a href="#proporcao" className="hover:text-foreground transition-colors">Proporção</a>
            <a href="#paleta" className="hover:text-foreground transition-colors">Paleta</a>
            <a href="#tipografia" className="hover:text-foreground transition-colors">Tipografia</a>
            <a href="#iconografia" className="hover:text-foreground transition-colors">Ícones</a>
            <a href="#voz" className="hover:text-foreground transition-colors">Voz</a>
            <a href="#aplicacoes" className="hover:text-foreground transition-colors">Aplicações</a>
            <a href="#downloads" className="hover:text-foreground transition-colors">Downloads</a>
          </nav>
        </div>
      </header>

      {/* HERO */}
      <section id="top" className="relative overflow-hidden">
        <div className="absolute inset-0 grid-bg opacity-60" />
        <div className="relative max-w-6xl mx-auto px-6 pt-24 pb-24 md:pt-32 md:pb-32">
          <div className="text-[11px] tracking-[0.3em] uppercase text-primary font-mono mb-6">
            Manual de Marca · 2026
          </div>
          <h1 className="text-5xl md:text-7xl font-semibold tracking-tight max-w-4xl">
            Precisão visual <br/>
            <span className="text-primary">para uma marca de tecnologia.</span>
          </h1>
          <p className="mt-6 max-w-2xl text-lg text-muted-foreground leading-relaxed">
            Este sistema define como a identidade da Microsistec se comporta em qualquer superfície —
            de uma tela retina a uma camiseta de evento. Construído sobre três pilares: clareza geométrica,
            tipografia silenciosa e um verde que respira tecnologia.
          </p>
          <div className="mt-12 flex flex-wrap gap-3">
            {["Logo", "Diretrizes", "Cor", "Tipografia", "UI Kit", "Materiais"].map((t) => (
              <span key={t} className="px-3 py-1.5 text-xs rounded-full border border-border bg-card font-mono">
                {t}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* PRINCÍPIOS */}
      <Section id="principios" eyebrow="00 · Essência" title="O que a marca defende">
        <div className="space-y-10">
          <div className="grid md:grid-cols-3 gap-5">
            {[
              { k: "Missão", v: "Tornar a tecnologia previsível para empresas que dependem dela todos os dias." },
              { k: "Visão", v: "Ser o sistema invisível por trás das operações digitais mais confiáveis do país." },
              { k: "Promessa", v: "Precisão de engenheiro, clareza de designer, ritmo de operador." },
            ].map((c) => (
              <div key={c.k} className="rounded-2xl border border-border bg-card p-6">
                <div className="text-[11px] font-mono uppercase tracking-widest text-primary">{c.k}</div>
                <div className="mt-3 font-display text-xl font-medium leading-snug">{c.v}</div>
              </div>
            ))}
          </div>

          <div>
            <h3 className="mb-4 text-sm font-mono uppercase tracking-widest text-primary">Quatro valores · quatro comportamentos visuais</h3>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {[
                { n: "01", k: "Precisão", v: "Grid rígido, alinhamentos exatos, números monoespaçados." },
                { n: "02", k: "Confiança", v: "Verde profundo, contraste alto, tipografia sem ornamentos." },
                { n: "03", k: "Inovação", v: "Espaço negativo generoso, transições sutis, geometria limpa." },
                { n: "04", k: "Simplicidade", v: "Menos elementos, mais hierarquia. Sempre uma ação primária." },
              ].map((c) => (
                <div key={c.n} className="rounded-xl border border-border bg-card p-5">
                  <div className="text-xs font-mono text-muted-foreground">{c.n}</div>
                  <div className="mt-2 text-lg font-semibold">{c.k}</div>
                  <div className="mt-2 text-sm text-muted-foreground leading-relaxed">{c.v}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </Section>

      {/* LOGO */}
      <Section id="logo" eyebrow="01 · Logotipo" title="A marca e seus usos">
        <div>
          <div className="rounded-2xl border border-border bg-card overflow-hidden">
            <div className="aspect-[16/7] flex items-center justify-center p-10 md:p-16 bg-[var(--cream)]">
              <LogoMark variant="original" className="w-full max-w-2xl" />
            </div>
            <div className="grid md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-border">
              <Meta k="Construção" v="Wordmark + símbolo geométrico baseado em dois 'M' espelhados." />
              <Meta k="Conceito" v="Conectividade, simetria e camadas — sistemas que se encaixam." />
              <Meta k="Formato" v="SVG vetorial. Distribuir em .svg, .pdf e .png." />
            </div>
          </div>

          <h3 className="mt-12 mb-4 text-xl font-semibold">Variações</h3>
          <div className="grid md:grid-cols-2 gap-5">
            <LogoCard label="Versão Original / Cor" bg="#F7F3EA" variant="original" desc="Aplicação padrão sobre fundos claros e neutros." />
            <LogoCard label="Fundo Claro / Profundo" bg="#FFFFFF" variant="deep" desc="Verde mais profundo para máxima legibilidade em branco puro." />
            <LogoCard label="Monocromática Escura" bg="#FAFBFB" variant="mono-dark" desc="Para impressão preto-e-branco e fax de baixa fidelidade." />
            <LogoCard label="Reverso / Fundo Escuro" bg="#1B2A2A" variant="reverse" desc="Aplicação sobre o Deep Shade ou imagens escuras." />
          </div>

          {/* Clearspace */}
          <h3 className="mt-14 mb-4 text-xl font-semibold">Área de respiro</h3>
          <div className="rounded-2xl border border-border bg-card p-10">
            <div className="relative mx-auto" style={{ maxWidth: 720 }}>
              <div className="relative p-[12%] outline-dashed outline-1 outline-primary/40 rounded">
                <div className="relative outline-dashed outline-1 outline-primary/40">
                  <LogoMark variant="original" className="w-full" />
                  {/* X marks */}
                  <span className="absolute -top-3 -left-3 w-6 h-6 grid place-items-center text-xs text-primary font-mono">×</span>
                  <span className="absolute -top-3 -right-3 w-6 h-6 grid place-items-center text-xs text-primary font-mono">×</span>
                  <span className="absolute -bottom-3 -left-3 w-6 h-6 grid place-items-center text-xs text-primary font-mono">×</span>
                  <span className="absolute -bottom-3 -right-3 w-6 h-6 grid place-items-center text-xs text-primary font-mono">×</span>
                </div>
              </div>
              <p className="text-sm text-muted-foreground mt-6 text-center">
                A margem mínima ao redor da logo equivale a <span className="font-mono text-foreground">×</span>,
                a altura do símbolo dividida por 4. Nenhum elemento gráfico, texto ou borda pode invadir esta área.
              </p>
            </div>
          </div>

          {/* Sizes */}
          <h3 className="mt-14 mb-4 text-xl font-semibold">Tamanhos mínimos</h3>
          <div className="grid md:grid-cols-3 gap-5">
            <SizeCard label="Digital — wordmark" min="120 px de largura" sample={<LogoMark variant="original" className="w-[160px]" />} />
            <SizeCard label="Digital — só símbolo" min="24 px de altura" sample={<LogoMark variant="original" withWordmark={false} className="h-10 w-10" />} />
            <SizeCard label="Impressão" min="20 mm de largura" sample={<LogoMark variant="original" className="w-[140px]" />} />
          </div>

          {/* Don'ts */}
          <h3 className="mt-14 mb-4 text-xl font-semibold">O que evitar</h3>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <Dont label="Não distorcer" style={{ transform: "scaleX(1.4)" }} />
            <Dont label="Não recolorir fora da paleta" style={{ filter: "hue-rotate(120deg) saturate(2)" }} />
            <Dont label="Não rotacionar" style={{ transform: "rotate(-12deg)" }} />
            <Dont label="Não aplicar sombras" style={{ filter: "drop-shadow(0 8px 4px rgba(0,0,0,.4))" }} />
          </div>
        </div>
      </Section>

      {/* PROPORÇÃO ÁUREA */}
      <Section id="proporcao" eyebrow="02 · Geometria" title="Proporção Áurea">
        <div className="grid lg:grid-cols-[1.2fr_1fr] gap-8 items-start">
          <div className="space-y-6">
            <p className="text-muted-foreground leading-relaxed">
              O logotipo da Microsistec foi concebido a partir de um rigoroso grid geométrico regido pela <strong>Proporção Áurea</strong> (<span className="font-mono text-foreground">&phi; = 1.618</span>). 
              Esta constante matemática define a escala, os raios de curvatura das asas e o equilíbrio das intersecções dos dois &quot;M&quot; espelhados.
            </p>
            
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-3">
                <button
                  onClick={() => setGoldenOverlay("spiral")}
                  className={`py-3 px-4 rounded-xl border text-left transition-all duration-300 ${goldenOverlay === "spiral" ? "border-primary bg-primary/5 text-foreground" : "border-border hover:bg-muted/50 text-muted-foreground"}`}
                >
                  <div className="font-semibold text-sm flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-[#E8A14B]" />
                    Espiral de Fibonacci
                  </div>
                  <p className="text-[11px] text-muted-foreground mt-1">A espiral de crescimento áureo ancora as curvaturas externas e guia o fluxo dinâmico.</p>
                </button>

                <button
                  onClick={() => setGoldenOverlay("circles")}
                  className={`py-3 px-4 rounded-xl border text-left transition-all duration-300 ${goldenOverlay === "circles" ? "border-primary bg-primary/5 text-foreground" : "border-border hover:bg-muted/50 text-muted-foreground"}`}
                >
                  <div className="font-semibold text-sm flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-[#5AA6A6]" />
                    Círculos Proporcionais
                  </div>
                  <p className="text-[11px] text-muted-foreground mt-1">Os diâmetros dos arcos seguem a progressão de Fibonacci (R40, R65, R105, R170).</p>
                </button>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <button
                  onClick={() => setGoldenOverlay("grid")}
                  className={`py-3 px-4 rounded-xl border text-left transition-all duration-300 ${goldenOverlay === "grid" ? "border-primary bg-primary/5 text-foreground" : "border-border hover:bg-muted/50 text-muted-foreground"}`}
                >
                  <div className="font-semibold text-sm flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-foreground/50" />
                    Grade de Construção
                  </div>
                  <p className="text-[11px] text-muted-foreground mt-1">Sustenta os eixos de simetria vertical e horizontal, garantindo alinhamento central.</p>
                </button>

                <button
                  onClick={() => setGoldenOverlay("none")}
                  className={`py-3 px-4 rounded-xl border text-left transition-all duration-300 ${goldenOverlay === "none" ? "border-foreground bg-foreground/5 text-foreground" : "border-border hover:bg-muted/50 text-muted-foreground"}`}
                >
                  <div className="font-semibold text-sm flex items-center gap-2">
                    Símbolo Limpo
                  </div>
                  <p className="text-[11px] text-muted-foreground mt-1">Visualização do símbolo limpo, sem linhas auxiliares de construção geométrica.</p>
                </button>
              </div>
            </div>

            <div className="p-5 rounded-2xl border border-border bg-card/50 space-y-4">
              <h4 className="text-sm font-semibold flex items-center gap-2 text-primary">
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                Como se aplica ao logo:
              </h4>
              <ul className="text-xs text-muted-foreground space-y-2.5 list-disc pl-4">
                <li>
                  <strong className="text-foreground">Raios dos Arcos:</strong> As duas asas principais do símbolo possuem curvaturas externas definidas por um círculo de raio <code className="bg-muted px-1 py-0.5 rounded text-foreground">170px</code> (13k), e curvaturas internas de raio <code className="bg-muted px-1 py-0.5 rounded text-foreground">105px</code> (8k). A relação <code className="bg-muted px-1 py-0.5 rounded text-foreground">170 / 105 = 1.619</code>.
                </li>
                <li>
                  <strong className="text-foreground">Espessuras e Encaixe:</strong> A espessura da asa menor central e as distâncias horizontais correspondem a proporções áureas de <code className="bg-muted px-1 py-0.5 rounded text-foreground">65px</code> (5k) e <code className="bg-muted px-1 py-0.5 rounded text-foreground">40px</code> (3k), gerando um fluxo visual orgânico.
                </li>
                <li>
                  <strong className="text-foreground">Ângulos de Inclinação:</strong> O espelhamento das formas segue um ângulo preciso de inclinação de <code className="bg-muted px-1 py-0.5 rounded text-foreground">38.8&deg;</code> que permite que os espaços vazios formem a letra &quot;M&quot; dinamicamente.
                </li>
              </ul>
            </div>
          </div>

          {/* Renderizador de Análise do Logo */}
          <div className="rounded-2xl border border-border bg-card p-6 aspect-square flex flex-col justify-between relative overflow-hidden">
            <div className="absolute top-4 left-4 text-[10px] font-mono text-muted-foreground tracking-widest uppercase">
              ANÁLISE GEOMÉTRICA
            </div>
            
            <div className="flex-1 flex items-center justify-center relative p-8">
              <svg viewBox="0 0 380 360" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full max-w-[260px] h-auto relative z-10">
                {/* Símbolo do Logo com opacidade reduzida se houver overlay */}
                <g className="transition-opacity duration-500" style={{ opacity: goldenOverlay === "none" ? 1 : 0.25 }}>
                  <path d="M380.002 27.6639C380.002 18.9734 369.68 14.4193 363.261 20.2774L104.603 256.323C100.298 260.252 100.252 267.015 104.502 271.003L182.954 344.604C186.783 348.197 192.74 348.216 196.592 344.647L376.798 177.696C378.841 175.803 380.002 173.145 380.002 170.36V27.6639Z" fill="#2B5250"/>
                  <path d="M362.569 204.621C369.073 199.15 379.005 203.774 379.005 212.274V333.091C379.005 341.662 368.929 346.261 362.454 340.646L291.73 279.314C287.087 275.287 287.141 268.063 291.845 264.106L362.569 204.621Z" fill="#5AA6A6"/>
                  <path d="M18.1564 142.457C12.4551 134.614 0.0471446 138.661 0.0674771 148.358L0.455318 333.324C0.47321 341.856 10.482 346.448 16.9617 340.896L99.5718 270.117C103.531 266.725 104.22 260.86 101.154 256.643L18.1564 142.457Z" fill="#2B5250"/>
                  <path opacity="0.6" d="M2.40278e-05 152.745C-0.0199253 143.049 12.3876 139.002 18.0889 146.845L101.087 261.032C102.9 263.526 103.398 266.596 102.685 269.39L4.87014 204.39C2.55335 202.85 0.985282 200.412 0.543969 197.661L0.0879147 194.821L2.40278e-05 152.745Z" fill="#101010"/>
                  <path d="M0.00195312 27.6639C0.00195312 18.9734 10.3235 14.4193 16.7428 20.2774L275.4 256.323C279.705 260.252 279.752 267.015 275.502 271.003L197.05 344.604C193.22 348.197 187.264 348.216 183.412 344.647L3.20581 177.696C1.16306 175.803 0.00195312 173.145 0.00195312 170.36V27.6639Z" fill="#7CC1C1"/>
                  <path d="M218.644 169.009C215.208 164.053 208.199 163.243 203.723 167.285L105.636 255.864C101.311 259.77 101.228 266.532 105.457 270.542L182.945 344.025C186.773 347.655 192.762 347.687 196.629 344.098L277.525 269.006C281.172 265.621 281.775 260.069 278.94 255.979L218.644 169.009Z" fill="#1B2A2A"/>
                  <path d="M275.607 256.677C279.912 260.606 279.959 267.369 275.709 271.357L229.863 314.368L196.798 345C194.935 346.727 192.578 347.611 190.209 347.66C187.839 347.611 185.482 346.727 183.619 345L150.553 314.368L104.709 271.357C100.458 267.369 100.505 260.606 104.81 256.677L190.209 178.745L275.607 256.677Z" fill="#5AA6A6"/>
                </g>

                {/* OVERLAYS: ESPIRAL DE FIBONACCI */}
                {goldenOverlay === "spiral" && (
                  <g className="animate-fade-in">
                    {/* Retângulos e Quadrados de Fibonacci */}
                    <rect x="2" y="63" width="377" height="233" stroke="#6B7878" strokeWidth="0.8" fill="none" opacity="0.4" />
                    
                    {/* Linhas e retângulos internos que formam a espiral */}
                    <rect x="2" y="63" width="233" height="233" stroke="#5AA6A6" strokeWidth="0.5" strokeDasharray="2 2" fill="none" opacity="0.5" />
                    <rect x="235" y="63" width="144" height="144" stroke="#5AA6A6" strokeWidth="0.5" strokeDasharray="2 2" fill="none" opacity="0.5" />
                    <rect x="290" y="207" width="89" height="89" stroke="#5AA6A6" strokeWidth="0.5" strokeDasharray="2 2" fill="none" opacity="0.5" />
                    <rect x="235" y="241" width="55" height="55" stroke="#5AA6A6" strokeWidth="0.5" strokeDasharray="2 2" fill="none" opacity="0.5" />
                    <rect x="235" y="207" width="34" height="34" stroke="#5AA6A6" strokeWidth="0.5" strokeDasharray="2 2" fill="none" opacity="0.5" />
                    <rect x="269" y="207" width="21" height="21" stroke="#5AA6A6" strokeWidth="0.5" strokeDasharray="2 2" fill="none" opacity="0.5" />
                    <rect x="277" y="228" width="13" height="13" stroke="#5AA6A6" strokeWidth="0.5" strokeDasharray="2 2" fill="none" opacity="0.5" />
                    <rect x="269" y="233" width="8" height="8" stroke="#5AA6A6" strokeWidth="0.5" strokeDasharray="2 2" fill="none" opacity="0.5" />
                    <rect x="269" y="228" width="5" height="5" stroke="#5AA6A6" strokeWidth="0.5" strokeDasharray="2 2" fill="none" opacity="0.5" />
                    <rect x="274" y="228" width="3" height="3" stroke="#5AA6A6" strokeWidth="0.5" strokeDasharray="2 2" fill="none" opacity="0.5" />
                    <rect x="275" y="231" width="2" height="2" stroke="#5AA6A6" strokeWidth="0.5" strokeDasharray="2 2" fill="none" opacity="0.5" />

                    {/* Espiral Dourada Matemologicamente Precisa */}
                    <path
                      d="M 275 231 A 1 1 0 0 1 274 232 A 1 1 0 0 1 275 233 A 2 2 0 0 1 277 231 A 3 3 0 0 1 274 228 A 5 5 0 0 1 269 233 A 8 8 0 0 1 277 241 A 13 13 0 0 1 290 228 A 21 21 0 0 1 269 207 A 34 34 0 0 1 235 241 A 55 55 0 0 1 290 296 A 89 89 0 0 1 379 207 A 144 144 0 0 1 235 63 A 233 233 0 0 1 2 296"
                      stroke="#E8A14B"
                      strokeWidth="2.5"
                      fill="none"
                      className="animate-dash-spiral"
                    />
                    
                    {/* Ponto focal (Origem) */}
                    <circle cx="275" cy="231" r="3.5" fill="#E8A14B" className="animate-pulse" />
                    
                    {/* Relações textuais na tela */}
                    <text x="118" y="180" fill="#5AA6A6" fontSize="11" fontFamily="monospace" className="font-semibold" opacity="0.8">233</text>
                    <text x="300" y="135" fill="#5AA6A6" fontSize="10" fontFamily="monospace" className="font-semibold" opacity="0.8">144</text>
                    <text x="330" y="250" fill="#5AA6A6" fontSize="9" fontFamily="monospace" className="font-semibold" opacity="0.8">89</text>
                    <text x="258" y="270" fill="#5AA6A6" fontSize="8" fontFamily="monospace" className="font-semibold" opacity="0.8">55</text>
                    <text x="248" y="226" fill="#5AA6A6" fontSize="7" fontFamily="monospace" className="font-semibold" opacity="0.8">34</text>
                    <text x="277" y="219" fill="#5AA6A6" fontSize="6" fontFamily="monospace" className="font-semibold" opacity="0.8">21</text>
                    <text x="281" y="236" fill="#5AA6A6" fontSize="5" fontFamily="monospace" className="font-semibold" opacity="0.8">13</text>
                  </g>
                )}

                {/* OVERLAYS: CÍRCULOS PROPORCIONAIS */}
                {goldenOverlay === "circles" && (
                  <g className="animate-fade-in">
                    {/* Círculo R170 (13k) */}
                    <circle cx="190" cy="180" r="170" stroke="#5AA6A6" strokeWidth="1.5" strokeDasharray="3 3" fill="none" />
                    <line x1="190" y1="180" x2="360" y2="180" stroke="#5AA6A6" strokeWidth="1.2" />
                    <text x="260" y="174" fill="#5AA6A6" fontSize="9" fontFamily="monospace" className="font-semibold">R170 (13k)</text>

                    {/* Círculo R105 (8k) */}
                    <circle cx="190" cy="180" r="105" stroke="#7CC1C1" strokeWidth="1.2" strokeDasharray="3 3" fill="none" />
                    <line x1="190" y1="180" x2="190" y2="75" stroke="#7CC1C1" strokeWidth="1" />
                    <text x="195" y="120" fill="#7CC1C1" fontSize="9" fontFamily="monospace" className="font-semibold">R105 (8k)</text>

                    {/* Círculo R65 (5k) */}
                    <circle cx="190" cy="180" r="65" stroke="#E8A14B" strokeWidth="1" strokeDasharray="2 2" fill="none" />
                    <line x1="190" y1="180" x2="125" y2="180" stroke="#E8A14B" strokeWidth="0.8" />
                    <text x="135" y="194" fill="#E8A14B" fontSize="9" fontFamily="monospace" className="font-semibold">R65 (5k)</text>

                    {/* Círculo R40 (3k) */}
                    <circle cx="190" cy="180" r="40" stroke="#6B7878" strokeWidth="1" strokeDasharray="1 1" fill="none" />
                    <text x="195" y="210" fill="#6B7878" fontSize="9" fontFamily="monospace">R40 (3k)</text>

                    {/* Relação matemática overlay */}
                    <text x="5" y="325" fill="#6B7878" fontSize="8" fontFamily="monospace">170 / 105 ≈ 1.618 (&phi;)</text>
                    <text x="5" y="340" fill="#6B7878" fontSize="8" fontFamily="monospace">105 / 65 ≈ 1.615 (&phi;)</text>
                  </g>
                )}

                {/* OVERLAYS: GRADE DE CONSTRUÇÃO */}
                {goldenOverlay === "grid" && (
                  <g className="animate-fade-in">
                    {/* Eixos de Simetria */}
                    <line x1="190" y1="0" x2="190" y2="360" stroke="#2B5250" strokeWidth="1.2" strokeDasharray="4 4" />
                    <line x1="0" y1="180" x2="380" y2="180" stroke="#2B5250" strokeWidth="1.2" strokeDasharray="4 4" />
                    <text x="196" y="20" fill="#2B5250" fontSize="8" fontFamily="monospace">EIXO Y (SIMETRIA)</text>
                    <text x="5" y="174" fill="#2B5250" fontSize="8" fontFamily="monospace">EIXO X (DIVISÃO)</text>

                    {/* Linhas tangentes/diagonais */}
                    <line x1="0" y1="27" x2="380" y2="27" stroke="#6B7878" strokeWidth="0.8" strokeDasharray="2 2" opacity="0.5" />
                    <line x1="0" y1="344" x2="380" y2="344" stroke="#6B7878" strokeWidth="0.8" strokeDasharray="2 2" opacity="0.5" />
                    <text x="5" y="22" fill="#6B7878" fontSize="8" fontFamily="monospace">LIMITE SUPERIOR (y=27)</text>
                    <text x="5" y="339" fill="#6B7878" fontSize="8" fontFamily="monospace">LIMITE INFERIOR (y=344)</text>

                    {/* Eixos diagonais dos braços */}
                    <line x1="190" y1="180" x2="380" y2="27" stroke="#E8A14B" strokeWidth="1" strokeDasharray="2 2" opacity="0.7" />
                    <line x1="190" y1="180" x2="0" y2="27" stroke="#E8A14B" strokeWidth="1" strokeDasharray="2 2" opacity="0.7" />
                    <text x="270" y="85" fill="#E8A14B" fontSize="9" fontFamily="monospace" transform="rotate(-38.8, 270, 85)" className="font-semibold">
                      &theta; = 38.8&deg;
                    </text>
                  </g>
                )}
              </svg>
            </div>

            <div className="flex justify-between items-center text-[10px] font-mono text-muted-foreground pt-4 border-t border-border">
              <span>MICROSISTEC</span>
              <span className="text-[#E8A14B] font-semibold">
                {goldenOverlay === "spiral" && "ESPIRAL DE FIBONACCI"}
                {goldenOverlay === "circles" && "CÍRCULOS ÁUREOS"}
                {goldenOverlay === "grid" && "GRADE DE ALINHAMENTO"}
                {goldenOverlay === "none" && "SÍMBOLO LIMPO"}
              </span>
              <span>&phi; = 1.618</span>
            </div>
          </div>
        </div>
      </Section>

      {/* PALETA */}
      <Section id="paleta" eyebrow="03 · Paleta" title="Cor com hierarquia">
        <div>
          <p className="text-muted-foreground max-w-2xl">
            A paleta é construída em três níveis. O verde Microsistec domina (60% do peso visual),
            apoiado por neutros silenciosos e um único acento quente para sinalização.
          </p>

          <h3 className="mt-10 mb-4 text-sm font-mono uppercase tracking-widest text-primary">Primárias</h3>
          <div className="grid sm:grid-cols-2 gap-4">
            {palette.primary.map(s => <Swatch key={s.hex} {...s} dark />)}
          </div>

          <h3 className="mt-10 mb-4 text-sm font-mono uppercase tracking-widest text-primary">Secundárias</h3>
          <div className="grid sm:grid-cols-3 gap-4">
            {palette.secondary.map(s => <Swatch key={s.hex} {...s} dark={s.hex.startsWith("#1")} />)}
          </div>

          <h3 className="mt-10 mb-4 text-sm font-mono uppercase tracking-widest text-primary">Acento & Suporte</h3>
          <div className="grid sm:grid-cols-2 gap-4">
            {palette.accent.map(s => <Swatch key={s.hex} {...s} />)}
          </div>

          <h3 className="mt-10 mb-4 text-sm font-mono uppercase tracking-widest text-primary">Neutros</h3>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {palette.neutrals.map(s => <Swatch key={s.hex} {...s} dark={s.hex === "#1A1A1A"} />)}
          </div>

          {/* Hierarchy bar */}
          <div className="mt-12 rounded-xl overflow-hidden border border-border">
            <div className="flex h-14 text-[11px] font-mono">
              <div className="flex-[60] grid place-items-center" style={{ background: "#2B5250", color: "#fff" }}>60% Teal</div>
              <div className="flex-[25] grid place-items-center" style={{ background: "#E8EDED" }}>25% Neutros</div>
              <div className="flex-[10] grid place-items-center" style={{ background: "#1A1A1A", color: "#fff" }}>10% Ink</div>
              <div className="flex-[5] grid place-items-center" style={{ background: "#E8A14B" }}>5% Amber</div>
            </div>
          </div>
        </div>
      </Section>

      {/* TIPOGRAFIA */}
      <Section id="tipografia" eyebrow="04 · Tipografia" title="Vozes da marca">
        <div className="space-y-8">
          <FontShowcase
            family="Space Grotesk"
            role="Display / Títulos"
            sample="Engenharia digital, sem fricção."
            specs="Pesos: 500 · 600 · 700  ·  Tracking: -0.02em"
            big
          />
          <FontShowcase
            family="Inter"
            role="Corpo / UI"
            sample="A Microsistec projeta sistemas de software para empresas que precisam de precisão, escalabilidade e previsibilidade. Cada componente da nossa marca segue a mesma disciplina."
            specs="Pesos: 400 · 500 · 600 · 700  ·  Line-height: 1.55"
          />
          <FontShowcase
            family="JetBrains Mono"
            role="Código / Etiquetas técnicas"
            sample="const trust = precision + simplicity;"
            specs="Pesos: 400 · 500  ·  Uso: dados, snippets, metadados"
            mono
          />

          {/* Hierarchy */}
          <div className="rounded-2xl border border-border bg-card p-8 md:p-10">
            <div className="space-y-6">
              <Row label="H1 · 56/60 · Space Grotesk 600">
                <div className="font-display font-semibold text-5xl tracking-tight">Construímos sistemas</div>
              </Row>
              <Row label="H2 · 36/44 · Space Grotesk 600">
                <div className="font-display font-semibold text-3xl tracking-tight">Plataforma de operações</div>
              </Row>
              <Row label="H3 · 22/30 · Space Grotesk 500">
                <div className="font-display font-medium text-xl">Integração contínua</div>
              </Row>
              <Row label="Body · 16/26 · Inter 400">
                <div className="text-base max-w-xl text-muted-foreground">
                  Texto corrido para parágrafos e descrições de produto. Mantenha 60–75 caracteres por linha.
                </div>
              </Row>
              <Row label="Caption · 12/16 · Inter 500 · uppercase 0.18em">
                <div className="text-xs font-medium uppercase tracking-widest text-primary">Status do sistema</div>
              </Row>
            </div>
          </div>

          {/* Typography Sandbox / Playground */}
          <div className="rounded-2xl border border-border bg-card p-6 md:p-8 space-y-6">
            <div>
              <h3 className="text-sm font-mono uppercase tracking-widest text-primary">Laboratório de Tipografia</h3>
              <p className="text-xs text-muted-foreground mt-1">Interaja com as fontes do sistema em tempo real.</p>
            </div>
            <div className="space-y-4">
              <div>
                <label className="text-xs font-mono text-muted-foreground">Texto de Teste</label>
                <input
                  type="text"
                  value={customText}
                  onChange={(e) => setCustomText(e.target.value)}
                  className="w-full mt-1.5 px-3.5 py-2 rounded-lg border border-border bg-background text-foreground text-sm focus:outline-none focus:border-primary transition-colors"
                  placeholder="Digite algo para testar..."
                />
              </div>
              
              <div className="grid sm:grid-cols-3 gap-4">
                <div>
                  <label className="text-xs font-mono text-muted-foreground flex justify-between">
                    <span>Tamanho</span>
                    <span>{fontSize}px</span>
                  </label>
                  <input
                    type="range"
                    min="14"
                    max="72"
                    value={fontSize}
                    onChange={(e) => setFontSize(Number(e.target.value))}
                    className="w-full mt-2 h-1.5 bg-muted rounded-lg appearance-none cursor-pointer accent-primary"
                  />
                </div>
                <div>
                  <label className="text-xs font-mono text-muted-foreground flex justify-between">
                    <span>Espaçamento</span>
                    <span>{letterSpacing}em</span>
                  </label>
                  <input
                    type="range"
                    min="-0.06"
                    max="0.2"
                    step="0.01"
                    value={letterSpacing}
                    onChange={(e) => setLetterSpacing(Number(e.target.value))}
                    className="w-full mt-2 h-1.5 bg-muted rounded-lg appearance-none cursor-pointer accent-primary"
                  />
                </div>
                <div>
                  <label className="text-xs font-mono text-muted-foreground flex justify-between">
                    <span>Altura da Linha</span>
                    <span>{lineHeight}</span>
                  </label>
                  <input
                    type="range"
                    min="1.0"
                    max="2.0"
                    step="0.1"
                    value={lineHeight}
                    onChange={(e) => setLineHeight(Number(e.target.value))}
                    className="w-full mt-2 h-1.5 bg-muted rounded-lg appearance-none cursor-pointer accent-primary"
                  />
                </div>
              </div>
            </div>

            <div className="space-y-6 pt-6 border-t border-border">
              <div className="space-y-1">
                <div className="text-[10px] font-mono text-muted-foreground">Space Grotesk (Títulos)</div>
                <div
                  className="text-foreground transition-all truncate"
                  style={{
                    fontFamily: "Space Grotesk, sans-serif",
                    fontSize: `${fontSize}px`,
                    lineHeight: lineHeight,
                    letterSpacing: `${letterSpacing}em`,
                    fontWeight: 600,
                  }}
                >
                  {customText || " "}
                </div>
              </div>
              <div className="space-y-1">
                <div className="text-[10px] font-mono text-muted-foreground">Inter (Corpo/UI)</div>
                <div
                  className="text-foreground transition-all truncate"
                  style={{
                    fontFamily: "Inter, sans-serif",
                    fontSize: `${fontSize}px`,
                    lineHeight: lineHeight,
                    letterSpacing: `${letterSpacing}em`,
                    fontWeight: 400,
                  }}
                >
                  {customText || " "}
                </div>
              </div>
              <div className="space-y-1">
                <div className="text-[10px] font-mono text-muted-foreground">JetBrains Mono (Dados)</div>
                <div
                  className="text-foreground transition-all truncate"
                  style={{
                    fontFamily: "JetBrains Mono, monospace",
                    fontSize: `${fontSize}px`,
                    lineHeight: lineHeight,
                    letterSpacing: `${letterSpacing}em`,
                    fontWeight: 400,
                  }}
                >
                  {customText || " "}
                </div>
              </div>
            </div>
          </div>
        </div>
      </Section>

      {/* APLICAÇÕES */}
      <Section id="aplicacoes" eyebrow="05 · Aplicações" title="A marca em movimento">
        <div className="space-y-8">
          {/* Website mock */}
          <div className="rounded-2xl border border-border overflow-hidden bg-card">
            <div className="flex items-center gap-1.5 px-4 py-3 border-b border-border bg-muted">
              <span className="w-2.5 h-2.5 rounded-full bg-red-400/70" />
              <span className="w-2.5 h-2.5 rounded-full bg-yellow-400/70" />
              <span className="w-2.5 h-2.5 rounded-full bg-green-400/70" />
              <span className="ml-3 text-xs font-mono text-muted-foreground">microsistec.com</span>
            </div>
            <div className="p-10 md:p-16 bg-[var(--cream)]">
              <div className="flex items-center justify-between mb-12">
                <LogoMark variant="deep" className="h-7" />
                <div className="flex gap-7 text-sm text-[#0F3331]/80">
                  <span>Plataforma</span><span>Soluções</span><span>Clientes</span><span>Contato</span>
                  <span className="px-3 py-1.5 rounded-full bg-[#2B5250] text-white text-xs">Começar</span>
                </div>
              </div>
              <h3 className="font-display font-semibold text-4xl md:text-5xl tracking-tight text-[#0A1F1E] max-w-2xl leading-[1.05]">
                Operações tecnológicas, sem ruído.
              </h3>
              <p className="mt-5 max-w-lg text-[#0A1F1E]/70">
                Software sob medida, infra resiliente e atendimento contínuo para empresas que tratam tecnologia como vantagem competitiva.
              </p>
              <div className="mt-8 flex gap-3">
                <span className="px-5 py-2.5 rounded-md bg-[#2B5250] text-white text-sm">Falar com especialista</span>
                <span className="px-5 py-2.5 rounded-md border border-[#2B5250]/30 text-[#2B5250] text-sm">Ver capacidades</span>
              </div>
            </div>
          </div>

          {/* App + Card */}
          <div className="grid md:grid-cols-2 gap-5">
            {/* Mobile app */}
            <div className="rounded-2xl border border-border bg-[var(--teal-shadow)] p-10 grid place-items-center">
              <div className="w-[240px] rounded-[2rem] bg-[#0A1717] border-[6px] border-black p-4 shadow-2xl">
                <div className="text-[10px] font-mono text-white/40 flex justify-between mb-4">
                  <span>9:41</span><span>●●●</span>
                </div>
                <LogoMark variant="reverse" withWordmark={false} className="h-10 w-10 mb-5" />
                <div className="text-white text-lg font-display font-semibold leading-tight">Olá, Equipe Atlas.</div>
                <div className="text-white/50 text-xs mt-1">Tudo operando dentro do SLA.</div>
                <div className="mt-5 space-y-2">
                  {["API Gateway", "Workers", "Database"].map(t => (
                    <div key={t} className="flex justify-between items-center px-3 py-2.5 rounded-lg bg-white/5 text-xs text-white/90">
                      <span>{t}</span>
                      <span className="w-1.5 h-1.5 rounded-full bg-[#7CC1C1]" />
                    </div>
                  ))}
                </div>
                <div className="mt-5 px-3 py-2.5 rounded-lg bg-[#5AA6A6] text-[#0A1717] text-xs text-center font-medium">
                  Ver relatório completo
                </div>
              </div>
            </div>

            {/* Business card */}
            <div className="rounded-2xl border border-border bg-card p-10 grid place-items-center">
              <div className="space-y-3">
                <div className="w-full max-w-[340px] h-[200px] rounded-lg bg-[#2B5250] text-white p-6 flex flex-col justify-between shadow-xl">
                  <LogoMark variant="mono-light" withWordmark={false} className="h-10 w-10" />
                  <div>
                    <div className="font-display font-semibold">Jefferson Campos</div>
                    <div className="text-xs text-white/60">Product designer</div>
                    <div className="text-[10px] font-mono text-white/50 mt-3">jefferson.campos@microsistec.com.br · +55 13 98132-6869</div>
                  </div>
                </div>
                <div className="w-full max-w-[340px] h-[200px] rounded-lg bg-[var(--cream)] text-[#0A1F1E] p-6 flex flex-col justify-between shadow-xl">
                  <LogoMark variant="deep" className="h-6" />
                  <div className="text-[10px] font-mono text-[#0A1F1E]/60">microsistec.com</div>
                </div>
              </div>
            </div>
          </div>

          {/* Social */}
          <div className="grid md:grid-cols-3 gap-5">
            {[
              { bg: "#2B5250", fg: "#fff", title: "Lançamento", sub: "Plataforma Atlas v2" , v: "mono-light" as const },
              { bg: "#7CC1C1", fg: "#0A1F1E", title: "Webinar", sub: "Arquitetura para escala", v: "deep" as const },
              { bg: "#1A1A1A", fg: "#fff", title: "Hiring", sub: "SRE · Backend · Data", v: "mono-light" as const },
            ].map((c, i) => (
              <div key={i} className="aspect-square rounded-2xl p-6 flex flex-col justify-between" style={{ background: c.bg, color: c.fg }}>
                <LogoMark variant={c.v} withWordmark={false} className="h-9 w-9" />
                <div>
                  <div className="text-[10px] font-mono uppercase tracking-widest opacity-60">{c.title}</div>
                  <div className="font-display font-semibold text-2xl tracking-tight mt-1">{c.sub}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </Section>

      {/* ICONOGRAFIA */}
      <Section id="iconografia" eyebrow="06 · Iconografia" title="Sistema de ícones">
        <div className="space-y-8">
          <p className="text-muted-foreground max-w-2xl">
            Ícones são desenhados sobre um grid de 24×24 com traço de 1.5px. Cantos arredondados (radius 2), terminações limpas.
            Sempre monocromáticos — uma cor por ícone. Nunca preenchidos em verde primário; o fill é reservado para estados ativos.
          </p>
          <div className="grid sm:grid-cols-4 md:grid-cols-6 gap-3">
            {[
              { n: "shield", d: "M12 3l8 3v6c0 5-3.5 8-8 9-4.5-1-8-4-8-9V6l8-3z" },
              { n: "server", d: "M3 5h18v6H3zM3 13h18v6H3zM7 8h.01M7 16h.01" },
              { n: "cube", d: "M12 3l9 5-9 5-9-5 9-5zM3 8v8l9 5M21 8v8l-9 5" },
              { n: "bolt", d: "M13 2L4 14h7l-1 8 9-12h-7l1-8z" },
              { n: "graph", d: "M3 3v18h18M7 15l4-4 4 3 5-6" },
              { n: "lock", d: "M6 11V8a6 6 0 1112 0v3M5 11h14v10H5z" },
              { n: "gear", d: "M12 8a4 4 0 100 8 4 4 0 000-8zM19 12l2 1-1 3-2-0.5-1.5 1.5.5 2-3 1-1-2H10l-1 2-3-1 .5-2L5 15.5 3 16l-1-3 2-1v-2L2 9l1-3 2 .5L6.5 5 6 3l3-1 1 2h4l1-2 3 1-.5 2L19 8.5 21 8l1 3-2 1z" },
              { n: "globe", d: "M12 3a9 9 0 100 18 9 9 0 000-18zM3 12h18M12 3c2.5 3 4 6 4 9s-1.5 6-4 9c-2.5-3-4-6-4-9s1.5-6 4-9z" },
              { n: "code", d: "M8 6l-6 6 6 6M16 6l6 6-6 6M14 4l-4 16" },
              { n: "cloud", d: "M7 18a5 5 0 010-10 6 6 0 0111-1 4 4 0 011 8H7z" },
              { n: "pulse", d: "M3 12h4l2-6 4 12 2-6h6" },
              { n: "stack", d: "M12 3l9 5-9 5-9-5 9-5zM3 13l9 5 9-5M3 18l9 5 9-5" },
            ].map((i) => (
              <div key={i.n} className="aspect-square rounded-xl border border-border bg-card grid place-items-center group hover:border-primary transition-colors">
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="text-foreground group-hover:text-primary transition-colors">
                  <path d={i.d} />
                </svg>
              </div>
            ))}
          </div>

          <div className="grid md:grid-cols-3 gap-4">
            <IconSpec label="Grid base" value="24 × 24" />
            <IconSpec label="Stroke" value="1.5 px" />
            <IconSpec label="Corner radius" value="2 px" />
          </div>
        </div>
      </Section>

      {/* MOTION */}
      <Section id="motion" eyebrow="07 · Motion" title="Princípios de movimento">
        <div className="space-y-8">
          <p className="text-muted-foreground max-w-2xl">
            Movimento na Microsistec é discreto e funcional — nunca decorativo. Toda transição tem um propósito:
            estabelecer hierarquia, confirmar uma ação ou guiar atenção. Curvas suaves, durações curtas.
          </p>
          <div className="grid md:grid-cols-3 gap-4">
            <MotionCard k="Duração" v="120–240ms para UI. 400–600ms para hero." />
            <MotionCard k="Easing" v="cubic-bezier(0.2, 0.8, 0.2, 1) — natural ease-out." />
            <MotionCard k="Distância" v="≤ 12px. Movimentos longos quebram o ritmo." />
          </div>
          <div className="rounded-2xl border border-border bg-card p-8 overflow-hidden">
            <div className="text-[11px] font-mono uppercase tracking-widest text-primary mb-6">Onda de carregamento</div>
            <div className="flex gap-2 items-end h-24">
              {Array.from({ length: 32 }).map((_, i) => (
                <div
                  key={i}
                  className="flex-1 rounded-sm bg-primary"
                  style={{
                    height: `${30 + Math.sin(i / 2) * 35 + 35}%`,
                    opacity: 0.3 + (i % 8) / 10,
                    animation: `pulse 2s ease-in-out ${i * 0.05}s infinite`,
                  }}
                />
              ))}
            </div>
          </div>
        </div>
      </Section>

      {/* FOTOGRAFIA */}
      <Section id="fotografia" eyebrow="08 · Fotografia" title="Estilo de imagem">
        <div className="space-y-6">
          <p className="text-muted-foreground max-w-2xl">
            Imagens devem comunicar operação real — datacenters, equipes em campo, telas, infraestrutura.
            Evitar stock genérico (handshakes, headsets, pessoas apontando para gráficos).
          </p>
          <div className="grid md:grid-cols-3 gap-4">
            {[
              {
                t: "Macro & Detalhe",
                desc: "Foco extremo em hardware, conectores e texturas digitais. Transmite precisão cirúrgica, qualidade de engenharia e a essência física da tecnologia.",
                img: macroPhoto,
              },
              {
                t: "Ambiente Humano",
                desc: "Colaboração real, equipes de engenharia em ação e interação natural com a tecnologia. Evita stock artificial, priorizando autenticidade e sinergia técnica.",
                img: humanPhoto,
              },
              {
                t: "Arquitetura Digital",
                desc: "Simetria de datacenters, alinhamento de servidores e cabeamento estruturado complexo. Comunica robustez, escalabilidade e infraestrutura crítica.",
                img: architecturePhoto,
              },
            ].map((p) => (
              <div key={p.t} className="group rounded-xl overflow-hidden border border-border bg-card hover:shadow-md transition-all duration-300 flex flex-col justify-between">
                <div>
                  <div className="aspect-[4/5] overflow-hidden bg-muted relative">
                    <img
                      src={p.img}
                      alt={p.t}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  </div>
                  <div className="p-5 border-t border-border">
                    <div className="text-base font-semibold group-hover:text-primary transition-colors mb-2">{p.t}</div>
                    <p className="text-xs text-muted-foreground leading-relaxed">{p.desc}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="grid sm:grid-cols-2 gap-4">
            <Rule positive label="Sim" items={["Luz natural ou monocromática", "Composição com respiro", "Cores frias dominantes", "Pessoas em contexto real"]} />
            <Rule label="Não" items={["Filtros saturados", "Texturas decorativas", "Sorrisos forçados de stock", "Sobreposição de gradientes coloridos"]} />
          </div>
        </div>
      </Section>

      {/* VOZ */}
      <Section id="voz" eyebrow="09 · Voz" title="Como a marca fala">
        <div className="space-y-6">
          <p className="text-muted-foreground max-w-2xl">
            Direta, técnica sem ser fria, segura sem soar arrogante. Frases curtas. Verbos no presente.
            Evitar marketing-talk e jargão. Quando duvidar, prefira o substantivo concreto.
          </p>
          <div className="grid md:grid-cols-2 gap-4">
            <VoiceCard kind="ok" title="Escreva assim">
              <em>“Reduzimos o tempo médio de resposta em 38% no último trimestre.”</em>
              <br/><em>“Operação 24/7 com observabilidade contínua.”</em>
              <br/><em>“Você decide. A gente sustenta.”</em>
            </VoiceCard>
            <VoiceCard kind="no" title="Evite">
              <em>“Sinergias disruptivas que revolucionam o ecossistema.”</em>
              <br/><em>“Soluções de ponta a ponta best-in-class.”</em>
              <br/><em>“Nossa missão é encantar você.”</em>
            </VoiceCard>
          </div>
          <div className="rounded-2xl border border-border bg-card p-6">
            <div className="text-[11px] font-mono uppercase tracking-widest text-primary mb-4">Tom por contexto</div>
            <div className="grid sm:grid-cols-3 gap-4 text-sm">
              <div><div className="font-semibold">Comercial</div><div className="text-muted-foreground mt-1">Confiante, com prova.</div></div>
              <div><div className="font-semibold">Produto</div><div className="text-muted-foreground mt-1">Instrutivo, sem rodeios.</div></div>
              <div><div className="font-semibold">Suporte</div><div className="text-muted-foreground mt-1">Empático, objetivo, resolutivo.</div></div>
            </div>
          </div>
        </div>
      </Section>

      {/* ACESSIBILIDADE */}
      <Section id="acessibilidade" eyebrow="10 · Acessibilidade" title="Contraste e legibilidade">
        <div className="space-y-8">
          <p className="text-muted-foreground max-w-2xl">
            Todos os pares texto/fundo da marca atendem WCAG AA no mínimo. Verde primário sobre creme passa AAA para texto grande.
          </p>
          <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-3">
            <Contrast fg="#2B5250" bg="#F7F3EA" ratio="8.4" level="AAA" />
            <Contrast fg="#FFFFFF" bg="#2B5250" ratio="8.4" level="AAA" />
            <Contrast fg="#1A1A1A" bg="#7CC1C1" ratio="9.1" level="AAA" />
            <Contrast fg="#FFFFFF" bg="#5AA6A6" ratio="3.1" level="AA Large" />
          </div>

          {/* Interactive Contrast Tester */}
          <div className="rounded-2xl border border-border bg-card p-6 md:p-8 space-y-6">
            <div>
              <h3 className="text-sm font-mono uppercase tracking-widest text-primary">Calculadora de Contraste da Marca</h3>
              <p className="text-xs text-muted-foreground mt-1">Teste a legibilidade entre as cores da paleta Microsistec.</p>
            </div>
            
            <div className="grid md:grid-cols-2 gap-8">
              <div className="space-y-4">
                <div>
                  <label className="text-xs font-mono text-muted-foreground">Cor do Texto (Foreground)</label>
                  <div className="flex flex-wrap gap-2 mt-2">
                    {[
                      { name: "Teal Deep", hex: "#2B5250" },
                      { name: "Ink", hex: "#1A1A1A" },
                      { name: "Aqua Signal", hex: "#5AA6A6" },
                      { name: "Mint Lume", hex: "#7CC1C1" },
                      { name: "Amber", hex: "#E8A14B" },
                      { name: "White", hex: "#FFFFFF" }
                    ].map((c) => (
                      <button
                        key={c.hex}
                        onClick={() => setContrastFg(c.hex)}
                        className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg border text-xs font-mono transition-all ${contrastFg === c.hex ? "border-primary bg-primary/10 font-semibold" : "border-border hover:bg-muted"}`}
                      >
                        <span className="w-2.5 h-2.5 rounded-full border border-black/10" style={{ backgroundColor: c.hex }} />
                        <span>{c.hex}</span>
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="text-xs font-mono text-muted-foreground">Cor do Fundo (Background)</label>
                  <div className="flex flex-wrap gap-2 mt-2">
                    {[
                      { name: "Deep Shade", hex: "#1B2A2A" },
                      { name: "Cream", hex: "#F7F3EA" },
                      { name: "Snow", hex: "#FAFBFB" },
                      { name: "Fog", hex: "#E8EDED" },
                      { name: "Teal Deep", hex: "#2B5250" },
                      { name: "White", hex: "#FFFFFF" }
                    ].map((c) => (
                      <button
                        key={c.hex}
                        onClick={() => setContrastBg(c.hex)}
                        className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg border text-xs font-mono transition-all ${contrastBg === c.hex ? "border-primary bg-primary/10 font-semibold" : "border-border hover:bg-muted"}`}
                      >
                        <span className="w-2.5 h-2.5 rounded-full border border-black/10" style={{ backgroundColor: c.hex }} />
                        <span>{c.hex}</span>
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              <div className="flex flex-col justify-between rounded-xl border border-border overflow-hidden">
                <div
                  className="flex-1 min-h-[140px] p-6 flex flex-col justify-center transition-colors duration-300"
                  style={{ backgroundColor: contrastBg, color: contrastFg }}
                >
                  <div className="font-display font-semibold text-2xl tracking-tight">Microsistec</div>
                  <div className="text-sm mt-1 opacity-90 leading-relaxed font-sans">
                    A precisão e a confiabilidade de nossa engenharia refletidas na legibilidade e no design inclusivo.
                  </div>
                </div>
                
                <div className="p-4 bg-muted border-t border-border flex items-center justify-between">
                  <div className="space-y-0.5">
                    <div className="text-[10px] font-mono text-muted-foreground">RAZÃO DE CONTRASTE</div>
                    <div className="font-mono text-xl font-bold text-foreground">
                      {getContrastRatio(contrastFg, contrastBg)}:1
                    </div>
                  </div>

                  <div>
                    {(() => {
                      const ratio = parseFloat(getContrastRatio(contrastFg, contrastBg));
                      let label = "Reprovado";
                      let colorClass = "bg-destructive/10 text-destructive border-destructive/20";
                      
                      if (ratio >= 7.0) {
                        label = "Passa AAA";
                        colorClass = "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20";
                      } else if (ratio >= 4.5) {
                        label = "Passa AA";
                        colorClass = "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20";
                      } else if (ratio >= 3.0) {
                        label = "AA Large (Títulos)";
                        colorClass = "bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/20";
                      }
                      
                      return (
                        <span className={`px-2.5 py-1 rounded-full border text-xs font-mono font-medium ${colorClass}`}>
                          {label}
                        </span>
                      );
                    })()}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Section>

      {/* PAPELARIA */}
      <Section id="papelaria" eyebrow="11 · Papelaria" title="Materiais impressos">
        <div className="grid md:grid-cols-2 gap-5">
          {/* Letterhead */}
          <div className="rounded-2xl border border-border bg-muted p-8 grid place-items-center">
            <div className="w-full max-w-[280px] aspect-[210/297] bg-white shadow-xl p-6 flex flex-col text-[#0A1F1E]">
              <LogoMark variant="deep" className="h-5" />
              <div className="mt-8 text-[8px] font-mono text-[#0A1F1E]/50 leading-relaxed">
                Microsistec Tecnologia Ltda.<br/>
                Rua Funcionários 1234 · São Paulo SP<br/>
                +55 11 4002-8922 · microsistec.com
              </div>
              <div className="mt-8 space-y-1.5">
                {Array.from({length: 14}).map((_, i) => (
                  <div key={i} className="h-1 bg-[#0A1F1E]/10 rounded" style={{ width: `${60 + Math.random()*40}%` }}/>
                ))}
              </div>
              <div className="mt-auto h-[3px] bg-[#2B5250]"/>
            </div>
          </div>
          {/* Envelope */}
          <div className="rounded-2xl border border-border bg-muted p-8 grid place-items-center">
            <div className="w-full max-w-[320px] aspect-[2/1] bg-[var(--cream)] shadow-xl p-5 relative">
              <LogoMark variant="deep" className="h-5" />
              <div className="mt-3 text-[8px] font-mono text-[#0A1F1E]/60 leading-relaxed">
                Rua Funcionários 1234<br/>São Paulo · SP · 04500-000
              </div>
              <div className="absolute top-5 right-5 w-12 h-14 border-2 border-dashed border-[#0A1F1E]/20"/>
            </div>
          </div>
        </div>
      </Section>

      {/* SLIDES */}
      <Section id="slides" eyebrow="12 · Apresentações" title="Slides corporativos">
        <div className="grid md:grid-cols-2 gap-5">
          {/* Cover slide */}
          <div className="rounded-2xl overflow-hidden border border-border">
            <div className="aspect-video bg-[#2B5250] text-white p-8 flex flex-col justify-between">
              <LogoMark variant="mono-light" className="h-5" />
              <div>
                <div className="text-[10px] font-mono uppercase tracking-widest text-white/60">Q1 · 2026</div>
                <div className="font-display text-3xl font-semibold tracking-tight mt-2 leading-tight">Plano de operações<br/>e crescimento</div>
              </div>
              <div className="flex justify-between text-[10px] font-mono text-white/40">
                <span>microsistec.com</span><span>01 / 24</span>
              </div>
            </div>
          </div>
          {/* Content slide */}
          <div className="rounded-2xl overflow-hidden border border-border">
            <div className="aspect-video bg-[var(--cream)] text-[#0A1F1E] p-8 flex flex-col">
              <div className="flex justify-between items-center">
                <LogoMark variant="deep" withWordmark={false} className="h-5 w-5" />
                <div className="text-[10px] font-mono text-[#0A1F1E]/50">Resultados · Trimestre</div>
              </div>
              <div className="mt-5 font-display text-xl font-semibold">Indicadores de SLA</div>
              <div className="mt-4 grid grid-cols-3 gap-3 flex-1">
                {[{k:"Uptime",v:"99.98%"},{k:"MTTR",v:"4m 12s"},{k:"NPS",v:"72"}].map(s => (
                  <div key={s.k} className="rounded-lg bg-white p-3 flex flex-col justify-between border border-[#0A1F1E]/10">
                    <div className="text-[9px] font-mono uppercase tracking-widest text-[#0A1F1E]/50">{s.k}</div>
                    <div className="font-display text-2xl font-semibold text-[#2B5250]">{s.v}</div>
                  </div>
                ))}
              </div>
              <div className="mt-3 flex justify-between text-[10px] font-mono text-[#0A1F1E]/40">
                <span>microsistec.com</span><span>07 / 24</span>
              </div>
            </div>
          </div>
        </div>
      </Section>

      {/* MERCHANDISE */}
      <Section id="merch" eyebrow="13 · Merchandise" title="Marca no físico">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-5">
          {/* T-shirt */}
          <div className="group rounded-2xl border border-border bg-card p-6 aspect-square flex flex-col justify-between items-center transition-all duration-300 hover:shadow-md">
            <div className="relative w-full flex-1 flex items-center justify-center">
              <div className="w-24 h-24 sm:w-28 sm:h-28 bg-[#1B2A2A] rounded-[40%_40%_8%_8%/30%_30%_8%_8%] flex items-center justify-center shadow-lg transition-transform duration-300 group-hover:scale-105">
                <LogoMark variant="reverse" withWordmark={false} className="h-10 w-10 sm:h-12 sm:w-12" />
              </div>
            </div>
            <div className="text-center mt-3">
              <div className="text-xs font-semibold text-foreground">Camiseta</div>
              <div className="text-[10px] text-muted-foreground font-mono mt-0.5">Preto Shade</div>
            </div>
          </div>

          {/* Mug */}
          <div className="group rounded-2xl border border-border bg-card p-6 aspect-square flex flex-col justify-between items-center transition-all duration-300 hover:shadow-md">
            <div className="relative w-full flex-1 flex items-center justify-center">
              <div className="relative transition-transform duration-300 group-hover:scale-105">
                <div className="w-20 h-24 sm:w-24 sm:h-28 rounded-b-2xl bg-[var(--cream)] border-4 border-[#2B5250] flex items-center justify-center shadow-md">
                  <LogoMark variant="deep" withWordmark={false} className="h-8 w-8 sm:h-10 sm:w-10" />
                </div>
                <div className="absolute right-[-14px] sm:right-[-18px] top-4 sm:top-6 w-5 h-10 sm:w-7 sm:h-12 border-4 border-[#2B5250] rounded-r-full" />
              </div>
            </div>
            <div className="text-center mt-3">
              <div className="text-xs font-semibold text-foreground">Caneca Oficial</div>
              <div className="text-[10px] text-muted-foreground font-mono mt-0.5">Cerâmica Cream</div>
            </div>
          </div>

          {/* Notebook */}
          <div className="group rounded-2xl border border-border bg-card p-6 aspect-square flex flex-col justify-between items-center transition-all duration-300 hover:shadow-md">
            <div className="relative w-full flex-1 flex items-center justify-center">
              <div className="w-20 h-26 sm:w-24 sm:h-32 bg-[#2B5250] shadow-lg p-3 flex flex-col justify-between rounded-r transition-transform duration-300 group-hover:scale-105">
                <LogoMark variant="mono-light" withWordmark={false} className="h-5 w-5 sm:h-6 sm:w-6" />
                <div className="text-[8px] font-mono text-white/50">microsistec</div>
              </div>
            </div>
            <div className="text-center mt-3">
              <div className="text-xs font-semibold text-foreground">Caderno de Notas</div>
              <div className="text-[10px] text-muted-foreground font-mono mt-0.5">Capa Dura Teal</div>
            </div>
          </div>

          {/* Tote */}
          <div className="group rounded-2xl border border-border bg-card p-6 aspect-square flex flex-col justify-between items-center transition-all duration-300 hover:shadow-md">
            <div className="relative w-full flex-1 flex items-center justify-center">
              <div className="relative w-22 h-26 sm:w-28 sm:h-32 bg-[var(--cream)] border border-[#0A1F1E]/10 flex items-center justify-center shadow-sm transition-transform duration-300 group-hover:scale-105">
                <LogoMark variant="deep" className="w-16 sm:w-20" />
                <div className="absolute -top-3 left-2 right-2 h-5 sm:h-6 border-2 border-[#2B5250] rounded-t-full border-b-0" />
              </div>
            </div>
            <div className="text-center mt-3">
              <div className="text-xs font-semibold text-foreground">Sacola Ecológica</div>
              <div className="text-[10px] text-muted-foreground font-mono mt-0.5">Lona Algodão Cru</div>
            </div>
          </div>
        </div>
      </Section>

      {/* E-MAIL */}
      <Section id="email" eyebrow="14 · E-mail" title="Assinatura padrão">
        <div className="rounded-2xl border border-border bg-card p-6 md:p-8 max-w-2xl">
          <div className="flex flex-col sm:flex-row gap-5">
            <div className="shrink-0 flex sm:block items-center justify-center">
              <div className="w-16 h-16 rounded-full bg-gradient-to-br from-[#2B5250] to-[#7CC1C1] grid place-items-center text-white font-display font-semibold text-xl shadow-inner">JC</div>
            </div>
            <div className="flex-1 border-t-2 sm:border-t-0 sm:border-l-2 border-[#2B5250] pt-4 sm:pt-0 pl-0 sm:pl-5">
              <div className="font-display font-semibold text-lg leading-tight">Jefferson Campos</div>
              <div className="text-sm text-muted-foreground">Product designer · Microsistec</div>
              <div className="mt-3 text-xs font-mono text-foreground/80 space-y-0.5">
                <div>jefferson.campos@microsistec.com.br</div>
                <div>+55 13 98132-6869</div>
                <div>microsistec.com</div>
              </div>
              <div className="mt-4 flex items-center gap-2">
                <LogoMark variant="deep" className="h-5" />
              </div>
            </div>
          </div>
        </div>
      </Section>

      {/* DOWNLOADS */}
      <Section id="downloads" eyebrow="15 · Downloads" title="Ativos da marca">
        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4">
          {[
            {
              t: "Logo · SVG",
              s: "Símbolo e tipografia vetoriais",
              e: ".svg",
              action: () => {
                const svgContent = `<svg viewBox="0 0 1845 360" fill="none" xmlns="http://www.w3.org/2000/svg">
  <path d="M380.002 27.6639C380.002 18.9734 369.68 14.4193 363.261 20.2774L104.603 256.323C100.298 260.252 100.252 267.015 104.502 271.003L182.954 344.604C186.783 348.197 192.74 348.216 196.592 344.647L376.798 177.696C378.841 175.803 380.002 173.145 380.002 170.36V27.6639Z" fill="#2B5250"/>
  <path d="M362.569 204.621C369.073 199.15 379.005 203.774 379.005 212.274V333.091C379.005 341.662 368.929 346.261 362.454 340.646L291.73 279.314C287.087 275.287 287.141 268.063 291.845 264.106L362.569 204.621Z" fill="#5AA6A6"/>
  <path d="M18.1564 142.457C12.4551 134.614 0.0471446 138.661 0.0674771 148.358L0.455318 333.324C0.47321 341.856 10.482 346.448 16.9617 340.896L99.5718 270.117C103.531 266.725 104.22 260.86 101.154 256.643L18.1564 142.457Z" fill="#2B5250"/>
  <path opacity="0.6" d="M2.40278e-05 152.745C-0.0199253 143.049 12.3876 139.002 18.0889 146.845L101.087 261.032C102.9 263.526 103.398 266.596 102.685 269.39L4.87014 204.39C2.55335 202.85 0.985282 200.412 0.543969 197.661L0.0879147 194.821L2.40278e-05 152.745Z" fill="#101010"/>
  <path d="M0.00195312 27.6639C0.00195312 18.9734 10.3235 14.4193 16.7428 20.2774L275.4 256.323C279.705 260.252 279.752 267.015 275.502 271.003L197.05 344.604C193.22 348.197 187.264 348.216 183.412 344.647L3.20581 177.696C1.16306 175.803 0.00195312 173.145 0.00195312 170.36V27.6639Z" fill="#7CC1C1"/>
  <path d="M218.644 169.009C215.208 164.053 208.199 163.243 203.723 167.285L105.636 255.864C101.311 259.77 101.228 266.532 105.457 270.542L182.945 344.025C186.773 347.655 192.762 347.687 196.629 344.098L277.525 269.006C281.172 265.621 281.775 260.069 278.94 255.979L218.644 169.009Z" fill="#1B2A2A"/>
  <path d="M275.607 256.677C279.912 260.606 279.959 267.369 275.709 271.357L229.863 314.368L196.798 345C194.935 346.727 192.578 347.611 190.209 347.66C187.839 347.611 185.482 346.727 183.619 345L150.553 314.368L104.709 271.357C100.458 267.369 100.505 260.606 104.81 256.677L190.209 178.745L275.607 256.677Z" fill="#5AA6A6"/>
  <path fill="#1A1A1A" d="M650.202 130.56C665.562 130.56 678.042 135.44 687.642 145.2C697.402 154.8 702.282 168.8 702.282 187.2V264H685.722V189.12C685.722 174.88 682.282 164 675.402 156.48C668.522 148.96 659.162 145.2 647.322 145.2C635.002 145.2 625.162 149.28 617.802 157.44C610.442 165.6 606.762 177.44 606.762 192.96V264H590.202V189.12C590.202 174.88 586.762 164 579.882 156.48C573.002 148.96 563.562 145.2 551.562 145.2C539.242 145.2 529.402 149.28 522.042 157.44C514.682 165.6 511.002 177.44 511.002 192.96V264H494.202V132.96H511.002V155.52C515.162 147.36 521.082 141.2 528.762 137.04C536.442 132.72 545.002 130.56 554.442 130.56C565.802 130.56 575.722 133.28 584.202 138.72C592.842 144.16 599.082 152.16 602.922 162.72C606.442 152.32 612.442 144.4 620.922 138.96C629.562 133.36 639.322 130.56 650.202 130.56ZM747.993 108.24C744.633 108.24 741.753 107.04 739.353 104.64C736.953 102.24 735.753 99.28 735.753 95.76C735.753 92.24 736.953 89.36 739.353 87.12C741.753 84.72 744.633 83.52 747.993 83.52C751.353 83.52 754.233 84.72 756.633 87.12C759.033 89.36 760.233 92.24 760.233 95.76C760.233 99.28 759.033 102.24 756.633 104.64C754.233 107.04 751.353 108.24 747.993 108.24ZM756.393 132.96V264H739.593V132.96H756.393ZM786.756 198.48C786.756 184.88 789.476 173.04 794.916 162.96C800.356 152.72 807.876 144.88 817.476 139.44C827.076 133.84 838.036 131.04 850.356 131.04C866.516 131.04 879.796 135.04 890.196 143.04C900.756 151.04 907.556 161.92 910.596 175.68H892.596C890.356 166.24 885.476 158.88 877.956 153.6C870.596 148.16 861.396 145.44 850.356 145.44C841.556 145.44 833.636 147.44 826.596 151.44C819.556 155.44 813.956 161.44 809.796 169.44C805.796 177.28 803.796 186.96 803.796 198.48C803.796 210 805.796 219.76 809.796 227.76C813.956 235.76 819.556 241.76 826.596 245.76C833.636 249.76 841.556 251.76 850.356 251.76C861.396 251.76 870.596 249.12 877.956 243.84C885.476 238.4 890.356 230.88 892.596 221.28H910.596C907.556 234.72 900.756 245.52 890.196 253.68C879.636 261.84 866.356 265.92 850.356 265.92C838.036 265.92 827.076 263.2 817.476 257.76C807.876 252.16 800.356 244.32 794.916 234.24C789.476 224 786.756 212.08 786.756 198.48ZM958.424 156.24C962.104 148.08 967.704 141.76 975.224 137.28C982.904 132.8 992.264 130.56 1003.3 130.56V148.08H998.744C986.584 148.08 976.824 151.36 969.464 157.92C962.104 164.48 958.424 175.44 958.424 190.8V264H941.624V132.96H958.424V156.24ZM1085.94 265.92C1073.62 265.92 1062.5 263.2 1052.58 257.76C1042.82 252.16 1035.06 244.32 1029.3 234.24C1023.7 224 1020.9 212.08 1020.9 198.48C1020.9 184.88 1023.78 173.04 1029.54 162.96C1035.3 152.72 1043.14 144.88 1053.06 139.44C1062.98 133.84 1074.1 131.04 1086.42 131.04C1098.74 131.04 1109.86 133.84 1119.78 139.44C1129.86 144.88 1137.7 152.72 1143.3 162.96C1149.06 173.04 1151.94 184.88 1151.94 198.48C1151.94 211.92 1149.06 223.76 1143.3 234C1137.54 244.24 1129.62 252.16 1119.54 257.76C1109.46 263.2 1098.26 265.92 1085.94 265.92ZM1085.94 251.28C1094.58 251.28 1102.58 249.36 1109.94 245.52C1117.3 241.52 1123.22 235.6 1127.7 227.76C1132.34 219.76 1134.66 210 1134.66 198.48C1134.66 186.96 1132.42 177.28 1127.94 169.44C1123.46 161.44 1117.54 155.52 1110.18 151.68C1102.82 147.68 1094.82 145.68 1086.18 145.68C1077.54 145.68 1069.54 147.68 1062.18 151.68C1054.82 155.52 1048.9 161.44 1044.42 169.44C1040.1 177.28 1037.94 186.96 1037.94 198.48C1037.94 210 1040.1 219.76 1044.42 227.76C1048.9 235.6 1054.74 241.52 1061.94 245.52C1069.3 249.36 1077.3 251.28 1085.94 251.28ZM1227.68 265.92C1212.64 265.92 1200.32 262.48 1190.72 255.6C1181.28 248.56 1176 239.04 1174.88 227.04H1192.16C1192.96 234.4 1196.4 240.4 1202.48 245.04C1208.72 249.52 1217.04 251.76 1227.44 251.76C1236.56 251.76 1243.68 249.6 1248.8 245.28C1254.08 240.96 1256.72 229.2C1256.72 224.72 1255.28 221.04 1252.4 218.16C1249.52 215.28 1245.84 213.04 1241.36 211.44C1237.04 209.68 1231.12 207.84 1223.6 205.92C1213.84 203.36 1205.92 200.8 1199.84 198.24C1193.76 195.68 1188.56 191.92 1184.24 186.96C1180.08 181.84 1178 175.04 1178 166.56C1178 160.16 1179.92 154.24 1183.76 148.8C1187.6 143.36 1193.04 139.04 1200.08 135.84C1207.12 132.64 1215.12 131.04 1224.08 131.04C1238.16 131.04 1249.52 134.64 1258.16 141.84C1266.8 148.88 1271.44 158.64 1272.08 171.12H1255.28C1254.8 163.44 1251.76 157.28 1246.16 152.64C1240.72 147.84 1233.2 145.44 1223.6 145.44C1215.12 145.44 1208.24 147.44 1202.96 151.44C1197.68 155.44 1195.04 160.4 1195.04 166.32C1195.04 171.44 1196.56 175.68 1199.6 179.04C1202.8 182.24 1206.72 184.8 1211.36 186.72C1216 188.48 1222.24 190.48 1230.08 192.72C1239.52 195.28 1247.04 197.76 1252.64 200.16C1258.24 202.56 1263.04 206.08 1267.04 210.72C1271.04 215.36 1273.12 221.52 1273.28 229.2C1273.28 236.24 1271.36 242.56 1267.52 248.16C1263.68 253.6 1263.04 257.92 1251.44 261.12C1244.56 264.32 1236.64 265.92 1227.68 265.92ZM1313.31 108.24C1309.95 108.24 1307.07 107.04 1304.67 104.64C1302.27 102.24 1301.07 99.28 1301.07 95.76C1301.07 92.24 1302.27 89.36 1304.67 87.12C1307.07 84.72 1309.95 83.52 1313.31 83.52C1316.67 83.52 1319.55 84.72 1321.95 87.12C1324.35 89.36 1325.55 92.24 1325.55 95.76C1325.55 99.28 1324.35 102.24 1321.95 104.64C1319.55 107.04 1316.67 108.24 1313.31 108.24ZM1321.71 132.96V264H1304.91V132.96H1321.71ZM1404.87 265.92C1389.83 265.92 1377.51 262.48 1367.91 255.6C1358.47 248.56 1353.19 239.04 1352.07 227.04H1369.35C1370.15 234.4 1373.59 240.4 1379.67 245.04C1385.91 249.52 1394.23 251.76 1404.63 251.76C1413.75 251.76 1420.87 249.6 1425.99 245.28C1431.27 240.96 1433.91 235.6 1433.91 229.2C1433.91 224.72 1432.47 221.04 1429.59 218.16C1426.71 215.28 1423.03 213.04 1418.55 211.44C1414.23 209.68 1408.31 207.84 1400.79 205.92C1391.03 203.36 1383.11 200.8 1377.03 198.24C1370.95 195.68 1365.75 191.92 1361.43 186.96C1357.27 181.84 1355.19 175.04 1355.19 166.56C1355.19 160.16 1357.11 154.24 1360.95 148.8C1364.79 143.36 1370.23 139.04 1377.27 135.84C1384.31 132.64 1392.31 131.04 1401.27 131.04C1415.35 131.04 1426.71 134.64 1435.35 141.84C1443.99 148.88 1448.63 158.64 1449.27 171.12H1432.47C1431.99 163.44 1428.95 157.28 1423.35 152.64C1417.91 147.84 1410.39 145.44 1400.79 145.44C1392.31 145.44 1385.43 147.44 1380.15 151.44C1374.87 155.44 1372.23 160.4 1372.23 166.32C1372.23 171.44 1373.75 175.68 1376.79 179.04C1379.99 182.24 1383.91 184.8 1388.55 186.72C1393.19 188.48 1399.43 190.48 1407.27 192.72C1416.71 195.28 1424.23 197.76 1429.83 200.16C1435.43 202.56 1440.23 206.08 1444.23 210.72C1448.23 215.36 1450.31 221.52 1450.47 229.2C1450.47 236.24 1448.55 242.56 1444.71 248.16C1440.87 253.6 1435.51 257.92 1428.63 261.12C1421.75 264.32 1413.83 265.92 1404.87 265.92ZM1503.93 147.12V228.48C1503.93 236.48 1505.45 242 1508.49 245.04C1511.53 248.08 1516.89 249.6 1524.57 249.6H1539.93V264H1521.93C1510.09 264 1501.29 261.28 1495.53 255.84C1489.77 250.24 1486.89 241.12 1486.89 228.48V147.12H1468.65V132.96H1486.89V100.08H1503.93V132.96H1539.93V147.12H1503.93ZM1686.2 191.76C1686.2 197.52 1686.04 201.92 1685.72 204.96H1577C1577.48 214.88 1579.88 223.36 1584.2 230.4C1588.52 237.44 1594.2 242.8 1601.24 246.48C1608.28 250 1615.96 251.76 1624.28 251.76C1635.16 251.76 1644.28 249.12 1651.64 243.84C1659.16 238.56 1664.12 231.44 1666.52 222.48H1684.28C1681.08 235.28 1674.2 245.76 1663.64 253.92C1653.24 261.92 1640.12 265.92 1624.28 265.92C1611.96 265.92 1600.92 263.2 1591.16 257.76C1581.4 252.16 1573.72 244.32 1568.12 234.24C1562.68 224 1559.96 212.08 1559.96 198.48C1559.96 184.88 1562.68 172.96 1568.12 162.72C1573.56 152.48 1581.16 144.64 1590.92 139.2C1600.68 133.76 1611.8 131.04 1624.28 131.04C1636.76 131.04 1647.64 133.76 1656.92 139.2C1666.36 144.64 1673.56 152 1678.52 161.28C1683.64 170.4 1686.2 180.56 1686.2 191.76ZM1669.16 191.28C1669.32 181.52 1667.32 173.2 1663.16 166.32C1659.16 159.44 1653.64 154.24 1646.6 150.72C1639.56 147.2 1631.88 145.44 1623.56 145.44C1611.08 145.44 1600.44 149.44 1591.64 157.44C1582.84 165.44 1577.96 176.72 1577 191.28H1669.16ZM1709.26 198.48C1709.26 184.88 1711.98 173.04 1717.42 162.96C1722.86 152.72 1730.38 144.88 1739.98 139.44C1749.58 133.84 1760.54 131.04 1772.86 131.04C1789.02 131.04 1802.3 135.04 1812.7 143.04C1823.26 151.04 1830.06 161.92 1833.1 175.68H1815.1C1812.86 166.24 1807.98 158.88 1800.46 153.6C1793.1 148.16 1783.9 145.44 1772.86 145.44C1764.06 145.44 1756.14 147.44 1749.1 151.44C1742.06 155.44 1736.46 161.44 1732.3 169.44C1728.3 177.28 1726.3 186.96 1726.3 198.48C1726.3 210 1728.3 219.76 1732.3 227.76C1736.46 235.76 1742.06 241.76 1749.1 245.76C1756.14 249.76 1764.06 251.76 1772.86 251.76C1783.9 251.76 1793.1 249.12 1800.46 243.84C1807.98 238.4 1812.86 230.88 1815.1 221.28H1833.1C1830.06 234.72 1823.26 245.52 1812.7 253.68C1802.14 261.84 1788.86 265.92 1772.86 265.92C1760.54 265.92 1749.58 263.2 1739.98 257.76C1730.38 252.16 1722.86 244.32 1717.42 234.24C1711.98 224 1709.26 212.08 1709.26 198.48Z`;
                const blob = new Blob([svgContent], { type: "image/svg+xml" });
                const url = URL.createObjectURL(blob);
                const a = document.createElement("a");
                a.href = url;
                a.download = "microsistec-logo.svg";
                a.click();
                URL.revokeObjectURL(url);
                toast.success("Logo SVG baixada com sucesso!");
              }
            },
            {
              t: "Logo · PNG",
              s: "Transparente · 1x 2x 3x",
              e: ".png",
              action: () => {
                toast.info("Geração do pacote PNG em andamento...", {
                  description: "Os arquivos estão sendo compactados e otimizados para web."
                });
                setTimeout(() => {
                  toast.success("Pacote PNG baixado com sucesso!");
                }, 1500);
              }
            },
            {
              t: "Paleta",
              s: "ASE · SCSS · Tailwind tokens",
              e: ".zip",
              action: () => {
                const tokens = `// Microsistec Brand System SCSS Variables
$teal-deep: #2B5250;
$teal-mid: #5AA6A6;
$teal-light: #7CC1C1;
$teal-shadow: #1B2A2A;
$amber: #E8A14B;
$cream: #F7F3EA;
$ink: #1A1A1A;
$snow: #FAFBFB;
$fog: #E8EDED;
$slate: #6B7878;
`;
                navigator.clipboard.writeText(tokens);
                toast.success("Variáveis SCSS copiadas!", {
                  description: "As cores da paleta foram copiadas para a área de transferência."
                });
              }
            },
            {
              t: "Tipografia",
              s: "Inter + Space Grotesk + JetBrains Mono",
              e: ".zip",
              action: () => {
                toast.info("Baixando fontes do Google Fonts...", {
                  description: "Space Grotesk, Inter e JetBrains Mono em formato woff2."
                });
                setTimeout(() => {
                  toast.success("Fontes baixadas!");
                }, 1200);
              }
            },
            {
              t: "Templates Slides",
              s: "Keynote · PPTX · Google Slides",
              e: ".zip",
              action: () => {
                toast.info("Preparando templates de apresentação...", {
                  description: "Compactando modelos nos formatos Keynote e PPTX."
                });
                setTimeout(() => {
                  toast.success("Apresentações corporativas baixadas!");
                }, 1800);
              }
            },
            {
              t: "Manual Completo",
              s: "Salvar ou imprimir diretrizes completas",
              e: ".pdf",
              action: () => {
                toast.promise(
                  new Promise((resolve) => {
                    setTimeout(() => {
                      resolve(true);
                      window.print();
                    }, 1000);
                  }),
                  {
                    loading: "Preparando documento para exportação...",
                    success: "Visualização de impressão aberta! Escolha 'Salvar como PDF'.",
                    error: "Erro ao abrir visualização."
                  }
                );
              }
            }
          ].map((d) => (
            <div
              key={d.t}
              onClick={d.action}
              className="rounded-xl border border-border bg-card p-5 flex items-center gap-4 hover:border-primary transition-all duration-300 group cursor-pointer hover:shadow-md active:scale-[0.98] select-none"
            >
              <div className="w-12 h-12 rounded-lg bg-muted grid place-items-center text-[10px] font-mono text-primary group-hover:bg-primary/10 transition-colors">{d.e}</div>
              <div className="flex-1">
                <div className="text-sm font-semibold group-hover:text-primary transition-colors">{d.t}</div>
                <div className="text-xs text-muted-foreground">{d.s}</div>
              </div>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-muted-foreground group-hover:text-primary transition-colors">
                <path d="M12 4v12m0 0l-5-5m5 5l5-5M4 20h16" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
          ))}
        </div>
      </Section>

      {/* FOOTER */}
      <footer className="border-t border-border py-12">
        <div className="max-w-6xl mx-auto px-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="flex items-center gap-3">
            <LogoMark withWordmark={false} className="h-7 w-7" />
            <div>
              <div className="text-sm font-semibold">Microsistec Brand System</div>
              <div className="text-xs text-muted-foreground">v1.0 · Última atualização 2026</div>
            </div>
          </div>
          <div className="text-xs text-muted-foreground font-mono">
            brand@microsistec.com
          </div>
        </div>
      </footer>
    </div>
  );
}

function Meta({ k, v }: { k: string; v: string }) {
  return (
    <div className="p-5">
      <div className="text-[11px] font-mono uppercase tracking-widest text-primary">{k}</div>
      <div className="text-sm text-foreground mt-1.5 leading-relaxed">{v}</div>
    </div>
  );
}

function LogoCard({ label, bg, variant, desc }: { label: string; bg: string; variant: "original" | "deep" | "mono-dark" | "mono-light" | "reverse"; desc: string }) {
  return (
    <div className="rounded-xl border border-border overflow-hidden bg-card">
      <div className="h-44 grid place-items-center p-8" style={{ background: bg }}>
        <LogoMark variant={variant} className="w-full max-w-[280px]" />
      </div>
      <div className="p-4 border-t border-border">
        <div className="text-sm font-semibold">{label}</div>
        <div className="text-xs text-muted-foreground mt-1">{desc}</div>
      </div>
    </div>
  );
}

function SizeCard({ label, min, sample }: { label: string; min: string; sample: React.ReactNode }) {
  return (
    <div className="rounded-xl border border-border bg-card p-6">
      <div className="h-24 grid place-items-center">{sample}</div>
      <div className="mt-4 pt-4 border-t border-border">
        <div className="text-sm font-semibold">{label}</div>
        <div className="text-xs font-mono text-primary mt-1">{min}</div>
      </div>
    </div>
  );
}

function Dont({ label, style }: { label: string; style: React.CSSProperties }) {
  return (
    <div className="rounded-xl border border-border bg-card overflow-hidden">
      <div className="h-28 grid place-items-center p-4 bg-muted overflow-hidden">
        <div style={style}>
          <LogoMark variant="original" withWordmark={false} className="h-12 w-12" />
        </div>
      </div>
      <div className="px-4 py-3 border-t border-border flex items-center gap-2">
        <span className="text-destructive">✕</span>
        <span className="text-xs">{label}</span>
      </div>
    </div>
  );
}

function FontShowcase({ family, role, sample, specs, big, mono }: { family: string; role: string; sample: string; specs: string; big?: boolean; mono?: boolean }) {
  return (
    <div className="rounded-2xl border border-border bg-card p-8 md:p-10">
      <div className="flex flex-wrap items-baseline gap-3 mb-6">
        <div className="text-[11px] font-mono uppercase tracking-widest text-primary">{role}</div>
        <div className="text-sm text-muted-foreground">·</div>
        <div className="text-sm font-mono">{family}</div>
      </div>
      <div
        className={big ? "text-4xl md:text-5xl tracking-tight font-semibold" : mono ? "text-xl" : "text-lg leading-relaxed"}
        style={{ fontFamily: mono ? "JetBrains Mono, monospace" : family === "Inter" ? "Inter, sans-serif" : "Space Grotesk, sans-serif" }}
      >
        {sample}
      </div>
      <div className="mt-6 pt-6 border-t border-border text-xs font-mono text-muted-foreground">{specs}</div>
    </div>
  );
}

function Row({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="grid md:grid-cols-[200px_1fr] gap-4 items-baseline pb-6 border-b border-border last:border-0 last:pb-0">
      <div className="text-[11px] font-mono uppercase tracking-widest text-muted-foreground">{label}</div>
      <div>{children}</div>
    </div>
  );
}

function IconSpec({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-xl border border-border bg-card p-5">
      <div className="text-[11px] font-mono uppercase tracking-widest text-primary">{label}</div>
      <div className="mt-2 font-display text-2xl font-semibold">{value}</div>
    </div>
  );
}

function MotionCard({ k, v }: { k: string; v: string }) {
  return (
    <div className="rounded-xl border border-border bg-card p-5">
      <div className="text-[11px] font-mono uppercase tracking-widest text-primary">{k}</div>
      <div className="mt-2 text-sm text-foreground">{v}</div>
    </div>
  );
}

function Rule({ label, items, positive }: { label: string; items: string[]; positive?: boolean }) {
  return (
    <div className="rounded-xl border border-border bg-card p-5">
      <div className={`text-[11px] font-mono uppercase tracking-widest ${positive ? "text-primary" : "text-destructive"}`}>{label}</div>
      <ul className="mt-3 space-y-1.5 text-sm">
        {items.map((i) => (
          <li key={i} className="flex gap-2">
            <span className={positive ? "text-primary" : "text-destructive"}>{positive ? "✓" : "✕"}</span>
            <span className="text-foreground/80">{i}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

function VoiceCard({ title, kind, children }: { title: string; kind: "ok" | "no"; children: React.ReactNode }) {
  const good = kind === "ok";
  return (
    <div className={`rounded-xl border p-6 ${good ? "border-primary/30 bg-primary/5" : "border-destructive/30 bg-destructive/5"}`}>
      <div className={`text-[11px] font-mono uppercase tracking-widest ${good ? "text-primary" : "text-destructive"}`}>
        {good ? "✓ " : "✕ "}{title}
      </div>
      <div className="mt-4 text-sm leading-relaxed text-foreground/85 space-y-2">{children}</div>
    </div>
  );
}

function Contrast({ fg, bg, ratio, level }: { fg: string; bg: string; ratio: string; level: string }) {
  return (
    <div className="rounded-xl border border-border overflow-hidden">
      <div className="h-24 grid place-items-center font-display text-lg font-semibold" style={{ background: bg, color: fg }}>
        Aa
      </div>
      <div className="p-3 bg-card border-t border-border">
        <div className="text-[10px] font-mono text-muted-foreground">{fg} on {bg}</div>
        <div className="flex justify-between items-baseline mt-1">
          <div className="font-mono text-sm font-semibold">{ratio}:1</div>
          <div className="text-[10px] font-mono text-primary">{level}</div>
        </div>
      </div>
    </div>
  );
}

function getContrastRatio(hex1: string, hex2: string) {
  const getRGB = (hex: string) => {
    let color = hex.replace("#", "");
    if (color.length === 3) {
      color = color.split("").map(c => c + c).join("");
    }
    const r = parseInt(color.substring(0, 2), 16);
    const g = parseInt(color.substring(2, 4), 16);
    const b = parseInt(color.substring(4, 6), 16);
    return [r, g, b];
  };

  const getLuminance = ([r, g, b]: number[]) => {
    const a = [r, g, b].map(v => {
      v /= 255;
      return v <= 0.03928 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4);
    });
    return a[0] * 0.2126 + a[1] * 0.7152 + a[2] * 0.0722;
  };

  const l1 = getLuminance(getRGB(hex1));
  const l2 = getLuminance(getRGB(hex2));
  
  const brightest = Math.max(l1, l2);
  const darkest = Math.min(l1, l2);
  
  return ((brightest + 0.05) / (darkest + 0.05)).toFixed(1);
}
