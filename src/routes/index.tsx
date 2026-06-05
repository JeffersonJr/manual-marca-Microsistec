import { createFileRoute } from "@tanstack/react-router";
import { LogoMark } from "@/components/brand/LogoMark";

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
  return (
    <div className="group rounded-xl overflow-hidden border border-border bg-card">
      <div className="h-32 relative" style={{ backgroundColor: hex }}>
        <div className={`absolute bottom-3 left-3 text-[10px] tracking-widest uppercase font-mono ${dark ? "text-white/80" : "text-black/60"}`}>
          {hex}
        </div>
      </div>
      <div className="p-4">
        <div className="text-sm font-semibold">{name}</div>
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
  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* NAV */}
      <header className="sticky top-0 z-40 backdrop-blur-md bg-background/80 border-b border-border">
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
          <a href="#top" className="flex items-center gap-2">
            <LogoMark withWordmark={false} className="h-8 w-8" />
            <span className="font-display font-semibold tracking-tight">Microsistec</span>
            <span className="hidden sm:inline text-xs text-muted-foreground ml-2 font-mono">/ brand v1.0</span>
          </a>
          <nav className="hidden lg:flex items-center gap-5 text-sm text-muted-foreground">
            <a href="#principios" className="hover:text-foreground">Princípios</a>
            <a href="#logo" className="hover:text-foreground">Logo</a>
            <a href="#paleta" className="hover:text-foreground">Paleta</a>
            <a href="#tipografia" className="hover:text-foreground">Tipografia</a>
            <a href="#iconografia" className="hover:text-foreground">Ícones</a>
            <a href="#voz" className="hover:text-foreground">Voz</a>
            <a href="#aplicacoes" className="hover:text-foreground">Aplicações</a>
            <a href="#downloads" className="hover:text-foreground">Downloads</a>
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

      {/* PALETA */}
      <Section id="paleta" eyebrow="02 · Paleta" title="Cor com hierarquia">
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
      <Section id="tipografia" eyebrow="03 · Tipografia" title="Vozes da marca">
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
        </div>
      </Section>

      {/* APLICAÇÕES */}
      <Section id="aplicacoes" eyebrow="04 · Aplicações" title="A marca em movimento">
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
                <div className="w-[340px] h-[200px] rounded-lg bg-[#2B5250] text-white p-6 flex flex-col justify-between shadow-xl">
                  <LogoMark variant="mono-light" withWordmark={false} className="h-10 w-10" />
                  <div>
                    <div className="font-display font-semibold">Renata Aoki</div>
                    <div className="text-xs text-white/60">Head of Engineering</div>
                    <div className="text-[10px] font-mono text-white/50 mt-3">renata@microsistec.com · +55 11 9</div>
                  </div>
                </div>
                <div className="w-[340px] h-[200px] rounded-lg bg-[var(--cream)] text-[#0A1F1E] p-6 flex flex-col justify-between shadow-xl">
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
      <Section id="iconografia" eyebrow="05 · Iconografia" title="Sistema de ícones">
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
      <Section id="motion" eyebrow="06 · Motion" title="Princípios de movimento">
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
      <Section id="fotografia" eyebrow="07 · Fotografia" title="Estilo de imagem">
        <div className="space-y-6">
          <p className="text-muted-foreground max-w-2xl">
            Imagens devem comunicar operação real — datacenters, equipes em campo, telas, infraestrutura.
            Evitar stock genérico (handshakes, headsets, pessoas apontando para gráficos).
          </p>
          <div className="grid md:grid-cols-3 gap-4">
            {[
              { t: "Macro & Detalhe", g: "linear-gradient(135deg, #1B2A2A, #2B5250 60%, #5AA6A6)" },
              { t: "Ambiente Humano", g: "linear-gradient(160deg, #2B5250, #7CC1C1)" },
              { t: "Arquitetura Digital", g: "linear-gradient(120deg, #0F3331, #1A1A1A 70%, #5AA6A6)" },
            ].map((p) => (
              <div key={p.t} className="rounded-xl overflow-hidden border border-border">
                <div className="aspect-[4/5]" style={{ background: p.g }} />
                <div className="p-4 bg-card border-t border-border">
                  <div className="text-sm font-semibold">{p.t}</div>
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
      <Section id="voz" eyebrow="08 · Voz" title="Como a marca fala">
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
      <Section id="acessibilidade" eyebrow="09 · Acessibilidade" title="Contraste e legibilidade">
        <div className="space-y-6">
          <p className="text-muted-foreground max-w-2xl">
            Todos os pares texto/fundo da marca atendem WCAG AA no mínimo. Verde primário sobre creme passa AAA para texto grande.
          </p>
          <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-3">
            <Contrast fg="#2B5250" bg="#F7F3EA" ratio="8.4" level="AAA" />
            <Contrast fg="#FFFFFF" bg="#2B5250" ratio="8.4" level="AAA" />
            <Contrast fg="#1A1A1A" bg="#7CC1C1" ratio="9.1" level="AAA" />
            <Contrast fg="#FFFFFF" bg="#5AA6A6" ratio="3.1" level="AA Large" />
          </div>
        </div>
      </Section>

      {/* PAPELARIA */}
      <Section id="papelaria" eyebrow="10 · Papelaria" title="Materiais impressos">
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
      <Section id="slides" eyebrow="11 · Apresentações" title="Slides corporativos">
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
      <Section id="merch" eyebrow="12 · Merchandise" title="Marca no físico">
        <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-4">
          {/* T-shirt */}
          <div className="rounded-2xl border border-border bg-card p-6 aspect-square grid place-items-center">
            <div className="relative w-full h-full">
              <div className="absolute inset-x-6 top-4 bottom-4 bg-[#1B2A2A] rounded-[40%_40%_8%_8%/30%_30%_8%_8%] grid place-items-center">
                <LogoMark variant="reverse" withWordmark={false} className="h-12 w-12" />
              </div>
            </div>
          </div>
          {/* Mug */}
          <div className="rounded-2xl border border-border bg-card p-6 aspect-square grid place-items-center">
            <div className="relative">
              <div className="w-28 h-32 rounded-b-2xl bg-[var(--cream)] border-4 border-[#2B5250] grid place-items-center">
                <LogoMark variant="deep" withWordmark={false} className="h-10 w-10" />
              </div>
              <div className="absolute right-[-18px] top-6 w-7 h-12 border-4 border-[#2B5250] rounded-r-full" />
            </div>
          </div>
          {/* Notebook */}
          <div className="rounded-2xl border border-border bg-card p-6 aspect-square grid place-items-center">
            <div className="w-24 h-32 bg-[#2B5250] shadow-lg p-3 flex flex-col justify-between">
              <LogoMark variant="mono-light" withWordmark={false} className="h-6 w-6" />
              <div className="text-[8px] font-mono text-white/50">microsistec</div>
            </div>
          </div>
          {/* Tote */}
          <div className="rounded-2xl border border-border bg-card p-6 aspect-square grid place-items-center">
            <div className="relative w-28 h-32 bg-[var(--cream)] border border-[#0A1F1E]/10 flex items-center justify-center">
              <LogoMark variant="deep" className="w-20" />
              <div className="absolute -top-3 left-3 right-3 h-6 border-2 border-[#2B5250] rounded-t-full border-b-0" />
            </div>
          </div>
        </div>
      </Section>

      {/* E-MAIL */}
      <Section id="email" eyebrow="13 · E-mail" title="Assinatura padrão">
        <div className="rounded-2xl border border-border bg-card p-8 max-w-2xl">
          <div className="flex gap-5">
            <div className="shrink-0">
              <div className="w-16 h-16 rounded-full bg-gradient-to-br from-[#2B5250] to-[#7CC1C1] grid place-items-center text-white font-display font-semibold text-xl">RA</div>
            </div>
            <div className="flex-1 border-l-2 border-[#2B5250] pl-5">
              <div className="font-display font-semibold text-lg leading-tight">Renata Aoki</div>
              <div className="text-sm text-muted-foreground">Head of Engineering · Microsistec</div>
              <div className="mt-3 text-xs font-mono text-foreground/80 space-y-0.5">
                <div>renata@microsistec.com</div>
                <div>+55 11 4002-8922</div>
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
      <Section id="downloads" eyebrow="14 · Downloads" title="Ativos da marca">
        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4">
          {[
            { t: "Logo · SVG", s: "Pacote com 5 variações", e: ".svg" },
            { t: "Logo · PNG", s: "Transparente · 1× 2× 3×", e: ".png" },
            { t: "Paleta", s: "ASE · SCSS · Tailwind", e: ".zip" },
            { t: "Tipografia", s: "Inter + Space Grotesk + JetBrains Mono", e: ".zip" },
            { t: "Templates Slides", s: "Keynote · PPTX · Google Slides", e: ".zip" },
            { t: "Manual Completo", s: "Brand guidelines (PDF)", e: ".pdf" },
          ].map((d) => (
            <div key={d.t} className="rounded-xl border border-border bg-card p-5 flex items-center gap-4 hover:border-primary transition-colors group">
              <div className="w-12 h-12 rounded-lg bg-muted grid place-items-center text-[10px] font-mono text-primary">{d.e}</div>
              <div className="flex-1">
                <div className="text-sm font-semibold">{d.t}</div>
                <div className="text-xs text-muted-foreground">{d.s}</div>
              </div>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-muted-foreground group-hover:text-primary">
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
